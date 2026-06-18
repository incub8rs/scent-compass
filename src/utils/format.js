import { ACCORD_MAP } from '../data/accords'

export function accordLabel(key) {
  return ACCORD_MAP[key]?.label || key
}

export function accordColor(key) {
  return ACCORD_MAP[key]?.color || '#7f4ee8'
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

export const PRICE_LABELS = {
  budget: 'Budget',
  mid: 'Mid-range',
  premium: 'Premium',
  luxury: 'Luxury',
}

export const INTENSITY_LABELS = {
  low: 'Soft',
  medium: 'Moderate',
  high: 'Strong',
}

export const PICK_META = {
  safe: { label: 'Safe pick', tone: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  interesting: { label: 'Interesting', tone: 'bg-amber-100 text-amber-700 border-amber-200' },
  wildcard: { label: 'Wildcard', tone: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200' },
}
