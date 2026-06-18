import { useState } from 'react'
import { DOMAINS, DEFAULT_DOMAINS } from '../data/domains'

export default function DomainSelectPage({ initial, onBack, onContinue }) {
  const [selected, setSelected] = useState(new Set(initial?.length ? initial : DEFAULT_DOMAINS))

  const toggle = (key) => {
    const next = new Set(selected)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setSelected(next)
  }

  return (
    <div className="mx-auto max-w-3xl animate-fade-up">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Where will you wear it?
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-ink-soft">
          Pick the moments you want recommendations for. We’ll keep a separate scent profile for
          each — because your work scent shouldn’t be your date-night scent.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {DOMAINS.map((d) => {
          const on = selected.has(d.key)
          return (
            <button
              key={d.key}
              onClick={() => toggle(d.key)}
              className={`flex items-start gap-3 rounded-3xl border p-4 text-left transition ${
                on
                  ? 'border-compass-500 bg-compass-50 shadow-glow'
                  : 'border-compass-100 bg-white/70 hover:border-compass-300 hover:bg-white'
              }`}
              aria-pressed={on}
            >
              <span className="text-2xl">{d.icon}</span>
              <span className="flex-1">
                <span className="block font-semibold text-ink">{d.label}</span>
                <span className="mt-0.5 block text-sm text-ink-soft">{d.blurb}</span>
              </span>
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                  on ? 'border-compass-600 bg-compass-600 text-white' : 'border-compass-300'
                }`}
              >
                {on && (
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
                    <path d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4l2.3 2.29 6.3-6.3a1 1 0 011.4 0z" />
                  </svg>
                )}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost">
          ← Back
        </button>
        <button
          onClick={() => onContinue([...selected])}
          disabled={selected.size === 0}
          className="btn-primary px-8"
        >
          Start the quiz →
        </button>
      </div>
    </div>
  )
}
