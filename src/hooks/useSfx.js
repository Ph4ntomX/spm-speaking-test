import { useCallback } from 'react'

/**
 * Duolingo-style sound effects using Web Audio API.
 * All synthesized — no external files needed.
 */
export function useSfx() {
  const getCtx = () => new (window.AudioContext || window.webkitAudioContext)()

  const playNote = (ctx, freq, start, dur, type = 'sine', vol = 0.25) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(vol, start)
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur)
    osc.start(start)
    osc.stop(start + dur)
  }

  /** Correct / success — ascending ding-ding (like Duolingo correct answer) */
  const playSuccess = useCallback(() => {
    try {
      const ctx = getCtx()
      const t = ctx.currentTime
      playNote(ctx, 587, t, 0.12, 'sine', 0.3)        // D5
      playNote(ctx, 784, t + 0.1, 0.12, 'sine', 0.3)  // G5
      playNote(ctx, 988, t + 0.2, 0.2, 'sine', 0.25)  // B5
    } catch {}
  }, [])

  /** Great score — triumphant fanfare */
  const playFanfare = useCallback(() => {
    try {
      const ctx = getCtx()
      const t = ctx.currentTime
      playNote(ctx, 523, t, 0.15, 'triangle', 0.3)       // C5
      playNote(ctx, 659, t + 0.12, 0.15, 'triangle', 0.3) // E5
      playNote(ctx, 784, t + 0.24, 0.15, 'triangle', 0.3) // G5
      playNote(ctx, 1047, t + 0.36, 0.35, 'triangle', 0.25) // C6
    } catch {}
  }, [])

  /** Phase transition — gentle ascending whoosh */
  const playTransition = useCallback(() => {
    try {
      const ctx = getCtx()
      const t = ctx.currentTime
      playNote(ctx, 440, t, 0.08, 'sine', 0.15)       // A4
      playNote(ctx, 554, t + 0.06, 0.08, 'sine', 0.15) // C#5
      playNote(ctx, 659, t + 0.12, 0.12, 'sine', 0.12) // E5
    } catch {}
  }, [])

  /** Click / tap — short pop */
  const playTap = useCallback(() => {
    try {
      const ctx = getCtx()
      playNote(ctx, 1200, ctx.currentTime, 0.05, 'sine', 0.15)
    } catch {}
  }, [])

  /** Warning — 5 seconds left */
  const playWarning = useCallback(() => {
    try {
      const ctx = getCtx()
      const t = ctx.currentTime
      playNote(ctx, 880, t, 0.1, 'square', 0.12)
    } catch {}
  }, [])

  /** Time's up — descending tone */
  const playTimeUp = useCallback(() => {
    try {
      const ctx = getCtx()
      const t = ctx.currentTime
      playNote(ctx, 880, t, 0.12, 'sine', 0.25)
      playNote(ctx, 660, t + 0.12, 0.12, 'sine', 0.25)
      playNote(ctx, 440, t + 0.24, 0.2, 'sine', 0.2)
    } catch {}
  }, [])

  /** Bad score — descending wah */
  const playBad = useCallback(() => {
    try {
      const ctx = getCtx()
      const t = ctx.currentTime
      playNote(ctx, 400, t, 0.15, 'sawtooth', 0.12)
      playNote(ctx, 300, t + 0.15, 0.2, 'sawtooth', 0.1)
    } catch {}
  }, [])

  return { playSuccess, playFanfare, playTransition, playTap, playWarning, playTimeUp, playBad }
}
