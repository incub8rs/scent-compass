import { useMemo, useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import { buildQuestionnaire } from '../data/questions'

// Which questions must be answered to advance. Free-text and disliked lists
// are optional and can be skipped.
function isRequired(q) {
  if (q.type === 'freeText') return false
  if (q.type === 'fragranceList') return q.kind === 'liked'
  return true
}

function isAnswered(q, ans) {
  if (!ans) return false
  if (q.type === 'choice') {
    return q.multiSelect ? (ans.optionIds || []).length > 0 : !!ans.optionId
  }
  if (q.type === 'fragranceList') {
    return (ans.items || []).length > 0
  }
  if (q.type === 'freeText') {
    return (ans.text || '').trim().length > 0
  }
  return false
}

export default function QuizPage({ mode, selectedDomains, onComplete, onBack }) {
  // The "liked fragrances" question is collected in the intro step before
  // domain selection, so exclude it from the main question flow here.
  const questionnaire = useMemo(
    () => buildQuestionnaire(selectedDomains).filter((q) => q.id !== 'liked'),
    [selectedDomains],
  )
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const question = questionnaire[index]
  const answer = answers[question.id]
  const total = questionnaire.length
  const isLast = index === total - 1

  const required = isRequired(question)
  const answered = isAnswered(question, answer)
  const canAdvance = !required || answered

  const setAnswer = (next) => setAnswers((a) => ({ ...a, [question.id]: next }))

  const goNext = () => {
    if (!canAdvance) return
    if (isLast) {
      onComplete(answers, questionnaire)
    } else {
      setIndex((i) => Math.min(total - 1, i + 1))
    }
  }

  const goPrev = () => {
    if (index === 0) onBack()
    else setIndex((i) => Math.max(0, i - 1))
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ProgressBar current={index + 1} total={total} />

      <div className="glass-card mt-6 p-6 sm:p-8">
        <QuestionCard
          key={question.id}
          question={question}
          answer={answer}
          onChange={setAnswer}
          selectedDomains={selectedDomains}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={goPrev} className="btn-ghost">
          ← {index === 0 ? 'Back' : 'Previous'}
        </button>

        <div className="flex items-center gap-2">
          {!required && !answered && (
            <button onClick={goNext} className="btn-ghost">
              Skip
            </button>
          )}
          <button onClick={goNext} disabled={!canAdvance} className="btn-primary px-8">
            {isLast ? 'See my results ✨' : 'Next →'}
          </button>
        </div>
      </div>

      {required && !answered && (
        <p className="mt-3 text-center text-xs text-ink-soft">
          Pick an option to continue.
        </p>
      )}
    </div>
  )
}
