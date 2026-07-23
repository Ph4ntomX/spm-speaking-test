import { useState, useCallback, useRef, useEffect } from 'react'
import { Play, SkipForward } from 'lucide-react'
import Timer from '../components/Timer'
import TipsPanel from '../components/Tips'
import ScoreScreen from '../components/ScoreScreen'
import { part3Sets } from '../data/prompts'
import { useCompleted } from '../hooks/useCompleted'

const PHASES = { IDLE: 'idle', PREP: 'prep', DISCUSS: 'discuss', DECIDE: 'decide', OPINION: 'opinion', DONE: 'done' }
const phaseConfig = {
  [PHASES.PREP]: { seconds: 20, label: 'Preparation' },
  [PHASES.DISCUSS]: { seconds: 120, label: 'Phase 1: Discussion' },
  [PHASES.DECIDE]: { seconds: 60, label: 'Phase 2: Decision' },
  [PHASES.OPINION]: { seconds: 120, label: 'Phase 3: Opinion' },
}
const phaseOrder = [PHASES.PREP, PHASES.DISCUSS, PHASES.DECIDE, PHASES.OPINION]
const phaseLabels = ['Prep', 'Discuss', 'Decide', 'Opinion']

// Per-phase checklists
const phaseChecklists = {
  [PHASES.DISCUSS]: [
    { key: 'p1-connectors', label: 'Used proper connectors' },
    { key: 'p1-vocab', label: 'Used advanced vocabulary' },
    { key: 'p1-equal', label: 'Both candidates spoke equally' },
    { key: 'p1-turntaking', label: 'Good turn-taking (asked partner\'s opinion)' },
    { key: 'p1-points', label: 'Covered a reasonable number of points' },
    { key: 'p1-conclusion', label: 'Had a conclusion before time ran out' },
  ],
  [PHASES.DECIDE]: [
    { key: 'p2-connectors', label: 'Used proper connectors' },
    { key: 'p2-vocab', label: 'Used advanced vocabulary' },
    { key: 'p2-decision', label: 'Made a clear decision together' },
    { key: 'p2-conclusion', label: 'Concluded with "So, we both agree that..."' },
  ],
  [PHASES.OPINION]: [
    { key: 'p3-connectors', label: 'Used proper connectors' },
    { key: 'p3-vocab', label: 'Used advanced vocabulary' },
    { key: 'p3-equal', label: 'Both candidates contributed opinions' },
    { key: 'p3-elaborate', label: 'Gave examples to support opinions' },
    { key: 'p3-conclusion', label: 'Had a conclusion / final statement' },
  ],
}

