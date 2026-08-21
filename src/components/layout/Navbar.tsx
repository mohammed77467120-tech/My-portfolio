import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Globe, Menu, X, Download } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'

const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
]

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme()
  const { t, toggleLang, lang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
    const sections = [...navLinks].map(l => l.key).reverse()
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el && window.scrollY >= el.offsetTop - 200) {
        setActiveSection(id)
        break
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Desktop Floating Pill ────────────────────────── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="hidden-mobile"
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '6px 8px',
          borderRadius: '100px',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          border: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 0.4s, border 0.4s, backdrop-filter 0.4s',
        }}
      >
        {navLinks.map(link => {
          const isActive = activeSection === link.key
          return (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.href)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: isActive ? 600 : 400,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.04em',
                color: isActive ? 'var(--copper)' : 'var(--text-muted)',
                transition: 'color 0.3s',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="navPill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '100px',
                    background: 'var(--copper-subtle)',
                    border: '1px solid rgba(184, 115, 51, 0.2)',
                    zIndex: 0,
                  }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>
                {t.nav[link.key as keyof typeof t.nav]}
              </span>
            </button>
          )
        })}

        {/* Divider */}
        <div style={{
          width: 1,
          height: 20,
          background: 'var(--border-strong)',
          margin: '0 4px',
        }} />

        {/* Lang */}
        <button
          onClick={toggleLang}
          title="Switch Language"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 10px',
            borderRadius: '100px',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
            transition: 'color 0.3s',
          }}
        >
          <Globe size={14} />
          {lang === 'en' ? 'AR' : 'EN'}
        </button>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            transition: 'color 0.3s',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? 'sun' : 'moon'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </motion.div>
          </AnimatePresence>
        </button>

        {/* CV Download */}
        <a
          href={profile.resume}
          download
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: '100px',
            background: 'var(--copper)',
            color: '#FFFFFF',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
            textDecoration: 'none',
            transition: 'background 0.3s',
          }}
        >
          <Download size={13} />
          CV
        </a>
      </motion.nav>

      {/* ── Mobile Header ────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.3s',
        }}
        className="mobile-nav-bar"
      >
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'var(--copper)',
        }}>
          MR
        </span>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={toggleLang}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', padding: 6,
            }}
          >
            <Globe size={16} />
          </button>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', padding: 6,
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-primary)', padding: 6,
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ──────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'var(--bg-overlay)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  color: activeSection === link.key ? 'var(--copper)' : 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </motion.button>
            ))}

            <motion.a
              href={profile.resume}
              download
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                borderRadius: '4px',
                background: 'var(--copper)',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                textDecoration: 'none',
                marginTop: '1rem',
              }}
            >
              <Download size={16} />
              {t.nav.downloadCV}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-nav-bar { display: flex !important; }
        }
      `}</style>
    </>
  )
}
