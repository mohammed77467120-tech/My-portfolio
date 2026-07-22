import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Globe, Menu, X, Download } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'
import { getAssetUrl } from '../../utils/asset'

const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'contact', href: '#contact' },
]

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme()
  const { t, toggleLang, lang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 20)

    // Active section detection
    const sections = navLinks.map(l => l.key)
    for (const id of sections.reverse()) {
      const el = document.getElementById(id)
      if (el && window.scrollY >= el.offsetTop - 120) {
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
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
          boxShadow: scrolled ? 'var(--shadow)' : 'none',
        }}
      >
        <div className="container-custom">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={() => handleNavClick('#home')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '12px',
                border: '1px solid transparent',
                background: 'rgba(255,255,255,0)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(245, 166, 35, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(245, 166, 35, 0.25)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 166, 35, 0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img
                src={getAssetUrl('/avatar.jpg')}
                alt="MR Logo"
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  border: '1.5px solid var(--primary)',
                }}
              />
              <span style={{
                fontSize: '1.3rem',
                fontWeight: 900,
                background: 'var(--gradient-gold)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}>
                MR
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}
              className="hidden-mobile">
              {navLinks.map((link) => (
                <motion.button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  whileHover={{ y: -1 }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: activeSection === link.key ? 600 : 500,
                    color: activeSection === link.key ? 'var(--primary)' : 'var(--text-muted)',
                    backgroundColor: activeSection === link.key ? 'rgba(245,166,35,0.08)' : 'transparent',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                  {activeSection === link.key && (
                    <motion.div
                      layoutId="activeNav"
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Right Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Lang Toggle */}
              <motion.button
                onClick={toggleLang}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Switch Language"
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: 'none', border: '1px solid var(--border)',
                  borderRadius: '8px', padding: '6px 10px', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                <Globe size={14} />
                {lang === 'en' ? 'AR' : 'EN'}
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Toggle Theme"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '38px', height: '38px', borderRadius: '8px',
                  background: 'none', border: '1px solid var(--border)',
                  cursor: 'pointer', color: 'var(--text-muted)',
                  transition: 'all 0.2s',
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
              </motion.button>

              {/* Download CV — Desktop only */}
              <motion.a
                href={profile.resume}
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden-mobile"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '10px',
                  background: 'var(--gradient-hero)',
                  color: 'white', textDecoration: 'none',
                  fontSize: '0.85rem', fontWeight: 600,
                  boxShadow: '0 4px 16px rgba(245,166,35,0.3)',
                }}
              >
                <Download size={14} />
                {t.nav.downloadCV}
              </motion.a>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMenuOpen(o => !o)}
                whileTap={{ scale: 0.9 }}
                className="show-mobile"
                style={{
                  display: 'none',
                  alignItems: 'center', justifyContent: 'center',
                  width: '38px', height: '38px', borderRadius: '8px',
                  background: 'none', border: '1px solid var(--border)',
                  cursor: 'pointer', color: 'var(--text)',
                }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 50,
                width: '280px', background: 'var(--bg-card)',
                borderLeft: '1px solid var(--border)',
                padding: '2rem 1.5rem',
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
                  style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(245, 166, 35, 0.2)',
                    background: 'rgba(245, 166, 35, 0.05)',
                  }}
                >
                  <img
                    src={getAssetUrl('/avatar.jpg')}
                    alt="MR Logo"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      border: '1.5px solid var(--primary)',
                    }}
                  />
                  <span style={{
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    background: 'var(--gradient-gold)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.5px',
                  }}>
                    MR
                  </span>
                </a>
                <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
                  <X size={20} />
                </button>
              </div>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: activeSection === link.key ? 'rgba(245,166,35,0.08)' : 'none',
                    border: 'none', cursor: 'pointer',
                    padding: '0.85rem 1rem', borderRadius: '10px',
                    textAlign: 'left', fontSize: '1rem',
                    fontWeight: activeSection === link.key ? 600 : 400,
                    color: activeSection === link.key ? 'var(--primary)' : 'var(--text)',
                    transition: 'all 0.2s',
                  }}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </motion.button>
              ))}
              <motion.a
                href={profile.resume}
                download
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  marginTop: 'auto',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '12px', borderRadius: '12px',
                  background: 'var(--gradient-hero)',
                  color: 'white', textDecoration: 'none', fontWeight: 600,
                }}
              >
                <Download size={16} />
                {t.nav.downloadCV}
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
