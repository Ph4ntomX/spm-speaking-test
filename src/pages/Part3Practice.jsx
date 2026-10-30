import { useState } from 'react'
import { Play, ListFilter } from 'lucide-react'
import TipsPanel from '../components/Tips'
import ScoreScreen from '../components/ScoreScreen'
import SpeakTimeSummary from '../components/SpeakTimeSummary'
import SetListModal from '../components/SetListModal'
import Part3Runner, { buildPart3Candidates } from '../components/runners/Part3Runner'
import { part3Sets } from '../data/prompts'
import { useCompleted } from '../hooks/useCompleted'

export default function Part3Practice() {
  const {
    completed,
    markCompleted,
    toggleCompleted,
    markAllCompleted,
    resetCompleted,
    pickRandom,
  } = useCompleted('part3')

  const [state, setState] = useState('idle') // idle | running | done
  const [set, setSet] = useState(null)
  const [setIndex, setSetIndex] = useState(null)
  const [times, setTimes] = useState({ totalA: 0, totalB: 0 })
  const [showModal, setShowModal] = useState(false)

  const start = () => {
    const idx = pickRandom(part3Sets.length)
    setSetIndex(idx)
    setSet(part3Sets[idx])
    setState('running')
  }

  const handleSelectSet = (idx) => {
    setSetIndex(idx)
    setSet(part3Sets[idx])
    setState('running')
  }

  const finish = (result) => {
    if (setIndex !== null) markCompleted(setIndex)
    setTimes(result || { totalA: 0, totalB: 0 })
    setState('done')
  }

  const reset = () => {
    setState('idle')
    setSet(null)
    setSetIndex(null)
  }

  const pct = Math.round((completed.length / part3Sets.length) * 100)

  return (
    <div className="space-y-6">
      <div className="animate-fade-in flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Part 3: Collaborative Task
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            20s prep → 2 min discuss → 1 min decide → 2 min opinion.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 shrink-0"
        >
          <ListFilter size={15} />
          <span>Browse Sets ({completed.length}/{part3Sets.length})</span>
        </button>
      </div>

      <div className="card p-6 flex flex-col items-center gap-5 animate-fade-in-scale">
        {state === 'idle' && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">
              Practice the full collaborative flow with a partner using 2026 state trial sets. Open the topic list to check off sets you've already completed.
            </p>

            {/* Progress summary bar */}
            <div className="w-full max-w-xs space-y-1.5 text-center">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Progress</span>
                <span>{completed.length} of {part3Sets.length} sets completed ({pct}%)</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="flex gap-3 flex-wrap justify-center mt-1">
              <button onClick={start} className="btn-primary bg-purple-600 hover:bg-purple-700">
                <Play size={18} /> Start Random
              </button>
              <button onClick={() => setShowModal(true)} className="btn-secondary">
                <ListFilter size={18} /> Check Off Sets
              </button>
            </div>

            {completed.length > 0 && (
              <button
                onClick={resetCompleted}
                className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors mt-1"
              >
                Reset progress
              </button>
            )}
          </>
        )}

        {state === 'running' && set && (
          <Part3Runner
            set={set}
            onComplete={finish}
            onStop={reset}
          />
        )}

        {state === 'done' && set && (
          <div className="w-full space-y-5 animate-fade-in">
            <SpeakTimeSummary totalA={times.totalA} totalB={times.totalB} />
            <ScoreScreen
              candidates={buildPart3Candidates()}
              onNext={start}
              onDone={reset}
              nextLabel="Next Set"
            />
          </div>
        )}
      </div>

      <TipsPanel types={['part3', 'part3decide', 'connectors', 'vocab']} />

      {/* Set Browser / Checklist Modal */}
      <SetListModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Part 3: 2026 Trial Sets"
        partKey="part3"
        sets={part3Sets}
        completed={completed}
        onToggleCompleted={toggleCompleted}
        onMarkAll={markAllCompleted}
        onResetCompleted={resetCompleted}
        onSelectSet={handleSelectSet}
      />
    </div>
  )
}
