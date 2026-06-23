import { useState, useCallback } from 'react'
import { Play, SkipForward, RotateCcw } from 'lucide-react'
import Timer from '../components/Timer'
import TipsPanel from '../components/Tips'
import ScoreScreen from '../components/ScoreScreen'
import { part1IntroQuestion, part1TopicQuestions, part2Sets, part3Sets } from '../data/prompts'
import { useCompleted } from '../hooks/useCompleted'

const STEPS = {
  IDLE: 'idle',
  P1_A_INTRO: 'p1_a_intro', P1_A_TOPIC: 'p1_a_topic',
  P1_B_INTRO: 'p1_b_intro', P1_B_TOPIC: 'p1_b_topic',
  P2_PREP_A: 'p2_prep_a', P2_SPEAK_A: 'p2_speak_a',
  P2_PREP_B: 'p2_prep_b', P2_SPEAK_B: 'p2_speak_b',
  P3_PREP: 'p3_prep', P3_DISCUSS: 'p3_discuss',
  P3_DECIDE: 'p3_decide', P3_OPINION: 'p3_opinion',
  DONE: 'done',
}

const stepOrder = [
  STEPS.P1_A_INTRO, STEPS.P1_B_INTRO, STEPS.P1_A_TOPIC, STEPS.P1_B_TOPIC,
  STEPS.P2_PREP_A, STEPS.P2_SPEAK_A, STEPS.P2_PREP_B, STEPS.P2_SPEAK_B,
  STEPS.P3_PREP, STEPS.P3_DISCUSS, STEPS.P3_DECIDE, STEPS.P3_OPINION,
]

function getStepConfig(step) {
  if (step === 'p1_a_intro' || step === 'p1_b_intro') return { seconds: 20, part: 1, label: step.includes('_a_') ? 'Part 1: Candidate A — Intro' : 'Part 1: Candidate B — Intro' }
  if (step === 'p1_a_topic' || step === 'p1_b_topic') return { seconds: 35, part: 1, label: step.includes('_a_') ? 'Part 1: Candidate A — Topic' : 'Part 1: Candidate B — Topic' }
  const map = {
    [STEPS.P2_PREP_A]: { seconds: 20, part: 2, label: 'Part 2: Candidate A — Prep' },
    [STEPS.P2_SPEAK_A]: { seconds: 60, part: 2, label: 'Part 2: Candidate A — Speak' },
    [STEPS.P2_PREP_B]: { seconds: 20, part: 2, label: 'Part 2: Candidate B — Prep' },
    [STEPS.P2_SPEAK_B]: { seconds: 60, part: 2, label: 'Part 2: Candidate B — Speak' },
    [STEPS.P3_PREP]: { seconds: 20, part: 3, label: 'Part 3: Preparation' },
    [STEPS.P3_DISCUSS]: { seconds: 120, part: 3, label: 'Part 3: Discussion' },
    [STEPS.P3_DECIDE]: { seconds: 60, part: 3, label: 'Part 3: Decision' },
    [STEPS.P3_OPINION]: { seconds: 120, part: 3, label: 'Part 3: Opinion' },
  }
  return map[step] || { seconds: 60, part: 1, label: '' }
}

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function pickTwoTopics() {
  const shuffled = [...part1TopicQuestions].sort(() => Math.random() - 0.5)
  return { a: shuffled[0], b: shuffled[1] }
}

