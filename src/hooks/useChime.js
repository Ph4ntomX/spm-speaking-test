import { useCallback } from 'react'

/**
 * Generates a short beep using the Web Audio API.
 * No external audio files needed.
 */
export function useChime() {
  const playChime = useCallback((frequency = 880, duration = 0.15) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.value = frequency

      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + duration)
    } catch {
      // Audio not supported — silently ignore
    }
  }, [])

  /** Double-beep for time's up */
  const playDone = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const playNote = (freq, startTime, dur) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0.3, startTime)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur)
        osc.start(startTime)
        osc.stop(startTime + dur)
      }
      playNote(880, ctx.currentTime, 0.12)
      playNote(1100, ctx.currentTime + 0.15, 0.2)
    } catch {
      // ignore
    }
  }, [])

  return { playChime, playDone }
}
