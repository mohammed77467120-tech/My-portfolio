import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ZoomIn } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { projects } from '../../data/projects'
import ProjectGalleryModal from '../ui/ProjectGalleryModal'

// ─── Project Card ─────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { t, lang } = useLang()
  const isAr = lang === 'ar'

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryStartIdx, setGalleryStartIdx] = useState(0)
  const [imgError, setImgError] = useState(false)

  const openGallery = (idx = 0) => {
    setGalleryStartIdx(idx)
    setGalleryOpen(true)
  }

  const statusColors: Record<string, string> = {
    completed:   '#22C55E',
    'in-progress': '#F59E0B',
    planned:     '#6B7280',
    archived:    '#EF4444',
  }

  return (
    <>
      {/* ── Gallery Modal ─────────────────────────────── */}
      <AnimatePresence>
        {galleryOpen && (
          <ProjectGalleryModal
            project={project}
            initialIndex={galleryStartIdx}
            onClose={() => setGalleryOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Card ──────────────────────────────────────── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.12, duration: 0.5 }}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.boxShadow = '0 20px 50px rgba(245,166,35,0.15)'
          e.currentTarget.style.borderColor = 'rgba(245,166,35,0.35)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'var(--shadow)'
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        {/* ── Cover Image (click → open gallery) ──────── */}
        <div
          style={{
            height: '220px', position: 'relative',
            overflow: 'hidden', cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(245,166,35,0.08), rgba(224,86,160,0.06))',
          }}
          onClick={() => openGallery(0)}
        >
          {!imgError && project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title.en}
              onError={() => setImgError(true)}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '5rem',
            }}>
              {project.category === 'mobile' ? '📱' :
               project.category === 'fullstack' ? '🚀' : '🎨'}
            </div>
          )}

          {/* Hover overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.45)'
              const icon = e.currentTarget.querySelector('.zoom-icon') as HTMLElement
              if (icon) icon.style.opacity = '1'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,0,0,0)'
              const icon = e.currentTarget.querySelector('.zoom-icon') as HTMLElement
              if (icon) icon.style.opacity = '0'
            }}
          >
            <div className="zoom-icon" style={{
              opacity: 0, transition: 'opacity 0.3s',
              color: 'white', display: 'flex', alignItems: 'center',
              flexDirection: 'column', gap: '8px',
              fontSize: '0.88rem', fontWeight: 700,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>
              <ZoomIn size={28} />
              {isAr ? 'عرض المعرض' : 'View Gallery'}
            </div>
          </div>

          {/* Badges */}
          {project.featured && (
            <div style={{
              position: 'absolute', top: '12px', right: '12px',
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '4px 10px', borderRadius: '100px',
              background: 'linear-gradient(135deg, rgba(245,166,35,0.92), rgba(224,86,160,0.85))',
              backdropFilter: 'blur(8px)',
              color: 'white', fontSize: '0.72rem', fontWeight: 700,
              boxShadow: '0 2px 12px rgba(245,166,35,0.4)',
            }}>
              <Star size={10} fill="white" />
              {t.projects.featured}
            </div>
          )}
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            padding: '4px 10px', borderRadius: '100px',
            background: statusColors[project.status] + '25',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${statusColors[project.status]}50`,
            color: statusColors[project.status],
            fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'capitalize',
          }}>
            {project.status.replace('-', ' ')}
          </div>

          {/* Screenshot counter */}
          {project.screenshots.length > 1 && (
            <div style={{
              position: 'absolute', bottom: '10px', right: '12px',
              padding: '3px 8px', borderRadius: '6px',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
              color: 'white', fontSize: '0.72rem', fontWeight: 600,
            }}>
              📸 {project.screenshots.length}
            </div>
          )}
        </div>

        {/* ── Thumbnail Strip (click → open gallery at index) ─ */}
        {project.screenshots.length > 1 && (
          <div style={{
            display: 'flex', gap: '4px', padding: '8px',
            background: 'var(--bg)', borderBottom: '1px solid var(--border)',
            overflowX: 'auto',
          }}>
            {project.screenshots.slice(0, 5).map((src, i) => (
              <div
                key={i}
                onClick={() => openGallery(i)}
                style={{
                  width: '52px', height: '40px', flexShrink: 0,
                  borderRadius: '6px', overflow: 'hidden',
                  cursor: 'pointer', border: '2px solid transparent',
                  transition: 'border-color 0.2s',
                  background: 'var(--border)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
              >
                <img
                  src={src}
                  alt={`thumb-${i}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
              </div>
            ))}
            {project.screenshots.length > 5 && (
              <div
                onClick={() => openGallery(5)}
                style={{
                  width: '52px', height: '40px', flexShrink: 0,
                  borderRadius: '6px', background: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--primary)',
                  fontSize: '0.75rem', fontWeight: 700,
                }}
              >
                +{project.screenshots.length - 5}
              </div>
            )}
          </div>
        )}

        {/* ── Content ─────────────────────────────────── */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <h3 style={{
              fontSize: '1.05rem', fontWeight: 700,
              color: 'var(--text)', lineHeight: 1.3,
            }}>
              {project.title[lang as 'en' | 'ar']}
            </h3>
          </div>

          <p style={{
            fontSize: '0.875rem', color: 'var(--text-muted)',
            lineHeight: 1.7, marginBottom: '1rem', flex: 1,
          }}>
            {project.description[lang as 'en' | 'ar']}
          </p>

          {/* Tech Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
            {project.technologies.slice(0, 4).map(tech => (
              <span key={tech} style={{
                padding: '3px 10px', borderRadius: '6px',
                background: 'rgba(245,166,35,0.08)',
                border: '1px solid rgba(245,166,35,0.2)',
                color: 'var(--primary)', fontSize: '0.74rem', fontWeight: 600,
              }}>
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span style={{
                padding: '3px 10px', borderRadius: '6px',
                background: 'var(--bg)', border: '1px solid var(--border)',
                color: 'var(--text-muted)', fontSize: '0.74rem',
              }}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '9px 16px', borderRadius: '10px',
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  color: 'var(--text)', textDecoration: 'none',
                  fontSize: '0.82rem', fontWeight: 600,
                  flex: 1, justifyContent: 'center',
                }}
              >
                <GithubIcon size={14} />
                {t.projects.sourceCode}
              </motion.a>
            )}
            <motion.button
              onClick={() => openGallery(0)}
              whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(245,166,35,0.35)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 16px', borderRadius: '10px',
                background: 'var(--gradient-hero)',
                color: 'white', border: 'none', cursor: 'pointer',
                fontSize: '0.82rem', fontWeight: 600,
                flex: 1, justifyContent: 'center',
                boxShadow: '0 3px 12px rgba(245,166,35,0.25)',
              }}
            >
              <ZoomIn size={14} />
              {isAr ? 'عرض المعرض' : 'View Gallery'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

// ─── Main Section ─────────────────────────────────────────
export default function ProjectsSection() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span style={{
            fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--primary)',
          }}>
            {t.projects.subtitle}
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
            color: 'var(--text)', marginTop: '0.5rem', letterSpacing: '-0.5px',
          }}>
            {t.projects.title}
          </h2>
          <div style={{
            width: '60px', height: '3px', borderRadius: '2px',
            background: 'var(--gradient-primary)',
            margin: '1rem auto 0',
          }} />
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.75rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <motion.a
            href="https://github.com/mohammed77467120-tech"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(245,166,35,0.45)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px', borderRadius: '12px',
              background: 'var(--gradient-hero)',
              color: 'white', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '0 4px 24px rgba(245,166,35,0.3)',
            }}
          >
            <GithubIcon size={18} />
            {t.projects.viewAll}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
