import { useState, useCallback, useRef, useEffect } from 'react'
import { SkipForward } from 'lucide-react'
import Timer from '../Timer'
import { useSfx } from '../../hooks/useSfx'

/**
 * Part 3 active practice flow with turn-taking and per-phase speaking time.
 * Flow: prep (20s) → discuss (120s) → decide (60s) → opinion (120s)
 */
const PHASES = { PREP: 'prep', DISCUSS: 'discuss', DECIDE: 'decide', OPINION: 'opinion' }
const phaseConfig = {
  [PHASES.PREP]: { seconds: 20, label: 'Preparation' },
  [PHASES.DISCUSS]: { seconds: 120, label: 'Phase 1: Discussion' },
  [PHASES.DECIDE]: { seconds: 60, label: 'Phase 2: Decision' },
  [PHASES.OPINION]: { seconds: 120, label: 'Phase 3: Opinion' },
}
const phaseOrder = [PHASES.PREP, PHASES.DISCUSS, PHASES.DECIDE, PHASES.OPINION]
const phaseLabels = ['Prep', 'Discuss', 'Decide', 'Opinion']

const phaseChecklists = {
  discuss: [
    { key: 'connectors', label: 'Used proper connectors' },
    { key: 'vocab', label: 'Used advanced vocabulary' },
    { key: 'equal', label: 'Both candidates spoke equally' },
    { key: 'turntaking', label: 'Good turn-taking (asked partner\'s opinion)' },
    { key: 'points', label: 'Covered a reasonable number of points' },
    { key: 'conclusion', label: 'Had a conclusion before time ran out' },
  ],
  decide: [
    { key: 'connectors', label: 'Used proper connectors' },
    { key: 'vocab', label: 'Used advanced vocabulary' },
    { key: 'decision', label: 'Made a clear decision together' },
    { key: 'conclusion', label: 'Concluded with "So, we both agree that..."' },
  ],
  opinion: [
    { key: 'connectors', label: 'Used proper connectors' },
    { key: 'vocab', label: 'Used advanced vocabulary' },
    { key: 'equal', label: 'Both candidates contributed opinions' },
    { key: 'elaborate', label: 'Gave examples to support opinions' },
    { key: 'conclusion', label: 'Had a conclusion / final statement' },
  ],
}

/** Build the per-candidate score sections for Part 3. */
export function buildPart3Candidates() {
  return ['A', 'B'].map((c) => ({
    name: `Candidate ${c}`,
    color: c === 'A' ? 'blue' : 'emerald',
    sections: [
      { title: 'Part 3 — Phase 1: Discussion', items: phaseChecklists.discuss.map((it) => ({ key: `p3d-${c}-${it.key}`, label: it.label })) },
      { title: 'Part 3 — Phase 2: Decision', items: phaseChecklists.decide.map((it) => ({ key: `p3dec-${c}-${it.key}`, label: it.label })) },
      { title: 'Part 3 — Phase 3: Opinion', items: phaseChecklists.opinion.map((it) => ({ key: `p3o-${c}-${it.key}`, label: it.label })) },
    ],
  }))
}

const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

