import { useState } from 'react'
import { Play } from 'lucide-react'
import TipsPanel from '../components/Tips'
import ScoreScreen from '../components/ScoreScreen'
import SpeakTimeSummary, { mergeCandidates } from '../components/SpeakTimeSummary'
import Part1Runner, { pickPart1Topics } from '../components/runners/Part1Runner'
import Part2Runner, { buildPart2Candidates } from '../components/runners/Part2Runner'
import Part3Runner, { buildPart3Candidates } from '../components/runners/Part3Runner'
import { part2Sets, part3Sets } from '../data/prompts'
import { useCompleted } from '../hooks/useCompleted'

const STAGES = ['part1', 'part2', 'part3']
const stageLabels = { part1: 'Part 1', part2: 'Part 2', part3: 'Part 3' }

export default function FullPractice() {
  const { markCompleted: markP2 } = useCompleted('part2')
  const { markCompleted: markP3 } = useCompleted('part3')
  const [stage, setStage] = useState('idle') // idle | part1 | part2 | part3 | done
  const [topics, setTopics] = useState({ a: '', b: '' })
  const [p2, setP2] = useState({ set: null, idx: null })
  const [p3, setP3] = useState({ set: null, idx: null })
  const [times, setTimes] = useState({ totalA: 0, totalB: 0 })

  const start = () => {
    setTopics(pickPart1Topics())
    const i2 = Math.floor(Math.random() * part2Sets.length)
    const i3 = Math.floor(Math.random() * part3Sets.length)
    setP2({ set: part2Sets[i2], idx: i2 })
    setP3({ set: part3Sets[i3], idx: i3 })
    setStage('part1')
  }

  const finishPart3 = (result) => {
    if (p2.idx !== null) markP2(p2.idx, part2Sets.length)
    if (p3.idx !== null) markP3(p3.idx, part3Sets.length)
    setTimes(result || { totalA: 0, totalB: 0 })
    setStage('done')
  }

  const reset = () => { setStage('idle'); setP2({ set: null, idx: null }); setP3({ set: null, idx: null }) }

  const combinedCandidates = p2.set
    ? mergeCandidates(buildPart2Candidates(p2.set), buildPart3Candidates())
    : buildPart3Candidates()

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Full Practice</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Complete mock: Part 1 → Part 2 → Part 3.</p>
      </div>

      {/* Stage indicator */}
      {stage !== 'idle' && stage !== 'done' && (
        <div className="flex items-center gap-1.5 justify-center animate-fade-in">
          {STAGES.map((s, i) => {
            const isActive = s === stage
            const isDone = STAGES.indexOf(stage) > i
            return (
              <div key={s} className="flex items-center gap-1.5">
                {i > 0 && <div className={`w-5 h-0.5 rounded ${isDone ? 'bg-indigo-400' : 'bg-stone-200 dark:bg-stone-600'}`} />}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isActive ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 shadow-sm' : isDone ? 'bg-stone-200 text-stone-500 dark:bg-stone-600 dark:text-stone-400' : 'bg-stone-100 text-stone-400 dark:bg-stone-700 dark:text-stone-500'}`}>
                  {stageLabels[s]}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <div className="card p-6 flex flex-col items-center gap-5 animate-fade-in-scale">
        {stage === 'idle' && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">
              Run through the entire speaking test in one go. Sets completed here count toward Part 2 and Part 3 progress.
            </p>
            <button onClick={start} className="btn-primary bg-indigo-600 hover:bg-indigo-700"><Play size={18} /> Start Full Practice</button>
          </>
        )}

        {stage === 'part1' && (
          <Part1Runner topics={topics} onComplete={() => setStage('part2')} onStop={reset} />
        )}

        {stage === 'part2' && p2.set && (
          <Part2Runner set={p2.set} onComplete={() => setStage('part3')} onStop={reset} />
        )}

        {stage === 'part3' && p3.set && (
          <Part3Runner set={p3.set} onComplete={finishPart3} onStop={reset} />
        )}

        {stage === 'done' && (
          <div className="w-full space-y-5 animate-fade-in">
            <div className="text-center">
              <p className="text-3xl">🎉</p>
              <p className="text-green-700 dark:text-green-400 font-serif font-semibold text-xl mt-2">Full practice complete!</p>
            </div>
            <SpeakTimeSummary totalA={times.totalA} totalB={times.totalB} />
            <ScoreScreen candidates={combinedCandidates} onNext={start} onDone={reset} nextLabel="Again" />
          </div>
        )}
      </div>

      <TipsPanel types={['part2', 'part3', 'part3decide', 'connectors', 'vocab']} />
    </div>
  )
}