export default function Part3Practice() {
  const { completed, markCompleted, pickRandom, resetCompleted } = useCompleted('part3')
  const [phase, setPhase] = useState(PHASES.IDLE)
  const [set, setSet] = useState(null)
  const [setIndex, setSetIndex] = useState(null)
  const [timerKey, setTimerKey] = useState(0)
  const [currentTurn, setCurrentTurn] = useState('A')
  const [checked, setChecked] = useState({})

  // Per-phase speaking time (resets each phase)
  const [phaseTimeA, setPhaseTimeA] = useState(0)
  const [phaseTimeB, setPhaseTimeB] = useState(0)
  // Total accumulated across all phases
  const [totalTimeA, setTotalTimeA] = useState(0)
  const [totalTimeB, setTotalTimeB] = useState(0)
  const speakInterval = useRef(null)

  const isDiscussion = phase === PHASES.DISCUSS || phase === PHASES.DECIDE || phase === PHASES.OPINION

  // Reset per-phase timers when phase changes
  useEffect(() => {
    setPhaseTimeA(0)
    setPhaseTimeB(0)
  }, [phase])

  // Count speaking time
  useEffect(() => {
    if (speakInterval.current) clearInterval(speakInterval.current)
    if (!isDiscussion) return

    speakInterval.current = setInterval(() => {
      if (currentTurn === 'A') {
        setPhaseTimeA((t) => t + 1)
        setTotalTimeA((t) => t + 1)
      } else {
        setPhaseTimeB((t) => t + 1)
        setTotalTimeB((t) => t + 1)
      }
    }, 1000)
    return () => { if (speakInterval.current) clearInterval(speakInterval.current) }
  }, [currentTurn, isDiscussion])

  const start = () => {
    const idx = pickRandom(part3Sets.length)
    setSetIndex(idx); setSet(part3Sets[idx])
    setPhase(PHASES.PREP); setTimerKey((k) => k + 1); setCurrentTurn('A'); setChecked({})
    setPhaseTimeA(0); setPhaseTimeB(0); setTotalTimeA(0); setTotalTimeB(0)
  }
  const advance = useCallback(() => {
    setPhase((prev) => {
      const i = phaseOrder.indexOf(prev)
      if (i < phaseOrder.length - 1) { setTimerKey((k) => k + 1); setCurrentTurn('A'); return phaseOrder[i + 1] }
      if (setIndex !== null) markCompleted(setIndex, part3Sets.length)
      return PHASES.DONE
    })
  }, [setIndex, markCompleted])
  const skip = () => advance()
  const switchTurn = () => setCurrentTurn((p) => (p === 'A' ? 'B' : 'A'))
  const toggleCheck = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  const reset = () => { setPhase(PHASES.IDLE); setSet(null); setSetIndex(null); setChecked({}); setTotalTimeA(0); setTotalTimeB(0) }

  const currentConfig = phaseConfig[phase]
  const currentPhaseIdx = phaseOrder.indexOf(phase)
  const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Part 3: Collaborative Task</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">20s prep → 2 min discuss → 1 min decide → 2 min opinion.</p>
        <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{completed.length}/{part3Sets.length} sets completed</p>
      </div>

      <div className="card p-6 flex flex-col items-center gap-5 animate-fade-in-scale">
        {phase === PHASES.IDLE && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">Practice the full collaborative flow with a partner. Open the Tips panel for techniques.</p>
            <button onClick={start} className="btn-primary bg-purple-600 hover:bg-purple-700">
              <Play size={18} /> Start
            </button>
            {completed.length > 0 && <button onClick={resetCompleted} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">Reset progress</button>}
          </>
        )}

        {phase !== PHASES.IDLE && phase !== PHASES.DONE && set && (
          <div className="w-full space-y-5 animate-fade-in">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {phaseLabels.map((label, i) => {
                const isActive = i === currentPhaseIdx
                const isDone = i < currentPhaseIdx
                return (
                  <div key={label} className="flex items-center gap-1.5">
                    {i > 0 && <div className={`w-4 h-0.5 rounded ${isDone ? 'bg-purple-400' : 'bg-stone-200 dark:bg-stone-600'}`} />}
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 shadow-sm' : isDone ? 'bg-stone-200 text-stone-500 dark:bg-stone-600 dark:text-stone-400' : 'bg-stone-100 text-stone-400 dark:bg-stone-700 dark:text-stone-500'}`}>
                      {label}
                    </span>
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

            <Timer key={timerKey} seconds={currentConfig.seconds} running={true} onComplete={advance} />

            <div className="flex gap-3 justify-center">
              <button onClick={skip} className="btn-secondary"><SkipForward size={16} /> Skip</button>
              <button onClick={reset} className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 px-3 py-2 transition-colors">Stop</button>
            </div>
          </div>
        )}

        {phase === PHASES.DONE && set && (
          <div className="w-full space-y-5 animate-fade-in">
            {/* Total speaking time summary */}
            <div className="flex gap-3 justify-center">
              <div className="text-center px-4 py-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Candidate A (total)</p>
                <p className="text-lg font-mono font-bold text-blue-700 dark:text-blue-300">{fmt(totalTimeA)}</p>
              </div>
              <div className="text-center px-4 py-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Candidate B (total)</p>
                <p className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-300">{fmt(totalTimeB)}</p>
              </div>
            </div>

            <ScoreScreen
              candidates={['A', 'B'].map((c) => ({
                name: `Candidate ${c}`,
                color: c === 'A' ? 'blue' : 'emerald',
                sections: [
                  { title: 'Phase 1: Discussion', items: phaseChecklists[PHASES.DISCUSS].map((item) => ({ key: `${c}-${item.key}`, label: item.label })) },
                  { title: 'Phase 2: Decision', items: phaseChecklists[PHASES.DECIDE].map((item) => ({ key: `${c}-${item.key}`, label: item.label })) },
                  { title: 'Phase 3: Opinion', items: phaseChecklists[PHASES.OPINION].map((item) => ({ key: `${c}-${item.key}`, label: item.label })) },
                ],
              }))}
              onNext={start}
              onDone={reset}
              nextLabel="Next Set"
            />
          </div>
        )}
      </div>

      <TipsPanel types={['part3', 'part3decide', 'connectors', 'vocab']} />
    </div>
  )
}
