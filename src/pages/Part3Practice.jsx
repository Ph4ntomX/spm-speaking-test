import { useState } from 'react'
import { Play } from 'lucide-react'
import TipsPanel from '../components/Tips'
import ScoreScreen from '../components/ScoreScreen'
import SpeakTimeSummary from '../components/SpeakTimeSummary'
import Part3Runner, { buildPart3Candidates } from '../components/runners/Part3Runner'
import { part3Sets } from '../data/prompts'
import { useCompleted } from '../hooks/useCompleted'

export default function Part3Practice() {
  const { completed, markCompleted, pickRandom, resetCompleted } = useCompleted('part3')
  const [state, setState] = useState('idle') // idle | running | done
  const [set, setSet] = useState(null)
  const [setIndex, setSetIndex] = useState(null)
  const [times, setTimes] = useState({ totalA: 0, totalB: 0 })

  const start = () => {
    const idx = pickRandom(part3Sets.length)
    setSetIndex(idx); setSet(part3Sets[idx]); setState('running')
  }
  const finish = (result) => {
    if (setIndex !== null) markCompleted(setIndex, part3Sets.length)
    setTimes(result || { totalA: 0, totalB: 0 })
    setState('done')
  }
  const reset = () => { setState('idle'); setSet(null); setSetIndex(null) }

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Part 3: Collaborative Task</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">20s prep → 2 min discuss → 1 min decide → 2 min opinion.</p>
        <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{completed.length}/{part3Sets.length} sets completed</p>
      </div>

      <div className="card p-6 flex flex-col items-center gap-5 animate-fade-in-scale">
        {state === 'idle' && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">Practice the full collaborative flow with a partner. Open the Tips panel for techniques.</p>
            <button onClick={start} className="btn-primary bg-purple-600 hover:bg-purple-700"><Play size={18} /> Start</button>
            {completed.length > 0 && <button onClick={resetCompleted} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">Reset progress</button>}
          </>
        )}

        {state === 'running' && set && (
          <Part3Runner set={set} onComplete={finish} onStop={reset} />
        )}

        {state === 'done' && set && (
          <div className="w-full space-y-5 animate-fade-in">
            <SpeakTimeSummary totalA={times.totalA} totalB={times.totalB} />
            <ScoreScreen candidates={buildPart3Candidates()} onNext={start} onDone={reset} nextLabel="Next Set" />
          </div>
        )}
      </div>

      <TipsPanel types={['part3', 'part3decide', 'connectors', 'vocab']} />
    </div>
  )
}
