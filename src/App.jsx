import { useEffect, useMemo, useState } from 'react'
import WelcomePage from './pages/WelcomePage'
import IntroFragrancesPage from './pages/IntroFragrancesPage'
import DomainSelectPage from './pages/DomainSelectPage'
import QuizPage from './pages/QuizPage'
import SummaryPage from './pages/SummaryPage'
import { buildQuestionnaire } from './data/questions'
import { buildProfile } from './scoring/scoringEngine'
import { recommendAll } from './scoring/recommend'
import {
  loadProfiles,
  saveProfile,
  deleteProfile,
  generateId,
} from './utils/storage'

export default function App() {
  const [stage, setStage] = useState('welcome') // welcome | intro | domains | quiz | summary
  const [mode, setMode] = useState('self')
  const [selectedDomains, setSelectedDomains] = useState([])
  const [likedAnswer, setLikedAnswer] = useState({ items: [] })
  const [answers, setAnswers] = useState({})
  const [profileId, setProfileId] = useState(null)
  const [createdAt, setCreatedAt] = useState(null)
  const [override, setOverride] = useState(null) // a directly-loaded profile w/o source answers
  const [savedProfiles, setSavedProfiles] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSavedProfiles(loadProfiles())
  }, [])

  const questionnaire = useMemo(
    () => buildQuestionnaire(selectedDomains),
    [selectedDomains],
  )

  const profile = useMemo(() => {
    if (override) return override
    if (!profileId) return null
    return buildProfile(answers, questionnaire, {
      id: profileId,
      createdAt: createdAt || new Date().toISOString(),
      mode,
      selectedDomains,
    })
  }, [override, profileId, answers, questionnaire, createdAt, mode, selectedDomains])

  const recommendations = useMemo(
    () => (profile ? recommendAll(profile) : {}),
    [profile],
  )

  // ---- Flow handlers ----
  const handleStart = (m) => {
    setMode(m)
    setLikedAnswer({ items: [] })
    setStage('intro')
  }

  const handleDomains = (domains) => {
    setSelectedDomains(domains)
    setProfileId(generateId())
    setCreatedAt(new Date().toISOString())
    setAnswers({})
    setOverride(null)
    setStage('quiz')
  }

  const handleComplete = (ans) => {
    // Fold in the liked fragrances captured during the intro step.
    setAnswers({ liked: likedAnswer, ...ans })
    setSaved(false)
    setStage('summary')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddLiked = (items) => {
    setAnswers((prev) => {
      const existing = prev.liked?.items || []
      return { ...prev, liked: { items: [...existing, ...items] } }
    })
    setSaved(false)
  }

  const handleSave = () => {
    if (!profile) return
    const toStore = { ...profile, _sourceAnswers: answers }
    saveProfile(toStore)
    setSavedProfiles(loadProfiles())
    setSaved(true)
  }

  const handleRetake = () => {
    setStage('welcome')
    setLikedAnswer({ items: [] })
    setAnswers({})
    setProfileId(null)
    setCreatedAt(null)
    setOverride(null)
    setSaved(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoadProfile = (p) => {
    setMode(p.mode || 'self')
    setSelectedDomains(p.selectedDomains || [])
    setCreatedAt(p.createdAt)
    setProfileId(p.id)
    setSaved(true)
    if (p._sourceAnswers) {
      setAnswers(p._sourceAnswers)
      setOverride(null)
    } else {
      // Older profile without stored answers — display it directly.
      setAnswers({})
      setOverride(p)
    }
    setStage('summary')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteProfile = (id) => {
    deleteProfile(id)
    setSavedProfiles(loadProfiles())
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={handleRetake}
            className="flex items-center gap-2 font-display text-lg font-semibold text-ink"
          >
            <img src={`${import.meta.env.BASE_URL}compass.svg`} alt="Scent Compass" className="h-7 w-7" />
            Scent Compass
          </button>
          {stage !== 'welcome' && (
            <button onClick={handleRetake} className="text-sm font-medium text-compass-700 hover:underline">
              Start over
            </button>
          )}
        </div>
      </header>

      <main className="px-4 py-10 sm:py-14">
        {stage === 'welcome' && (
          <WelcomePage
            onStart={handleStart}
            savedProfiles={savedProfiles}
            onLoadProfile={handleLoadProfile}
            onDeleteProfile={handleDeleteProfile}
          />
        )}

        {stage === 'intro' && (
          <IntroFragrancesPage
            value={likedAnswer}
            onChange={setLikedAnswer}
            onBack={() => setStage('welcome')}
            onContinue={() => setStage('domains')}
          />
        )}

        {stage === 'domains' && (
          <DomainSelectPage
            initial={selectedDomains}
            onBack={() => setStage('intro')}
            onContinue={handleDomains}
          />
        )}

        {stage === 'quiz' && (
          <QuizPage
            mode={mode}
            selectedDomains={selectedDomains}
            onComplete={handleComplete}
            onBack={() => setStage('domains')}
          />
        )}

        {stage === 'summary' && profile && (
          <SummaryPage
            profile={profile}
            recommendations={recommendations}
            onRetake={handleRetake}
            onSave={handleSave}
            saved={saved}
            onAddLiked={handleAddLiked}
          />
        )}
      </main>

      <footer className="border-t border-white/40 px-4 py-6 text-center text-xs text-ink-soft">
        Scent Compass · a fragrance discovery demo · built with React, Tailwind & Recharts
      </footer>
    </div>
  )
}
