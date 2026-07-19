import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, Mail, ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'

export default function Footer() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const socials = [
    { icon: GithubIcon, href: profile.github, label: 'GitHub' },
    { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
    { icon: InstagramIcon, href: profile.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  ]

  return (
    <footer ref={ref} style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border)',
      padding: '3.5rem 0 2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle gold glow top-left */}
      <div style={{
        position: 'absolute', top: 0, left: '10%',
        width: '400px', height: '200px',
        background: 'radial-gradient(ellipse at top, rgba(245,166,35,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Subtle rose glow top-right */}
      <div style={{
        position: 'absolute', top: 0, right: '10%',
        width: '300px', height: '180px',
        background: 'radial-gradient(ellipse at top, rgba(224,86,160,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '2rem',
        }} className="footer-grid">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '0.5rem',
            }}>
              <img
                src="/avatar.jpg"
                alt="MR Logo"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  border: '1.5px solid var(--primary)',
                }}
              />
              <span style={{
                fontSize: '1.6rem',
                fontWeight: 900,
                background: 'var(--gradient-gold)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px',
                lineHeight: 1,
              }}>
                MR
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '220px', lineHeight: 1.7 }}>
              Front-End & Mobile Developer based in Yemen.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', gap: '0.75rem' }}
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '42px', height: '42px', borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--text-muted)', textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--primary)'
                  e.currentTarget.style.borderColor = 'rgba(245,166,35,0.5)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(245,166,35,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 6px 20px rgba(245,166,35,0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 18px', borderRadius: '12px',
                border: '1px solid rgba(245,166,35,0.3)',
                background: 'rgba(245,166,35,0.08)',
                color: 'var(--primary)', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 600,
                transition: 'all 0.25s',
                backdropFilter: 'blur(8px)',
              }}
            >
              <ArrowUp size={16} />
              {t.common.backToTop}
            </motion.button>
          </motion.div>
        </div>

        {/* Divider — golden gradient */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.35), rgba(224,86,160,0.2), transparent)',
          margin: '0 0 1.5rem',
        }} />

        {/* Bottom copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem',
          }}
        >
          © {new Date().getFullYear()} Mohammed Ramadan. {t.footer.rights} {t.footer.madeWith}
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <Heart size={14} fill="#E056A0" color="#E056A0" />
          </motion.span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; text-align: center; justify-items: center; }
        }
      `}</style>
    </footer>
  )
}
