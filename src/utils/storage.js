// LocalStorage persistence for saved scent profiles. Kept intentionally small
// and resilient — a corrupt/blocked storage should never crash the app.

const PROFILES_KEY = 'scent-compass.profiles.v1'
const LAST_KEY = 'scent-compass.last.v1'

function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback
  } catch {
    return fallback
  }
}

export function loadProfiles() {
  if (typeof localStorage === 'undefined') return []
  return safeParse(localStorage.getItem(PROFILES_KEY), [])
}

export function saveProfile(profile) {
  if (typeof localStorage === 'undefined') return
  const profiles = loadProfiles()
  const idx = profiles.findIndex((p) => p.id === profile.id)
  if (idx >= 0) profiles[idx] = profile
  else profiles.unshift(profile)
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
    localStorage.setItem(LAST_KEY, profile.id)
  } catch {
    /* storage full or blocked — ignore */
  }
}

export function deleteProfile(id) {
  if (typeof localStorage === 'undefined') return
  const profiles = loadProfiles().filter((p) => p.id !== id)
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
  } catch {
    /* ignore */
  }
}

export function loadLastProfile() {
  if (typeof localStorage === 'undefined') return null
  const id = localStorage.getItem(LAST_KEY)
  if (!id) return null
  return loadProfiles().find((p) => p.id === id) || null
}

export function generateId() {
  return `sc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}
