import { ACCORD_MAP } from '../data/accords'
import { PRICE_LABELS, INTENSITY_LABELS, PICK_META } from '../utils/format'

export default function RecommendationCard({ rec }) {
  if (!rec) return null
  const pick = PICK_META[rec.pickType] || PICK_META.safe

  return (
    <div className="animate-fade-up glass-card flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-display text-xl font-semibold leading-tight text-ink">{rec.name}</h4>
          <p className="text-sm text-ink-soft">{rec.brand}</p>
        </div>
        <span className={`chip shrink-0 ${pick.tone}`}>{pick.label}</span>
      </div>

      {/* Match score */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-compass-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-compass-400 to-compass-600"
            style={{ width: `${rec.matchScore}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-compass-700">{rec.matchScore}% match</span>
      </div>

      {/* Accord cluster */}
      {rec.cluster?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {rec.cluster.map((k) => (
            <span
              key={k}
              className="chip border-transparent text-white"
              style={{ backgroundColor: ACCORD_MAP[k]?.color }}
            >
              {ACCORD_MAP[k]?.icon} {ACCORD_MAP[k]?.short}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        <span className="font-semibold text-ink">Why this fits: </span>
        {rec.whyForYou}
      </p>

      {rec.caution && (
        <p className="mt-2 text-xs leading-relaxed text-amber-700">
          <span className="font-semibold">Heads up: </span>
          {rec.caution}
        </p>
      )}

      {/* Meta footer */}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        <span className="chip border-compass-100 bg-compass-50 text-compass-700">{rec.safety}</span>
        <span className="chip border-compass-100 bg-white text-ink-soft">
          {INTENSITY_LABELS[rec.intensity]} intensity
        </span>
        <span className="chip border-compass-100 bg-white text-ink-soft">
          {PRICE_LABELS[rec.priceTier]}
        </span>
        <span className="chip border-compass-100 bg-white capitalize text-ink-soft">
          {rec.gender}
        </span>
      </div>
    </div>
  )
}
