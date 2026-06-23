import { useState } from 'react'
import { Lightbulb, X } from 'lucide-react'

const tipSections = {
  part2: {
    title: "Speaking Tips",
    items: [
      "Use the 20s prep to mentally plan 4 points matching the 'You should say' prompts",
      "Speak for the FULL 1 minute — don't stop early",
      "Use connectors: Besides, Furthermore, In addition, Moreover, Apart from that",
      "End with the opinion question (the last bullet) to fill remaining time",
      "Speak clearly and at a steady pace — don't rush",
    ],
  },
  part3: {
    title: "STEEP-A-STEEP",
    items: [
      "S — Statement: State the point clearly",
      "T — Tell: Elaborate with explanation",
      "E — Example: Give a real-life example",
      "E — Engage viewpoints: 'What do you think?' / 'Do you agree?'",
      "P — Partner responds with agreement",
      "Then switch — your partner states the next point",
    ],
  },
  part3decide: {
    title: "PICK-A-POINT",
    items: [
      "A states best point: 'I think the best ... is ...'",
      "A asks: 'What do you think?'",
      "B disagrees politely: 'That's a good point, but I think ... is better because...'",
      "A changes opinion: 'When you put it that way, I agree...'",
      "Both conclude: 'So, we both agree that ... is the best choice.'",
    ],
  },
  vocab: {
    title: "Vocabulary Upgrades",
    type: 'table',
    items: [
      ["good", "beneficial / advantageous / commendable"],
      ["bad", "detrimental / adverse / unfavourable"],
      ["important", "crucial / essential / paramount"],
      ["very", "extremely / remarkably / exceptionally"],
      ["think", "believe / reckon / am of the opinion that"],
      ["help", "assist / aid / facilitate"],
      ["show", "demonstrate / illustrate / highlight"],
      ["get", "obtain / acquire / attain"],
      ["many", "numerous / a plethora of / countless"],
      ["big", "significant / substantial / considerable"],
      ["like", "prefer / am fond of / have a penchant for"],
      ["because", "due to / owing to / on account of"],
      ["also", "moreover / furthermore / in addition"],
      ["but", "however / nevertheless / on the other hand"],
    ],
  },
  connectors: {
    title: "Useful Connectors",
    items: [
      "Adding: Furthermore, Moreover, In addition, Apart from that, Besides",
      "Contrasting: However, Nevertheless, On the other hand, Conversely",
      "Cause/Effect: Therefore, Consequently, As a result, Thus, Hence",
      "Giving examples: For instance, To illustrate, Such as, Namely",
      "Concluding: In conclusion, To sum up, All things considered, Overall",
      "Sequencing: Firstly, Subsequently, Following that, Lastly",
    ],
  },
}

export default function TipsPanel({ types = [] }) {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  const sections = types.map((t) => tipSections[t]).filter(Boolean)
  if (sections.length === 0) return null

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => { setOpen(false); setClosing(false) }, 250)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 bg-amber-500 dark:bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-600 dark:hover:bg-amber-500 active:scale-95 transition-all duration-200 font-medium text-sm"
        aria-label="Open tips"
      >
        <Lightbulb size={18} />
        <span className="hidden sm:inline">Tips</span>
      </button>

      {open && (
        <div
          className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-stone-800 shadow-2xl border-l border-stone-200 dark:border-stone-700 overflow-y-auto"
          style={{ animation: closing ? 'slide-out-right 0.25s ease-in both' : 'slide-in-right 0.2s ease-out both' }}
        >
          <div className="sticky top-0 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 px-5 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-500" />
              <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100">Speaking Guide</h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 transition-colors"
              aria-label="Close tips"
            >
              <X size={20} />
            </button>
          </div>

            <div className="p-5 space-y-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-3">
                    {section.title}
                  </h4>
                  {section.type === 'table' ? (
                    <div className="space-y-1.5">
                      {section.items.map(([basic, advanced], i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-stone-500 dark:text-stone-400 shrink-0 w-20 text-right">{basic}</span>
                          <span className="text-stone-300 dark:text-stone-600">→</span>
                          <span className="text-stone-700 dark:text-stone-300 font-medium">{advanced}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2.5">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                          <span className="w-5 h-5 shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
      )}
    </>
  )
}
