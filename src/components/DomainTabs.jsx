import { DOMAIN_MAP } from '../data/domains'

// Horizontal, scrollable domain tab bar. `tabs` is an array of domain keys,
// optionally prefixed with the special 'overall' tab.
export default function DomainTabs({ tabs, active, onChange }) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {tabs.map((key) => {
        const isOverall = key === 'overall'
        const label = isOverall ? 'Overall' : DOMAIN_MAP[key]?.label || key
        const icon = isOverall ? '🧭' : DOMAIN_MAP[key]?.icon
        const selected = active === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${
              selected
                ? 'border-compass-600 bg-compass-600 text-white shadow-glow'
                : 'border-compass-200 bg-white/70 text-compass-700 hover:border-compass-300 hover:bg-white'
            }`}
            aria-pressed={selected}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