export default function Part3Runner({ set, onComplete, onStop }) {
  const { playTransition } = useSfx()
  const [phase, setPhase] = useState(PHASES.PREP)
  const [timerKey, setTimerKey] = useState(0)
  const [currentTurn, setCurrentTurn] = useState('A')

  const [phaseTimeA, setPhaseTimeA] = useState(0)
  const [phaseTimeB, setPhaseTimeB] = useState(0)
  const [speakingActive, setSpeakingActive] = useState(false)
  const speakInterval = useRef(null)
  const bufferTimeout = useRef(null)
  const timerPausedRef = useRef(false)
  const totalRef = useRef({ a: 0, b: 0 }) // accumulated across phases

  const isDiscussion = phase === PHASES.DISCUSS || phase === PHASES.DECIDE || phase === PHASES.OPINION

  const handleTimerPause = (isPaused) => { timerPausedRef.current = isPaused }
  const handleTimerReset = () => {
    // Subtract this phase's counted time from totals, then reset phase time
    totalRef.current.a -= phaseTimeA
    totalRef.current.b -= phaseTimeB
    setPhaseTimeA(0); setPhaseTimeB(0); setSpeakingActive(false); timerPausedRef.current = false
    if (bufferTimeout.current) clearTimeout(bufferTimeout.current)
    bufferTimeout.current = setTimeout(() => setSpeakingActive(true), 5000)
  }

  // Reset per-phase time + delay speaking by buffer
  useEffect(() => {
    setPhaseTimeA(0); setPhaseTimeB(0); setSpeakingActive(false); setCurrentTurn('A')
    timerPausedRef.current = false
    if (bufferTimeout.current) clearTimeout(bufferTimeout.current)
    if (isDiscussion) bufferTimeout.current = setTimeout(() => setSpeakingActive(true), 5000)
    return () => { if (bufferTimeout.current) clearTimeout(bufferTimeout.current) }
  }, [phase, isDiscussion])

  // Count speaking time — respects timer pause
  useEffect(() => {
    if (speakInterval.current) clearInterval(speakInterval.current)
    if (!speakingActive) return
    speakInterval.current = setInterval(() => {
      if (timerPausedRef.current) return
      if (currentTurn === 'A') { setPhaseTimeA((t) => t + 1); totalRef.current.a += 1 }
      else { setPhaseTimeB((t) => t + 1); totalRef.current.b += 1 }
    }, 1000)
    return () => { if (speakInterval.current) clearInterval(speakInterval.current) }
  }, [currentTurn, speakingActive])

  const advance = useCallback(() => {
    playTransition()
    setPhase((prev) => {
      const i = phaseOrder.indexOf(prev)
      if (i < phaseOrder.length - 1) {
        setTimerKey((k) => k + 1)
        return phaseOrder[i + 1]
      }
      onComplete?.({ totalA: totalRef.current.a, totalB: totalRef.current.b })
      return prev
    })
  }, [playTransition, onComplete])

  const switchTurn = () => setCurrentTurn((p) => (p === 'A' ? 'B' : 'A'))

  const currentConfig = phaseConfig[phase]
  const currentPhaseIdx = phaseOrder.indexOf(phase)

  return (
    <div className="w-full space-y-5 animate-fade-in">
      {/* Phase steps — clickable */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {phaseLabels.map((label, i) => {
          const isActive = i === currentPhaseIdx
          const isDone = i < currentPhaseIdx
          return (
            <div key={label} className="flex items-center gap-1.5">
              {i > 0 && <div className={`w-4 h-0.5 rounded ${isDone ? 'bg-purple-400' : 'bg-stone-200 dark:bg-stone-600'}`} />}
              <button
                onClick={() => { setPhase(phaseOrder[i]); setTimerKey((k) => k + 1); setCurrentTurn('A') }}
                className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-purple-300 ${isActive ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 shadow-sm' : isDone ? 'bg-stone-200 text-stone-500 dark:bg-stone-600 dark:text-stone-400' : 'bg-stone-100 text-stone-400 dark:bg-stone-700 dark:text-stone-500'}`}
              >
                {label}
              </button>
            </div>
          )
        })}
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{currentConfig.label}</p>
        <p className="text-xs text-stone-400 dark:text-stone-500">{set.state}</p>
      </div>

      <div className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700 rounded-xl p-5">
        <p className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-lg mb-3">{set.question}</p>
        {phase !== PHASES.OPINION ? (
          <div className="grid grid-cols-2 gap-2">
            {set.points.map((p, i) => (
              <div key={i} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2 leading-relaxed">
                <span className="w-5 h-5 shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed">{set.hots}</p>
        )}
      </div>

      {/* Turn indicator with per-phase time */}
      {isDiscussion && (
        <div className="flex items-center justify-center gap-3">
          <div className={`flex-1 text-center py-2.5 rounded-xl border-2 transition-all duration-300 ${currentTurn === 'A' ? 'border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 shadow-sm scale-[1.02]' : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800'}`}>
            <p className={`text-xs font-bold ${currentTurn === 'A' ? 'text-blue-600 dark:text-blue-400' : 'text-stone-400 dark:text-stone-500'}`}>🅰️ Candidate A</p>
            <p className={`text-xs mt-0.5 font-mono ${currentTurn === 'A' ? 'text-blue-500 dark:text-blue-400' : 'text-stone-400 dark:text-stone-500'}`}>{fmt(phaseTimeA)}</p>
          </div>
          <button onClick={switchTurn} className="px-3 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl text-xs font-semibold hover:bg-stone-700 dark:hover:bg-stone-300 active:scale-95 transition-all shrink-0 shadow-sm">
            Switch →
          </button>
          <div className={`flex-1 text-center py-2.5 rounded-xl border-2 transition-all duration-300 ${currentTurn === 'B' ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 shadow-sm scale-[1.02]' : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800'}`}>
            <p className={`text-xs font-bold ${currentTurn === 'B' ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'}`}>🅱️ Candidate B</p>
            <p className={`text-xs mt-0.5 font-mono ${currentTurn === 'B' ? 'text-emerald-500 dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'}`}>{fmt(phaseTimeB)}</p>
          </div>
        </div>
      )}

      <Timer key={timerKey} seconds={currentConfig.seconds} onComplete={advance} onPauseChange={handleTimerPause} onReset={handleTimerReset} />

      <div className="flex gap-3 justify-center">
        <button onClick={advance} className="btn-secondary"><SkipForward size={16} /> Skip</button>
        <button onClick={onStop} className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 px-3 py-2 transition-colors">Stop</button>
      </div>
    </div>
  )
}
