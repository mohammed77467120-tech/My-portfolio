import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../../context/LangContext'
import {
  skills,
  skillCategories,
  type Skill,
} from '../../data/skills'
import {
  Cpu,
  Search,
  X,
  CheckCircle2,
  LayoutGrid,
  FolderKanban,
  Layout,
  Smartphone,
  Database,
  Shield,
  Workflow,
  Wrench,
} from 'lucide-react'

// Category Icons Mapper
function getCategoryIcon(key: string, size = 18) {
  switch (key) {
    case 'frontend':
      return <Layout size={size} />
    case 'mobile':
      return <Smartphone size={size} />
    case 'database':
      return <Database size={size} />
    case 'systems':
      return <Shield size={size} />
    case 'engineering':
      return <Workflow size={size} />
    case 'tools':
      return <Wrench size={size} />
    default:
      return <FolderKanban size={size} />
  }
}

// Brand / Tech Icon Symbol Mapper
function getSkillSymbol(icon: string): string {
  const map: Record<string, string> = {
    react: '⚛️',
    javascript: '⚡',
    html5: '🌐',
    responsive: '📱',
    uiux: '🎨',
    flutter: '📱',
    dart: '🎯',
    firebase: '🔥',
    mysql: '🐬',
    mssql: '🗄️',
    oracle: '🏛️',
    linux: '🐧',
    windows: '🪟',
    network: '🌐',
    security: '🛡️',
    principles: '📐',
    analysis: '📊',
    agile: '🔄',
    github: '🐙',
    figma: '🎨',
    wordpress: '📰',
    office: '📑',
  }
  return map[icon] || '🚀'
}

