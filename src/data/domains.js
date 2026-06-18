// The life domains a user can build a scent wardrobe for.
// `key` matches the domainProfiles keys in the UserProfile data model.

export const DOMAINS = [
  {
    key: 'workSchool',
    label: 'Work / School',
    icon: '💼',
    blurb: 'Clean, polished, inoffensive — earns compliments without overpowering a room.',
    defaultSelected: true,
  },
  {
    key: 'evening',
    label: 'Evening',
    icon: '🌙',
    blurb: 'A little more expressive and atmospheric — your after-hours signature.',
    defaultSelected: true,
  },
  {
    key: 'weekend',
    label: 'Weekend Casual',
    icon: '☕',
    blurb: 'Easygoing and comfortable — effortless scents for low-key days.',
    defaultSelected: true,
  },
  {
    key: 'dateNight',
    label: 'Date Night',
    icon: '🔥',
    blurb: 'Magnetic and intimate — designed to draw someone closer.',
    defaultSelected: true,
  },
  {
    key: 'travel',
    label: 'Travel / Vacation',
    icon: '✈️',
    blurb: 'Versatile, evocative, transportive — a scent that fits a suitcase and a memory.',
    defaultSelected: false,
  },
  {
    key: 'spiritualReflective',
    label: 'Spiritual / Reflective',
    icon: '🕯️',
    blurb: 'Meditative and grounding — incense, woods and calm for quiet moments.',
    defaultSelected: false,
  },
  {
    key: 'formal',
    label: 'Formal Events',
    icon: '🎩',
    blurb: 'Refined and elegant — a scent worthy of black tie and important rooms.',
    defaultSelected: false,
  },
  {
    key: 'gymActive',
    label: 'Gym / Active',
    icon: '🏃',
    blurb: 'Fresh, clean and energizing — light enough to move with you.',
    defaultSelected: false,
  },
]

export const DOMAIN_MAP = DOMAINS.reduce((acc, d) => {
  acc[d.key] = d
  return acc
}, {})

export const DOMAIN_KEYS = DOMAINS.map((d) => d.key)

export const DEFAULT_DOMAINS = DOMAINS.filter((d) => d.defaultSelected).map((d) => d.key)
