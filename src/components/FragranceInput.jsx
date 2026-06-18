import { useState } from 'react'
import { parseFragranceName, parseDescription } from '../scoring/parseFragrance'
import { ACCORD_MAP } from '../data/accords'
import { DOMAIN_MAP } from '../data/domains'

function AccordChips({ accords }) {
  if (!accords) return null
  const present = Object.entries(accords)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
  if (present.length === 0) return null
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {present.map(([k]) => (
        <span
          key={k}
          className="chip border-transparent text-white"
          style={{ backgroundColor: ACCORD_MAP[k]?.color }}
        >
          {ACCORD_MAP[k]?.icon} {ACCORD_MAP[k]?.short}
        </span>
      ))}
    </div>
  )
}

function Stars({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`text-lg leading-none transition ${
            s <= value ? 'text-gold-500' : 'text-compass-200 hover:text-gold-400'
          }`}
          aria-label={`${s} star${s > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

// Manages a list of fragrances the user types. Recognized fragrances are
// translated into accords automatically; unrecognized ones prompt for a
// short description so we never pretend to know a scent.
export default function FragranceInput({ value, onChange, kind = 'liked', selectedDomains = [] }) {
  const items = value?.items || []
  const [draft, setDraft] = useState('')

  const update = (next) => onChange({ items: next })

  const addItem = () => {
    const name = draft.trim()
    if (!name) return
    const parsed = parseFragranceName(name)
    const item = {
      name: parsed.name,
      brand: parsed.brand || '',
      recognized: parsed.recognized,
      accords: parsed.recognized ? parsed.accords : null,
      description: '',
      preferenceStrength: 3,
      domain: '',
      notes: '',
    }
    update([...items, item])
    setDraft('')
  }

  const patchItem = (i, patch) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, ...patch } : it))
    update(next)
  }

  const removeItem = (i) => update(items.filter((_, idx) => idx !== i))

  const setDescription = (i, text) => {
    const { accords } = parseDescription(text)
    const hasAny = Object.values(accords).some((v) => v > 0)
    patchItem(i, { description: text, accords: hasAny ? accords : null })
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addItem()
            }
          }}
          placeholder={kind === 'liked' ? 'e.g. CK One, Dior Sauvage…' : 'e.g. something too sweet…'}
          className="flex-1 rounded-2xl border border-compass-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-compass-500 focus:ring-2 focus:ring-compass-200"
        />
        <button type="button" onClick={addItem} className="btn-primary px-5">
          Add
        </button>
      </div>

      {items.length === 0 && (
        <p className="mt-3 text-sm text-ink-soft">
          {kind === 'liked'
            ? 'Add a few you love — even one helps.'
            : 'Optional, but it sharpens your recommendations.'}
        </p>
      )}

      <div className="mt-3 space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="animate-scale-in rounded-2xl border border-compass-100 bg-white/80 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">
                  {item.name}
                  {item.brand && (
                    <span className="ml-1 font-normal text-ink-soft">· {item.brand}</span>
                  )}
                </p>
                {item.recognized ? (
                  <span className="chip mt-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                    ✓ Recognized
                  </span>
                ) : (
                  <span className="chip mt-1 border-amber-200 bg-amber-50 text-amber-700">
                    ? We don’t know this one
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="rounded-full px-2 py-1 text-sm text-ink-soft transition hover:bg-compass-50 hover:text-ink"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>

            {!item.recognized && (
              <div className="mt-3">
                <label className="text-xs font-medium text-ink-soft">
                  Describe how it smells so we can map it
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) => setDescription(i, e.target.value)}
                  rows={2}
                  placeholder="e.g. fresh citrus opening, woody dry-down, a bit of sweet vanilla"
                  className="mt-1 w-full rounded-xl border border-compass-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-compass-500 focus:ring-2 focus:ring-compass-200"
                />
              </div>
            )}

            <AccordChips accords={item.accords} />

            {kind === 'liked' && (
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-ink-soft">How much?</span>
                  <Stars
                    value={item.preferenceStrength}
                    onChange={(s) => patchItem(i, { preferenceStrength: s })}
                  />
                </div>
                {selectedDomains.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-ink-soft">For</span>
                    <select
                      value={item.domain}
                      onChange={(e) => patchItem(i, { domain: e.target.value })}
                      className="rounded-xl border border-compass-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-compass-500"
                    >
                      <option value="">Any occasion</option>
                      {selectedDomains.map((d) => (
                        <option key={d} value={d}>
                          {DOMAIN_MAP[d]?.label || d}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
