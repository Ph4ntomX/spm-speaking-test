import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('spm-timer-dark')
      if (saved === null) return false
      return saved === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      root.style.backgroundColor = '#1c1917' // stone-900
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.backgroundColor = '#fafaf9' // stone-50
      root.style.colorScheme = 'light'
    }
    localStorage.setItem('spm-timer-dark', String(dark))
  }, [dark])

  const toggle = () => setDark((d) => !d)

  return { dark, toggle }
}
