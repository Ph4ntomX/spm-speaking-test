import { useState, useCallback } from 'react'
import { Play, SkipForward } from 'lucide-react'
import Timer from '../components/Timer'
import TipsPanel from '../components/Tips'
import ScoreScreen from '../components/ScoreScreen'
import { part2Sets } from '../data/prompts'
import { useCompleted } from '../hooks/useCompleted'

const PHASES = {
  IDLE: 'idle', PREP_A: 'prep_a', SPEAK_A: 'speak_a',
  PREP_B: 'prep_b', SPEAK_B: 'speak_b', DONE: 'done',
}
const phaseConfig = {
  [PHASES.PREP_A]: { seconds: 20, label: 'Candidate A — Preparation', candidate: 'A' },
  [PHASES.SPEAK_A]: { seconds: 60, label: 'Candidate A — Speaking', candidate: 'A' },
  [PHASES.PREP_B]: { seconds: 20, label: 'Candidate B — Preparation', candidate: 'B' },
  [PHASES.SPEAK_B]: { seconds: 60, label: 'Candidate B — Speaking', candidate: 'B' },
}
const phaseOrder = [PHASES.PREP_A, PHASES.SPEAK_A, PHASES.PREP_B, PHASES.SPEAK_B]

export default function Part2Practice() {
  const { completed, markCompleted, pickRandom, resetCompleted } = useCompleted('part2')
  const [phase, setPhase] = useState(PHASES.IDLE)
  const [set, setSet] = useState(null)
  const [setIndex, setSetIndex] = useState(null)
  const [timerKey, setTimerKey] = useState(0)
  const [checked, setChecked] = useState({})

  const start = () => {
    const idx = pickRandom(part2Sets.length)
    setSetIndex(idx); setSet(part2Sets[idx])
    setPhase(PHASES.PREP_A); setTimerKey((k) => k + 1); setChecked({})
  }
  const advance = useCallback(() => {
    setPhase((prev) => {
      const i = phaseOrder.indexOf(prev)
      if (i < phaseOrder.length - 1) { setTimerKey((k) => k + 1); return phaseOrder[i + 1] }
      if (setIndex !== null) markCompleted(setIndex, part2Sets.length)
      return PHASES.DONE
    })
  }, [setIndex, markCompleted])
  const skip = () => advance()
  const reset = () => { setPhase(PHASES.IDLE); setSet(null); setSetIndex(null) }

  const currentConfig = phaseConfig[phase]
  const currentPhaseIdx = phaseOrder.indexOf(phase)
  const activeCandidate = currentConfig?.candidate
  const activeTopic = activeCandidate === 'A' ? set?.a : set?.b

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Part 2: Individual Long Turn</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Each candidate: 20s prep → 1 min talk.</p>
        <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{completed.length}/{part2Sets.length} sets completed</p>
      </div>

      <div className="card p-6 flex flex-col items-center gap-5 animate-fade-in-scale">
        {phase === PHASES.IDLE && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">Each candidate gets their own topic with guiding prompts. Time yourself to build real exam confidence.</p>
            <button onClick={start} className="btn-primary bg-green-600 hover:bg-green-700">
              <Play size={18} /> Start
            </button>
            {completed.length > 0 && <button onClick={resetCompleted} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">Reset progress</button>}
          </>
        )}

        {phase !== PHASES.IDLE && phase !== PHASES.DONE && set && (
          <div className="w-full space-y-5 animate-fade-in">
            {/* Phase steps */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {phaseOrder.map((p, i) => {
                const isActive = i === currentPhaseIdx
                const isDone = i < currentPhaseIdx
                const labels = ['A Prep', 'A Speak', 'B Prep', 'B Speak']
                return (
                  <div key={p} className="flex items-center gap-1.5">
                    {i > 0 && <div className={`w-4 h-0.5 rounded ${isDone ? 'bg-green-400' : 'bg-stone-200 dark:bg-stone-600'}`} />}
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 shadow-sm' : isDone ? 'bg-stone-200 text-stone-500 dark:bg-stone-600 dark:text-stone-400' : 'bg-stone-100 text-stone-400 dark:bg-stone-700 dark:text-stone-500'}`}>
                      {labels[i]}
                    </span>
                  </div>
                )
              })}
            </div>

            <p className="text-xs text-stone-400 dark:text-stone-500 text-center">{set.state}</p>

            {/* Active candidate */}
            <div className={`rounded-xl p-5 border-2 transition-all duration-300 ${activeCandidate === 'A' ? 'border-blue-300 bg-blue-50/80 dark:bg-blue-950/20 dark:border-blue-800' : 'border-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/20 dark:border-emerald-800'}`}>
              <p className={`text-xs font-bold mb-1 uppercase tracking-wide ${activeCandidate === 'A' ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>Candidate {activeCandidate}</p>
              <p className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-lg mb-3">{activeTopic?.topic}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">You should say:</p>
              <ul className="space-y-1.5">
                {activeTopic?.prompts.map((prompt, i) => (
                  <li key={i} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-5 h-5 shrink-0 rounded-full bg-stone-200 dark:bg-stone-600 text-stone-600 dark:text-stone-300 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                    {prompt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Other candidate dimmed */}
            <div className="rounded-lg p-3 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 opacity-50">
              <p className="text-xs font-bold text-stone-500 dark:text-stone-400">Candidate {activeCandidate === 'A' ? 'B' : 'A'}</p>
              <p className="text-sm text-stone-600 dark:text-stone-400">{(activeCandidate === 'A' ? set.b : set.a)?.topic}</p>
            </div>

            <p className="text-sm font-medium text-stone-700 dark:text-stone-300 text-center">{currentConfig.label}</p>
            <Timer key={timerKey} seconds={currentConfig.seconds} running={true} onComplete={advance} />

            <div className="flex gap-3 justify-center">
              <button onClick={skip} className="btn-secondary"><SkipForward size={16} /> Skip</button>
              <button onClick={reset} className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 px-3 py-2 transition-colors">Stop</button>
            </div>
          </div>
        )}

        {phase === PHASES.DONE && set && (
          <ScoreScreen
            candidates={['A', 'B'].map((c) => {
              const topic = c === 'A' ? set.a : set.b
              return {
                name: `Candidate ${c}`,
                color: c === 'A' ? 'blue' : 'emerald',
                sections: [{
                  title: topic.topic,
                  items: [
                    ...topic.prompts.map((p, i) => ({ key: `${c}-${i}`, label: p })),
                    { key: `${c}-conn`, label: 'Used proper connectors' },
                    { key: `${c}-vocab`, label: 'Used advanced vocabulary' },
                    { key: `${c}-full`, label: 'Spoke for the full 1 minute' },
                  ],
                }],
              }
            })}
            onNext={start}
            onDone={reset}
            nextLabel="Next Set"
          />
        )}
      </div>

      {/* Tips panel — always accessible */}
      <TipsPanel types={['part2', 'connectors', 'vocab']} />
    </div>
  )
}
