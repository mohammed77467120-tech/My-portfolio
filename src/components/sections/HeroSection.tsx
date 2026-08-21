import { motion } from 'framer-motion'
import { Download, ArrowDown, FolderGit2, Mail, Sparkles } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'
import D3HeroConstellation from '../d3/D3HeroConstellation'
import { useEffect, useState } from 'react'

// Typing Animation Hook
function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    const delay = isDeleting ? speed / 2 : speed

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1))
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause)
        } else {
          setCharIndex((c) => c + 1)
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1))
        if (charIndex === 0) {
          setIsDeleting(false)
          setWordIndex((w) => (w + 1) % words.length)
        } else {
          setCharIndex((c) => c - 1)
        }
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex, words, speed, pause])

  return displayText
}

export default function HeroSection() {
  const { t, lang } = useLang()
  const isAr = lang === 'ar'

  const typingWords = profile.titles[lang as 'en' | 'ar']
  const typedText = useTypingEffect(typingWords, 75, 2000)

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      <D3HeroConstellation />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Typing Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '100px',
              background: 'var(--copper-subtle)',
              border: '1px solid var(--copper)',
              color: 'var(--copper)',
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(12px)',
              minWidth: '260px',
            }}
          >
            <Sparkles size={16} />
            <span>
              {typedText}
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  background: 'var(--copper)',
                  marginLeft: '2px',
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </span>
          </div>

          {/* Headline Name */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              margin: '0 0 1.25rem 0',
              letterSpacing: '-0.02em',
            }}
          >
            {profile.name[lang as 'en' | 'ar']}
          </h1>

          {/* Summary */}
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              maxWidth: '560px',
            }}
          >
            {profile.summary[lang as 'en' | 'ar']}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              className="btn btn-icon"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              title={isAr ? 'عني' : 'About'}
            >
              i
            </button>

            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <FolderGit2 size={16} />
              <span>{isAr ? 'تصفح المشاريع' : 'Explore Projects'}</span>
            </button>

            <button
              className="btn btn-outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail size={16} color="var(--accent-cyan)" />
              <span>{isAr ? 'تواصل معي' : 'Contact Me'}</span>
            </button>

            <a href={profile.resume} download className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
              <Download size={14} />
              <span>{t.hero.downloadResume}</span>
            </a>
          </div>

          {/* Metrics */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: `+${profile.stats.projects}`, label: isAr ? 'مشروع إنجاز' : 'Completed Projects', color: 'var(--copper)' },
              { value: `+${profile.stats.yearsLearning}`, label: isAr ? 'سنوات الخبرة' : 'Years Experience', color: 'var(--accent-cyan)' },
              { value: `+${profile.stats.technologies}`, label: isAr ? 'تقنية متمكن منها' : 'Technologies', color: 'var(--copper-light)' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: stat.color, fontFamily: 'var(--font-heading)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
        >
          <div
            style={{
              position: 'relative',
              width: 'min(100%, 360px)',
              aspectRatio: '1/1',
              borderRadius: '24px',
              padding: '12px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-lg)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <img
              src={profile.avatar}
              alt={profile.name[lang as 'en' | 'ar']}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', borderRadius: '16px' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-16px',
                right: isAr ? 'auto' : '-16px',
                left: isAr ? '-16px' : 'auto',
                background: 'var(--bg-overlay)',
                border: '1px solid var(--accent-cyan)',
                padding: '10px 18px',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-cyan)',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-md)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)', animation: 'pulse 2s ease infinite' }} />
              <span>{isAr ? 'متاح للعمل والمشاريع' : 'Available for Work'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1, opacity: 0.6 }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={18} color="var(--copper)" />
        </motion.div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </section>
  )
}
