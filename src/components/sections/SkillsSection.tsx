import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../../context/LangContext'
import { skills, skillCategories, type Skill } from '../../data/skills'
import D3SkillsGraph from '../d3/D3SkillsGraph'
import { Cpu, Terminal, CheckCircle2, Network, LayoutGrid } from 'lucide-react'

function getSkillSymbol(icon: string): string {
  const map: Record<string, string> = {
    react: '⚛️',
    javascript: '⚡',
    html5: '🌐',
    vite: '⚡',
    flutter: '📱',
    dart: '🎯',
    php: '🐘',
    laravel: '🔥',
    api: '🔌',
    mysql: '🐬',
    firebase: '🔥',
    mssql: '🗄️',
    github: '🐙',
    vscode: '💻',
    figma: '🎨',
  }
  return map[icon] || '🚀'
}

export default function SkillsSection() {
  const { t, lang } = useLang()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [viewMode, setViewMode] = useState<'graph' | 'grid'>('graph')
  const isAr = lang === 'ar'

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="section" style={{ padding: '6rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
              letterSpacing: '0.1em',
              marginBottom: '0.75rem',
            }}
          >
            <Cpu size={16} />
            <span>{t.skills.subtitle}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
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
            {t.skills.title}
          </motion.h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              margin: '0 auto',
              fontSize: '0.98rem',
              lineHeight: 1.6,
            }}
          >
            {isAr
              ? 'مستودع المهارات والتقنيات التفاعلي المنظم، تنقل بسلاسة بين شبكة D3 Force Graph التفاعلية أو العرض الشبكي بدون تكرار.'
              : 'Interactive Tech Inventory & Skill Hub. Switch seamlessly between D3 Force Graph and clean Grid View.'}
          </p>
        </div>

        {/* UNIFIED SINGLE SKILL HUB CONTAINER (No Duplication) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            borderRadius: '24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-strong)',
            padding: '2rem',
            backdropFilter: 'blur(16px)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Header Controls Bar & View Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1.75rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'var(--copper-subtle)',
                  border: '1px solid var(--copper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--copper)',
                }}
              >
                <Terminal size={18} />
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {isAr ? 'مستودع المهارات والتقنيات' : 'Interactive Skill Hub'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {isAr ? `إجمالي التقنيات المعتمدة: ${skills.length}` : `Total Mastered Tech: ${skills.length}`}
                </p>
              </div>
            </div>

            {/* View Mode Switcher (Graph vs Grid) */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => setViewMode('graph')}
                className={viewMode === 'graph' ? 'btn btn-primary' : 'btn btn-outline'}
                style={{ padding: '6px 16px', fontSize: '0.82rem' }}
              >
                <Network size={15} />
                <span>{isAr ? 'شبكة D3 التفاعلية' : 'D3 Force Graph'}</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'btn btn-primary' : 'btn btn-outline'}
                style={{ padding: '6px 16px', fontSize: '0.82rem' }}
              >
                <LayoutGrid size={15} />
                <span>{isAr ? 'العرض الشبكي' : 'Grid View'}</span>
              </button>
            </div>
          </div>

          {/* D3 GRAPH VIEW */}
          {viewMode === 'graph' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <D3SkillsGraph
                skills={skills}
                lang={lang as 'ar' | 'en'}
                activeCategory={activeCategory}
                onCategorySelect={setActiveCategory}
              />
            </motion.div>
          )}

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Pill Category Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                {skillCategories.map((cat) => {
                  const isActive = activeCategory === cat.key
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={isActive ? 'btn btn-primary' : 'btn btn-outline'}
                      style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                    >
                      {cat.label[lang as 'ar' | 'en']}
                    </button>
                  )
                })}
              </div>

              {/* Skills Grid Cards Box */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '1rem',
                }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill) => {
                    const isSelected = selectedSkill?.name === skill.name
                    return (
                      <motion.div
                        key={skill.name}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => setSelectedSkill(isSelected ? null : skill)}
                        style={{
                          padding: '1.2rem',
                          borderRadius: '16px',
                          background: isSelected ? 'var(--copper-subtle)' : 'var(--bg-secondary)',
                          border: `1px solid ${isSelected ? 'var(--copper)' : 'var(--border-strong)'}`,
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                        whileHover={{ y: -3 }}
                      >
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            background: `${skill.color}20`,
                            border: `1px solid ${skill.color}60`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            flexShrink: 0,
                          }}
                        >
                          {getSkillSymbol(skill.icon)}
                        </div>

                        <div style={{ overflow: 'hidden' }}>
                          <div
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              fontFamily: 'var(--font-heading)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {skill.name}
                          </div>

                          <div
                            style={{
                              fontSize: '0.78rem',
                              color: 'var(--text-secondary)',
                              marginTop: '2px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {skill.tagline[lang as 'ar' | 'en']}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Active Skill Detail Popup */}
              {selectedSkill && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '1.5rem',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    background: 'var(--bg-card)',
                    border: `1px solid ${selectedSkill.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={20} color={selectedSkill.color} />
                    <div>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '1rem',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-heading)',
                        }}
                      >
                        {selectedSkill.name}
                      </span>
                      <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                        — {selectedSkill.tagline[lang as 'ar' | 'en']}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '100px',
                      background: `${selectedSkill.color}20`,
                      color: selectedSkill.color,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      border: `1px solid ${selectedSkill.color}50`,
                    }}
                  >
                    {selectedSkill.category}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
