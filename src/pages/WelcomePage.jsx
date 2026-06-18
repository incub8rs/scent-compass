import { useState } from 'react'
import { formatDate } from '../utils/format'

const MODES = [
  {
    key: 'self',
    icon: '🧍',
    title: 'For myself',
    blurb: 'Build a personal scent wardrobe across the moments of your life.',
  },
  {
    key: 'other',
    icon: '🎁',
    title: 'For someone else',
    blurb: 'Profiling a partner, friend or gift recipient? Answer as them.',
  },
  {
    key: 'both',
    icon: '👥',
    title: 'Both',
    blurb: 'Explore your own taste and someone else’s side by side.',
  },
]

export default function WelcomePage({ onStart, savedProfiles = [], onLoadProfile, onDeleteProfile }) {
  const [mode, setMode] = useState('self')

  return (
    <div className="mx-auto max-w-3xl animate-fade-up">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-compass-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-compass-700">
          <img src="/compass.svg" alt="" className="h-4 w-4" /> Scent Compass
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Find your fragrance <span className="text-compass-600">wardrobe</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          Think <span className="font-medium text-ink">20 Questions</span> meets{' '}
          <span className="font-medium text-ink">Spotify Wrapped</span> for perfume. Answer a handful
          of playful questions and we’ll map your taste across{' '}
          <span className="font-medium text-ink">12 core accords</span> — then recommend scents for
          every part of your life. You’re not looking for one signature scent. You’re building a
          portfolio.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Who are we profiling?
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`rounded-3xl border p-5 text-left transition ${
                mode === m.key
                  ? 'border-compass-500 bg-compass-50 shadow-glow'
                  : 'border-compass-100 bg-white/70 hover:border-compass-300 hover:bg-white'
              }`}
              aria-pressed={mode === m.key}
            >
              <div className="text-2xl">{m.icon}</div>
              <div className="mt-2 font-semibold text-ink">{m.title}</div>
              <div className="mt-1 text-sm text-ink-soft">{m.blurb}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={() => onStart(mode)} className="btn-primary px-8 py-3.5 text-base">
          Begin your scent journey →
        </button>
      </div>

      {savedProfiles.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Saved profiles
          </h2>
          <div className="space-y-2">
            {savedProfiles.map((p) => (
              <div
                key={p.id}
                className="glass-card flex items-center justify-between gap-3 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-ink">
                    {p.meta?.topOverall?.length
                      ? p.meta.topOverall.map((k) => k).join(' · ')
                      : 'Scent profile'}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {p.mode} · {formatDate(p.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onLoadProfile(p)} className="btn-ghost px-4 py-2 text-xs">
                    View
                  </button>
                  <button
                    onClick={() => onDeleteProfile(p.id)}
                    className="rounded-full px-3 py-2 text-xs text-ink-soft transition hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-12 text-center text-xs text-ink-soft">
        Everything stays on your device — profiles are saved in your browser’s local storage.
      </p>
    </div>
  )
}
