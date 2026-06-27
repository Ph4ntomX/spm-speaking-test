import { useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { RefreshCw, X, Check } from 'lucide-react'

/**
 * Shows a toast when the app is ready to work offline, or when an update is available.
 */
export default function PWAPrompt() {
  const [dismissed, setDismissed] = useState(false)

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
    setDismissed(true)
  }

  if (dismissed || (!offlineReady && !needRefresh)) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-lg p-4 animate-fade-in">
      {needRefresh ? (
        <>
          <div className="flex items-start gap-2.5">
            <RefreshCw size={18} className="text-indigo-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Update available</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">A new version is ready.</p>
            </div>
            <button onClick={close} className="text-stone-400 hover:text-stone-600"><X size={16} /></button>
          </div>
          <button
            onClick={() => updateServiceWorker(true)}
            className="mt-3 w-full px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors"
          >
            Reload to update
          </button>
        </>
      ) : (
        <div className="flex items-start gap-2.5">
          <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100">Ready to use offline</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">You can now practice without internet.</p>
          </div>
          <button onClick={close} className="text-stone-400 hover:text-stone-600"><X size={16} /></button>
        </div>
      )}
    </div>
  )
}
