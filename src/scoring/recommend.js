import { FRAGRANCES } from '../data/recommendations'
import { ACCORD_KEYS, ACCORD_MAP, emptyAccordScores } from '../data/accords'
import { cosineSimilarity, toVector, normalizeScores } from '../utils/vector'

// Tunable weights for the scoring model.
const W = {
  domainMatch: 0.12,
  intensitySame: 0.05,
  intensityFar: 0.06,
  avoidedPenaltyPerAccord: 0.09,
  avoidedPenaltyCap: 0.4,
  dislikePenalty: 0.18,
  varietyPenalty: 0.1, // applied when a pick repeats an already-chosen dominant accord
}

const INTENSITY_ORDER = { low: 0, medium: 1, high: 2 }

function dominantAccord(accords) {
  let best = null
  let bestVal = -1
  for (const k of ACCORD_KEYS) {
    const v = accords[k] || 0
    if (v > bestVal) {
      bestVal = v
      best = k
    }
  }
  return best
}

// Top accords shared between the user vector and a fragrance — the "cluster"
// that explains the match.
function matchedCluster(userScores, fragAccords, n = 3) {
  return ACCORD_KEYS.map((k) => ({
    key: k,
    weight: (userScores[k] || 0) * (fragAccords[k] || 0),
  }))
    .filter((x) => x.weight > 0)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, n)
    .map((x) => x.key)
}

// Aggregate disliked fragrances into a single normalized accord vector.
function buildDislikeVector(dislikedFragrances) {
  const agg = emptyAccordScores()
  let any = false
  for (const d of dislikedFragrances || []) {
    if (!d.accords) continue
    any = true
    for (const k of ACCORD_KEYS) agg[k] += d.accords[k] || 0
  }
  return any ? normalizeScores(agg) : null
}

function intensityAdjustment(userPref, fragIntensity) {
  const a = INTENSITY_ORDER[userPref] ?? 1
  const b = INTENSITY_ORDER[fragIntensity] ?? 1
  const diff = Math.abs(a - b)
  if (diff === 0) return W.intensitySame
  if (diff >= 2) return -W.intensityFar
  return 0
}

function safetyLabel(pickType) {
  if (pickType === 'safe') return 'Safe'
  if (pickType === 'interesting') return 'Adventurous'
  return 'Experimental'
}

function buildWhy(frag, clusterKeys, domainLabel) {
  const cluster = clusterKeys.map((k) => ACCORD_MAP[k]?.label || k)
  const clusterText =
    cluster.length > 0
      ? `It echoes your ${cluster.join(' + ')} preference`
      : 'It aligns with your overall profile'
  return `${clusterText}. ${frag.why}`
}

// Score every fragrance for one domain and return enriched candidates.
function scoreDomain(userScores, { intensityPreference, avoidedAccords, dislikeVector, domainKey }) {
  const userVec = toVector(userScores)
  const dislikeVec = dislikeVector ? toVector(dislikeVector) : null
  const avoided = new Set(avoidedAccords || [])

  return FRAGRANCES.map((frag) => {
    const fragVec = toVector(frag.accords)
    const cosine = cosineSimilarity(userVec, fragVec)

    let adjusted = cosine
    const domainMatch = frag.bestDomains.includes(domainKey)
    if (domainMatch) adjusted += W.domainMatch
    adjusted += intensityAdjustment(intensityPreference, frag.intensity)

    // Avoided-accord penalty (proportional to how present the accord is).
    let avoidPenalty = 0
    for (const a of avoided) {
      const present = (frag.accords[a] || 0) / 5
      avoidPenalty += present * W.avoidedPenaltyPerAccord
    }
    avoidPenalty = Math.min(avoidPenalty, W.avoidedPenaltyCap)
    adjusted -= avoidPenalty

    // Penalize similarity to disliked fragrances.
    if (dislikeVec) adjusted -= cosineSimilarity(dislikeVec, fragVec) * W.dislikePenalty

    const cluster = matchedCluster(userScores, frag.accords)
    return {
      frag,
      cosine,
      adjusted,
      novelty: 1 - cosine,
      domainMatch,
      avoidPenalty,
      dominant: dominantAccord(frag.accords),
      cluster,
    }
  }).sort((a, b) => b.adjusted - a.adjusted)
}

