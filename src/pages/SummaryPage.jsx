import { useMemo, useState } from 'react'
import AccordRadialChart from '../components/AccordRadialChart'
import TopAccords from '../components/TopAccords'
import DomainTabs from '../components/DomainTabs'
import RecommendationCard from '../components/RecommendationCard'
import FragranceInput from '../components/FragranceInput'
import { DOMAIN_MAP } from '../data/domains'
import { ACCORD_MAP } from '../data/accords'
import { buildSummary } from '../scoring/summary'

function RecGroup({ title, accent, recs }) {
  if (!recs || recs.length === 0) return null
  return (
    <div className="mt-6">
      <h4 className={`mb-3 flex items-center gap-2 text-sm font-semibold ${accent}`}>{title}</h4>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recs.map((rec) => (
          <RecommendationCard key={rec.id} rec={rec} />
        ))}
      </div>
    </div>
  )
}

export default function SummaryPage({
  profile,
  recommendations,
  onRetake,
  onSave,
  saved,
  onAddLiked,
}) {
  const tabs = useMemo(() => ['overall', ...(profile.selectedDomains || [])], [profile])
  const [active, setActive] = useState('overall')
  const [showAdd, setShowAdd] = useState(false)
  const [addValue, setAddValue] = useState({ items: [] })

  const summary = useMemo(() => buildSummary(profile), [profile])

  const isOverall = active === 'overall'
  const scores = isOverall ? profile.overallProfile : profile.domainProfiles[active]
  const domainRec = isOverall ? null : recommendations[active]
  const chartTitle = isOverall ? 'Overall profile' : `${DOMAIN_MAP[active]?.label} profile`

  const applyAdd = () => {
    const items = (addValue.items || []).filter((it) => it.name)
    if (items.length > 0) onAddLiked(items)
    setAddValue({ items: [] })
    setShowAdd(false)
  }

  return (
    <div className="mx-auto max-w-6xl animate-fade-up">
      {/* Header */}
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-compass-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-compass-700">
          <img src={`${import.meta.env.BASE_URL}compass.svg`} alt="" className="h-4 w-4" /> Your Scent Compass
        </div>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          {summary.headline}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
          {summary.paragraph}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button onClick={onSave} className="btn-primary" disabled={saved}>
          {saved ? '✓ Saved' : '💾 Save profile'}
        </button>
        <button onClick={() => setShowAdd((s) => !s)} className="btn-ghost">
          ＋ Add another fragrance I like
        </button>
        <button onClick={onRetake} className="btn-ghost">
          ↻ Retake quiz
        </button>
      </div>

      {showAdd && (
        <div className="glass-card mx-auto mt-4 max-w-2xl animate-scale-in p-5">
          <h3 className="mb-3 font-semibold text-ink">Add a fragrance you love</h3>
          <FragranceInput
            value={addValue}
            onChange={setAddValue}
            kind="liked"
            selectedDomains={profile.selectedDomains}
          />
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setShowAdd(false)} className="btn-ghost px-5 py-2 text-sm">
              Cancel
            </button>
            <button onClick={applyAdd} className="btn-primary px-5 py-2 text-sm">
              Update my profile
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mt-10">
        <DomainTabs tabs={tabs} active={active} onChange={setActive} />
      </div>

      {/* Chart + insights */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass-card flex items-center justify-center p-6">
          <AccordRadialChart scores={scores} title={chartTitle} size={340} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card p-6">
            <TopAccords scores={scores} n={5} title={`Top accords · ${isOverall ? 'overall' : DOMAIN_MAP[active]?.label}`} />
          </div>

          {isOverall && (
            <>
              <div className="glass-card p-6">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  What this says about your taste
                </h4>
                <p className="text-sm leading-relaxed text-ink-soft">{summary.paragraph}</p>
              </div>

              <div className="glass-card p-6">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Accords you avoid
                </h4>
                {profile.avoidedAccords.length === 0 ? (
                  <p className="text-sm text-ink-soft">
                    None — you’re open to exploring across the board.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.avoidedAccords.map((k) => (
                      <span
                        key={k}
                        className="chip border-red-200 bg-red-50 text-red-600"
                      >
                        🚫 {ACCORD_MAP[k]?.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {profile.likedFragrances.length > 0 && (
                <div className="glass-card p-6">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    Fragrances you told us you love
                  </h4>
                  <ul className="space-y-1.5 text-sm">
                    {profile.likedFragrances.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-ink">
                        <span className="text-gold-500">{'★'.repeat(f.preferenceStrength)}</span>
                        <span className="font-medium">{f.name}</span>
                        {f.brand && <span className="text-ink-soft">· {f.brand}</span>}
                        {f.domain && (
                          <span className="chip border-compass-100 bg-compass-50 text-compass-700">
                            {DOMAIN_MAP[f.domain]?.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Recommendations for the active domain */}
      {!isOverall && domainRec && (
        <div className="mt-10">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-semibold text-ink">
              {DOMAIN_MAP[active]?.icon} {DOMAIN_MAP[active]?.label} recommendations
            </h2>
          </div>
          {domainRec.usedOverallFallback && (
            <p className="mt-2 text-sm text-ink-soft">
              We didn’t get much signal for this domain, so these are based on your overall profile.
            </p>
          )}
          <RecGroup title="🟢 Safe picks — squarely in your lane" accent="text-emerald-700" recs={domainRec.safe} />
          <RecGroup
            title="🟡 Interesting picks — a step beyond your comfort zone"
            accent="text-amber-700"
            recs={domainRec.interesting}
          />
          <RecGroup
            title="🟣 Wildcard discovery — something to surprise you"
            accent="text-fuchsia-700"
            recs={domainRec.wildcard ? [domainRec.wildcard] : []}
          />
        </div>
      )}

      {isOverall && (
        <div className="glass-card mt-10 p-6 text-center">
          <p className="text-ink-soft">
            👆 Pick a domain tab above to see your{' '}
            <span className="font-semibold text-ink">safe</span>,{' '}
            <span className="font-semibold text-ink">interesting</span> and{' '}
            <span className="font-semibold text-ink">wildcard</span> recommendations for that part of
            your life.
          </p>
        </div>
      )}

      <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-ink-soft">
        Fragrance is a wardrobe, not a uniform. The goal isn’t one signature scent — it’s a useful
        portfolio for every version of you.
      </p>
    </div>
  )
}
