import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, Mail, Phone, ChevronDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'

// ─── Floating Tech Logos (SVG) ───────────────────────────
const techLogos = [
  {
    color: '#61DAFB',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
        <ellipse cx="50" cy="50" rx="47" ry="18" fill="none" stroke="#61DAFB" strokeWidth="5"/>
        <ellipse cx="50" cy="50" rx="47" ry="18" fill="none" stroke="#61DAFB" strokeWidth="5" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="47" ry="18" fill="none" stroke="#61DAFB" strokeWidth="5" transform="rotate(120 50 50)"/>
      </svg>
    ),
  },
  {
    color: '#54C5F8',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,50 50,12 88,50 62,50 50,38 38,50" fill="#54C5F8"/>
        <polygon points="38,50 50,62 62,50 88,50 50,88 26,64" fill="#01579B"/>
        <polygon points="50,62 62,50 88,50 64,74" fill="#29B6F6"/>
      </svg>
    ),
  },
  {
    color: '#3178C6',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="8" fill="#3178C6"/>
        <text x="50" y="72" textAnchor="middle" fill="white" fontSize="52" fontWeight="900" fontFamily="Arial">TS</text>
      </svg>
    ),
  },
  {
    color: '#F7DF1E',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="8" fill="#F7DF1E"/>
        <text x="50" y="72" textAnchor="middle" fill="#000" fontSize="52" fontWeight="900" fontFamily="Arial">JS</text>
      </svg>
    ),
  },
  {
    color: '#00B4AB',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="15,20 50,10 85,20 85,80 50,90 15,80" fill="#00B4AB" opacity="0.9"/>
        <text x="50" y="65" textAnchor="middle" fill="white" fontSize="36" fontWeight="900" fontFamily="Arial">Dart</text>
      </svg>
    ),
  },
  {
    color: '#BD34FE',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BD34FE"/>
            <stop offset="100%" stopColor="#41D1FF"/>
          </linearGradient>
        </defs>
        <polygon points="50,8 92,30 82,72 50,92 18,72 8,30" fill="url(#vg)" opacity="0.95"/>
        <polygon points="50,24 68,54 50,46 32,54" fill="white" opacity="0.9"/>
      </svg>
    ),
  },
  {
    color: '#9B59B6',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="8" fill="#9B59B6"/>
        <text x="50" y="68" textAnchor="middle" fill="white" fontSize="46" fontWeight="900" fontFamily="Arial">C#</text>
      </svg>
    ),
  },
  {
    color: '#2965F1',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="10,8 90,8 82,92 50,100 18,92" fill="#2965F1"/>
        <text x="50" y="68" textAnchor="middle" fill="white" fontSize="40" fontWeight="900" fontFamily="Arial">CSS</text>
      </svg>
    ),
  },
]

const floatPositions = [
  { top: '8%',  left: '4%',  size: 52, dur: 5.2, delay: 0 },
  { top: '12%', left: '88%', size: 48, dur: 4.5, delay: 0.4 },
  { top: '35%', left: '92%', size: 44, dur: 6.0, delay: 0.8 },
  { top: '60%', left: '85%', size: 50, dur: 4.8, delay: 1.2 },
  { top: '78%', left: '6%',  size: 46, dur: 5.5, delay: 0.2 },
  { top: '55%', left: '2%',  size: 42, dur: 4.2, delay: 1.6 },
  { top: '88%', left: '50%', size: 40, dur: 5.8, delay: 0.6 },
  { top: '25%', left: '96%', size: 38, dur: 4.0, delay: 1.0 },
]

function TypingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const current = texts[index]
    if (!deleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % texts.length)
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(prev =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        )
      }, deleting ? 40 : 80)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, deleting, index, texts])

  return (
    <span>
      <span>{displayed}</span>
      <span style={{
        display: 'inline-block', width: '2px', height: '1.2em',
        background: 'var(--primary)', marginLeft: '3px',
        verticalAlign: 'middle', borderRadius: '2px',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  )
}

export default function HeroSection() {
  const { t, lang, isRTL } = useLang()

  const socials = [
    { icon: GithubIcon, href: profile.github, label: 'GitHub' },
    { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
    { icon: InstagramIcon, href: profile.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: Phone, href: profile.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      {/* Background mesh gradient */}
      <div className="hero-mesh" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Floating tech logos */}
      {techLogos.map((tech, i) => {
        const pos = floatPositions[i]
        return (
          <motion.div
            key={i}
            animate={{
              y: [0, -18, 0],
              rotate: [0, 4, -4, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: pos.dur,
              repeat: Infinity,
              delay: pos.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
              opacity: 0.18,
              zIndex: 0,
              filter: `drop-shadow(0 0 8px ${tech.color}66)`,
              pointerEvents: 'none',
            }}
          >
            {tech.svg}
          </motion.div>
        )
      })}

      {/* Glow circles — Midnight Glass */}
      <div style={{
        position: 'absolute', top: '15%', right: '8%',
        width: '550px', height: '550px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, rgba(224,86,160,0.06) 40%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
        animation: 'aurora-pulse 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '8%', left: '3%',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,207,207,0.09) 0%, rgba(245,166,35,0.05) 50%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
        animation: 'aurora-pulse 11s ease-in-out infinite 2s',
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: '4rem',
          alignItems: 'center',
        }} className="hero-grid">

          {/* Left / Text */}
          <div style={{ order: isRTL ? 2 : 1 }}>
            {/* Available Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}
            >
              <span style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '100px',
                border: '1px solid rgba(245,166,35,0.35)',
                background: 'rgba(245,166,35,0.08)',
                fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)',
                backdropFilter: 'blur(8px)',
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: 'var(--primary)',
                  boxShadow: '0 0 0 3px rgba(245,166,35,0.2)',
                  animation: 'pulse-glow 2s infinite',
                }} />
                {t.hero.availableForWork}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}
            >
              {t.hero.greeting}
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1rem',
                color: 'var(--text)',
                letterSpacing: '-1px',
              }}
            >
              {profile.name[lang as 'en' | 'ar']}
            </motion.h1>

            {/* Animated Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                fontWeight: 700,
                marginBottom: '1.5rem',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <TypingText texts={profile.titles[lang as 'en' | 'ar']} />
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: '1.05rem', color: 'var(--text-muted)',
                lineHeight: 1.8, maxWidth: '540px', marginBottom: '2.5rem',
              }}
            >
              {profile.summary[lang as 'en' | 'ar']}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
            >
              <motion.a
                href={profile.resume}
                download
                whileHover={{ scale: 1.02, boxShadow: '0 8px 36px rgba(245,166,35,0.45)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '12px',
                  background: 'var(--gradient-hero)',
                  color: 'white', textDecoration: 'none',
                  fontWeight: 700, fontSize: '0.95rem',
                  boxShadow: '0 4px 24px rgba(245,166,35,0.3)',
                  letterSpacing: '0.3px',
                }}
              >
                <Download size={18} />
                {t.hero.downloadResume}
              </motion.a>

              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '12px',
                  background: 'none',
                  border: '2px solid var(--border)',
                  color: 'var(--text)', cursor: 'pointer',
                  fontWeight: 700, fontSize: '0.95rem',
                  transition: 'all 0.2s',
                }}
              >
                {t.hero.viewProjects}
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ display: 'flex', gap: '0.75rem' }}
            >
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '44px', height: '44px', borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow)',
                    transition: 'color 0.2s',
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right / Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100 }}
            style={{ order: isRTL ? 1 : 2 }}
            className="hero-avatar"
          >
            <div style={{ position: 'relative', width: '320px', height: '320px' }}>
              {/* Rotating ring — gold */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '-22px',
                  borderRadius: '50%',
                  border: '1.5px dashed rgba(245,166,35,0.4)',
                }}
              />
              {/* Counter-rotating ring — rose */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '-38px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(224,86,160,0.25)',
                }}
              />
              {/* Glow — gold */}
              <div style={{
                position: 'absolute', inset: '-12px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,166,35,0.18) 0%, rgba(224,86,160,0.08) 50%, transparent 70%)',
                animation: 'gold-glow-pulse 4s ease-in-out infinite',
              }} />
              {/* Avatar Circle */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: 'linear-gradient(145deg, #F5A623 0%, #E056A0 55%, #3ECFCF 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8rem', boxShadow: '0 20px 70px rgba(245,166,35,0.35), 0 0 0 3px rgba(245,166,35,0.2)',
                  border: '3px solid rgba(255,255,255,0.12)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <img
                  src="/avatar.jpg"
                  alt="Mohammed Ramadan"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', borderRadius: '50%',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                <div style={{
                  display: 'none', alignItems: 'center',
                  justifyContent: 'center', fontSize: '8rem',
                  position: 'absolute', inset: 0,
                }}>
                  👨‍💻
                </div>
              </motion.div>

              {/* Tech badge - React */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                style={{
                  position: 'absolute', top: '10%', right: '-20%',
                  background: 'var(--bg-card)', borderRadius: '12px',
                  padding: '8px 14px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  border: '1px solid var(--border)', display: 'flex',
                  alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700,
                  color: 'var(--text)',
                  whiteSpace: 'nowrap',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
                  <ellipse cx="50" cy="50" rx="47" ry="18" fill="none" stroke="#61DAFB" strokeWidth="5"/>
                  <ellipse cx="50" cy="50" rx="47" ry="18" fill="none" stroke="#61DAFB" strokeWidth="5" transform="rotate(60 50 50)"/>
                  <ellipse cx="50" cy="50" rx="47" ry="18" fill="none" stroke="#61DAFB" strokeWidth="5" transform="rotate(120 50 50)"/>
                </svg>
                React
              </motion.div>

              {/* Tech badge - Flutter */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                style={{
                  position: 'absolute', bottom: '15%', left: '-25%',
                  background: 'var(--bg-card)', borderRadius: '12px',
                  padding: '8px 14px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  border: '1px solid var(--border)', display: 'flex',
                  alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700,
                  color: 'var(--text)',
                  whiteSpace: 'nowrap',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <polygon points="12,50 50,12 88,50 62,50 50,38 38,50" fill="#54C5F8"/>
                  <polygon points="38,50 50,62 62,50 88,50 50,88 26,64" fill="#01579B"/>
                  <polygon points="50,62 62,50 88,50 64,74" fill="#29B6F6"/>
                </svg>
                Flutter
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', display: 'flex',
              flexDirection: 'column', alignItems: 'center', gap: '4px',
              fontSize: '0.8rem', fontWeight: 500,
            }}
          >
            <span>{t.hero.scrollDown}</span>
            <ChevronDown size={20} />
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-avatar { display: none; }
        }
      `}</style>
    </section>
  )
}
