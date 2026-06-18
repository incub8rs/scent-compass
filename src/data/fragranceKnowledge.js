// A built-in fragrance knowledge map. Maps known perfumes to weighted accord
// vectors (0-5 scale) so that when a user types a fragrance they like/dislike
// we can translate it into accord points without any external API.
//
// IMPORTANT product rule: if a fragrance is NOT in this map, the app must NOT
// pretend to know it — instead it asks the user to describe it. See
// scoring/parseFragrance.js which enforces that behavior.

export const FRAGRANCE_KNOWLEDGE = [
  // --- The seed set explicitly requested ---
  {
    name: 'CK One',
    brand: 'Calvin Klein',
    aliases: ['ck one', 'calvin klein one', 'ckone'],
    accords: { citrus: 4, green: 3, musk: 3, marineOzonic: 1 },
  },
  {
    name: 'Rue21 Revert',
    brand: 'Rue21',
    aliases: ['rue21 revert', 'rue 21 revert', 'revert'],
    accords: { citrus: 4, marineOzonic: 3, musk: 2, woody: 2 },
  },
  {
    name: 'CK Defy',
    brand: 'Calvin Klein',
    aliases: ['ck defy', 'calvin klein defy', 'defy'],
    accords: { citrus: 3, woody: 3, amberResinous: 2, marineOzonic: 1, green: 1 },
  },
  {
    name: "Dior J'adore",
    brand: 'Dior',
    aliases: ["dior j'adore", 'jadore', "j'adore", 'dior jadore'],
    accords: { floral: 4, fruity: 3, musk: 2, marineOzonic: 1 },
  },
  {
    name: 'Versace Dylan Turquoise',
    brand: 'Versace',
    aliases: ['versace dylan turquoise', 'dylan turquoise', 'dylan turquoise pour femme'],
    accords: { citrus: 3, marineOzonic: 3, fruity: 3, musk: 2 },
  },
  {
    name: 'Koju Ayame',
    brand: 'Koju',
    aliases: ['koju ayame', 'ayame'],
    accords: { floral: 3, green: 3, woody: 3, earthyMossy: 3, musk: 2 },
  },
  {
    name: 'Alfred Sung Hei',
    brand: 'Alfred Sung',
    aliases: ['alfred sung hei', 'sung hei', 'hei'],
    accords: { green: 3, woody: 3, marineOzonic: 2, musk: 2 },
  },
  {
    name: 'Dunhill Desire Blue',
    brand: 'Dunhill',
    aliases: ['dunhill desire blue', 'desire blue', 'desire blue ocean'],
    accords: { marineOzonic: 3, citrus: 3, fruity: 2, musk: 2 },
  },
  {
    name: 'Lancôme Magnifique',
    brand: 'Lancôme',
    aliases: ['lancome magnifique', 'magnifique'],
    accords: { floral: 3, spicy: 3, amberResinous: 3, woody: 2 },
  },
  {
    name: 'Versace Bright Crystal',
    brand: 'Versace',
    aliases: ['versace bright crystal', 'bright crystal'],
    accords: { floral: 3, fruity: 3, musk: 2, marineOzonic: 1 },
  },
  {
    name: 'Alfred Sung Paradise',
    brand: 'Alfred Sung',
    aliases: ['alfred sung paradise', 'sung paradise', 'paradise'],
    accords: { floral: 3, green: 3, marineOzonic: 1, musk: 2 },
  },

  // --- Additional widely-known references for richer parsing ---
  {
    name: "Terre d'Hermès",
    brand: 'Hermès',
    aliases: ["terre d'hermes", 'terre dhermes', 'terre hermes'],
    accords: { citrus: 3, woody: 3, earthyMossy: 3, spicy: 1, marineOzonic: 1 },
  },
  {
    name: 'Acqua di Giò',
    brand: 'Giorgio Armani',
    aliases: ['acqua di gio', 'aqua di gio', 'adg', 'acqua di gio profumo'],
    accords: { marineOzonic: 4, citrus: 3, woody: 2, musk: 1 },
  },
  {
    name: "L'Eau d'Issey Pour Homme",
    brand: 'Issey Miyake',
    aliases: ["l'eau d'issey", 'leau dissey', 'issey miyake', 'leau dissey pour homme'],
    accords: { marineOzonic: 4, citrus: 2, woody: 2, spicy: 1, musk: 1 },
  },
  {
    name: 'Dior Sauvage',
    brand: 'Dior',
    aliases: ['dior sauvage', 'sauvage'],
    accords: { citrus: 3, amberResinous: 3, spicy: 2, woody: 2, marineOzonic: 1 },
  },
  {
    name: 'Chanel Bleu de Chanel',
    brand: 'Chanel',
    aliases: ['bleu de chanel', 'blue de chanel', 'bdc'],
    accords: { woody: 3, citrus: 3, amberResinous: 2, spicy: 1 },
  },
  {
    name: 'Chanel No. 5',
    brand: 'Chanel',
    aliases: ['chanel no 5', 'chanel number 5', 'no 5', 'no5'],
    accords: { floral: 4, musk: 3, amberResinous: 2, woody: 1 },
  },
  {
    name: 'Tom Ford Tobacco Vanille',
    brand: 'Tom Ford',
    aliases: ['tobacco vanille', 'tom ford tobacco vanille'],
    accords: { gourmand: 4, spicy: 3, amberResinous: 3, animalicLeather: 2, woody: 1 },
  },
  {
    name: 'YSL Black Opium',
    brand: 'Yves Saint Laurent',
    aliases: ['black opium', 'ysl black opium'],
    accords: { gourmand: 4, floral: 2, amberResinous: 2, spicy: 1, musk: 1 },
  },
  {
    name: 'Chanel Coco Mademoiselle',
    brand: 'Chanel',
    aliases: ['coco mademoiselle', 'coco madmoiselle'],
    accords: { floral: 3, fruity: 2, earthyMossy: 2, amberResinous: 2, citrus: 1 },
  },
  {
    name: 'Creed Aventus',
    brand: 'Creed',
    aliases: ['creed aventus', 'aventus'],
    accords: { fruity: 4, woody: 2, musk: 2, earthyMossy: 1, citrus: 1 },
  },
  {
    name: 'Maison Margiela By the Fireplace',
    brand: 'Maison Margiela',
    aliases: ['by the fireplace', 'margiela fireplace', 'replica fireplace'],
    accords: { gourmand: 3, woody: 3, spicy: 2, amberResinous: 2 },
  },
]

