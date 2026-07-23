import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

/**
 * A "Stop" button that shows a confirmation before actually resetting.
 */
export default function ConfirmReset({ onConfirm }) {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <div className="flex items-center gap-2 animate-fade-in">
        <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
          <AlertTriangle size={12} /> Sure?
        </span>
        <button
          onClick={() => { setConfirming(false); onConfirm() }}
          className="text-xs font-medium px-2.5 py-1 rounded-md bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
        >
          Yes, stop
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs font-medium px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 px-3 py-2 transition-colors"
    >
      Stop
    </button>
  )
}
