import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../../context/LangContext'
import { skills, skillCategories, type Skill } from '../../data/skills'

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        borderRadius: '16px',
        padding: '1.25rem',
        border: `1px solid ${hovered ? skill.color + '40' : 'var(--border)'}`,
        boxShadow: hovered ? `0 8px 30px ${skill.color}25` : 'var(--shadow)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: skill.color + '20',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', flexShrink: 0,
          border: `1px solid ${skill.color}30`,
        }}>
          {getSkillEmoji(skill.icon)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
            {skill.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {getLevel(skill.level)}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '0.85rem', fontWeight: 700, color: skill.color }}>
          {skill.level}%
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        height: '6px', borderRadius: '3px',
        background: 'var(--border)', overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
          style={{
            height: '100%', borderRadius: '3px',
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
          }}
        />
      </div>
    </motion.div>
  )
}

function getLevel(level: number): string {
  if (level >= 90) return 'Expert'
  if (level >= 75) return 'Advanced'
  if (level >= 60) return 'Intermediate'
  return 'Beginner'
}

function getSkillEmoji(icon: string): string {
  const map: Record<string, string> = {
    react: '⚛️', typescript: '📘', javascript: '🟨', html5: '🔴',
    css3: '🔵', tailwind: '💧', vite: '⚡', flutter: '🦋', dart: '🎯',
    php: '🐘', laravel: '🔴', api: '🔌', mysql: '🐬', mssql: '🪟',
    firebase: '🔥', oracle: '🟠', git: '🌿', github: '🐙',
    vscode: '💙', figma: '🎨',
  }
  return map[icon] || '🔧'
}

export default function SkillsSection() {
  const { t, lang } = useLang()
  const [activeCategory, setActiveCategory] = useState('all')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="section-padding" style={{ background: 'var(--bg-card)' }}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--primary)',
          }}>
            {t.skills.subtitle}
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
            color: 'var(--text)', marginTop: '0.5rem', letterSpacing: '-0.5px',
          }}>
            {t.skills.title}
          </h2>
          <div style={{
            width: '60px', height: '3px', borderRadius: '2px',
            background: 'var(--gradient-primary)',
            margin: '1rem auto 0',
          }} />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
            justifyContent: 'center', marginBottom: '2.5rem',
          }}
        >
          {skillCategories.map(cat => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '8px 20px', borderRadius: '100px',
                cursor: 'pointer',
                fontWeight: 600, fontSize: '0.875rem',
                transition: 'all 0.2s',
                background: activeCategory === cat.key
                  ? 'var(--gradient-hero)'
                  : 'var(--bg)',
                color: activeCategory === cat.key ? 'white' : 'var(--text-muted)',
                boxShadow: activeCategory === cat.key
                  ? '0 4px 18px rgba(245,166,35,0.35)'
                  : 'none',
                border: activeCategory === cat.key
                  ? 'none'
                  : '1px solid var(--border)',
              } as React.CSSProperties}
            >
              {cat.label[lang as 'en' | 'ar']}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
