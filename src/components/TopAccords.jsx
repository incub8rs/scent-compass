import { ACCORD_MAP } from '../data/accords'
import { topAccords } from '../utils/vector'

// Shows the top N dominant accords for a profile as labeled bars.
export default function TopAccords({ scores, n = 3, title = 'Top accords' }) {
  const tops = topAccords(scores, n)
  if (tops.length === 0) {
    return <p className="text-sm text-ink-soft">No dominant accords yet.</p>
  }
  return (
    <div>
      {title && (
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {title}
        </h4>
      )}
      <ul className="space-y-2">
        {tops.map((t, i) => {
          const accord = ACCORD_MAP[t.key]
          return (
            <li key={t.key} className="flex items-center gap-3">
              <span className="w-4 text-center text-xs font-bold text-ink-soft">{i + 1}</span>
              <span className="text-base">{accord?.icon}</span>
              <span className="w-24 shrink-0 text-sm font-medium text-ink">{accord?.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-compass-100">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${t.value}%`, backgroundColor: accord?.color }}
                />
              </div>
              <span className="w-8 text-right text-sm font-semibold text-ink">{t.value}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