export default function FullPractice() {
  const { markCompleted: markP2 } = useCompleted('part2')
  const { markCompleted: markP3 } = useCompleted('part3')
  const [step, setStep] = useState(STEPS.IDLE)
  const [timerKey, setTimerKey] = useState(0)
  const [topicQs, setTopicQs] = useState({ a: '', b: '' })
  const [p2Set, setP2Set] = useState(null)
  const [p2Idx, setP2Idx] = useState(null)
  const [p3Set, setP3Set] = useState(null)
  const [p3Idx, setP3Idx] = useState(null)

  const start = () => {
    setTopicQs(pickTwoTopics())
    const p2i = Math.floor(Math.random() * part2Sets.length)
    const p3i = Math.floor(Math.random() * part3Sets.length)
    setP2Idx(p2i); setP2Set(part2Sets[p2i])
    setP3Idx(p3i); setP3Set(part3Sets[p3i])
    setStep(STEPS.P1_A_INTRO)
    setTimerKey((k) => k + 1)
    setChecked({})
  }

  const advance = useCallback(() => {
    setStep((prev) => {
      const i = stepOrder.indexOf(prev)
      if (i < stepOrder.length - 1) {
        setTimerKey((k) => k + 1)
        return stepOrder[i + 1]
      }
      // Mark completions
      if (p2Idx !== null) markP2(p2Idx, part2Sets.length)
      if (p3Idx !== null) markP3(p3Idx, part3Sets.length)
      return STEPS.DONE
    })
  }, [p2Idx, p3Idx, markP2, markP3])

  const skip = () => advance()
  const reset = () => { setStep(STEPS.IDLE); setTopicQs({ a: '', b: '' }); setP2Set(null); setP3Set(null) }

  const config = getStepConfig(step)
  const stepIdx = stepOrder.indexOf(step)
  const totalSteps = stepOrder.length

  const getContent = () => {
    if (step === STEPS.P1_A_INTRO) return { type: 'question', text: part1IntroQuestion, candidate: 'A', qType: 'Introduction' }
    if (step === STEPS.P1_A_TOPIC) return { type: 'question', text: topicQs.a, candidate: 'A', qType: 'Topic Question' }
    if (step === STEPS.P1_B_INTRO) return { type: 'question', text: part1IntroQuestion, candidate: 'B', qType: 'Introduction' }
    if (step === STEPS.P1_B_TOPIC) return { type: 'question', text: topicQs.b, candidate: 'B', qType: 'Topic Question' }
    if (step.startsWith('p2_') && p2Set) {
      const isA = step.includes('_a')
      return { type: 'part2', topic: isA ? p2Set.a : p2Set.b, candidate: isA ? 'A' : 'B' }
    }
    if (step.startsWith('p3_') && p3Set) {
      if (step === STEPS.P3_OPINION) return { type: 'part3opinion', text: p3Set.hots }
      return { type: 'part3', question: p3Set.question, points: p3Set.points }
    }
    return null
  }

  const content = getContent()

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Full Practice</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Complete mock: Part 1 → Part 2 → Part 3.</p>
      </div>

      <div className="card p-6 flex flex-col items-center gap-5 animate-fade-in-scale">
        {step === STEPS.IDLE && (
          <>
            <p className="text-stone-600 dark:text-stone-400 text-center text-sm max-w-md">
              Run through the entire speaking test in one go. Sets completed here count toward Part 2 and Part 3 progress.
            </p>
            <button onClick={start} className="btn-primary bg-indigo-600 hover:bg-indigo-700">
              <Play size={18} /> Start Full Practice
            </button>
          </>
        )}

        {step !== STEPS.IDLE && step !== STEPS.DONE && (
          <div className="w-full space-y-5 animate-fade-in">
            <div className="w-full">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-stone-600 dark:text-stone-400">{config.label}</span>
                <span className="text-xs text-stone-400 dark:text-stone-500">{stepIdx + 1}/{totalSteps}</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${((stepIdx + 1) / totalSteps) * 100}%` }} />
              </div>
            </div>

            {content?.type === 'question' && (
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-5 w-full text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${content.candidate === 'A' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'}`}>Candidate {content.candidate}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">{content.qType}</span>
                </div>
                <p className="text-xl font-serif font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">{content.text}</p>
              </div>
            )}

            {content?.type === 'part2' && (
              <div className={`w-full rounded-xl p-5 border-2 ${content.candidate === 'A' ? 'border-blue-300 bg-blue-50/80 dark:bg-blue-950/20 dark:border-blue-800' : 'border-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/20 dark:border-emerald-800'}`}>
                <p className={`text-xs font-bold mb-1 uppercase tracking-wide ${content.candidate === 'A' ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>Candidate {content.candidate}</p>
                <p className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-lg mb-3">{content.topic.topic}</p>
                <ul className="space-y-1.5">
                  {content.topic.prompts.map((p, i) => (
                    <li key={i} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-5 h-5 shrink-0 rounded-full bg-stone-200 dark:bg-stone-600 text-stone-600 dark:text-stone-300 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content?.type === 'part3' && (
              <div className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700 rounded-xl p-5 w-full">
                <p className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-lg mb-3">{content.question}</p>
                <div className="grid grid-cols-2 gap-2">
                  {content.points.map((p, i) => (
                    <div key={i} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2 leading-relaxed">
                      <span className="w-5 h-5 shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content?.type === 'part3opinion' && (
              <div className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700 rounded-xl p-5 w-full">
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1.5 uppercase tracking-wider">Opinion Question</p>
                <p className="text-base font-serif font-medium text-stone-900 dark:text-stone-100 italic leading-relaxed">{content.text}</p>
              </div>
            )}

            <Timer key={timerKey} seconds={config.seconds} running={true} onComplete={advance} />

            <div className="flex gap-3 justify-center">
              <button onClick={skip} className="btn-secondary"><SkipForward size={16} /> Skip</button>
              <button onClick={reset} className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 px-3 py-2 transition-colors">Stop</button>
            </div>
          </div>
        )}

        {step === STEPS.DONE && (
          <div className="w-full space-y-5 animate-fade-in">
            <div className="text-center">
              <p className="text-3xl">🎉</p>
              <p className="text-green-700 dark:text-green-400 font-serif font-semibold text-xl mt-2">Full practice complete!</p>
            </div>

            <ScoreScreen
              candidates={['A', 'B'].map((c) => {
                const topic = c === 'A' ? p2Set?.a : p2Set?.b
                return {
                  name: `Candidate ${c}`,
                  color: c === 'A' ? 'blue' : 'emerald',
                  sections: [
                    ...(topic ? [{
                      title: `Part 2: ${topic.topic}`,
                      items: [
                        ...topic.prompts.map((p, i) => ({ key: `fp2-${c}-${i}`, label: p })),
                        { key: `fp2-${c}-conn`, label: 'Used proper connectors' },
                        { key: `fp2-${c}-vocab`, label: 'Used advanced vocabulary' },
                        { key: `fp2-${c}-full`, label: 'Spoke for the full 1 minute' },
                      ],
                    }] : []),
                    { title: 'Part 3: Discussion', items: [
                      { key: `fp3d-${c}-conn`, label: 'Used proper connectors' },
                      { key: `fp3d-${c}-vocab`, label: 'Used advanced vocabulary' },
                      { key: `fp3d-${c}-equal`, label: 'Spoke an equal amount' },
                      { key: `fp3d-${c}-turn`, label: 'Good turn-taking' },
                      { key: `fp3d-${c}-points`, label: 'Covered reasonable points' },
                      { key: `fp3d-${c}-conc`, label: 'Had a conclusion' },
                    ]},
                    { title: 'Part 3: Decision', items: [
                      { key: `fp3dec-${c}-conn`, label: 'Used proper connectors' },
                      { key: `fp3dec-${c}-vocab`, label: 'Used advanced vocabulary' },
                      { key: `fp3dec-${c}-decision`, label: 'Made a clear decision' },
                      { key: `fp3dec-${c}-conc`, label: 'Concluded with agreement' },
                    ]},
                    { title: 'Part 3: Opinion', items: [
                      { key: `fp3o-${c}-conn`, label: 'Used proper connectors' },
                      { key: `fp3o-${c}-vocab`, label: 'Used advanced vocabulary' },
                      { key: `fp3o-${c}-examples`, label: 'Gave examples' },
                      { key: `fp3o-${c}-conc`, label: 'Had a conclusion' },
                    ]},
                  ],
                }
              })}
              onNext={start}
              onDone={reset}
              nextLabel="Again"
            />
          </div>
        )}
      </div>

      <TipsPanel types={['part2', 'part3', 'part3decide', 'connectors', 'vocab']} />
    </div>
  )
}
