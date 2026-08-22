import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Globe, Menu, X, Download } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'

const navLinks = [
  { key: 'home', href: '#home' },
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
    setScrolled(window.scrollY > 50)
    const sections = [...navLinks].map((l) => l.key).reverse()
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el && window.scrollY >= el.offsetTop - 220) {
        setActiveSection(id)
        break
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── DESKTOP FLOATING PILL NAVBAR ─────────────────── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden-mobile"
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 10px',
          borderRadius: '100px',
          background: scrolled ? 'var(--nav-bg)' : 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-md)',
          transition: 'all 0.3s ease',
        }}
      >
        {navLinks.map((link) => {
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
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                fontFamily: 'var(--font-heading)',
                color: isActive ? 'var(--copper)' : 'var(--text-secondary)',
                transition: 'color 0.25s',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="navPill"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '100px',
                    background: 'var(--copper-subtle)',
                    border: '1px solid var(--copper)',
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
        <div
          style={{
            width: 1,
            height: 22,
            background: 'var(--border-strong)',
            margin: '0 6px',
          }}
        />

        {/* Language Switch */}
        <button
          onClick={toggleLang}
          title="Switch Language"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '7px 12px',
            borderRadius: '100px',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            transition: 'background 0.2s',
          }}
        >
          <Globe size={15} color="var(--copper)" />
          <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
        </button>

        {/* Theme Switch */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'color 0.2s',
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
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.div>
          </AnimatePresence>
        </button>

        {/* CV Download */}
        <a
          href={profile.resume}
          download
          className="btn btn-primary"
          style={{
            padding: '7px 16px',
            fontSize: '0.8rem',
            marginInlineStart: '4px',
          }}
        >
          <Download size={14} />
          <span>CV</span>
        </a>
      </motion.nav>

      {/* ── MOBILE HEADER (Visible < 768px) ────────────────── */}
      <div
        className="mobile-nav-bar mobile-only"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          background: scrolled ? 'var(--nav-bg)' : 'rgba(9, 13, 22, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          transition: 'all 0.3s ease',
        }}
      >
        <span
          onClick={() => handleNavClick('#home')}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.2rem',
            color: 'var(--copper)',
            cursor: 'pointer',
          }}
        >
          MR
        </span>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Mobile Lang Button */}
          <button
            onClick={toggleLang}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              borderRadius: '100px',
              padding: '6px 12px',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Globe size={14} color="var(--copper)" />
            <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Mobile Theme Button */}
          <button
            onClick={toggleTheme}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--copper)',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU OVERLAY ────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'var(--bg-overlay)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.75rem',
              padding: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  color: activeSection === link.key ? 'var(--copper)' : 'var(--text-primary)',
                }}
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </motion.button>
            ))}

            <motion.a
              href={profile.resume}
              download
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="btn btn-primary"
              style={{
                padding: '12px 28px',
                fontSize: '0.95rem',
                marginTop: '1rem',
              }}
            >
              <Download size={16} />
              <span>{t.nav.downloadCV}</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
