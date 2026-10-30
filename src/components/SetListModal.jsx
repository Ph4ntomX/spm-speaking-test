import { useState, useMemo } from 'react'
import { X, Search, CheckCircle2, Circle, Play, CheckCheck, RotateCcw } from 'lucide-react'

export default function SetListModal({
  isOpen,
  onClose,
  title = 'Browse Sets',
  partKey = 'part2', // 'part1' | 'part2' | 'part3'
  sets = [],
  completed = [],
  onToggleCompleted,
  onMarkAll,
  onResetCompleted,
  onSelectSet, // optional: (index) => void
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // 'all' | 'remaining' | 'done'
  const [selectedState, setSelectedState] = useState('all')

  // Extract unique state names for state filter
  const stateOptions = useMemo(() => {
    const states = new Set()
    sets.forEach((s) => {
      if (s.state) {
        // extract state group (e.g. "Johor" from "Johor Set 1")
        const group = s.state.replace(/\s+Set\s+\d+.*$/i, '').trim()
        if (group) states.add(group)
      }
    })
    return ['all', ...Array.from(states).sort()]
  }, [sets])

  // Filtered list
  const filteredSets = useMemo(() => {
    return sets
      .map((item, index) => ({ item, index, isDone: completed.includes(index) }))
      .filter(({ item, isDone }) => {
        // Completion filter
        if (filter === 'remaining' && isDone) return false
        if (filter === 'done' && !isDone) return false

        // State group filter
        if (selectedState !== 'all' && item.state) {
          const group = item.state.replace(/\s+Set\s+\d+.*$/i, '').trim()
          if (group.toLowerCase() !== selectedState.toLowerCase()) return false
        }

        // Search text
        if (!search.trim()) return true
        const q = search.toLowerCase()

        if (item.state && item.state.toLowerCase().includes(q)) return true

        // Part 2
        if (item.a?.topic && item.a.topic.toLowerCase().includes(q)) return true
        if (item.b?.topic && item.b.topic.toLowerCase().includes(q)) return true
        if (item.a?.prompts?.some((p) => p.toLowerCase().includes(q))) return true
        if (item.b?.prompts?.some((p) => p.toLowerCase().includes(q))) return true

        // Part 3
        if (item.question && item.question.toLowerCase().includes(q)) return true
        if (item.hots && item.hots.toLowerCase().includes(q)) return true
        if (item.points?.some((p) => p.toLowerCase().includes(q))) return true

        // Part 1 string
        if (typeof item === 'string' && item.toLowerCase().includes(q)) return true

        return false
      })
  }, [sets, completed, search, filter, selectedState])

  if (!isOpen) return null

  const pct = sets.length > 0 ? Math.round((completed.length / sets.length) * 100) : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-scale">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">{title}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                {completed.length} / {sets.length} done ({pct}%)
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Controls & Search */}
        <div className="p-3 sm:px-5 border-b border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 space-y-2.5">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by state, topic, or keyword..."
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-stone-900 dark:text-stone-100 placeholder-stone-400"
            />
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
            {/* Status tabs */}
            <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800 p-0.5 rounded-lg">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                All ({sets.length})
              </button>
              <button
                onClick={() => setFilter('remaining')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filter === 'remaining'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Remaining ({sets.length - completed.length})
              </button>
              <button
                onClick={() => setFilter('done')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filter === 'done'
                    ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Done ({completed.length})
              </button>
            </div>

            {/* State filter if applicable */}
            {stateOptions.length > 2 && (
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-2 py-1 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 text-xs focus:outline-none"
              >
                <option value="all">All States</option>
                {stateOptions.filter((s) => s !== 'all').map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            )}

            {/* Quick bulk actions */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                onClick={() => onMarkAll?.(sets.length)}
                className="text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 px-2 py-1 rounded hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors flex items-center gap-1"
                title="Mark all as done"
              >
                <CheckCheck size={13} />
                <span>Mark All</span>
              </button>
              {completed.length > 0 && (
                <button
                  onClick={onResetCompleted}
                  className="text-stone-400 hover:text-red-500 px-2 py-1 rounded hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors flex items-center gap-1"
                  title="Reset completion progress"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Set list items */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2.5 divide-y divide-stone-100 dark:divide-stone-800/60">
          {filteredSets.length === 0 ? (
            <div className="py-12 text-center text-stone-400 dark:text-stone-500 text-sm">
              No matching sets found.
            </div>
          ) : (
            filteredSets.map(({ item, index, isDone }) => {
              return (
                <div
                  key={index}
                  className={`pt-2.5 first:pt-0 flex items-center justify-between gap-3 group transition-colors rounded-xl p-2.5 ${
                    isDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30'
                      : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
                  }`}
                >
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0 pr-2">
                    {item.state && (
                      <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                        {item.state}
                      </span>
                    )}

                    {/* Part 2 rendering */}
                    {partKey === 'part2' && item.a && item.b && (
                      <div className="mt-0.5 space-y-0.5">
                        <p className="text-sm text-stone-800 dark:text-stone-200 truncate">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">A:</span> {item.a.topic}
                        </p>
                        <p className="text-sm text-stone-800 dark:text-stone-200 truncate">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">B:</span> {item.b.topic}
                        </p>
                      </div>
                    )}

                    {/* Part 3 rendering */}
                    {partKey === 'part3' && item.question && (
                      <div className="mt-0.5">
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100 leading-snug line-clamp-2">
                          {item.question}
                        </p>
                        {item.hots && (
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 italic line-clamp-1">
                            HOTS: {item.hots}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Part 1 rendering */}
                    {partKey === 'part1' && (
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mt-0.5 leading-snug">
                        {typeof item === 'string' ? item : item.question || ''}
                      </p>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {onSelectSet && (
                      <button
                        onClick={() => {
                          onSelectSet(index)
                          onClose()
                        }}
                        className="px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg flex items-center gap-1 transition-colors"
                        title="Practice this set right now"
                      >
                        <Play size={12} />
                        <span className="hidden sm:inline">Practice</span>
                      </button>
                    )}

                    {/* Mark As Done Toggle Button */}
                    <button
                      onClick={() => onToggleCompleted?.(index)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                          : 'border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20'
                      }`}
                      title={isDone ? 'Mark as not done' : 'Mark as done'}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 size={14} className="shrink-0" />
                          <span>Done</span>
                        </>
                      ) : (
                        <>
                          <Circle size={14} className="shrink-0 opacity-60" />
                          <span>Mark Done</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:px-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between text-xs text-stone-500">
          <span>Sets marked as done are automatically excluded from random practice.</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-800 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  )
}
