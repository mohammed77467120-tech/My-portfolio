import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Trophy, Calendar } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { timelineItems, type TimelineItem } from '../../data/experience'

function getTypeIcon(type: TimelineItem['type']) {
  switch (type) {
    case 'education': return GraduationCap
    case 'achievement': return Trophy
    default: return Briefcase
  }
}

function getTypeColor(type: TimelineItem['type']) {
  switch (type) {
    case 'education': return '#3ECFCF'
    case 'achievement': return '#F5A623'
    default: return '#646CFF'
  }
}

export default function ExperienceSection() {
  const { lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isAr = lang === 'ar'

  return (
    <section id="experience" className="section" style={{ padding: '6rem 0' }}>
      <div className="container" ref={ref}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--copper)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.75rem',
            }}
          >
            <Calendar size={16} />
            <span>{isAr ? 'المسيرة والإنجازات' : 'Journey & Milestones'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              margin: '0 0 1rem 0',
            }}
          >
            {isAr ? 'الخبرة والمسيرة التعليمية' : 'Experience & Education'}
          </motion.h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', fontSize: '0.98rem', lineHeight: 1.6 }}>
            {isAr
              ? 'رحلة متواصلة من التعلم والبناء والابتكار منذ عام 2020 حتى اليوم'
              : 'A continuous journey of learning, building, and innovating since 2020'}
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto' }}>
          {/* Center vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--copper), var(--accent-cyan), transparent)',
              transform: 'translateX(-50%)',
              opacity: 0.4,
            }}
          />

          {timelineItems.map((item, index) => {
            const TypeIcon = getTypeIcon(item.type)
            const color = getTypeColor(item.type)
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  paddingBottom: '2.5rem',
                  position: 'relative',
                }}
              >
                {/* Center dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '24px',
                    transform: 'translate(-50%, -50%)',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: color,
                    border: '3px solid var(--bg-primary)',
                    boxShadow: `0 0 12px ${color}80`,
                    zIndex: 2,
                  }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    width: 'calc(50% - 2.5rem)',
                    padding: '1.5rem',
                    borderRadius: '20px',
                    background: 'var(--bg-card)',
                    border: `1px solid ${item.highlight ? color + '60' : 'var(--border-strong)'}`,
                    backdropFilter: 'blur(16px)',
                    boxShadow: item.highlight ? `0 8px 30px ${color}20` : 'var(--shadow-sm)',
                    position: 'relative',
                    cursor: 'default',
                  }}
                >
                  {/* Year badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 10px',
                      borderRadius: '100px',
                      background: `${color}18`,
                      border: `1px solid ${color}40`,
                      color,
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      marginBottom: '0.85rem',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    <TypeIcon size={12} />
                    {item.year}
                  </div>

                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-heading)',
                      margin: '0 0 0.35rem 0',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title[lang as 'en' | 'ar']}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.8rem',
                      color,
                      fontWeight: 700,
                      marginBottom: '0.6rem',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {item.organization[lang as 'en' | 'ar']}
                  </div>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      margin: '0 0 1rem 0',
                    }}
                  >
                    {item.description[lang as 'en' | 'ar']}
                  </p>

                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '3px 10px',
                          borderRadius: '100px',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-muted)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile responsive style */}
      <style>{`
        @media (max-width: 640px) {
          #experience .timeline-card { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
