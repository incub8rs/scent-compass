import { useState } from 'react'
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarRadiusAxis,
} from 'recharts'
import { ACCORDS, ACCORD_MAP } from '../data/accords'

function CustomTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null
  const datum = payload[0].payload
  const accord = ACCORD_MAP[datum.key]
  return (
    <div className="max-w-[220px] rounded-2xl border border-white/70 bg-white/95 p-3 shadow-card backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="text-base">{accord?.icon}</span>
        <span className="font-semibold text-ink">{accord?.label}</span>
        <span className="ml-auto font-display text-lg text-compass-600">{datum.value}</span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">{accord?.description}</p>
    </div>
  )
}

// The signature visualization: a circular bar plot of the 12 accord weights
// (0-100), with a radar-chart fallback view the user can toggle to.
export default function AccordRadialChart({ scores, title, size = 320 }) {
  const [view, setView] = useState('rings')

  const data = ACCORDS.map((a) => ({
    key: a.key,
    name: a.short,
    value: scores?.[a.key] ?? 0,
    fill: a.color,
  }))

  const hasData = data.some((d) => d.value > 0)

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 flex w-full items-center justify-between gap-3">
        {title ? (
          <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        ) : (
          <span />
        )}
        <div className="flex rounded-full border border-compass-200 bg-white/70 p-0.5 text-xs font-medium">
          <button
            onClick={() => setView('rings')}
            className={`rounded-full px-3 py-1 transition ${
              view === 'rings' ? 'bg-compass-600 text-white' : 'text-compass-700'
            }`}
            aria-pressed={view === 'rings'}
          >
            Rings
          </button>
          <button
            onClick={() => setView('radar')}
            className={`rounded-full px-3 py-1 transition ${
              view === 'radar' ? 'bg-compass-600 text-white' : 'text-compass-700'
            }`}
            aria-pressed={view === 'radar'}
          >
            Radar
          </button>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: size, height: size }} className="relative">
        {!hasData && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-full text-center text-sm text-ink-soft">
            No signal yet for this profile.
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          {view === 'rings' ? (
            <RadialBarChart
              data={data}
              innerRadius="18%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              barSize={11}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                background={{ fill: 'rgba(127,78,232,0.07)' }}
                dataKey="value"
                cornerRadius={8}
                isAnimationActive
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            </RadialBarChart>
          ) : (
            <RadarChart data={data} outerRadius="78%">
              <PolarGrid stroke="rgba(87,39,171,0.18)" />
              <PolarAngleAxis
                dataKey="name"
                tick={{ fill: '#3a3450', fontSize: 11, fontWeight: 500 }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                stroke="#6a35d1"
                fill="#7f4ee8"
                fillOpacity={0.35}
                isAnimationActive
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Compact color legend so the rings view stays readable */}
      <div className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
        {ACCORDS.map((a) => (
          <div key={a.key} className="flex items-center gap-2 text-xs text-ink-soft">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: a.color }}
            />
            <span className="truncate">{a.short}</span>
            <span className="ml-auto font-semibold text-ink">{scores?.[a.key] ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
