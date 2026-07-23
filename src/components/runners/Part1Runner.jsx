import { useState, useCallback } from 'react'
import { SkipForward } from 'lucide-react'
import Timer from '../Timer'
import { part1IntroQuestion, part1TopicQuestions } from '../../data/prompts'
import { useSfx } from '../../hooks/useSfx'

/**
 * Part 1 active practice flow.
 * Flow: A intro (20s) → B intro (20s) → A topic (35s) → B topic (35s)
 * Renders the inner card content only. Parent provides the card wrapper.
 */
const PHASES = { A_Q1: 'a_q1', B_Q1: 'b_q1', A_Q2: 'a_q2', B_Q2: 'b_q2' }
const phaseOrder = [PHASES.A_Q1, PHASES.B_Q1, PHASES.A_Q2, PHASES.B_Q2]
const stepLabels = ['A: Intro', 'B: Intro', 'A: Topic', 'B: Topic']

export function pickPart1Topics() {
  const shuffled = [...part1TopicQuestions].sort(() => Math.random() - 0.5)
  return { a: shuffled[0], b: shuffled[1] }
}

export default function Part1Runner({ topics, onComplete, onStop }) {
  const { playTransition } = useSfx()
  const [phase, setPhase] = useState(PHASES.A_Q1)
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

  const getInfo = () => {
    switch (phase) {
      case PHASES.A_Q1: return { candidate: 'A', question: part1IntroQuestion, label: 'Introduction', seconds: 20 }
      case PHASES.B_Q1: return { candidate: 'B', question: part1IntroQuestion, label: 'Introduction', seconds: 20 }
      case PHASES.A_Q2: return { candidate: 'A', question: topics.a, label: 'Topic Question', seconds: 35 }
      case PHASES.B_Q2: return { candidate: 'B', question: topics.b, label: 'Topic Question', seconds: 35 }
      default: return null
    }
  }

  const info = getInfo()
  const currentIdx = phaseOrder.indexOf(phase)
  if (!info) return null

  return (
    <div className="w-full flex flex-col items-center gap-5 animate-fade-in">
      {/* Step indicator — clickable */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {stepLabels.map((label, i) => {
          const isActive = i === currentIdx
          const isDone = i < currentIdx
          return (
            <div key={label} className="flex items-center gap-1.5">
              {i > 0 && <div className={`w-4 h-0.5 rounded ${isDone ? 'bg-blue-400' : 'bg-stone-200 dark:bg-stone-600'}`} />}
              <button
                onClick={() => { setPhase(phaseOrder[i]); setTimerKey((k) => k + 1) }}
                className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-blue-300 ${isActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 shadow-sm' : isDone ? 'bg-stone-200 text-stone-500 dark:bg-stone-600 dark:text-stone-400' : 'bg-stone-100 text-stone-400 dark:bg-stone-700 dark:text-stone-500'}`}
              >
                {label}
              </button>
            </div>
          )
        })}
      </div>

      {/* Candidate indicator */}
      <div className={`px-3 py-1 rounded-full text-xs font-bold ${info.candidate === 'A' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'}`}>
        🎤 Candidate {info.candidate} — {info.label}
      </div>

      {/* Question */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-5 w-full text-center">
        <p className="text-xl font-serif font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">{info.question}</p>
      </div>

      <Timer key={timerKey} seconds={info.seconds} buffer={2} onComplete={advance} />

      <div className="flex gap-3">
        <button onClick={advance} className="btn-secondary"><SkipForward size={16} /> Skip</button>
        <button onClick={onStop} className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 px-3 py-2 transition-colors">Stop</button>
      </div>
    </div>
  )
}
