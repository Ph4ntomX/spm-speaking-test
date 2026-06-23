import { useState, useEffect } from 'react'
import { Play, RotateCcw, Check, Star, TrendingUp } from 'lucide-react'
import { useSfx } from '../hooks/useSfx'

/**
 * ScoreScreen with per-candidate scoring.
 * Props:
 *  - candidates: [{ name: 'Candidate A', color: 'blue', sections: [{ title, items: [{key, label}] }] }]
 *  - onNext / onDone / nextLabel
 */

function getGrade(pct) {
  if (pct >= 90) return { grade: 'A+', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800', msg: '🌟 Outstanding!' }
  if (pct >= 75) return { grade: 'A', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800', msg: '👏 Great job!' }
  if (pct >= 60) return { grade: 'B', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800', msg: '👍 Good effort.' }
  if (pct >= 40) return { grade: 'C', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800', msg: '💪 Keep practising.' }
  return { grade: 'D', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800', msg: '📚 Needs more work.' }
}

function getSuggestions(uncheckedLabels) {
  const suggestions = []
  if (uncheckedLabels.some((l) => l.toLowerCase().includes('connector'))) suggestions.push('Use more connectors: Furthermore, Moreover, However, In addition.')
  if (uncheckedLabels.some((l) => l.toLowerCase().includes('vocab'))) suggestions.push('Replace basic words with advanced vocabulary — check the Tips panel.')
  if (uncheckedLabels.some((l) => l.toLowerCase().includes('conclusion'))) suggestions.push('Always wrap up with a conclusion: "In conclusion..." or "To sum up..."')
  if (uncheckedLabels.some((l) => l.toLowerCase().includes('equal'))) suggestions.push('Balance speaking time. Use "What do you think?" to hand over.')
  if (uncheckedLabels.some((l) => l.toLowerCase().includes('full 1 minute'))) suggestions.push('Speak for the full duration — use examples or the last bullet to fill time.')
  if (uncheckedLabels.some((l) => l.toLowerCase().includes('decision'))) suggestions.push('Make sure to reach a clear decision with your partner.')
  if (suggestions.length === 0) suggestions.push('Great work! Keep this consistency.')
  return suggestions
}

export default function ScoreScreen({ candidates, onNext, onDone, nextLabel = 'Next Set' }) {
  const [checked, setChecked] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { playSuccess, playFanfare, playBad, playTap } = useSfx()

  const toggleCheck = (key) => {
    if (submitted) return
    playTap()
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Calculate per-candidate scores
  const candidateScores = candidates.map((cand) => {
    const items = cand.sections.flatMap((s) => s.items)
    const total = items.length
    const count = items.filter((item) => checked[item.key]).length
    const pct = total > 0 ? Math.round((count / total) * 100) : 0
    const unchecked = items.filter((item) => !checked[item.key]).map((item) => item.label)
    return { ...cand, items, total, count, pct, grade: getGrade(pct), suggestions: getSuggestions(unchecked) }
  })

  const totalChecked = candidateScores.reduce((a, c) => a + c.count, 0)
  const totalItems = candidateScores.reduce((a, c) => a + c.total, 0)

  const handleSubmit = () => {
    setSubmitted(true)
    const avgPct = candidateScores.reduce((a, c) => a + c.pct, 0) / candidateScores.length
    if (avgPct >= 75) {
      playFanfare()
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } else if (avgPct >= 50) {
      playSuccess()
    } else {
      playBad()
    }
  }

  useEffect(() => {
    if (submitted) {
      try {
        const key = 'spm-timer-scores'
        const saved = JSON.parse(localStorage.getItem(key) || '[]')
        candidateScores.forEach((c) => {
          saved.push({ candidate: c.name, pct: c.pct, date: new Date().toISOString() })
        })
        localStorage.setItem(key, JSON.stringify(saved.slice(-100)))
      } catch { /* ignore */ }
    }
  }, [submitted])

  return (
    <div className="w-full space-y-5 animate-fade-in relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20 + 5}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                backgroundColor: ['#4c6ef5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f472b6'][i % 7],
                animation: `confetti-fall ${1.5 + Math.random() * 1}s ease-in ${Math.random() * 0.8}s both`,
              }}
            />
          ))}
        </div>
      )}

      {!submitted ? (
        <>
          <p className="text-stone-600 dark:text-stone-400 text-center text-sm font-medium">
            Check off what each candidate did well, then submit.
          </p>

          {candidates.map((cand) => (
            <div key={cand.name} className="space-y-3">
              <p className={`text-sm font-bold ${cand.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                🎤 {cand.name}
              </p>
              {cand.sections.map((sec) => (
                <div key={sec.title} className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700 rounded-xl p-4">
                  <p className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-2">{sec.title}</p>
                  <ul className="space-y-1.5">
                    {sec.items.map((item) => (
                      <li key={item.key}>
                        <button onClick={() => toggleCheck(item.key)} className={`w-full flex items-start gap-2.5 text-left text-sm rounded-lg px-2.5 py-1.5 transition-all duration-200 ${checked[item.key] ? 'text-stone-400 dark:text-stone-500 line-through' : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'}`}>
                          <span className={`w-4 h-4 mt-0.5 shrink-0 rounded border-2 flex items-center justify-center transition-all duration-200 ${checked[item.key] ? 'bg-green-500 border-green-500 text-white scale-110' : 'border-stone-300 dark:border-stone-600'}`}>
                            {checked[item.key] && <Check size={12} />}
                          </span>
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div className="text-center">
            <button onClick={handleSubmit} className="btn-primary bg-indigo-600 hover:bg-indigo-700">
              <Star size={16} /> Submit 
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Per-candidate score cards */}
          <div className={`grid ${candidateScores.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
            {candidateScores.map((c, idx) => (
              <div
                key={c.name}
                className={`text-center p-5 rounded-xl border-2 ${c.grade.bg} transition-all`}
                style={{
                  animation: `score-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.15}s both`,
                }}
              >
                <p className={`text-xs font-bold mb-1 ${c.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{c.name}</p>
                <p className={`text-5xl font-serif font-bold ${c.grade.color}`}>{c.grade.grade}</p>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-1.5">{c.count}/{c.total} — {c.pct}%</p>
                <p className={`text-xs mt-1.5 font-medium ${c.grade.color}`}>{c.grade.msg}</p>
              </div>
            ))}
          </div>

          {/* Per-candidate suggestions */}
          {candidateScores.map((c, idx) => (
            <div
              key={c.name + '-sug'}
              className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700 rounded-xl p-4"
              style={{
                animation: `slide-up 0.4s ease-out ${0.4 + idx * 0.15}s both`,
              }}
            >
              <p className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1.5">
                <TrendingUp size={14} /> {c.name} — Suggestions
              </p>
              <ul className="space-y-1.5">
                {c.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5 shrink-0">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Action buttons */}
          <div
            className="flex gap-3 justify-center"
            style={{
              animation: `slide-up 0.4s ease-out 0.7s both`,
            }}
          >
            <button onClick={onNext} className="btn-primary bg-green-600 hover:bg-green-700">
              <Play size={16} /> {nextLabel}
            </button>
            <button onClick={onDone} className="btn-secondary">
              <RotateCcw size={16} /> Done
            </button>
          </div>
        </>
      )}
    </div>
  )
}
