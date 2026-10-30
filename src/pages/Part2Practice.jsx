import { useState } from 'react'
import { Play, ListFilter } from 'lucide-react'
import TipsPanel from '../components/Tips'
import ScoreScreen from '../components/ScoreScreen'
import SetListModal from '../components/SetListModal'
import Part2Runner, { buildPart2Candidates } from '../components/runners/Part2Runner'
import { part2Sets } from '../data/prompts'
import { useCompleted } from '../hooks/useCompleted'

export default function Part2Practice() {
  const {
    completed,
    markCompleted,
    toggleCompleted,
    markAllCompleted,
    resetCompleted,
    pickRandom,
  } = useCompleted('part2')

  const [state, setState] = useState('idle') // idle | running | done
  const [set, setSet] = useState(null)
  const [setIndex, setSetIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const start = () => {
    const idx = pickRandom(part2Sets.length)
    setSetIndex(idx)
    setSet(part2Sets[idx])
    setState('running')
  }

  const handleSelectSet = (idx) => {
    setSetIndex(idx)
    setSet(part2Sets[idx])
    setState('running')
  }

  const finish = () => {
    if (setIndex !== null) markCompleted(setIndex)
    setState('done')
  }

  const reset = () => {
    setState('idle')
    setSet(null)
    setSetIndex(null)
  }

  const pct = Math.round((completed.length / part2Sets.length) * 100)

  return (
    <div className="space-y-6">
      <div className="animate-fade-in flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Part 2: Individual Long Turn
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Each candidate: 20s prep → 1 min talk → 20s quick response.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 shrink-0"
        >
          <ListFilter size={15} />
          <span>Browse Sets ({completed.length}/{part2Sets.length})</span>
        </button>
      </div>

      <div className="card p-6 flex flex-col items-center gap-5 animate-fade-in-scale">
        {state === 'idle' && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">
              Each candidate gets their own topic with guiding prompts from 2026 state trial papers. Open the topic list to check off sets you've already completed.
            </p>

            {/* Progress summary bar */}
            <div className="w-full max-w-xs space-y-1.5 text-center">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Progress</span>
                <span>{completed.length} of {part2Sets.length} sets completed ({pct}%)</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="flex gap-3 flex-wrap justify-center mt-1">
              <button onClick={start} className="btn-primary bg-green-600 hover:bg-green-700">
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
          <Part2Runner
            set={set}
            onComplete={finish}
            onStop={reset}
          />
        )}

        {state === 'done' && set && (
          <ScoreScreen
            candidates={buildPart2Candidates(set)}
            onNext={start}
            onDone={reset}
            nextLabel="Next Set"
          />
        )}
      </div>

      <TipsPanel types={['part2', 'connectors', 'vocab']} />

      {/* Set Browser / Checklist Modal */}
      <SetListModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Part 2: 2026 Trial Sets"
        partKey="part2"
        sets={part2Sets}
        completed={completed}
        onToggleCompleted={toggleCompleted}
        onMarkAll={markAllCompleted}
        onResetCompleted={resetCompleted}
        onSelectSet={handleSelectSet}
      />
    </div>
  )
}
