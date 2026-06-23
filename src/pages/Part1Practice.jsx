import { useState, useCallback } from 'react'
import { Play, SkipForward, RotateCcw } from 'lucide-react'
import Timer from '../components/Timer'
import { part1IntroQuestion, part1TopicQuestions } from '../data/prompts'

/**
 * Part 1: Individual Short Turn
 * Both candidates get asked:
 *   Q1: "What's your name and where do you come from?" (1 min)
 *   Q2: A random topic question (1 min)
 * Flow: A-Q1 → B-Q1 → A-Q2 → B-Q2
 */
const PHASES = {
  IDLE: 'idle',
  A_Q1: 'a_q1', A_Q2: 'a_q2',
  B_Q1: 'b_q1', B_Q2: 'b_q2',
  DONE: 'done',
}
const phaseOrder = [PHASES.A_Q1, PHASES.B_Q1, PHASES.A_Q2, PHASES.B_Q2]

function pickTwo() {
  const shuffled = [...part1TopicQuestions].sort(() => Math.random() - 0.5)
  return { a: shuffled[0], b: shuffled[1] }
}

export default function Part1Practice() {
  const [phase, setPhase] = useState(PHASES.IDLE)
  const [topicQs, setTopicQs] = useState({ a: '', b: '' })
  const [timerKey, setTimerKey] = useState(0)

  const start = () => {
    setTopicQs(pickTwo())
    setPhase(PHASES.A_Q1)
    setTimerKey((k) => k + 1)
  }

  const advance = useCallback(() => {
    setPhase((prev) => {
      const i = phaseOrder.indexOf(prev)
      if (i < phaseOrder.length - 1) {
        setTimerKey((k) => k + 1)
        return phaseOrder[i + 1]
      }
      return PHASES.DONE
    })
  }, [])

  const skip = () => advance()
  const reset = () => { setPhase(PHASES.IDLE); setTopicQs({ a: '', b: '' }) }

  const getPhaseInfo = () => {
    switch (phase) {
      case PHASES.A_Q1: return { candidate: 'A', question: part1IntroQuestion, label: 'Introduction', seconds: 20 }
      case PHASES.A_Q2: return { candidate: 'A', question: topicQs.a, label: 'Topic Question', seconds: 35 }
      case PHASES.B_Q1: return { candidate: 'B', question: part1IntroQuestion, label: 'Introduction', seconds: 20 }
      case PHASES.B_Q2: return { candidate: 'B', question: topicQs.b, label: 'Topic Question', seconds: 35 }
      default: return null
    }
  }

  const info = getPhaseInfo()
  const currentIdx = phaseOrder.indexOf(phase)

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Part 1: Individual Short Turn</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Both candidates are interviewed — intro (20s) + topic question (35s).</p>
      </div>

      <div className="card p-6 flex flex-col items-center gap-6 animate-fade-in-scale">
        {phase === PHASES.IDLE && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">
              Each candidate gets 2 questions: an introduction (20s) and a topic question (35s).
            </p>
            <button onClick={start} className="btn-primary">
              <Play size={18} /> Start
            </button>
          </>
        )}

        {info && (
          <div className="w-full flex flex-col items-center gap-5 animate-fade-in">
            {/* Step indicator */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {['A: Intro', 'B: Intro', 'A: Topic', 'B: Topic'].map((label, i) => {
                const isActive = i === currentIdx
                const isDone = i < currentIdx
                return (
                  <div key={label} className="flex items-center gap-1.5">
                    {i > 0 && <div className={`w-4 h-0.5 rounded ${isDone ? 'bg-blue-400' : 'bg-stone-200 dark:bg-stone-600'}`} />}
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${isActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 shadow-sm' : isDone ? 'bg-stone-200 text-stone-500 dark:bg-stone-600 dark:text-stone-400' : 'bg-stone-100 text-stone-400 dark:bg-stone-700 dark:text-stone-500'}`}>
                      {label}
                    </span>
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

            <Timer key={timerKey} seconds={info.seconds} running={true} onComplete={advance} />

            <div className="flex gap-3">
              <button onClick={skip} className="btn-secondary">
                <SkipForward size={16} /> Skip
              </button>
              <button onClick={reset} className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 px-3 py-2 transition-colors">Stop</button>
            </div>
          </div>
        )}

        {phase === PHASES.DONE && (
          <div className="animate-fade-in text-center space-y-4">
            <p className="text-green-700 dark:text-green-400 font-semibold text-lg">✅ Part 1 complete!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={start} className="btn-primary">
                <Play size={16} /> Again
              </button>
              <button onClick={reset} className="btn-secondary">
                <RotateCcw size={16} /> Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