export default function SkillsSection() {
  const { t, lang } = useLang()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [viewMode, setViewMode] = useState<'categorized' | 'grid'>('categorized')
  const isAr = lang === 'ar'

  // Filter skills based on category and search query
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === 'all' || skill.category === activeCategory

      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesName = skill.name.toLowerCase().includes(query)
      const matchesTaglineEn = skill.tagline.en.toLowerCase().includes(query)
      const matchesTaglineAr = skill.tagline.ar.toLowerCase().includes(query)
      const matchesCategoryName = skill.category.toLowerCase().includes(query)

      return matchesCategory && (matchesName || matchesTaglineEn || matchesTaglineAr || matchesCategoryName)
    })
  }, [activeCategory, searchQuery])

  // Group skills by category for the structured Categorized View
  const groupedCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => cat.key !== 'all')
      .map((cat) => {
        const catSkills = filteredSkills.filter((s) => s.category === cat.key)
        return {
          ...cat,
          skills: catSkills,
        }
      })
      .filter((group) => group.skills.length > 0)
  }, [filteredSkills])

  return (
    <section id="skills" className="section" style={{ padding: '5.5rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
              marginBottom: '0.65rem',
            }}
          >
            <Cpu size={16} />
            <span>{t.skills.subtitle}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              margin: '0 0 0.75rem 0',
            }}
          >
            {isAr ? 'المهارات والتقنيات المعتمدة' : 'Verified Technical Skills'}
          </motion.h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '660px',
              margin: '0 auto',
              fontSize: '0.98rem',
              lineHeight: 1.65,
            }}
          >
            {isAr
              ? 'المهارات والتقنيات الأساسية مصنفة لتسهيل التصفح السريع والاطلاع'
              : 'Core technical skills and competencies categorized for structured browsing'}
          </p>
        </div>

        {/* Master Skills Hub Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            borderRadius: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: 'clamp(1.2rem, 3vw, 2rem)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Top Control Bar: Search Input & View Switchers */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {/* Live Search Input */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 280px',
                maxWidth: '420px',
              }}
            >
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  insetInlineStart: '14px',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr
                    ? 'ابحث عن مهارة أو تقنية...'
                    : 'Search skill or technology...'
                }
                style={{
                  width: '100%',
                  padding: '10px 38px',
                  paddingInlineStart: '38px',
                  paddingInlineEnd: searchQuery ? '38px' : '14px',
                  borderRadius: '10px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--copper)'
                  e.target.style.boxShadow = '0 0 0 3px var(--copper-subtle)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    insetInlineEnd: '12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                  }}
                  title={isAr ? 'مسح البحث' : 'Clear search'}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* View Mode Switcher Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                background: 'var(--bg-secondary)',
                padding: '4px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
              }}
            >
              <button
                onClick={() => setViewMode('categorized')}
                className={viewMode === 'categorized' ? 'btn btn-primary' : 'btn btn-outline'}
                style={{
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  borderRadius: '8px',
                  border: viewMode === 'categorized' ? undefined : 'none',
                }}
              >
                <FolderKanban size={14} />
                <span>{isAr ? 'العرض المصنف' : 'Categorized'}</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'btn btn-primary' : 'btn btn-outline'}
                style={{
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  borderRadius: '8px',
                  border: viewMode === 'grid' ? undefined : 'none',
                }}
              >
                <LayoutGrid size={14} />
                <span>{isAr ? 'العرض الشبكي' : 'Grid'}</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills (Always visible for fast 1-click filtering) */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: '1.75rem',
            }}
          >
            {skillCategories.map((cat) => {
              const isActive = activeCategory === cat.key
              const count =
                cat.key === 'all'
                  ? skills.length
                  : skills.filter((s) => s.category === cat.key).length

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={isActive ? 'btn btn-primary' : 'btn btn-outline'}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.78rem',
                    borderRadius: '100px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {cat.key !== 'all' && getCategoryIcon(cat.key, 13)}
                  <span>{cat.label[lang as 'ar' | 'en']}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '100px',
                      background: isActive ? 'rgba(0,0,0,0.25)' : 'var(--bg-card)',
                      border: '1px solid currentColor',
                      opacity: 0.85,
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Empty Search State */}
          {filteredSkills.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: 'var(--text-muted)',
              }}
            >
              <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {isAr ? 'لا توجد مهارات مطابقة للبحث' : 'No matching skills found'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
                className="btn btn-outline"
                style={{ fontSize: '0.82rem', marginTop: '0.5rem' }}
              >
                {isAr ? 'إعادة ضبط التصفية' : 'Reset Filters'}
              </button>
            </div>
          )}

          {/* 1. CATEGORIZED SECTIONS VIEW (Default & Senior-Grade Browsing) */}
          {viewMode === 'categorized' && filteredSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              {groupedCategories.map((group) => {
                return (
                  <div
                    key={group.key}
                    style={{
                      borderRadius: '18px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      padding: '1.35rem',
                    }}
                  >
                    {/* Category Title Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginBottom: '1.15rem',
                        paddingBottom: '0.75rem',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            background: 'var(--copper-subtle)',
                            color: 'var(--copper)',
                            border: '1px solid var(--copper)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {getCategoryIcon(group.key, 16)}
                        </div>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-heading)',
                          }}
                        >
                          {group.label[lang as 'ar' | 'en']}
                        </h3>
                      </div>

                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          fontWeight: 600,
                        }}
                      >
                        {isAr ? `${group.skills.length} مهارات معتمدة` : `${group.skills.length} verified`}
                      </span>
                    </div>

                    {/* Category Skills Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
                        gap: '0.85rem',
                      }}
                    >
                      {group.skills.map((skill) => (
                        <SkillCard
                          key={skill.name}
                          skill={skill}
                          lang={lang as 'ar' | 'en'}
                          isSelected={selectedSkill?.name === skill.name}
                          onSelect={() =>
                            setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)
                          }
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* 2. FLAT GRID VIEW */}
          {viewMode === 'grid' && filteredSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
                gap: '1rem',
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    lang={lang as 'ar' | 'en'}
                    isSelected={selectedSkill?.name === skill.name}
                    onSelect={() =>
                      setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)
                    }
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Selected Skill Quick Detail Drawer */}
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '1.5rem',
                padding: '1.2rem 1.5rem',
                borderRadius: '16px',
                background: 'var(--bg-secondary)',
                border: `1px solid ${selectedSkill.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                boxShadow: `0 4px 20px ${selectedSkill.color}20`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: `${selectedSkill.color}20`,
                    border: `1px solid ${selectedSkill.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}
                >
                  {getSkillSymbol(selectedSkill.icon)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#22C55E',
                        background: 'rgba(34,197,94,0.1)',
                        padding: '2px 8px',
                        borderRadius: '100px',
                      }}
                    >
                      <CheckCircle2 size={12} />
                      {isAr ? 'معتمد في الـ CV' : 'CV Verified'}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: '2px 0 0 0',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {selectedSkill.tagline[lang as 'ar' | 'en']}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '100px',
                    background: `${selectedSkill.color}15`,
                    color: selectedSkill.color,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    border: `1px solid ${selectedSkill.color}40`,
                  }}
                >
                  {selectedSkill.category}
                </span>

                <button
                  onClick={() => setSelectedSkill(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  title={isAr ? 'إغلاق' : 'Close'}
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// Reusable Tech Skill Card Component
function SkillCard({
  skill,
  lang,
  isSelected,
  onSelect,
}: {
  skill: Skill
  lang: 'ar' | 'en'
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onSelect}
      whileHover={{ y: -3 }}
      style={{
        padding: '1rem',
        borderRadius: '14px',
        background: isSelected ? 'var(--copper-subtle)' : 'var(--bg-card)',
        border: `1px solid ${isSelected ? 'var(--copper)' : 'var(--border-strong)'}`,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: isSelected ? '0 0 16px var(--copper-subtle)' : 'var(--shadow-sm)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Skill Icon Container */}
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: `${skill.color}15`,
          border: `1px solid ${skill.color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.15rem',
          flexShrink: 0,
        }}
      >
        {getSkillSymbol(skill.icon)}
      </div>

      {/* Skill Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-heading)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '6px',
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{skill.name}</span>
        </div>

        <div
          style={{
            fontSize: '0.76rem',
            color: 'var(--text-secondary)',
            marginTop: '2px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.3,
          }}
        >
          {skill.tagline[lang]}
        </div>
      </div>
    </motion.div>
  )
}

