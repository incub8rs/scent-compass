import FragranceInput from './FragranceInput'

function ChoiceOption({ option, selected, onSelect, multi }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
        selected
          ? 'border-compass-500 bg-compass-50 shadow-glow'
          : 'border-compass-100 bg-white/70 hover:border-compass-300 hover:bg-white'
      }`}
      aria-pressed={selected}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 transition ${
          multi ? 'rounded-md' : 'rounded-full'
        } ${selected ? 'border-compass-600 bg-compass-600 text-white' : 'border-compass-300'}`}
      >
        {selected && (
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4l2.3 2.29 6.3-6.3a1 1 0 011.4 0z" />
          </svg>
        )}
      </span>
      <span>
        <span className="block font-semibold text-ink">{option.label}</span>
        {option.description && (
          <span className="mt-0.5 block text-sm text-ink-soft">{option.description}</span>
        )}
      </span>
    </button>
  )
}

export default function QuestionCard({ question, answer, onChange, selectedDomains }) {
  const renderBody = () => {
    if (question.type === 'choice') {
      const multi = !!question.multiSelect
      const selectedIds = multi ? answer?.optionIds || [] : answer?.optionId ? [answer.optionId] : []

      const toggle = (id) => {
        if (multi) {
          const set = new Set(selectedIds)
          // "none / adventurous" style options are mutually exclusive with the rest.
          const opt = question.options.find((o) => o.id === id)
          if (opt?.clearsAvoid) {
            onChange({ optionIds: set.has(id) ? [] : [id] })
            return
          }
          set.delete(question.options.find((o) => o.clearsAvoid)?.id)
          if (set.has(id)) set.delete(id)
          else set.add(id)
          onChange({ optionIds: [...set] })
        } else {
          onChange({ optionId: id })
        }
      }

      return (
        <div className="space-y-3">
          {question.options.map((opt) => (
            <ChoiceOption
              key={opt.id}
              option={opt}
              multi={multi}
              selected={selectedIds.includes(opt.id)}
              onSelect={() => toggle(opt.id)}
            />
          ))}
        </div>
      )
    }

    if (question.type === 'fragranceList') {
      return (
        <FragranceInput
          value={answer}
          onChange={onChange}
          kind={question.kind}
          selectedDomains={selectedDomains}
        />
      )
    }

    if (question.type === 'freeText') {
      return (
        <textarea
          value={answer?.text || ''}
          onChange={(e) => onChange({ text: e.target.value })}
          rows={3}
          placeholder={question.placeholder || 'Type your answer…'}
          className="w-full rounded-2xl border border-compass-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-compass-500 focus:ring-2 focus:ring-compass-200"
        />
      )
    }

    return null
  }

  return (
    <div className="animate-fade-up">
      <h2 className="font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
        {question.prompt}
      </h2>
      {question.subtitle && <p className="mt-2 text-sm text-ink-soft">{question.subtitle}</p>}
      <div className="mt-6">{renderBody()}</div>
    </div>
  )
}