// Build a fast alias -> entry lookup. Keys are normalized (see parseFragrance).
export const FRAGRANCE_ALIAS_INDEX = (() => {
  const idx = {}
  for (const entry of FRAGRANCE_KNOWLEDGE) {
    const names = new Set([entry.name.toLowerCase(), ...(entry.aliases || [])])
    for (const n of names) {
      idx[normalizeName(n)] = entry
    }
  }
  return idx
})()

// Shared normalization: lowercase, strip diacritics + punctuation, collapse spaces.
export function normalizeName(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // diacritics
    .replace(/[^a-z0-9\s]/g, ' ') // punctuation
    .replace(/\s+/g, ' ')
    .trim()
}

// A keyword -> accord map for parsing free-text scent descriptions.
// Each match contributes the listed weight to the accord.
export const NOTE_KEYWORDS = [
  { match: ['citrus', 'lemon', 'bergamot', 'grapefruit', 'orange', 'lime', 'mandarin', 'zest', 'zesty'], accord: 'citrus', weight: 2 },
  { match: ['floral', 'flower', 'rose', 'jasmine', 'iris', 'tuberose', 'lily', 'peony', 'violet', 'orange blossom', 'neroli', 'ylang'], accord: 'floral', weight: 2 },
  { match: ['green', 'leaf', 'leaves', 'grass', 'stem', 'galbanum', 'fig leaf', 'tomato leaf', 'herbal', 'herb'], accord: 'green', weight: 2 },
  { match: ['fruit', 'fruity', 'peach', 'apple', 'pear', 'berry', 'berries', 'blackcurrant', 'cassis', 'pineapple', 'plum', 'lychee'], accord: 'fruity', weight: 2 },
  { match: ['wood', 'woody', 'sandalwood', 'cedar', 'vetiver', 'oak', 'pine', 'birch'], accord: 'woody', weight: 2 },
  { match: ['amber', 'resin', 'resinous', 'labdanum', 'benzoin', 'warm', 'cozy', 'golden'], accord: 'amberResinous', weight: 2 },
  { match: ['musk', 'musky', 'clean', 'skin', 'laundry', 'soapy', 'fresh laundry', 'cotton'], accord: 'musk', weight: 2 },
  { match: ['spice', 'spicy', 'pepper', 'cardamom', 'cinnamon', 'saffron', 'clove', 'ginger', 'nutmeg'], accord: 'spicy', weight: 2 },
  { match: ['sweet', 'vanilla', 'caramel', 'chocolate', 'coffee', 'gourmand', 'dessert', 'sugar', 'honey', 'praline', 'tonka'], accord: 'gourmand', weight: 2 },
  { match: ['leather', 'tobacco', 'oud', 'animalic', 'smoke', 'smoky', 'suede'], accord: 'animalicLeather', weight: 2 },
  { match: ['marine', 'aquatic', 'ozonic', 'ozone', 'sea', 'ocean', 'salt', 'salty', 'water', 'aqua', 'breeze', 'air', 'airy'], accord: 'marineOzonic', weight: 2 },
  { match: ['earthy', 'moss', 'mossy', 'oakmoss', 'patchouli', 'soil', 'dirt', 'mushroom', 'damp', 'forest', 'incense'], accord: 'earthyMossy', weight: 2 },
]
