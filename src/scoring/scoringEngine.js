import { ACCORD_KEYS, emptyAccordScores } from '../data/accords'
import { DOMAIN_KEYS } from '../data/domains'
import { addScores, normalizeScores, topAccords } from '../utils/vector'
import { parseDescription, parseAvoidNotes } from './parseFragrance'

// How strongly a liked fragrance influences the profile, per preference star.
const LIKED_WEIGHT_PER_STAR = 0.7
// Weight applied to free-text description accords.
const DESCRIBE_WEIGHT = 1

// Resolve which specific domain keys a question contributes to (excludes the
// sentinel 'overall', which only feeds the overall profile).
function specificDomains(question) {
  return (question.domains || []).filter((d) => d !== 'overall' && DOMAIN_KEYS.includes(d))
}

// Core: turn the questionnaire + answers into a complete UserProfile.
//
// answers is keyed by question id. Answer shapes:
//   choice (single):      { optionId }
//   choice (multiSelect): { optionIds: [] }
//   fragranceList:        { items: [{ name, brand, accords, recognized, domain, preferenceStrength, notes }] }
//   freeText:             { text }
export function buildProfile(answers, questionnaire, { id, createdAt, mode, selectedDomains }) {
  const domainRaw = {}
  for (const d of DOMAIN_KEYS) domainRaw[d] = emptyAccordScores()
  const overallRaw = emptyAccordScores()

  const avoided = new Set()
  let intensityPreference = 'medium'
  const likedFragrances = []
  const dislikedFragrances = []

  // Apply a scores object to the overall profile + a question's specific domains.
  const apply = (scores, domains, weight = 1) => {
    if (!scores) return
    addScores(overallRaw, scores, weight)
    for (const d of domains) addScores(domainRaw[d], scores, weight)
  }

  for (const q of questionnaire) {
    const ans = answers[q.id]
    if (!ans) continue
    const domains = specificDomains(q)

    if (q.type === 'choice') {
      const optionById = (oid) => q.options.find((o) => o.id === oid)
      const selectedIds = q.multiSelect ? ans.optionIds || [] : ans.optionId ? [ans.optionId] : []
      for (const oid of selectedIds) {
        const opt = optionById(oid)
        if (!opt) continue
        apply(opt.scores, domains)
        if (opt.intensity) intensityPreference = opt.intensity
        if (Array.isArray(opt.avoid)) opt.avoid.forEach((a) => avoided.add(a))
      }
    } else if (q.type === 'fragranceList') {
      const items = ans.items || []
      for (const item of items) {
        if (!item.name) continue
        const strength = clampStar(item.preferenceStrength)
        const itemDomains = item.domain && DOMAIN_KEYS.includes(item.domain) ? [item.domain] : []
        if (q.kind === 'liked') {
          likedFragrances.push({
            name: item.name,
            brand: item.brand || '',
            domain: item.domain || null,
            preferenceStrength: strength,
            notes: item.notes || '',
          })
          if (item.accords) {
            // Liked fragrances feed overall + their tagged domain (if any).
            apply(item.accords, itemDomains, strength * LIKED_WEIGHT_PER_STAR)
          }
        } else if (q.kind === 'disliked') {
          dislikedFragrances.push({
            name: item.name,
            brand: item.brand || '',
            accords: item.accords || null,
            notes: item.notes || '',
          })
        }
      }
    } else if (q.type === 'freeText') {
      const text = (ans.text || '').trim()
      if (!text) continue
      if (q.kind === 'avoidNotes') {
        parseAvoidNotes(text).forEach((a) => avoided.add(a))
      } else {
        const { accords } = parseDescription(text)
        apply(accords, domains, DESCRIBE_WEIGHT)
      }
    }
  }

  // Normalize every profile to 0-100 (max accord => 100).
  const domainProfiles = {}
  const domainStrength = {}
  for (const d of DOMAIN_KEYS) {
    domainProfiles[d] = normalizeScores(domainRaw[d])
    domainStrength[d] = Math.max(0, ...ACCORD_KEYS.map((k) => domainRaw[d][k]))
  }
  const overallProfile = normalizeScores(overallRaw)

  return {
    id,
    createdAt,
    mode,
    selectedDomains,
    likedFragrances,
    dislikedFragrances,
    domainProfiles,
    overallProfile,
    avoidedAccords: [...avoided],
    intensityPreference,
    meta: {
      domainStrength,
      overallStrength: Math.max(0, ...ACCORD_KEYS.map((k) => overallRaw[k])),
      topOverall: topAccords(overallProfile, 3).map((t) => t.key),
    },
    recommendationHistory: [],
  }
}

function clampStar(s) {
  const n = Number(s)
  if (!Number.isFinite(n)) return 3
  return Math.min(5, Math.max(1, Math.round(n)))
}
