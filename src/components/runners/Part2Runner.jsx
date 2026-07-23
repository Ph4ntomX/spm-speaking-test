import { useState, useCallback } from 'react'
import { SkipForward } from 'lucide-react'
import Timer from '../Timer'
import { useSfx } from '../../hooks/useSfx'

/**
 * Part 2 active practice flow.
 * Flow: A prep (20s) → A speak (60s) → B prep (20s) → B speak (60s)
 */
const PHASES = { PREP_A: 'prep_a', SPEAK_A: 'speak_a', PREP_B: 'prep_b', SPEAK_B: 'speak_b' }
const phaseConfig = {
  [PHASES.PREP_A]: { seconds: 20, label: 'Candidate A — Preparation', candidate: 'A' },
  [PHASES.SPEAK_A]: { seconds: 60, label: 'Candidate A — Speaking', candidate: 'A' },
  [PHASES.PREP_B]: { seconds: 20, label: 'Candidate B — Preparation', candidate: 'B' },
  [PHASES.SPEAK_B]: { seconds: 60, label: 'Candidate B — Speaking', candidate: 'B' },
}
const phaseOrder = [PHASES.PREP_A, PHASES.SPEAK_A, PHASES.PREP_B, PHASES.SPEAK_B]
const stepLabels = ['A Prep', 'A Speak', 'B Prep', 'B Speak']

/** Build the per-candidate score sections for a Part 2 set. */
export function buildPart2Candidates(set) {
  return ['A', 'B'].map((c) => {
    const topic = c === 'A' ? set.a : set.b
    return {
      name: `Candidate ${c}`,
      color: c === 'A' ? 'blue' : 'emerald',
      sections: [{
        title: `Part 2 — ${topic.topic}`,
        items: [
          ...topic.prompts.map((p, i) => ({ key: `p2-${c}-${i}`, label: p })),
          { key: `p2-${c}-conn`, label: 'Used proper connectors' },
          { key: `p2-${c}-vocab`, label: 'Used advanced vocabulary' },
          { key: `p2-${c}-full`, label: 'Spoke for the full 1 minute' },
        ],
      }],
    }
  })
}

export default function Part2Runner({ set, onComplete, onStop }) {
  const { playTransition } = useSfx()
  const [phase, setPhase] = useState(PHASES.PREP_A)
  const [timerKey, setTimerKey] = useState(0)

  const advance = useCallback(() => {
    playTransition()
    setPhase((prev) => {
      const i = phaseOrder.indexOf(prev)
      if (i < phaseOrder.length - 1) {
        setTimerKey((k) => k + 1)
        return phaseOrder[i + 1]
      }
      onComplete?.()
      return prev
    })
  }, [playTransition, onComplete])

  const currentConfig = phaseConfig[phase]
  const currentPhaseIdx = phaseOrder.indexOf(phase)
  const activeCandidate = currentConfig.candidate
  const activeTopic = activeCandidate === 'A' ? set.a : set.b

  return (
    <div className="w-full space-y-5 animate-fade-in">
      {/* Phase steps — clickable */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {phaseOrder.map((p, i) => {
          const isActive = i === currentPhaseIdx
          const isDone = i < currentPhaseIdx
          return (
            <div key={p} className="flex items-center gap-1.5">
              {i > 0 && <div className={`w-4 h-0.5 rounded ${isDone ? 'bg-green-400' : 'bg-stone-200 dark:bg-stone-600'}`} />}
              <button
                onClick={() => { setPhase(p); setTimerKey((k) => k + 1) }}
                className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-green-300 ${isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 shadow-sm' : isDone ? 'bg-stone-200 text-stone-500 dark:bg-stone-600 dark:text-stone-400' : 'bg-stone-100 text-stone-400 dark:bg-stone-700 dark:text-stone-500'}`}
              >
                {stepLabels[i]}
              </button>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-stone-400 dark:text-stone-500 text-center">{set.state}</p>

      {/* Active candidate */}
      <div className={`rounded-xl p-5 border-2 transition-all duration-300 ${activeCandidate === 'A' ? 'border-blue-300 bg-blue-50/80 dark:bg-blue-950/20 dark:border-blue-800' : 'border-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/20 dark:border-emerald-800'}`}>
        <p className={`text-xs font-bold mb-1 uppercase tracking-wide ${activeCandidate === 'A' ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>Candidate {activeCandidate}</p>
        <p className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-lg mb-3">{activeTopic.topic}</p>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">You should say:</p>
        <ul className="space-y-1.5">
          {activeTopic.prompts.map((prompt, i) => (
            <li key={i} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2.5 leading-relaxed">
              <span className="w-5 h-5 shrink-0 rounded-full bg-stone-200 dark:bg-stone-600 text-stone-600 dark:text-stone-300 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
              {prompt}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm font-medium text-stone-700 dark:text-stone-300 text-center">{currentConfig.label}</p>
      <Timer key={timerKey} seconds={currentConfig.seconds} onComplete={advance} />

      <div className="flex gap-3 justify-center">
        <button onClick={advance} className="btn-secondary"><SkipForward size={16} /> Skip</button>
        <button onClick={onStop} className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 px-3 py-2 transition-colors">Stop</button>
      </div>
    </div>
  )
}
