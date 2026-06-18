// The question bank that powers the Scent Compass quiz.
//
// Question shapes:
//  - type: 'choice'        -> forced choice between 2-3 scent moods.
//      options: [{ id, label, description, scores, avoid?, intensity? }]
//      multiSelect?: boolean (e.g. the "which do you avoid" question)
//  - type: 'fragranceList' -> user types fragrances (kind: 'liked' | 'disliked')
//  - type: 'freeText'      -> user describes a scent in words
//      kind: 'describe' (adds accord points) | 'avoidNotes' (marks avoided accords)
//
// `domains` lists which domain profiles an answer contributes to. Use ['overall']
// for questions that shape the overall profile but no single domain. Questions
// with `requiresDomain` only appear if that domain is selected.

export const QUESTION_BANK = [
  // ---------- General / overall mood ----------
  {
    id: 'compliment',
    type: 'choice',
    domains: ['overall'],
    prompt: 'Which compliment would you most love to hear?',
    subtitle: 'There are no wrong answers — go with your gut.',
    options: [
      {
        id: 'clean',
        label: '“You smell clean”',
        description: 'Fresh, crisp, effortlessly put-together.',
        scores: { citrus: 2, musk: 3, marineOzonic: 2 },
      },
      {
        id: 'elegant',
        label: '“You smell elegant”',
        description: 'Refined, polished, quietly luxurious.',
        scores: { floral: 2, woody: 2, amberResinous: 1, musk: 1 },
      },
      {
        id: 'interesting',
        label: '“You smell interesting”',
        description: 'Unexpected, memorable, a little mysterious.',
        scores: { animalicLeather: 2, spicy: 2, earthyMossy: 2, gourmand: 1 },
      },
    ],
  },
  {
    id: 'setting',
    type: 'choice',
    domains: ['overall'],
    prompt: 'Pick the setting that pulls you in.',
    options: [
      {
        id: 'coast',
        label: 'Mediterranean coast',
        description: 'Salt air, sun-warmed citrus groves, a cool breeze.',
        scores: { marineOzonic: 3, citrus: 3, green: 1 },
      },
      {
        id: 'kyoto',
        label: 'Kyoto garden after rain',
        description: 'Wet leaves, moss, cedar, a single iris.',
        scores: { green: 3, earthyMossy: 2, woody: 2, floral: 1 },
      },
      {
        id: 'lobby',
        label: 'Luxury hotel lobby',
        description: 'Fresh-cut flowers, polished wood, soft warmth.',
        scores: { floral: 3, musk: 2, amberResinous: 1, woody: 1 },
      },
    ],
  },
  {
    id: 'texture',
    type: 'choice',
    domains: ['overall'],
    prompt: 'In general, do you gravitate toward…',
    options: [
      {
        id: 'fresh',
        label: 'Fresh & airy',
        description: 'Light, transparent, breathable scents.',
        scores: { citrus: 2, marineOzonic: 2, green: 1, musk: 1 },
      },
      {
        id: 'warm',
        label: 'Warm & enveloping',
        description: 'Rich, cozy, skin-hugging warmth.',
        scores: { amberResinous: 2, woody: 2, gourmand: 1, spicy: 1 },
      },
      {
        id: 'between',
        label: 'Somewhere in between',
        description: 'Balanced — neither too sharp nor too heavy.',
        scores: { woody: 1, floral: 1, musk: 1, citrus: 1 },
      },
    ],
  },
  {
    id: 'season',
    type: 'choice',
    domains: ['overall'],
    prompt: 'Which season feels most like “you” in scent?',
    options: [
      {
        id: 'springsummer',
        label: 'Spring & Summer',
        description: 'Fresh, bright, breezy.',
        scores: { citrus: 3, marineOzonic: 2, green: 2, floral: 1 },
      },
      {
        id: 'fallwinter',
        label: 'Fall & Winter',
        description: 'Warm, deep, comforting.',
        scores: { amberResinous: 3, woody: 2, gourmand: 2, spicy: 1 },
      },
      {
        id: 'allyear',
        label: 'All year round',
        description: 'I like balanced scents that always work.',
        scores: { woody: 1, musk: 1, citrus: 1, floral: 1 },
      },
    ],
  },

  // ---------- Domain-specific forced choices ----------
  {
    id: 'work',
    type: 'choice',
    domains: ['workSchool'],
    requiresDomain: 'workSchool',
    prompt: 'For work or school, which feels most like you?',
    options: [
      {
        id: 'a',
        label: 'Crisp white shirt',
        description: 'Fresh citrus, clean musk — sharp and approachable.',
        scores: { citrus: 3, musk: 3, marineOzonic: 1, woody: 1 },
      },
      {
        id: 'b',
        label: 'Polished wood desk',
        description: 'Soft spice, subtle amber — quietly authoritative.',
        scores: { woody: 3, spicy: 2, amberResinous: 2, musk: 1 },
      },
      {
        id: 'c',
        label: 'Rainy garden',
        description: 'Green leaves, quiet floral notes — calm and natural.',
        scores: { green: 3, floral: 2, earthyMossy: 1, marineOzonic: 1 },
      },
    ],
  },
  {
    id: 'evening',
    type: 'choice',
    domains: ['evening'],
    requiresDomain: 'evening',
    prompt: 'For evenings, which atmosphere appeals most?',
    options: [
      {
        id: 'a',
        label: 'Coastal breeze',
        description: 'Citrus and fresh air — effortless and cool.',
        scores: { marineOzonic: 3, citrus: 3, musk: 1 },
      },
      {
        id: 'b',
        label: 'Velvet rose',
        description: 'Saffron and warm woods — sensual and rich.',
        scores: { floral: 3, spicy: 2, amberResinous: 2, woody: 2, musk: 1 },
      },
      {
        id: 'c',
        label: 'Japanese garden',
        description: 'Iris, moss and cedar — serene and refined.',
        scores: { green: 3, floral: 2, woody: 3, earthyMossy: 2, musk: 1 },
      },
    ],
  },
  {
    id: 'weekend',
    type: 'choice',
    domains: ['weekend'],
    requiresDomain: 'weekend',
    prompt: 'Your ideal weekend scent is like…',
    options: [
      {
        id: 'a',
        label: 'Sun-warmed orchard',
        description: 'Juicy fruit and light musk — easy and cheerful.',
        scores: { fruity: 3, citrus: 2, musk: 2 },
      },
      {
        id: 'b',
        label: 'Cozy café',
        description: 'Vanilla, soft spice and woods — comforting.',
        scores: { gourmand: 3, spicy: 1, woody: 2, amberResinous: 1 },
      },
      {
        id: 'c',
        label: 'Pine trail',
        description: 'Damp earth and evergreen — rugged and grounding.',
        scores: { woody: 3, earthyMossy: 3, green: 2 },
      },
    ],
  },
  {
    id: 'dateNight',
    type: 'choice',
    domains: ['dateNight'],
    requiresDomain: 'dateNight',
    prompt: 'For a date night, what draws someone closer?',
    options: [
      {
        id: 'a',
        label: 'Warm amber & vanilla',
        description: 'Skin-close, cozy, quietly seductive.',
        scores: { amberResinous: 3, gourmand: 2, musk: 2, woody: 1 },
      },
      {
        id: 'b',
        label: 'Sultry rose & leather',
        description: 'Spice and a hint of leather — bold and magnetic.',
        scores: { floral: 3, spicy: 2, animalicLeather: 2, amberResinous: 1 },
      },
      {
        id: 'c',
        label: 'Fresh aquatic sparkle',
        description: 'Citrus and clean musk — magnetic but effortless.',
        scores: { marineOzonic: 3, citrus: 2, musk: 2, woody: 1 },
      },
    ],
  },
  {
    id: 'travel',
    type: 'choice',
    domains: ['travel'],
    requiresDomain: 'travel',
    prompt: 'On vacation, you want a scent that smells like…',
    options: [
      {
        id: 'a',
        label: 'Mediterranean coast',
        description: 'Salt, citrus and fig — sun-drenched and free.',
        scores: { marineOzonic: 3, citrus: 2, green: 2, fruity: 1 },
      },
      {
        id: 'b',
        label: 'Spice market',
        description: 'Cardamom, amber and woods — exotic and warm.',
        scores: { spicy: 3, amberResinous: 2, woody: 2 },
      },
      {
        id: 'c',
        label: 'Tropical bloom',
        description: 'Frangipani, coconut and sunshine — playful.',
        scores: { floral: 2, gourmand: 2, fruity: 2, marineOzonic: 1 },
      },
    ],
  },
  {
    id: 'spiritualReflective',
    type: 'choice',
    domains: ['spiritualReflective'],
    requiresDomain: 'spiritualReflective',
    prompt: 'For quiet, reflective moments, you reach for…',
    options: [
      {
        id: 'a',
        label: 'Temple incense',
        description: 'Smoke, resin and woods — meditative depth.',
        scores: { earthyMossy: 3, woody: 2, amberResinous: 2 },
      },
      {
        id: 'b',
        label: 'Cool iris & powder',
        description: 'Quiet musk and soft floral — serene and clean.',
        scores: { floral: 2, musk: 3, woody: 1 },
      },
      {
        id: 'c',
        label: 'Sandalwood & myrrh',
        description: 'Sacred, creamy, grounding warmth.',
        scores: { woody: 3, amberResinous: 3, spicy: 1 },
      },
    ],
  },
  {
    id: 'formal',
    type: 'choice',
    domains: ['formal'],
    requiresDomain: 'formal',
    prompt: 'For a formal event, your scent should read as…',
    options: [
      {
        id: 'a',
        label: 'Timeless florals',
        description: 'Crisp, aldehydic, classic elegance.',
        scores: { floral: 3, musk: 2, woody: 1 },
      },
      {
        id: 'b',
        label: 'Black-tie woods',
        description: 'Leather and amber — commanding and rich.',
        scores: { woody: 3, animalicLeather: 2, amberResinous: 2 },
      },
      {
        id: 'c',
        label: 'Polished citrus & iris',
        description: 'Clean, refined, impeccably tailored.',
        scores: { citrus: 3, floral: 1, musk: 2, woody: 1 },
      },
    ],
  },
  {
    id: 'gymActive',
    type: 'choice',
    domains: ['gymActive'],
    requiresDomain: 'gymActive',
    prompt: 'At the gym or on the move, you want…',
    options: [
      {
        id: 'a',
        label: 'Cool mint & ozone',
        description: 'Citrus and air — energizing and crisp.',
        scores: { marineOzonic: 3, citrus: 3, green: 1 },
      },
      {
        id: 'b',
        label: 'Clean cotton musk',
        description: 'Barely-there, just-showered freshness.',
        scores: { musk: 3, marineOzonic: 1, citrus: 1 },
      },
      {
        id: 'c',
        label: 'Green herbal lift',
        description: 'Aromatic, sporty, invigorating.',
        scores: { green: 3, citrus: 2, woody: 1 },
      },
    ],
  },

  // ---------- Calibration: sweetness, intensity, avoidance ----------
  {
    id: 'sweetness',
    type: 'choice',
    domains: ['overall'],
    prompt: 'How do you feel about sweetness in fragrance?',
    options: [
      {
        id: 'love',
        label: 'Love a little sweetness',
        description: 'Vanilla, caramel, gourmand warmth is a yes.',
        scores: { gourmand: 3, fruity: 1 },
      },
      {
        id: 'touch',
        label: 'A touch is fine',
        description: 'Subtle sweetness, nothing dessert-like.',
        scores: { gourmand: 1, fruity: 1 },
      },
      {
        id: 'dry',
        label: 'Keep it dry',
        description: 'No sweetness — I prefer crisp and clean.',
        scores: { woody: 2, green: 1, earthyMossy: 1 },
        avoid: ['gourmand'],
      },
    ],
  },
  {
    id: 'intensity',
    type: 'choice',
    domains: ['overall'],
    prompt: 'How much presence do you want your scent to have?',
    subtitle: 'This tunes how strong your recommendations will be.',
    options: [
      {
        id: 'low',
        label: 'Subtle skin scent',
        description: 'Only people close to me notice.',
        scores: { musk: 2, marineOzonic: 1 },
        intensity: 'low',
      },
      {
        id: 'medium',
        label: 'A confident bubble',
        description: 'Noticeable within arm’s reach.',
        scores: { woody: 1, citrus: 1, floral: 1 },
        intensity: 'medium',
      },
      {
        id: 'high',
        label: 'Bold and memorable',
        description: 'I want to leave a trail.',
        scores: { amberResinous: 2, spicy: 1, animalicLeather: 1, gourmand: 1 },
        intensity: 'high',
      },
    ],
  },
  {
    id: 'avoid',
    type: 'choice',
    multiSelect: true,
    domains: ['overall'],
    prompt: 'Which of these do you actively avoid?',
    subtitle: 'Select any that apply — or none.',
    options: [
      {
        id: 'sweet',
        label: 'Sweet vanilla dessert scents',
        description: 'Too sugary or gourmand.',
        avoid: ['gourmand'],
      },
      {
        id: 'leather',
        label: 'Heavy leather / tobacco scents',
        description: 'Too dark or smoky.',
        avoid: ['animalicLeather'],
      },
      {
        id: 'aquatic',
        label: 'Sharp aquatic shower-gel scents',
        description: 'Too “generic fresh”.',
        avoid: ['marineOzonic'],
      },
      {
        id: 'amber',
        label: 'Loud, heavy amber / resin',
        description: 'Too dense or cloying.',
        avoid: ['amberResinous'],
      },
      {
        id: 'none',
        label: 'Nothing — I’m adventurous',
        description: 'I’m open to anything.',
        clearsAvoid: true,
      },
    ],
  },

  // ---------- Free-text inputs ----------
  {
    id: 'liked',
    type: 'fragranceList',
    kind: 'liked',
    domains: ['overall'],
    prompt: 'Name 1–5 fragrances you already love.',
    subtitle:
      'We’ll translate the ones we recognize into accord points. Don’t worry if we don’t know one — we’ll just ask you to describe it.',
  },
  {
    id: 'disliked',
    type: 'fragranceList',
    kind: 'disliked',
    domains: ['overall'],
    prompt: 'Any fragrances you dislike or find “too much”?',
    subtitle: 'Optional — this helps us steer recommendations away from accords you don’t enjoy.',
  },
  {
    id: 'describeWork',
    type: 'freeText',
    kind: 'describe',
    domains: ['workSchool'],
    requiresDomain: 'workSchool',
    prompt: 'Describe your ideal work scent in your own words.',
    subtitle: 'Optional. e.g. “clean and citrusy but with a soft woody base.”',
    placeholder: 'Fresh, light, professional, not too sweet…',
  },
  {
    id: 'describeEvening',
    type: 'freeText',
    kind: 'describe',
    domains: ['evening'],
    requiresDomain: 'evening',
    prompt: 'Describe your ideal evening scent in your own words.',
    subtitle: 'Optional. e.g. “warm, a little spicy, with rose and amber.”',
    placeholder: 'Warm, sensual, a touch of spice…',
  },
  {
    id: 'avoidNotes',
    type: 'freeText',
    kind: 'avoidNotes',
    domains: ['overall'],
    prompt: 'Are there any specific notes you avoid?',
    subtitle: 'Optional. e.g. “patchouli, oud, anything too sweet.”',
    placeholder: 'Oud, heavy patchouli, strong vanilla…',
  },
]

// Ordered phases used to assemble a coherent questionnaire.
const ORDER = [
  'compliment',
  'setting',
  'texture',
  'season',
  'work',
  'evening',
  'weekend',
  'dateNight',
  'travel',
  'spiritualReflective',
  'formal',
  'gymActive',
  'sweetness',
  'intensity',
  'avoid',
  'liked',
  'disliked',
  'describeWork',
  'describeEvening',
  'avoidNotes',
]

const BANK_BY_ID = QUESTION_BANK.reduce((acc, q) => {
  acc[q.id] = q
  return acc
}, {})

// Build the questionnaire for a given set of selected domain keys.
// Domain-specific questions only appear when their domain is selected,
// keeping the quiz at ~16-20 questions depending on choices.
export function buildQuestionnaire(selectedDomains) {
  const selected = new Set(selectedDomains)
  return ORDER.map((id) => BANK_BY_ID[id]).filter((q) => {
    if (!q) return false
    if (q.requiresDomain) return selected.has(q.requiresDomain)
    return true
  })
}
