import { MessageCircle, Mail, MapPin, Heart, Code2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'

const socials = [
  { icon: GithubIcon, label: 'GitHub', href: profile.github, color: '#F0F0F0' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: profile.linkedin, color: '#0A66C2' },
  { icon: InstagramIcon, label: 'Instagram', href: profile.instagram, color: '#E1306C' },
  { icon: MessageCircle, label: 'WhatsApp', href: profile.whatsapp, color: '#25D366' },
  { icon: Mail, label: 'Email', href: `mailto:${profile.email}`, color: '#38BDF8' },
]

export default function Footer() {
  const { t, lang } = useLang()
  const isAr = lang === 'ar'
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        position: 'relative',
        paddingTop: '3.5rem',
        paddingBottom: '2rem',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* Copper accent line */}
      <div
        style={{
          position: 'absolute',
          top: -1,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--copper), transparent)',
        }}
      />

      <div className="container">
        {/* Top row: Brand + Tagline */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: 'var(--copper)',
              marginBottom: '0.3rem',
            }}
          >
            {profile.name[lang as 'en' | 'ar']}
          </motion.div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {isAr ? 'مطور تطبيقات الويب والجوال' : 'Front-End & Mobile Application Developer'}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '0.4rem',
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
            }}
          >
            <MapPin size={13} color="var(--accent-cyan)" />
            <span>{profile.location[lang as 'en' | 'ar']}</span>
          </div>
        </div>

        {/* Social Icons Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {socials.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="btn-icon"
                style={{ width: 42, height: 42 }}
              >
                <Icon size={18} />
              </a>
            )
          })}
        </div>

        {/* Nav Quick Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 2rem)',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          {['home', 'skills', 'experience', 'projects', 'contact'].map((id) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontSize: '0.84rem',
                fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                transition: 'color 0.2s',
                padding: '4px 0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--copper)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              {isAr
                ? {
                    home: 'الرئيسية',
                    skills: 'المهارات',
                    experience: 'الخبرة',
                    projects: 'المشاريع',
                    contact: 'تواصل',
                  }[id]
                : {
                    home: 'Home',
                    skills: 'Skills',
                    experience: 'Experience',
                    projects: 'Projects',
                    contact: 'Contact',
                  }[id]}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '1.5rem' }} />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            © {year} {profile.name[lang as 'en' | 'ar']}. {t.footer.rights}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <Code2 size={13} color="var(--accent-cyan)" />
            <span>{isAr ? 'مبني بـ' : 'Built with'}</span>
            <span style={{ color: 'var(--copper)', fontWeight: 700 }}>React + D3.js + TypeScript</span>
            <Heart size={12} color="#E1306C" fill="#E1306C" style={{ marginInlineStart: '2px' }} />
          </div>
        </div>
      </div>
    </footer>
  )
}
