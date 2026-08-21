import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: copied ? '#22C55E' : 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        transition: 'color 0.2s',
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

export default function ContactSection() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const socials = [
    { icon: GithubIcon, href: profile.github, label: 'GitHub' },
    { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
    { icon: InstagramIcon, href: profile.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  ]

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid var(--border-strong)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    backdropFilter: 'blur(12px)',
    transition: 'border-color 0.3s',
  }

  return (
    <section id="contact" className="section" style={{ padding: '6rem 0' }}>
      <div className="container" ref={ref}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
              marginBottom: '0.75rem',
            }}
          >
            <MessageSquare size={16} />
            <span>{t.contact.subtitle}</span>
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
              margin: 0,
            }}
          >
            {t.contact.title}
          </motion.h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {[
                {
                  icon: Mail,
                  label: t.contact.emailLabel,
                  value: profile.email,
                  href: `mailto:${profile.email}`,
                  copyable: true,
                },
                {
                  icon: Phone,
                  label: t.contact.phone,
                  value: profile.phone,
                  href: `tel:${profile.phone}`,
                  copyable: true,
                },
                {
                  icon: MapPin,
                  label: t.contact.location,
                  value: profile.location[lang as 'en' | 'ar'],
                  href: undefined,
                  copyable: false,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-strong)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      background: 'var(--copper-subtle)',
                      border: '1px solid var(--copper)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--copper)',
                      flexShrink: 0,
                    }}
                  >
                    <item.icon size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        marginBottom: '2px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {item.href ? (
                        <a href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                  {item.copyable && <CopyButton text={item.value} />}
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="btn-icon"
                  style={{ width: 46, height: 46 }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            style={{
              padding: '2rem',
              borderRadius: '24px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              backdropFilter: 'blur(16px)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="text"
                placeholder={t.contact.name}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={inputStyle}
              />
              <input
                type="email"
                placeholder={t.contact.email}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <input
              type="text"
              placeholder={t.contact.subject}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              style={inputStyle}
            />
            <textarea
              placeholder={t.contact.message}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px 28px' }}
            >
              <Send size={16} />
              <span>
                {status === 'sending'
                  ? t.contact.sending
                  : status === 'success'
                  ? t.contact.success
                  : t.contact.send}
              </span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
