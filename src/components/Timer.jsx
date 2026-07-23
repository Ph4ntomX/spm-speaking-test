import { useEffect, useRef, useState } from 'react'
import { useSfx } from '../hooks/useSfx'

export default function Timer({ seconds, running, onComplete }) {
  const [remaining, setRemaining] = useState(seconds)
  const intervalRef = useRef(null)
  const hasCompleted = useRef(false)
  const chimePlayed = useRef(false)
  const { playWarning, playTimeUp } = useSfx()

  useEffect(() => {
    setRemaining(seconds)
    hasCompleted.current = false
    chimePlayed.current = false
  }, [seconds])

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          if (!hasCompleted.current) {
            hasCompleted.current = true
            playTimeUp()
            setTimeout(() => onComplete?.(), 0)
          }
          return 0
        }
        if (prev === 6 && !chimePlayed.current) {
          chimePlayed.current = true
          playWarning()
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, onComplete, playWarning, playTimeUp])

  const minutes = Math.floor(remaining / 60)
  const secs = remaining % 60
  const progress = seconds > 0 ? remaining / seconds : 0
  const isLow = remaining <= 5 && running

  const radius = 52
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="flex flex-col items-center animate-fade-in-scale">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="currentColor"
            className="text-stone-200 dark:text-stone-700"
            strokeWidth="6"
          />
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={isLow ? '#dc2626' : '#4c6ef5'}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${isLow ? 'animate-pulse' : ''}`}>
          <span className={`text-4xl font-mono font-bold tracking-tight ${isLow ? 'text-red-500' : 'text-stone-900 dark:text-stone-100'}`}>
            {minutes}:{secs.toString().padStart(2, '0')}
          </span>
          {isLow && <span className="text-xs text-red-400 mt-1 font-medium">Wrap up!</span>}
        </div>
      </div>
    </div>
  )
}
