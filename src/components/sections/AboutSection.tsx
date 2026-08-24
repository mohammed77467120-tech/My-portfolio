import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, Phone, UserCheck, GraduationCap } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'

export default function AboutSection() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isAr = lang === 'ar'

  const links = [
    { icon: MapPin, text: profile.location[lang as 'en' | 'ar'], href: undefined },
    { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, text: profile.phone, href: `tel:${profile.phone}` },
    { icon: GithubIcon, text: 'GitHub Profile', href: profile.github },
    { icon: LinkedinIcon, text: 'LinkedIn Profile', href: profile.linkedin },
    { icon: InstagramIcon, text: 'Instagram', href: profile.instagram },
  ]

  return (
    <section id="about" className="section" style={{ padding: '6rem 0' }}>
      <div className="container" ref={ref}>
        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Formal Academic & Technical Credentials Card (No Photo) */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                padding: '2rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              {/* Header Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  background: 'var(--copper-subtle)',
                  border: '1px solid var(--copper)',
                  color: 'var(--copper)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  width: 'fit-content',
                }}
              >
                <GraduationCap size={16} />
                <span>{isAr ? 'خريج تقنية معلومات معتمد' : 'Verified IT Graduate'}</span>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  {isAr ? 'المؤهلات الأكاديمية والمهنية' : 'Academic & Professional Credentials'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {isAr
                    ? 'بكالوريوس تقنية معلومات من جامعة الأحقاف (2022 - 2026)، متخصص في تطوير برمجيات الويب وتطبيقات الجوال والأنظمة.'
                    : 'B.Sc. in Information Technology from Al-Ahqaf University (2022 - 2026), specializing in Web & Mobile software engineering.'}
                </p>
              </div>

              {/* Fast Spec Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {isAr ? 'الجامعة:' : 'University:'}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {isAr ? 'جامعة الأحقاف (حضرموت)' : 'Al-Ahqaf University'}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {isAr ? 'الدرجة والتخصص:' : 'Degree & Major:'}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--copper)' }}>
                    B.Sc. IT (Web & Mobile)
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {isAr ? 'إجمالي المهارات المعتمدة:' : 'Verified CV Skills:'}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    23 Technical Skills
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Detailed Bio & Info with High Contrast Colors */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-cyan)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              <UserCheck size={16} />
              <span>{t.about.subtitle}</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                margin: '0 0 1.5rem 0',
              }}
            >
              {t.about.title}
            </h2>

            {/* Paragraphs with crisp contrast in light and dark mode */}
            <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {profile.about[lang as 'en' | 'ar']
                .split('\n\n')
                .map((para, i) => (
                  <p key={i} style={{ marginBottom: '1rem' }}>
                    {para}
                  </p>
                ))}
            </div>

            {/* Links Grid with High Contrast Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
              }}
            >
              {links.map(({ icon: Icon, text, href }) => {
                const content = (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-strong)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <Icon size={16} color="var(--copper)" />
                    <span>{text}</span>
                  </div>
                )

                if (href) {
                  return (
                    <a
                      key={text}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ textDecoration: 'none' }}
                    >
                      {content}
                    </a>
                  )
                }
                return <div key={text}>{content}</div>
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
