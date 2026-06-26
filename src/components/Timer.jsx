import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { useSfx } from '../hooks/useSfx'

/**
 * Simple, reliable Timer.
 * - 5s buffer ("Get ready...") before main countdown.
 * - Pause/Resume via a ref (instant, no re-render lag).
 * - Reset button with confirmation.
 * - Parent controls via key={n} to remount, seconds for duration, onComplete callback.
 *
 * SYNC MODEL:
 * - Single setInterval(1000ms) created on mount, cleared on unmount.
 * - Pause is checked inside the interval callback via ref (no effect re-run needed).
 * - All state is derived from a single "totalTicks" counter.
 */
const BUFFER_SECONDS = 5

export default function Timer({ seconds, onComplete, onPauseChange, onReset }) {
  const totalTicks = BUFFER_SECONDS + seconds
  const [tick, setTick] = useState(0) // counts UP from 0 to totalTicks
  const [paused, setPaused] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const pausedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  const intervalRef = useRef(null)

  // Keep onComplete ref fresh without restarting interval
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  // Single interval — created once on mount, cleaned on unmount
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return // skip this tick, interval stays alive
      setTick((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  // Derive values from tick
  const isBuffering = tick < BUFFER_SECONDS
  const elapsed = Math.max(0, tick - BUFFER_SECONDS)
  const remaining = Math.max(0, seconds - elapsed)
  const bufferDisplay = BUFFER_SECONDS - tick

  // Sound effects + completion
  const { playWarning, playTimeUp, playTap } = useSfx()
  const warnedRef = useRef(false)
  const completedRef = useRef(false)

  useEffect(() => {
    if (isBuffering || completedRef.current) return
    if (remaining === 5 && !warnedRef.current) {
      warnedRef.current = true
      playWarning()
    }
    if (remaining === 0 && !completedRef.current) {
      completedRef.current = true
      playTimeUp()
      clearInterval(intervalRef.current)
      onCompleteRef.current?.()
    }
  }, [remaining, isBuffering, playWarning, playTimeUp])

  const togglePause = () => {
    playTap()
    pausedRef.current = !pausedRef.current
    setPaused(pausedRef.current)
    onPauseChange?.(pausedRef.current)
  }

  const handleReset = () => {
    if (!confirmReset) { setConfirmReset(true); return }
    setConfirmReset(false)
    setTick(0)
    pausedRef.current = false
    setPaused(false)
    warnedRef.current = false
    completedRef.current = false
    onPauseChange?.(false)
    onReset?.()
    // Restart interval
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return
      setTick((prev) => prev + 1)
    }, 1000)
  }

  const cancelReset = () => setConfirmReset(false)

  // Visual
  const isLow = !isBuffering && remaining <= 5 && remaining > 0
  const progress = seconds > 0 ? remaining / seconds : 0
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = isBuffering ? circumference : circumference * (1 - progress)
  const minutes = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" className="text-stone-200 dark:text-stone-700" strokeWidth="6" />
          <circle cx="60" cy="60" r={radius} fill="none"
            stroke={isBuffering ? '#a78bfa' : isLow ? '#dc2626' : '#4c6ef5'}
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${isLow ? 'animate-pulse' : ''}`}>
          {isBuffering ? (
            <>
              <span className="text-4xl font-mono font-bold text-purple-500">{bufferDisplay}</span>
              <span className="text-xs text-purple-400 mt-1 font-medium">Get ready...</span>
            </>
          ) : (
            <>
              <span className={`text-4xl font-mono font-bold tracking-tight ${isLow ? 'text-red-500' : 'text-stone-900 dark:text-stone-100'}`}>
                {minutes}:{secs.toString().padStart(2, '0')}
              </span>
              {isLow && <span className="text-xs text-red-400 mt-1 font-medium">Wrap up!</span>}
              {paused && !isLow && <span className="text-xs text-amber-500 mt-1 font-medium">Paused</span>}
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      {!isBuffering && remaining > 0 && (
        <div className="flex items-center gap-2">
          <button onClick={togglePause} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 active:scale-95 transition-all">
            {paused ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}
          </button>
          {!confirmReset ? (
            <button onClick={handleReset} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 active:scale-95 transition-all">
              <RotateCcw size={14} /> Reset
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={handleReset} className="px-2.5 py-1 text-xs font-medium rounded-md bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 transition-colors">Yes</button>
              <button onClick={cancelReset} className="px-2.5 py-1 text-xs font-medium rounded-md bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-400 hover:bg-stone-200 transition-colors">Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