// Build the final recommendation set for a single domain:
// 3 safe picks, 2 interesting picks, 1 wildcard pick.
export function recommendForDomain(profile, domainKey) {
  const domainScores = profile.domainProfiles?.[domainKey]
  const hasSignal = domainScores && Math.max(...ACCORD_KEYS.map((k) => domainScores[k] || 0)) > 0
  const userScores = hasSignal ? domainScores : profile.overallProfile

  const dislikeVector = buildDislikeVector(profile.dislikedFragrances)
  const candidates = scoreDomain(userScores, {
    intensityPreference: profile.intensityPreference,
    avoidedAccords: profile.avoidedAccords,
    dislikeVector,
    domainKey,
  })

  const chosenIds = new Set()
  const usedDominants = new Set()
  const domainLabel = domainKey

  const take = (list) => {
    const c = list.find((x) => !chosenIds.has(x.frag.id))
    if (!c) return null
    chosenIds.add(c.frag.id)
    usedDominants.add(c.dominant)
    return c
  }

  // Safe picks: highest adjusted score, with a soft variety penalty so we don't
  // return three near-identical scents.
  const safe = []
  for (let i = 0; i < 3; i++) {
    const ranked = [...candidates]
      .filter((x) => !chosenIds.has(x.frag.id))
      .map((x) => ({
        ...x,
        rank: x.adjusted - (usedDominants.has(x.dominant) ? W.varietyPenalty : 0),
      }))
      .sort((a, b) => b.rank - a.rank)
    const pick = take(ranked)
    if (pick) safe.push(pick)
  }

  // Interesting picks: blend relevance with novelty, still applying variety.
  const interesting = []
  for (let i = 0; i < 2; i++) {
    const ranked = candidates
      .filter((x) => !chosenIds.has(x.frag.id) && x.adjusted > 0.1)
      .map((x) => ({
        ...x,
        rank:
          x.adjusted * 0.6 +
          x.novelty * 0.4 -
          (usedDominants.has(x.dominant) ? W.varietyPenalty : 0),
      }))
      .sort((a, b) => b.rank - a.rank)
    const pick = take(ranked)
    if (pick) interesting.push(pick)
  }

  // Wildcard: maximize novelty while keeping a relevance floor — an exploration
  // slot that nudges the user toward something they wouldn't pick themselves.
  let wildcard = null
  {
    const ranked = candidates
      .filter((x) => !chosenIds.has(x.frag.id) && x.adjusted > -0.05)
      .map((x) => ({
        ...x,
        rank: x.novelty * 0.7 + x.adjusted * 0.3 - (usedDominants.has(x.dominant) ? 0.05 : 0),
      }))
      .sort((a, b) => b.rank - a.rank)
    wildcard = take(ranked)
  }

  const decorate = (c, pickType) =>
    c && {
      ...c.frag,
      pickType,
      matchScore: Math.round(Math.min(1, Math.max(0, c.adjusted)) * 100),
      cluster: c.cluster,
      safety: safetyLabel(pickType),
      whyForYou: buildWhy(c.frag, c.cluster, domainLabel),
      usedOverallFallback: !hasSignal,
    }

  return {
    domainKey,
    usedOverallFallback: !hasSignal,
    safe: safe.map((c) => decorate(c, 'safe')).filter(Boolean),
    interesting: interesting.map((c) => decorate(c, 'interesting')).filter(Boolean),
    wildcard: decorate(wildcard, 'wildcard'),
  }
}

// Recommend across all selected domains.
export function recommendAll(profile) {
  const out = {}
  for (const d of profile.selectedDomains || []) {
    out[d] = recommendForDomain(profile, d)
  }
  return out
}
