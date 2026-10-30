import { useState, useCallback, useEffect } from 'react'

/**
 * Custom event name for syncing completion across components and modals within the same tab
 */
const UPDATE_EVENT = 'spm-completed-updated'

/**
 * Tracks completed topic indices in localStorage so they don't repeat.
 * Allows marking, unmarking, toggling, and bulk management.
 * Persists immediately to localStorage.
 */
export function useCompleted(partKey) {
  const storageKey = `spm-timer-completed-${partKey}`

  const readSaved = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  }, [storageKey])

  const [completed, setCompleted] = useState(readSaved)

  // Sync state when storage changes (across tabs) or when custom event fires (within app)
  useEffect(() => {
    setCompleted(readSaved())
    const handler = () => {
      setCompleted(readSaved())
    }
    window.addEventListener(UPDATE_EVENT, handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener(UPDATE_EVENT, handler)
      window.removeEventListener('storage', handler)
    }
  }, [readSaved])

  const notifyChange = () => {
    try {
      window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: { key: storageKey } }))
    } catch {
      window.dispatchEvent(new Event(UPDATE_EVENT))
    }
  }

  const markCompleted = useCallback((index) => {
    if (index === null || index === undefined) return
    setCompleted((prev) => {
      if (prev.includes(index)) return prev
      const next = [...prev, index]
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {}
      setTimeout(notifyChange, 0)
      return next
    })
  }, [storageKey])

  const unmarkCompleted = useCallback((index) => {
    if (index === null || index === undefined) return
    setCompleted((prev) => {
      if (!prev.includes(index)) return prev
      const next = prev.filter((i) => i !== index)
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {}
      setTimeout(notifyChange, 0)
      return next
    })
  }, [storageKey])

  const toggleCompleted = useCallback((index) => {
    if (index === null || index === undefined) return
    setCompleted((prev) => {
      const next = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {}
      setTimeout(notifyChange, 0)
      return next
    })
  }, [storageKey])

  const markAllCompleted = useCallback((totalCount) => {
    const all = Array.from({ length: totalCount }, (_, i) => i)
    try {
      localStorage.setItem(storageKey, JSON.stringify(all))
    } catch {}
    setCompleted(all)
    notifyChange()
  }, [storageKey])

  const resetCompleted = useCallback(() => {
    try {
      localStorage.removeItem(storageKey)
    } catch {}
    setCompleted([])
    notifyChange()
  }, [storageKey])

  const isCompleted = useCallback((index) => completed.includes(index), [completed])

  /**
   * Pick a random index from the pool that hasn't been completed yet.
   * If all sets are completed, picks a random one from the full pool without erasing user marks.
   */
  const pickRandom = useCallback((totalCount, excludeIndex = null) => {
    let available = Array.from({ length: totalCount }, (_, i) => i).filter(
      (i) => !completed.includes(i) && (excludeIndex === null || i !== excludeIndex)
    )

    // If no uncompleted sets remain (or only the current excluded one), pick from the full pool
    if (available.length === 0) {
      available = Array.from({ length: totalCount }, (_, i) => i).filter(
        (i) => excludeIndex === null || totalCount <= 1 || i !== excludeIndex
      )
    }

    if (available.length === 0) return 0
    return available[Math.floor(Math.random() * available.length)]
  }, [completed])

  return {
    completed,
    markCompleted,
    unmarkCompleted,
    toggleCompleted,
    markAllCompleted,
    resetCompleted,
    pickRandom,
    isCompleted,
    storageKey,
  }
}
