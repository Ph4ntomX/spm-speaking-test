import { Link } from 'react-router-dom'
import { MessageCircle, Presentation, Users, PlayCircle } from 'lucide-react'
import { part2Sets, part3Sets } from '../data/prompts'

function getProgress(key, total) {
  try {
    const saved = localStorage.getItem(`spm-timer-completed-${key}`)
    return { done: saved ? JSON.parse(saved).length : 0, total }
  } catch { return { done: 0, total } }
}

export default function Home() {
  const p2 = getProgress('part2', part2Sets.length)
  const p3 = getProgress('part3', part3Sets.length)

  return (
    <div className="space-y-8">
      <div className="text-center py-6 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">SPM Speaking Timer</h2>
        <p className="text-stone-600 dark:text-stone-400 mt-2 max-w-md mx-auto">
          Master your timing for Paper 1119/3. Practice with real exam topics from 2023 trial papers.
        </p>
      </div>

      <div className="card p-5 animate-fade-in-scale">
        <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 mb-3">Test Format</h3>
        <div className="space-y-2.5 text-sm text-stone-700 dark:text-stone-300">
          <div className="flex items-start gap-3">
            <span className="font-mono text-xs bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded mt-0.5 shrink-0 font-medium">1</span>
            <span>Individual Short Turn — Interview questions (1 min each)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-mono text-xs bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded mt-0.5 shrink-0 font-medium">2</span>
            <span>Individual Long Turn — 20s prep → 1 min talk (each candidate)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-mono text-xs bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded mt-0.5 shrink-0 font-medium">3</span>
            <span>Collaborative — 20s prep → 2 min discuss → 1 min decide → 2 min opinion</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Link to="/part-1" className="group card p-4 flex items-center gap-4 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <MessageCircle size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-semibold text-stone-900 dark:text-stone-100">Part 1: Short Turn</h4>
            <p className="text-sm text-stone-500 dark:text-stone-400">Interview — 1 min timer</p>
          </div>
        </Link>

        <Link to="/part-2" className="group card p-4 flex items-center gap-4 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Presentation size={20} className="text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-semibold text-stone-900 dark:text-stone-100">Part 2: Long Turn</h4>
            <p className="text-sm text-stone-500 dark:text-stone-400">A & B take turns — prep + speak</p>
          </div>
          {p2.done > 0 && <span className="text-xs text-stone-400 bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded-full shrink-0">{p2.done}/{p2.total}</span>}
        </Link>

        <Link to="/part-3" className="group card p-4 flex items-center gap-4 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all duration-200">
          <div className="w-11 h-11 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Users size={20} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-semibold text-stone-900 dark:text-stone-100">Part 3: Collaborative</h4>
            <p className="text-sm text-stone-500 dark:text-stone-400">Discuss → Decide → Opinion</p>
          </div>
          {p3.done > 0 && <span className="text-xs text-stone-400 bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded-full shrink-0">{p3.done}/{p3.total}</span>}
        </Link>

        <Link to="/full" className="group card p-4 flex items-center gap-4 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-200 ring-1 ring-indigo-100 dark:ring-indigo-900/50">
          <div className="w-11 h-11 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <PlayCircle size={20} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-semibold text-stone-900 dark:text-stone-100">Full Practice</h4>
            <p className="text-sm text-stone-500 dark:text-stone-400">Complete mock test (~10 min)</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
