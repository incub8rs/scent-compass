import { ACCORD_KEYS } from '../data/accords'

// Convert an AccordScores object into a fixed-order numeric array.
export function toVector(scores, keys = ACCORD_KEYS) {
  return keys.map((k) => scores?.[k] || 0)
}

export function dot(a, b) {
  let sum = 0
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i]
  return sum
}

export function magnitude(a) {
  return Math.sqrt(dot(a, a))
}

// Cosine similarity in [0, 1] for non-negative vectors. Returns 0 if either
// vector is empty (no information).
export function cosineSimilarity(a, b) {
  const magA = magnitude(a)
  const magB = magnitude(b)
  if (magA === 0 || magB === 0) return 0
  return dot(a, b) / (magA * magB)
}

// Normalize an AccordScores object so the largest accord becomes `scale`
// (default 100) and everything else is proportional. Returns a fresh object.
export function normalizeScores(scores, scale = 100) {
  const max = Math.max(0, ...ACCORD_KEYS.map((k) => scores?.[k] || 0))
  const out = {}
  for (const k of ACCORD_KEYS) {
    out[k] = max === 0 ? 0 : Math.round(((scores?.[k] || 0) / max) * scale)
  }
  return out
}

// Add weighted accord points from `source` into `target` (mutates target).
export function addScores(target, source, weight = 1) {
  if (!source) return target
  for (const k of Object.keys(source)) {
    if (k in target) target[k] += source[k] * weight
  }
  return target
}

// Return the top N accord keys by score, descending.
export function topAccords(scores, n = 3) {
  return ACCORD_KEYS.map((k) => ({ key: k, value: scores?.[k] || 0 }))
    .sort((a, b) => b.value - a.value)
    .filter((x) => x.value > 0)
    .slice(0, n)
}
