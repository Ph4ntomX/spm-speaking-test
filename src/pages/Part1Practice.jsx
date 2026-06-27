import { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import Part1Runner, { pickPart1Topics } from '../components/runners/Part1Runner'

export default function Part1Practice() {
  const [state, setState] = useState('idle') // idle | running | done
  const [topics, setTopics] = useState({ a: '', b: '' })

  const start = () => { setTopics(pickPart1Topics()); setState('running') }
  const reset = () => setState('idle')

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Part 1: Individual Short Turn</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Both candidates are interviewed — intro (20s) + topic question (35s).</p>
      </div>

      <div className="card p-6 flex flex-col items-center gap-6 animate-fade-in-scale">
        {state === 'idle' && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">
              Each candidate gets 2 questions: an introduction (20s) and a topic question (35s).
            </p>
            <button onClick={start} className="btn-primary"><Play size={18} /> Start</button>
          </>
        )}

        {state === 'running' && (
          <Part1Runner topics={topics} onComplete={() => setState('done')} onStop={reset} />
        )}

        {state === 'done' && (
          <div className="animate-fade-in text-center space-y-4">
            <p className="text-green-700 dark:text-green-400 font-semibold text-lg">✅ Part 1 complete!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={start} className="btn-primary"><Play size={16} /> Again</button>
              <button onClick={reset} className="btn-secondary"><RotateCcw size={16} /> Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
