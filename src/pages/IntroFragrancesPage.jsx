import { useMemo } from 'react'
import QuestionCard from '../components/QuestionCard'
import { QUESTION_BANK } from '../data/questions'

// The very first interactive step: seed the profile with fragrances the user
// already loves, before we ask where they'll wear things. Domain tagging is
// skipped here (domains aren't chosen yet) and can be set later on the summary.
export default function IntroFragrancesPage({ value, onChange, onBack, onContinue }) {
  const question = useMemo(() => QUESTION_BANK.find((q) => q.id === 'liked'), [])
  const hasItems = (value?.items || []).length > 0

  return (
    <div className="mx-auto max-w-2xl animate-fade-up">
      <div className="glass-card p-6 sm:p-8">
        <QuestionCard
          question={question}
          answer={value}
          onChange={onChange}
          selectedDomains={[]}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost">
          ← Back
        </button>
        <div className="flex items-center gap-2">
          {!hasItems && (
            <button onClick={onContinue} className="btn-ghost">
              I don’t know any — skip
            </button>
          )}
          <button onClick={onContinue} className="btn-primary px-8">
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}
