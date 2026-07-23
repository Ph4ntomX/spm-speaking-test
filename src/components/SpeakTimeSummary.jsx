const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

/** Shows total speaking time for both candidates side by side. */
export default function SpeakTimeSummary({ totalA, totalB }) {
  return (
    <div className="flex gap-3 justify-center">
      <div className="text-center px-4 py-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Candidate A (total)</p>
        <p className="text-lg font-mono font-bold text-blue-700 dark:text-blue-300">{fmt(totalA)}</p>
      </div>
      <div className="text-center px-4 py-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Candidate B (total)</p>
        <p className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-300">{fmt(totalB)}</p>
      </div>
    </div>
  )
}

/** Merge multiple candidate-section lists (by candidate name) into one. */
export function mergeCandidates(...lists) {
  const map = new Map()
  for (const list of lists) {
    for (const cand of list) {
      if (!map.has(cand.name)) map.set(cand.name, { ...cand, sections: [...cand.sections] })
      else map.get(cand.name).sections.push(...cand.sections)
    }
  }
  return [...map.values()]
}
