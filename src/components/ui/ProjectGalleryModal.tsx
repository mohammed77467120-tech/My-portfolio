import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronLeft, ChevronRight, ExternalLink,
  Clock, User, Layers, CheckCircle2, Images, Info
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { useLang } from '../../context/LangContext'
import type { Project } from '../../data/projects'

// ─── Types ────────────────────────────────────────────────
interface ProjectGalleryModalProps {
  project: Project
  initialIndex?: number
  onClose: () => void
}

// ─── Tab type ────────────────────────────────────────────
type Tab = 'gallery' | 'details'

// ─── Status colors ───────────────────────────────────────
const statusColor: Record<string, string> = {
  completed:   '#22C55E',
  'in-progress': '#F59E0B',
  planned:     '#6B7280',
  archived:    '#EF4444',
}

// ══════════════════════════════════════════════════════════
export default function ProjectGalleryModal({
  project,
  initialIndex = 0,
  onClose,
}: ProjectGalleryModalProps) {
  const { lang } = useLang()
  const isAr = lang === 'ar'

  const [currentIdx, setCurrentIdx] = useState(initialIndex)
  const [tab, setTab] = useState<Tab>('gallery')
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const total = project.screenshots.length
  const descriptions = project.screenshotDescriptions?.[isAr ? 'ar' : 'en'] ?? []

  // keyboard navigation
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft')  setCurrentIdx(i => isAr ? (i + 1) % total : (i - 1 + total) % total)
    if (e.key === 'ArrowRight') setCurrentIdx(i => isAr ? (i - 1 + total) % total : (i + 1) % total)
  }, [onClose, total, isAr])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  // reset image state when changing slide
  useEffect(() => {
    setImgLoaded(false)
    setImgError(false)
  }, [currentIdx])

  const prev = () => setCurrentIdx(i => (i - 1 + total) % total)
  const next = () => setCurrentIdx(i => (i + 1) % total)

  const currentDesc = descriptions[currentIdx]
  const [descTitle, descBody] = currentDesc
    ? currentDesc.split(' — ')
    : [`${isAr ? 'شاشة' : 'Screen'} ${currentIdx + 1}`, '']

  return (
    <AnimatePresence>
      {/* ─── Backdrop ─────────────────────────────────────── */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9000,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* ─── Modal Panel ────────────────────────────────── */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
          dir={isAr ? 'rtl' : 'ltr'}
          style={{
            width: '100%',
            maxWidth: '1100px',
            maxHeight: '92vh',
            background: 'var(--bg-card)',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Header ─────────────────────────────────────── */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.1rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg)',
            flexShrink: 0,
          }}>
            {/* Title + badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h2 style={{
                fontSize: '1.05rem', fontWeight: 800,
                color: 'var(--text)', margin: 0,
                lineHeight: 1.2,
              }}>
                {project.title[isAr ? 'ar' : 'en']}
              </h2>
              <span style={{
                padding: '3px 10px', borderRadius: '100px',
                background: statusColor[project.status] + '20',
                border: `1px solid ${statusColor[project.status]}50`,
                color: statusColor[project.status],
                fontSize: '0.72rem', fontWeight: 700,
                textTransform: 'capitalize',
              }}>
                {project.status.replace('-', ' ')}
              </span>
            </div>

            {/* Tabs + Close */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Tab: Gallery */}
              <button
                onClick={() => setTab('gallery')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '6px 14px', borderRadius: '8px', border: 'none',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                  background: tab === 'gallery'
                    ? 'var(--gradient-hero)'
                    : 'var(--bg-card)',
                  color: tab === 'gallery' ? 'white' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                }}
              >
                <Images size={14} />
                {isAr ? 'المعرض' : 'Gallery'}
              </button>

              {/* Tab: Details */}
              <button
                onClick={() => setTab('details')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '6px 14px', borderRadius: '8px', border: 'none',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                  background: tab === 'details'
                    ? 'var(--gradient-hero)'
                    : 'var(--bg-card)',
                  color: tab === 'details' ? 'white' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                }}
              >
                <Info size={14} />
                {isAr ? 'التفاصيل' : 'Details'}
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  cursor: 'pointer', color: 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                  marginInlineStart: '0.25rem',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#EF444420'
                  e.currentTarget.style.color = '#EF4444'
                  e.currentTarget.style.borderColor = '#EF444440'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg-card)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── Body ───────────────────────────────────────── */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence mode="wait">

              {/* ══ GALLERY TAB ═══════════════════════════════ */}
              {tab === 'gallery' && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isAr ? -30 : 30 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  {/* Main image area */}
                  <div style={{
                    flex: 1, position: 'relative',
                    background: 'linear-gradient(135deg,rgba(245,166,35,0.06),rgba(224,86,160,0.04))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    minHeight: 0,
                  }}>
                    {/* Prev */}
                    {total > 1 && (
                      <button
                        onClick={prev}
                        style={{
                          position: 'absolute',
                          [isAr ? 'right' : 'left']: '1rem',
                          zIndex: 10, width: '44px', height: '44px',
                          borderRadius: '50%', border: '1px solid var(--border)',
                          background: 'var(--bg-card)', cursor: 'pointer',
                          color: 'var(--text)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'var(--primary)'
                          e.currentTarget.style.color = 'white'
                          e.currentTarget.style.borderColor = 'var(--primary)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'var(--bg-card)'
                          e.currentTarget.style.color = 'var(--text)'
                          e.currentTarget.style.borderColor = 'var(--border)'
                        }}
                      >
                        {isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                      </button>
                    )}

                    {/* Image */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIdx}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.22 }}
                        style={{
                          maxWidth: '100%', maxHeight: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          padding: '1.5rem',
                        }}
                      >
                        {!imgError ? (
                          <img
                            src={project.screenshots[currentIdx]}
                            alt={descTitle || `Screen ${currentIdx + 1}`}
                            onLoad={() => setImgLoaded(true)}
                            onError={() => setImgError(true)}
                            style={{
                              maxWidth: '100%',
                              maxHeight: 'calc(92vh - 260px)',
                              objectFit: 'contain',
                              borderRadius: '12px',
                              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                              opacity: imgLoaded ? 1 : 0,
                              transition: 'opacity 0.3s',
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%', height: '320px',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            gap: '1rem', color: 'var(--text-muted)',
                          }}>
                            <span style={{ fontSize: '4rem' }}>
                              {project.category === 'mobile' ? '📱' : '🖥️'}
                            </span>
                            <span style={{ fontSize: '0.9rem' }}>
                              {isAr ? 'الصورة غير متاحة' : 'Image not available'}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Next */}
                    {total > 1 && (
                      <button
                        onClick={next}
                        style={{
                          position: 'absolute',
                          [isAr ? 'left' : 'right']: '1rem',
                          zIndex: 10, width: '44px', height: '44px',
                          borderRadius: '50%', border: '1px solid var(--border)',
                          background: 'var(--bg-card)', cursor: 'pointer',
                          color: 'var(--text)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'var(--primary)'
                          e.currentTarget.style.color = 'white'
                          e.currentTarget.style.borderColor = 'var(--primary)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'var(--bg-card)'
                          e.currentTarget.style.color = 'var(--text)'
                          e.currentTarget.style.borderColor = 'var(--border)'
                        }}
                      >
                        {isAr ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                      </button>
                    )}

                    {/* Counter pill */}
                    <div style={{
                      position: 'absolute', top: '1rem',
                      [isAr ? 'left' : 'right']: '1rem',
                      padding: '4px 12px', borderRadius: '100px',
                      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                      color: 'white', fontSize: '0.78rem', fontWeight: 600,
                    }}>
                      {currentIdx + 1} / {total}
                    </div>
                  </div>

                  {/* ── Description bar ───────────────────────── */}
                  {currentDesc && (
                    <motion.div
                      key={`desc-${currentIdx}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        padding: '0.85rem 1.5rem',
                        background: 'linear-gradient(135deg,rgba(37,99,235,0.06),rgba(6,182,212,0.04))',
                        borderTop: '1px solid var(--border)',
                        flexShrink: 0,
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.55 }}>
                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{descTitle}</span>
                        {descBody && (
                          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                            {' '}&mdash; {descBody}
                          </span>
                        )}
                      </p>
                    </motion.div>
                  )}

                  {/* ── Thumbnail strip ───────────────────────── */}
                  <div style={{
                    display: 'flex', gap: '6px',
                    padding: '0.75rem 1.25rem',
                    borderTop: '1px solid var(--border)',
                    background: 'var(--bg)',
                    overflowX: 'auto', flexShrink: 0,
                    scrollbarWidth: 'thin',
                  }}>
                    {project.screenshots.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIdx(i)}
                        style={{
                          flexShrink: 0,
                          width: i === currentIdx ? '72px' : '60px',
                          height: '48px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: i === currentIdx
                            ? '2px solid var(--primary)'
                            : '2px solid transparent',
                          background: 'var(--border)',
                          cursor: 'pointer',
                          padding: 0,
                          transition: 'all 0.2s',
                          opacity: i === currentIdx ? 1 : 0.55,
                          transform: i === currentIdx ? 'scale(1.05)' : 'scale(1)',
                          boxShadow: i === currentIdx ? '0 0 0 3px rgba(245,166,35,0.3)' : 'none',
                        }}
                        onMouseEnter={e => {
                          if (i !== currentIdx) e.currentTarget.style.opacity = '0.85'
                        }}
                        onMouseLeave={e => {
                          if (i !== currentIdx) e.currentTarget.style.opacity = '0.55'
                        }}
                      >
                        <img
                          src={src}
                          alt={`thumb-${i}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { e.currentTarget.style.display = 'none' }}
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ══ DETAILS TAB ════════════════════════════════ */}
              {tab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: isAr ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isAr ? 30 : -30 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    flex: 1, overflowY: 'auto', padding: '1.5rem',
                    scrollbarWidth: 'thin',
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.25rem',
                  }}>
                    {/* ── Info Card ─────────────────────────── */}
                    <div style={{
                      background: 'var(--bg)',
                      borderRadius: '16px', padding: '1.25rem',
                      border: '1px solid var(--border)',
                    }}>
                      <h3 style={{
                        fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px',
                        textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '1rem',
                      }}>
                        {isAr ? 'معلومات المشروع' : 'Project Info'}
                      </h3>

                      {[
                        { icon: <User size={15} />, label: isAr ? 'الدور' : 'Role', value: project.role[isAr ? 'ar' : 'en'] },
                        { icon: <Clock size={15} />, label: isAr ? 'المدة' : 'Duration', value: project.duration[isAr ? 'ar' : 'en'] },
                        { icon: <Layers size={15} />, label: isAr ? 'النوع' : 'Category', value: project.category },
                      ].map(({ icon, label, value }) => (
                        <div key={label} style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '0.6rem 0',
                          borderBottom: '1px solid var(--border)',
                        }}>
                          <span style={{ color: 'var(--primary)', flexShrink: 0 }}>{icon}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: '70px' }}>{label}</span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{value}</span>
                        </div>
                      ))}

                      {/* Description */}
                      <p style={{
                        fontSize: '0.85rem', color: 'var(--text-muted)',
                        lineHeight: 1.75, marginTop: '1rem', marginBottom: 0,
                      }}>
                        {project.description[isAr ? 'ar' : 'en']}
                      </p>
                    </div>

                    {/* ── Features Card ─────────────────────── */}
                    <div style={{
                      background: 'var(--bg)',
                      borderRadius: '16px', padding: '1.25rem',
                      border: '1px solid var(--border)',
                    }}>
                      <h3 style={{
                        fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px',
                        textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '1rem',
                      }}>
                        {isAr ? 'أبرز الميزات' : 'Key Features'}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {project.features[isAr ? 'ar' : 'en'].map((f, i) => (
                          <li key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: '8px',
                            padding: '0.4rem 0',
                            borderBottom: i < project.features.en.length - 1
                              ? '1px solid var(--border)' : 'none',
                          }}>
                            <CheckCircle2 size={15} style={{ color: '#22C55E', flexShrink: 0, marginTop: '2px' }} />
                            <span style={{ fontSize: '0.84rem', color: 'var(--text)', lineHeight: 1.5 }}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* ── Tech Stack Card ───────────────────── */}
                    <div style={{
                      background: 'var(--bg)',
                      borderRadius: '16px', padding: '1.25rem',
                      border: '1px solid var(--border)',
                    }}>
                      <h3 style={{
                        fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px',
                        textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '1rem',
                      }}>
                        {isAr ? 'التقنيات المستخدمة' : 'Tech Stack'}
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.technologies.map(tech => (
                          <span key={tech} style={{
                            padding: '5px 12px', borderRadius: '8px',
                            background: 'rgba(245,166,35,0.08)',
                            border: '1px solid rgba(245,166,35,0.2)',
                            color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 600,
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Screen descriptions list */}
                      {descriptions.length > 0 && (
                        <>
                          <h3 style={{
                            fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px',
                            textTransform: 'uppercase', color: 'var(--secondary)',
                            marginTop: '1.25rem', marginBottom: '0.75rem',
                          }}>
                            {isAr ? 'وصف الشاشات' : 'Screen Descriptions'}
                          </h3>
                          <ol style={{ paddingInlineStart: '1.2rem', margin: 0 }}>
                            {descriptions.map((desc, i) => {
                              const [t] = desc.split(' — ')
                              return (
                                <li
                                  key={i}
                                  onClick={() => { setCurrentIdx(i); setTab('gallery') }}
                                  style={{
                                    fontSize: '0.82rem', color: 'var(--text-muted)',
                                    marginBottom: '0.4rem', cursor: 'pointer',
                                    transition: 'color 0.15s',
                                    lineHeight: 1.5,
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)' }}
                                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                                >
                                  <span style={{ fontWeight: 600 }}>{t}</span>
                                </li>
                              )
                            })}
                          </ol>
                        </>
                      )}
                    </div>
                  </div>

                  {/* ── Action buttons ──────────────────────── */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '7px',
                          padding: '10px 22px', borderRadius: '10px',
                          background: 'var(--bg)', border: '1px solid var(--border)',
                          color: 'var(--text)', textDecoration: 'none',
                          fontSize: '0.85rem', fontWeight: 600,
                        }}
                      >
                        <GithubIcon size={16} />
                        {isAr ? 'الكود المصدري' : 'Source Code'}
                      </a>
                    )}
                    <button
                      onClick={() => setTab('gallery')}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '7px',
                        padding: '10px 22px', borderRadius: '10px',
                        background: 'var(--gradient-hero)',
                        color: 'white', border: 'none', cursor: 'pointer',
                        fontSize: '0.85rem', fontWeight: 600,
                      }}
                    >
                      <Images size={16} />
                      {isAr ? 'عرض المعرض' : 'View Gallery'}
                    </button>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '7px',
                          padding: '10px 22px', borderRadius: '10px',
                          background: 'linear-gradient(135deg,#3ECFCF,#22C55E)',
                          color: 'white', textDecoration: 'none',
                          fontSize: '0.85rem', fontWeight: 600,
                        }}
                      >
                        <ExternalLink size={16} />
                        {isAr ? 'عرض مباشر' : 'Live Demo'}
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
