import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Trophy, Calendar, Sparkles } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { timelineItems, type TimelineItem } from '../../data/experience'

function getTypeIcon(type: TimelineItem['type']) {
  switch (type) {
    case 'education':
      return GraduationCap
    case 'achievement':
      return Trophy
    default:
      return Briefcase
  }
}

function getTypeColor(type: TimelineItem['type']) {
  switch (type) {
    case 'education':
      return '#38BDF8'
    case 'achievement':
      return '#34D399'
    default:
      return '#0284C7'
  }
}

export default function ExperienceSection() {
  const { lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isAr = lang === 'ar'

  return (
    <section id="experience" className="section" style={{ padding: 'clamp(4rem, 8vw, 6.5rem) 0' }}>
      <div className="container" ref={ref}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--copper)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
            }}
          >
            <Calendar size={16} />
            <span>{isAr ? 'المسيرة والإنجازات' : 'Career & Journey'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
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

          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '580px',
              margin: '0 auto',
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              lineHeight: 1.65,
            }}
          >
            {isAr
              ? 'مسار الخبرة المهنية، التعليم، والمشاريع البرمجية'
              : 'Professional experience, academic education, and software projects'}
          </p>
        </div>

        {/* ── DESKTOP TIMELINE (Visible >= 768px) ── */}
        <div className="timeline-desktop" style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* Central Spine */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'var(--border)',
              transform: 'translateX(-50%)',
            }}
          />

          {timelineItems.map((item, index) => {
            const TypeIcon = getTypeIcon(item.type)
            const color = getTypeColor(item.type)
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  paddingBottom: '2.5rem',
                  position: 'relative',
                  width: '100%',
                }}
              >
                {/* Center Node Dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '24px',
                    transform: 'translate(-50%, -50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: color,
                    border: '3px solid var(--bg-primary)',
                    boxShadow: `0 0 14px ${color}`,
                    zIndex: 3,
                  }}
                />

                {/* Card Container */}
                <div
                  style={{
                    width: 'calc(50% - 2.5rem)',
                    padding: '1.5rem',
                    borderRadius: '14px',
                    background: 'var(--bg-card)',
                    border: `1px solid ${item.highlight ? 'var(--copper)' : 'var(--border)'}`,
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  {/* Top Header: Badge & Category */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '100px',
                        background: `${color}18`,
                        border: `1px solid ${color}45`,
                        color,
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      <TypeIcon size={13} />
                      <span>{item.year}</span>
                    </div>

                    {item.highlight && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color,
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        <Sparkles size={12} />
                        {isAr ? 'محطة بارزة' : 'Milestone'}
                      </span>
                    )}
                  </div>

                  {/* Title & Organization */}
                  <h3
                    style={{
                      fontSize: '1.08rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-heading)',
                      margin: '0 0 0.3rem 0',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title[lang as 'en' | 'ar']}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.84rem',
                      color,
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {item.organization[lang as 'en' | 'ar']}
                  </div>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
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
                          fontSize: '0.74rem',
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── MOBILE TIMELINE (Visible < 768px) ── */}
        <div className="timeline-mobile" style={{ position: 'relative', width: '100%' }}>
          {/* Side Vertical Rail */}
          <div
            style={{
              position: 'absolute',
              insetInlineStart: '15px',
              top: '10px',
              bottom: '10px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--copper), var(--accent-cyan), transparent)',
              opacity: 0.4,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {timelineItems.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type)
              const color = getTypeColor(item.type)

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  style={{
                    position: 'relative',
                    paddingInlineStart: '38px',
                    width: '100%',
                  }}
                >
                  {/* Side Dot Marker */}
                  <div
                    style={{
                      position: 'absolute',
                      insetInlineStart: '8px',
                      top: '20px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: color,
                      border: '3px solid var(--bg-primary)',
                      boxShadow: `0 0 10px ${color}`,
                      zIndex: 2,
                    }}
                  />

                  {/* 100% Full Width Mobile Card */}
                  <div
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      borderRadius: '14px',
                      background: 'var(--bg-card)',
                      border: `1px solid ${item.highlight ? 'var(--copper)' : 'var(--border)'}`,
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    {/* Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        marginBottom: '0.65rem',
                      }}
                    >
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
                        }}
                      >
                        <TypeIcon size={12} />
                        <span>{item.year}</span>
                      </div>

                      {item.highlight && (
                        <span style={{ color, fontSize: '0.7rem', fontWeight: 700 }}>
                          ★ {isAr ? 'مميز' : 'Featured'}
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-heading)',
                        margin: '0 0 0.25rem 0',
                        lineHeight: 1.35,
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
                      }}
                    >
                      {item.organization[lang as 'en' | 'ar']}
                    </div>

                    <p
                      style={{
                        fontSize: '0.84rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        margin: '0 0 0.85rem 0',
                      }}
                    >
                      {item.description[lang as 'en' | 'ar']}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '2px 8px',
                            borderRadius: '100px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-muted)',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .timeline-desktop {
          display: block;
        }
        .timeline-mobile {
          display: none;
        }
        @media (max-width: 768px) {
          .timeline-desktop {
            display: none !important;
          }
          .timeline-mobile {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}
