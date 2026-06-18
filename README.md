# 🧭 Scent Compass

A playful but intelligent **fragrance discovery app** — *“20 Questions meets Spotify Wrapped for perfume.”* Answer ~20 questions and Scent Compass maps your preferences onto **12 core accord families**, visualizes your accord profile as a circular bar plot, and recommends fragrances for every part of your life.

The guiding principle: **fragrance is a wardrobe, not a uniform.** The goal isn’t one signature scent — it’s a useful portfolio for work, evenings, weekends, date night and beyond.

## ✨ Features

- **Welcome flow** — profile yourself, someone else, or both.
- **Domain selection** — Work/School, Evening, Weekend, Date Night, Travel, Spiritual/Reflective, Formal, Gym/Active (sensible defaults).
- **Adaptive question engine (~16–20 Qs)** — forced-choice scent moods, "name fragrances you like/dislike", and free-text descriptions. The quiz only asks domain questions for the domains you picked.
- **Fragrance knowledge map** — recognized perfumes are auto-translated into accords. If a scent isn’t recognized, the app **asks you to describe it** rather than pretending to know it.
- **Scoring engine** — keeps **per-domain** profiles separate, plus an **overall** profile, avoided accords, liked/disliked fragrances and preference strength.
- **Circular accord visualization** — a Recharts radial bar plot (with a radar-chart toggle), hover tooltips per accord, and top-3/top-5 dominant accords in text.
- **Recommendation engine** — cosine similarity between your accord vector and each fragrance, adjusted for domain match, avoided-accord penalties, intensity preference, a variety bonus, and a wildcard exploration slot. Each domain returns **3 safe + 2 interesting + 1 wildcard** picks.
- **Rich recommendation cards** — match %, accord cluster, "why this fits", caution notes, intensity, price tier and gender positioning.
- **Save / load profiles** in LocalStorage, **retake quiz**, and **add another fragrance** to refine your profile live.

## 🧱 Tech stack

React + Vite · Tailwind CSS · Recharts · LocalStorage. No backend or external APIs required — everything runs from seed data.

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

## 🗂️ Architecture

```
src/
├── components/   # ProgressBar, AccordRadialChart, DomainTabs, QuestionCard,
│                 # FragranceInput, RecommendationCard, TopAccords
├── data/         # accords, domains, questions, fragranceKnowledge, recommendations
├── scoring/      # scoringEngine, parseFragrance, recommend, summary
├── utils/        # vector math, storage, formatting
├── pages/        # WelcomePage, DomainSelectPage, QuizPage, SummaryPage
└── App.jsx       # stage machine + state orchestration
```

## 🌸 The 12 accords

Citrus · Floral · Green · Fruity · Woody · Amber/Resinous · Musk · Spicy · Gourmand · Animalic/Leather · Marine/Ozonic · Earthy/Mossy

## 🧮 How scoring works

1. Each answer adds **weighted points** to one or more accords.
2. Contributions flow into both the relevant **domain profile** and the **overall profile** — domain scores are never collapsed into a single average too early.
3. Liked fragrances contribute by their accord vector × preference strength; disliked ones become a recommendation penalty.
4. Each profile is normalized **0–100** (the strongest accord becomes 100) for the visualization.
5. Recommendations rank fragrances by cosine similarity + bonuses/penalties, then split into safe / interesting / wildcard tiers with a variety guard so picks aren’t near-duplicates.

## 🧾 Data model

See `src/scoring/scoringEngine.js` — the produced `UserProfile` follows the documented shape: `mode`, `likedFragrances`, `dislikedFragrances`, per-domain `domainProfiles`, `overallProfile`, `avoidedAccords`, `intensityPreference` and `recommendationHistory`.
