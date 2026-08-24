import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, Eye, Layers, Smartphone, Globe } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { projects } from '../../data/projects'
import D3ProjectAnalytics from '../d3/D3ProjectAnalytics'
import ProjectGalleryModal from '../ui/ProjectGalleryModal'
import { useState } from 'react'
import type { Project } from '../../data/projects'
import { getAssetUrl } from '../../utils/asset'

export default function ProjectsSection() {
  const { t, lang } = useLang()
  const isAr = lang === 'ar'
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'mobile' | 'fullstack' | 'frontend'>('all')

  // Categories config with localized labels and icons
  const filterCategories = [
    {
      key: 'all',
      label: isAr ? 'جميع المشاريع' : 'All Projects',
      icon: Layers,
      count: projects.length,
    },
    {
      key: 'mobile',
      label: isAr ? 'تطبيقات الجوال (Flutter)' : 'Mobile Apps (Flutter)',
      icon: Smartphone,
      count: projects.filter((p) => p.category === 'mobile').length,
    },
    {
      key: 'fullstack',
      label: isAr ? 'مشاريع متكاملة (Full-Stack)' : 'Full-Stack Systems',
      icon: Globe,
      count: projects.filter((p) => p.category === 'fullstack').length,
    },
  ]

  // Filter projects according to active tab
  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="section" style={{ padding: 'clamp(4rem, 8vw, 6.5rem) 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            <Star size={16} />
            <span>{t.projects.subtitle}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              margin: '0 0 1rem 0',
            }}
          >
            {t.projects.title}
          </motion.h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              lineHeight: 1.65,
            }}
          >
            {isAr
              ? 'مشاريع حقيقية طورتها من الفكرة إلى الإنتاج بتقنيات معاصرة'
              : 'Real-world projects built from concept to production with modern tech stacks.'}
          </p>
        </div>

        {/* D3 Donut Chart Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '2.5rem', maxWidth: '380px', marginInline: 'auto' }}
        >
          <D3ProjectAnalytics lang={lang as 'ar' | 'en'} />
        </motion.div>

        {/* ── QUICK FILTER TABS (Suggestion 1) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.key
            const Icon = cat.icon
            return (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key as typeof activeFilter)}
                className={isActive ? 'btn btn-primary' : 'btn btn-outline'}
                style={{
                  padding: '8px 18px',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  position: 'relative',
                }}
              >
                <Icon size={15} />
                <span>{cat.label}</span>
                <span
                  style={{
                    padding: '2px 7px',
                    borderRadius: '100px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: isActive ? 'rgba(0,0,0,0.25)' : 'var(--bg-secondary)',
                    color: isActive ? '#090D16' : 'var(--text-muted)',
                  }}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Projects Grid with Fluid Responsive Cards & AnimatePresence Layout */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1rem, 3vw, 1.75rem)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -5 }}
                style={{
                  borderRadius: '14px',
                  background: 'var(--bg-card)',
                  border: `1px solid ${hoveredId === project.id ? 'var(--copper)' : 'var(--border)'}`,
                  boxShadow: hoveredId === project.id ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Cover Image with Hover Overlay */}
                <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <img
                    src={getAssetUrl(project.coverImage)}
                    alt={project.title[lang as 'en' | 'ar']}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      transform: hoveredId === project.id ? 'scale(1.04)' : 'scale(1)',
                    }}
                    onError={(e) => {
                      const el = e.currentTarget
                      el.style.display = 'none'
                    }}
                  />

                  {/* Hover overlay (desktop) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(12, 16, 23, 0.75)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      opacity: hoveredId === project.id ? 1 : 0,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 16px',
                        borderRadius: '8px',
                        background: 'var(--copper)',
                        color: '#0C1017',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                      }}
                    >
                      <Eye size={14} />
                      <span>{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      insetInlineEnd: '12px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'var(--bg-card)',
                      border: `1px solid ${project.status === 'completed' ? 'var(--accent-cyan)' : 'var(--copper)'}`,
                      color: project.status === 'completed' ? 'var(--accent-cyan)' : 'var(--copper)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                    }}
                  >
                    {project.status === 'completed' ? (isAr ? 'مكتمل' : 'Completed') : (isAr ? 'قيد التطوير' : 'In Progress')}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-heading)',
                      margin: '0 0 0.4rem 0',
                      lineHeight: 1.35,
                    }}
                  >
                    {project.title[lang as 'en' | 'ar']}
                  </h3>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.86rem',
                      lineHeight: 1.6,
                      margin: '0 0 1.2rem 0',
                      flex: 1,
                    }}
                  >
                    {project.description[lang as 'en' | 'ar'].slice(0, 110)}...
                  </p>

                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
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
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '100px',
                          background: 'var(--copper-subtle)',
                          color: 'var(--copper)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Links */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-outline"
                        style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                      >
                        <GithubIcon size={13} />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                      >
                        <ExternalLink size={13} />
                        <span>{isAr ? 'مشاهدة' : 'Live'}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectGalleryModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
