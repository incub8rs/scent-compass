// The 12 core accord families that form the foundation of Scent Compass.
// `key` is the stable identifier used throughout scoring + the data model.
// `color` powers the radial chart so each accord reads consistently everywhere.

export const ACCORDS = [
  {
    key: 'citrus',
    label: 'Citrus',
    short: 'Citrus',
    color: '#f6b93b',
    icon: '🍋',
    description:
      'Bright, zesty, effervescent — lemon, bergamot, grapefruit, orange. Reads clean, energetic and fresh.',
  },
  {
    key: 'floral',
    label: 'Floral',
    short: 'Floral',
    color: '#ef6db5',
    icon: '🌸',
    description:
      'The heart of perfumery — rose, jasmine, iris, tuberose. Ranges from airy and powdery to lush and romantic.',
  },
  {
    key: 'green',
    label: 'Green',
    short: 'Green',
    color: '#5fb86b',
    icon: '🌿',
    description:
      'Crushed leaves, stems, galbanum, violet leaf. Crisp, dewy and natural — a walk through a garden.',
  },
  {
    key: 'fruity',
    label: 'Fruity',
    short: 'Fruity',
    color: '#e8553a',
    icon: '🍑',
    description:
      'Juicy non-citrus fruit — peach, apple, blackcurrant, berries. Playful, succulent and rounded.',
  },
  {
    key: 'woody',
    label: 'Woody',
    short: 'Woody',
    color: '#a9744f',
    icon: '🪵',
    description:
      'Sandalwood, cedar, vetiver. The backbone of sophistication — dry, warm and grounding.',
  },
  {
    key: 'amberResinous',
    label: 'Amber / Resinous',
    short: 'Amber',
    color: '#d98a35',
    icon: '🟠',
    description:
      'Labdanum, benzoin, vanilla-tinged warmth. Golden, cozy and enveloping — the glow of a scent.',
  },
  {
    key: 'musk',
    label: 'Musk',
    short: 'Musk',
    color: '#c2aebd',
    icon: '🤍',
    description:
      'Soft, skin-like, clean or sensual. The "freshly laundered" or "warm skin" effect that makes scents intimate.',
  },
  {
    key: 'spicy',
    label: 'Spicy',
    short: 'Spicy',
    color: '#c0392b',
    icon: '🌶️',
    description:
      'Pepper, cardamom, cinnamon, saffron. Adds heat, lift and intrigue — from airy to fiery.',
  },
  {
    key: 'gourmand',
    label: 'Gourmand',
    short: 'Gourmand',
    color: '#9b5524',
    icon: '🍰',
    description:
      'Edible warmth — vanilla, caramel, chocolate, coffee. Sweet, comforting and dessert-like.',
  },
  {
    key: 'animalicLeather',
    label: 'Animalic / Leather',
    short: 'Leather',
    color: '#5b4636',
    icon: '🐾',
    description:
      'Leather, tobacco, oud, castoreum. Bold, primal and provocative — the most polarizing accord.',
  },
  {
    key: 'marineOzonic',
    label: 'Marine / Ozonic',
    short: 'Marine',
    color: '#3aa6e8',
    icon: '🌊',
    description:
      'Sea spray, ozone, salt air, calone. Airy, transparent and aquatic — the smell of open space.',
  },
  {
    key: 'earthyMossy',
    label: 'Earthy / Mossy',
    short: 'Earthy',
    color: '#6b7a3a',
    icon: '🍃',
    description:
      'Oakmoss, patchouli, wet soil, mushrooms. Deep, shadowy and rooted — adds gravitas and depth.',
  },
]

// Map keyed by accord key for O(1) lookups.
export const ACCORD_MAP = ACCORDS.reduce((acc, a) => {
  acc[a.key] = a
  return acc
}, {})

export const ACCORD_KEYS = ACCORDS.map((a) => a.key)

// A zeroed AccordScores object — the canonical empty profile shape.
export function emptyAccordScores() {
  return ACCORD_KEYS.reduce((acc, key) => {
    acc[key] = 0
    return acc
  }, {})
}
