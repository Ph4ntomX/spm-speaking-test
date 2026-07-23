import { useState, useCallback } from 'react'

/**
 * Tracks completed topic indices in localStorage so they don't repeat.
 * Auto-resets when all sets have been completed.
 */
export function useCompleted(partKey) {
  const storageKey = `spm-timer-completed-${partKey}`

  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const markCompleted = useCallback((index, totalCount) => {
    setCompleted((prev) => {
      const next = [...prev, index]
      // Auto-reset if all done
      if (totalCount && next.length >= totalCount) {
        localStorage.removeItem(storageKey)
        return []
      }
      localStorage.setItem(storageKey, JSON.stringify(next))
      return next
    })
  }, [storageKey])

  const resetCompleted = useCallback(() => {
    setCompleted([])
    localStorage.removeItem(storageKey)
  }, [storageKey])

  /** Pick a random index from the pool that hasn't been completed yet. Resets if all done. */
  const pickRandom = useCallback((totalCount) => {
    let available = Array.from({ length: totalCount }, (_, i) => i).filter(
      (i) => !completed.includes(i)
    )

    // If all are done, reset and use full pool
    if (available.length === 0) {
      localStorage.removeItem(storageKey)
      setCompleted([])
      available = Array.from({ length: totalCount }, (_, i) => i)
    }

    return available[Math.floor(Math.random() * available.length)]
  }, [completed, storageKey])

  return { completed, markCompleted, resetCompleted, pickRandom }
}
