import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'

function StatCard({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      style={{
        background: 'var(--bg-card)', borderRadius: '16px',
        padding: '1.5rem', textAlign: 'center',
        border: '1px solid var(--border)', boxShadow: 'var(--shadow)',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.5 }}
        style={{
          fontSize: '2.5rem', fontWeight: 900,
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}
      >
        {value}+
      </motion.div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '4px' }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const stats = [
    { value: profile.stats.yearsLearning, label: t.about.yearsLearning },
    { value: profile.stats.projects, label: t.about.projects },
    { value: profile.stats.certificates, label: t.about.certificates },
    { value: profile.stats.technologies, label: t.about.technologies },
  ]

  const links = [
    { icon: MapPin, text: profile.location[lang as 'en' | 'ar'], href: null },
    { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, text: profile.phone, href: `tel:${profile.phone}` },
    { icon: GithubIcon, text: 'GitHub', href: profile.github },
    { icon: LinkedinIcon, text: 'LinkedIn', href: profile.linkedin },
    { icon: InstagramIcon, text: 'Instagram', href: profile.instagram },
  ]

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--primary)',
          }}>
            {t.about.subtitle}
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
            color: 'var(--text)', marginTop: '0.5rem', letterSpacing: '-0.5px',
          }}>
            {t.about.title}
          </h2>
          <div style={{
            width: '60px', height: '3px', borderRadius: '2px',
            background: 'var(--gradient-primary)',
            margin: '1rem auto 0',
          }} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }} className="about-grid">

          {/* Left — Avatar & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
          {/* Avatar */}
            <div style={{
              width: '100%', maxWidth: '400px', aspectRatio: '1',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '3px solid transparent',
              backgroundImage: 'linear-gradient(var(--bg-card), var(--bg-card)), var(--gradient-primary)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow)',
              position: 'relative',
            }}>
              <img
                src="/avatar.jpg"
                alt="Mohammed Ramadan"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              <div style={{
                display: 'none', width: '100%', height: '100%',
                background: 'linear-gradient(135deg, rgba(245,166,35,0.12), rgba(224,86,160,0.08))',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '8rem',
                position: 'absolute', inset: 0,
              }}>
                👨‍💻
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {links.map(({ icon: Icon, text, href }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'rgba(245,166,35,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} color="var(--primary)" />
                  </div>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{
                      color: 'var(--text-muted)', textDecoration: 'none',
                      fontSize: '0.9rem', transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — About Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 style={{
              fontSize: '1.6rem', fontWeight: 700,
              color: 'var(--text)', marginBottom: '1.5rem',
            }}>
              {profile.title[lang as 'en' | 'ar']}
            </h3>
            {profile.about[lang as 'en' | 'ar'].split('\n\n').map((para, i) => (
              <p key={i} style={{
                color: 'var(--text-muted)', lineHeight: 1.9,
                marginBottom: '1rem', fontSize: '1rem',
              }}>
                {para}
              </p>
            ))}

            {/* Stats Grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem', marginTop: '2rem',
            }}>
              {stats.map((stat, i) => (
                <StatCard key={i} value={stat.value} label={stat.label} delay={0.5 + i * 0.1} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
