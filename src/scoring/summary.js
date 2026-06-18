import { ACCORD_MAP } from '../data/accords'
import { DOMAIN_MAP } from '../data/domains'
import { topAccords } from '../utils/vector'

// Short evocative adjective per accord, used to build the personality blurb.
const ADJ = {
  citrus: 'bright',
  floral: 'floral',
  green: 'crisp and green',
  fruity: 'playful',
  woody: 'refined and woody',
  amberResinous: 'warm and ambery',
  musk: 'clean and soft',
  spicy: 'spicy',
  gourmand: 'sweet and cozy',
  animalicLeather: 'bold and leathery',
  marineOzonic: 'fresh and airy',
  earthyMossy: 'earthy and grounded',
}

function labels(keys) {
  return keys.map((k) => ACCORD_MAP[k]?.label || k)
}

function joinNice(arr) {
  if (arr.length === 0) return ''
  if (arr.length === 1) return arr[0]
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`
  return `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}`
}

function domainPhrase(profile, domainKey) {
  const scores = profile.domainProfiles?.[domainKey]
  if (!scores) return null
  const top = topAccords(scores, 2)
  if (top.length === 0) return null
  return joinNice(top.map((t) => ADJ[t.key] || ACCORD_MAP[t.key]?.label || t.key))
}

// Produce the natural-language "What this says about your taste" summary.
export function buildSummary(profile) {
  const top = topAccords(profile.overallProfile, 3)
  const topKeys = top.map((t) => t.key)
  const adjPhrase = joinNice(topKeys.map((k) => ADJ[k] || k))
  const accordPhrase = joinNice(labels(topKeys).map((l) => l.toLowerCase()))

  const avoided = profile.avoidedAccords || []
  const avoidPhrase =
    avoided.length > 0
      ? `You steer away from ${joinNice(labels(avoided).map((l) => l.toLowerCase()))}.`
      : 'You’re open-minded — no strong dislikes to avoid.'

  // Contrast work vs evening when both are present.
  const workP = profile.selectedDomains?.includes('workSchool') ? domainPhrase(profile, 'workSchool') : null
  const eveningP = profile.selectedDomains?.includes('evening') ? domainPhrase(profile, 'evening') : null
  let contrast = ''
  if (workP && eveningP) {
    contrast = ` Your ${DOMAIN_MAP.workSchool.label} profile leans ${workP}, while your ${DOMAIN_MAP.evening.label.toLowerCase()} side gets more ${eveningP}.`
  } else if (workP) {
    contrast = ` Your ${DOMAIN_MAP.workSchool.label} profile leans ${workP}.`
  } else if (eveningP) {
    contrast = ` Your evening profile leans ${eveningP}.`
  }

  const headline =
    topKeys.length > 0
      ? `You lean ${adjPhrase}.`
      : 'Your scent compass is still calibrating.'

  const paragraph =
    topKeys.length > 0
      ? `Your profile leans ${adjPhrase}, with a clear pull toward ${accordPhrase}. ${avoidPhrase}${contrast}`
      : 'Answer a few more questions to sharpen your profile.'

  return {
    headline,
    paragraph,
    topKeys,
    descriptors: topKeys.map((k) => ADJ[k] || k),
  }
}
