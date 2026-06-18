import {
  FRAGRANCE_ALIAS_INDEX,
  NOTE_KEYWORDS,
  normalizeName,
} from '../data/fragranceKnowledge'
import { ACCORD_KEYS } from '../data/accords'

// Look up a typed fragrance name in the built-in knowledge map.
// Returns { recognized, name, brand, accords } — when not recognized we do NOT
// invent accords; the UI uses `recognized: false` to ask the user to describe it.
export function parseFragranceName(raw) {
  const norm = normalizeName(raw)
  if (!norm) return { recognized: false, name: raw, accords: null }

  // 1) exact alias match
  if (FRAGRANCE_ALIAS_INDEX[norm]) {
    const e = FRAGRANCE_ALIAS_INDEX[norm]
    return { recognized: true, name: e.name, brand: e.brand, accords: e.accords }
  }

  // 2) contains match — typed string contains a known alias or vice versa,
  //    requiring a reasonably specific token to avoid false hits.
  for (const alias of Object.keys(FRAGRANCE_ALIAS_INDEX)) {
    if (alias.length < 4) continue
    if (norm.includes(alias) || (alias.includes(norm) && norm.length >= 4)) {
      const e = FRAGRANCE_ALIAS_INDEX[alias]
      return { recognized: true, name: e.name, brand: e.brand, accords: e.accords }
    }
  }

  return { recognized: false, name: raw.trim(), accords: null }
}

// Parse a free-text scent description into an accord points object.
export function parseDescription(text) {
  const out = {}
  for (const k of ACCORD_KEYS) out[k] = 0
  const norm = ` ${normalizeName(text)} `
  if (norm.trim().length === 0) return { accords: out, matched: [] }

  const matched = []
  for (const rule of NOTE_KEYWORDS) {
    for (const kw of rule.match) {
      if (norm.includes(` ${normalizeName(kw)} `) || norm.includes(normalizeName(kw))) {
        out[rule.accord] += rule.weight
        matched.push(rule.accord)
        break // count each accord rule at most once per description
      }
    }
  }
  return { accords: out, matched: [...new Set(matched)] }
}

// Parse "notes you avoid" free text into a list of accord keys to flag.
export function parseAvoidNotes(text) {
  const { matched } = parseDescription(text)
  return matched
}
