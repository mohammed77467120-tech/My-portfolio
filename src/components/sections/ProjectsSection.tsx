import { motion } from 'framer-motion'
import { ExternalLink, Star, Eye } from 'lucide-react'
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

  return (
    <section id="projects" className="section" style={{ padding: '6rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--copper)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}
          >
            <Star size={16} />
            <span>{t.projects.subtitle}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', margin: '0 0 1rem 0' }}
          >
            {t.projects.title}
          </motion.h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.98rem', lineHeight: 1.6 }}>
            {isAr ? 'مشاريع حقيقية طورتها من الفكرة إلى الإنتاج بتقنيات معاصرة' : 'Real-world projects built from concept to production with modern tech stacks.'}
          </p>
        </div>

        {/* D3 Donut Chart Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem', maxWidth: '380px', margin: '0 auto 3rem auto' }}
        >
          <D3ProjectAnalytics lang={lang as 'ar' | 'en'} />
        </motion.div>

        {/* Projects Grid with Hover Preview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -6 }}
              style={{
                borderRadius: '24px',
                background: 'var(--bg-card)',
                border: `1px solid ${hoveredId === project.id ? 'var(--copper)' : 'var(--border-strong)'}`,
                backdropFilter: 'blur(16px)',
                boxShadow: hoveredId === project.id ? '0 16px 48px rgba(245,166,35,0.15)' : 'var(--shadow-sm)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
            >
              {/* Cover Image with Hover Overlay */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={getAssetUrl(project.coverImage)}
                  alt={project.title[lang as 'en' | 'ar']}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    transform: hoveredId === project.id ? 'scale(1.06)' : 'scale(1)',
                  }}
                  onError={(e) => {
                    const el = e.currentTarget
                    el.style.display = 'none'
                    const parent = el.parentElement!
                    parent.style.background = 'var(--bg-secondary)'
                    parent.style.display = 'flex'
                    parent.style.alignItems = 'center'
                    parent.style.justifyContent = 'center'
                  }}
                />

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(9,13,22,0.4) 0%, rgba(9,13,22,0.85) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 18px',
                      borderRadius: '100px',
                      background: 'var(--copper)',
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    <Eye size={14} />
                    {isAr ? 'عرض التفاصيل' : 'View Details'}
                  </div>
                </motion.div>

                {/* Status badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: isAr ? 'auto' : '12px',
                    left: isAr ? '12px' : 'auto',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    background: project.status === 'completed' ? 'rgba(62,207,207,0.15)' : 'rgba(245,166,35,0.15)',
                    border: `1px solid ${project.status === 'completed' ? '#3ECFCF60' : '#F5A62360'}`,
                    color: project.status === 'completed' ? '#3ECFCF' : '#F5A623',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                  }}
                >
                  {project.status === 'completed' ? (isAr ? 'مكتمل' : 'Completed') : (isAr ? 'قيد التطوير' : 'In Progress')}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    margin: '0 0 0.4rem 0',
                    lineHeight: 1.3,
                  }}
                >
                  {project.title[lang as 'en' | 'ar']}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                  {project.description[lang as 'en' | 'ar'].slice(0, 120)}...
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
                    <span style={{ padding: '3px 10px', borderRadius: '100px', background: 'var(--copper-subtle)', color: 'var(--copper)', fontSize: '0.72rem', fontWeight: 700 }}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
        </div>
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
