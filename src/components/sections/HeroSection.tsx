import { motion } from 'framer-motion'
import {
  Download,
  FolderGit2,
  Mail,
  Sparkles,
  MapPin,
  Phone,
  ArrowDown,
  Copy,
  Check,
  Award,
  Layers,
  Calendar,
  Code2,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'
import D3HeroConstellation from '../d3/D3HeroConstellation'
import { useEffect, useState } from 'react'

// Typing Animation Hook with Smooth Transitions
function useTypingEffect(words: string[], speed = 75, pause = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex] || words[0] || ''
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

// Copy to clipboard mini component
function CopyPill({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <button
      onClick={handleCopy}
      title={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '100px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-strong)',
        color: copied ? '#22C55E' : 'var(--text-secondary)',
        fontSize: '0.8rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {copied ? <Check size={13} color="#22C55E" /> : <Copy size={13} />}
      <span>{copied ? 'تم النسخ' : text}</span>
    </button>
  )
}

export default function HeroSection() {
  const { t, lang } = useLang()
  const isAr = lang === 'ar'

  const typingWords = profile.titles[lang as 'en' | 'ar'] || profile.titles.en
  const typedText = useTypingEffect(typingWords, 70, 2200)

  const stats = [
    {
      value: `+${profile.stats.projects}`,
      label: isAr ? 'مشروع منجز' : 'Completed Projects',
      icon: Layers,
      color: 'var(--copper)',
    },
    {
      value: `+${profile.stats.yearsLearning}`,
      label: isAr ? 'سنوات الخبرة' : 'Years Experience',
      icon: Calendar,
      color: 'var(--accent-cyan)',
    },
    {
      value: `+${profile.stats.technologies}`,
      label: isAr ? 'تقنية برمجية' : 'Technologies',
      icon: Award,
      color: 'var(--copper-light)',
    },
  ]

  const socialLinks = [
    { icon: GithubIcon, href: profile.github, label: 'GitHub' },
    { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
    { icon: InstagramIcon, href: profile.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${profile.phone}`, label: 'Phone' },
  ]

  // Name split words for staggered dynamic reveal animation
  const fullName = profile.name[lang as 'en' | 'ar']
  const nameWords = fullName.split(' ')

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(5rem, 9vw, 7.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Background Interactive D3 Constellation Network */}
      <D3HeroConstellation />

      {/* Anchor point for #about */}
      <div id="about" style={{ position: 'absolute', top: '10%', left: 0, width: '1px', height: '1px', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Master Centered Hero Layout (No Personal Photo Section) */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Hero Details & Animated Typography */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Role Badge with Live Typing */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '8px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--copper)',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                marginBottom: '1.25rem',
                width: 'fit-content',
              }}
            >
              <Sparkles size={15} className="hero-sparkle" />
              <span>
                {typedText}
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1.1em',
                    background: 'var(--copper)',
                    marginInlineStart: '3px',
                    verticalAlign: 'middle',
                    animation: 'blink 1s step-end infinite',
                  }}
                />
              </span>
            </motion.div>

            {/* Staggered Animated Headline Name with Shimmer Gradient */}
            <h1
              className="animated-hero-title"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: isAr ? 1.3 : 1.12,
                fontFamily: 'var(--font-heading)',
                margin: '0 0 1rem 0',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.55rem',
              }}
            >
              {nameWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
                  className="shimmer-text"
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Location Pill & Specialization Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                <MapPin size={15} />
                <span>{profile.location[lang as 'en' | 'ar']}</span>
              </div>

              <span style={{ color: 'var(--border-strong)', fontSize: '0.8rem' }}>•</span>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--copper-light)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                }}
              >
                <Code2 size={15} />
                <span>{isAr ? 'خريج IT ومطور تطبيقات الويب والجوال' : 'IT Graduate & Web/Mobile Developer'}</span>
              </div>

              <span style={{ color: 'var(--border-strong)', fontSize: '0.8rem' }}>•</span>

              {/* Status Live Indicator Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#22C55E',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  background: 'rgba(34,197,94,0.1)',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  border: '1px solid rgba(34,197,94,0.3)',
                }}
              >
                <div
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#22C55E',
                    boxShadow: '0 0 8px #22C55E',
                  }}
                />
                <span>{isAr ? 'متاح للعمل والمشاريع' : 'Available for Work'}</span>
              </div>
            </motion.div>

            {/* Dynamic Animated Bio Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(1rem, 1.25vw, 1.12rem)',
                lineHeight: 1.8,
                marginBottom: '2rem',
                maxWidth: '680px',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: '0 0 0.85rem 0' }}>
                {profile.summary[lang as 'en' | 'ar']}
              </p>
              <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
                {isAr
                  ? 'متخصص في بناء وتطوير تطبيقات الويب بـ React وتطبيقات الموبايل بـ Flutter، مع خبرة في إدارة قواعد البيانات، الخوادم، وهندسة الشبكات.'
                  : 'Specialized in engineering modern web applications with React, mobile apps with Flutter, database architecture, and network administration.'}
              </p>
            </motion.div>

            {/* Interactive Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{
                display: 'flex',
                gap: '0.85rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
              }}
            >
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

              <a
                href={profile.resume}
                download
                className="btn btn-outline"
                style={{ fontSize: '0.85rem' }}
              >
                <Download size={15} />
                <span>{t.hero.downloadResume}</span>
              </a>
            </motion.div>

            {/* Social & Contact Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="btn-icon"
                  style={{ width: 40, height: 40, minWidth: 40 }}
                >
                  <Icon size={17} />
                </a>
              ))}

              <CopyPill text={profile.email} label={isAr ? 'نسخ البريد الإلكتروني' : 'Copy Email'} />
            </motion.div>
          </motion.div>
        </div>

        {/* Unified Bottom Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '1.1rem 1.25rem',
                  borderRadius: '12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '10px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      color: stat.color,
                      fontFamily: 'var(--font-heading)',
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                      marginTop: '2px',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          opacity: 0.6,
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} color="var(--copper)" />
        </motion.div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .hero-sparkle {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .shimmer-text {
          background: linear-gradient(135deg, var(--text-primary) 30%, var(--copper-light) 60%, var(--accent-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  )
}
