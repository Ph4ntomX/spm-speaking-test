import { useState } from 'react'
import { Play } from 'lucide-react'
import TipsPanel from '../components/Tips'
import ScoreScreen from '../components/ScoreScreen'
import Part2Runner, { buildPart2Candidates } from '../components/runners/Part2Runner'
import { part2Sets } from '../data/prompts'
import { useCompleted } from '../hooks/useCompleted'

export default function Part2Practice() {
  const { completed, markCompleted, pickRandom, resetCompleted } = useCompleted('part2')
  const [state, setState] = useState('idle') // idle | running | done
  const [set, setSet] = useState(null)
  const [setIndex, setSetIndex] = useState(null)

  const start = () => {
    const idx = pickRandom(part2Sets.length)
    setSetIndex(idx); setSet(part2Sets[idx]); setState('running')
  }
  const finish = () => {
    if (setIndex !== null) markCompleted(setIndex, part2Sets.length)
    setState('done')
  }
  const reset = () => { setState('idle'); setSet(null); setSetIndex(null) }

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Part 2: Individual Long Turn</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Each candidate: 20s prep → 1 min talk.</p>
        <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{completed.length}/{part2Sets.length} sets completed</p>
      </div>

      <div className="card p-6 flex flex-col items-center gap-5 animate-fade-in-scale">
        {state === 'idle' && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">Each candidate gets their own topic with guiding prompts. Time yourself to build real exam confidence.</p>
            <button onClick={start} className="btn-primary bg-green-600 hover:bg-green-700"><Play size={18} /> Start</button>
            {completed.length > 0 && <button onClick={resetCompleted} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">Reset progress</button>}
          </>
        )}

        {state === 'running' && set && (
          <Part2Runner set={set} onComplete={finish} onStop={reset} />
        )}

        {state === 'done' && set && (
          <ScoreScreen candidates={buildPart2Candidates(set)} onNext={start} onDone={reset} nextLabel="Next Set" />
        )}
      </div>

      <TipsPanel types={['part2', 'connectors', 'vocab']} />
    </div>
  )
}
