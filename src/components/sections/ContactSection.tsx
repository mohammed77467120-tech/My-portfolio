import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, Copy, Check } from 'lucide-react'
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
    <motion.button
      onClick={copy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: copied ? '#22C55E' : 'var(--text-muted)',
        display: 'flex', alignItems: 'center',
        padding: '4px', borderRadius: '6px',
        transition: 'color 0.2s',
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </motion.button>
  )
}

export default function ContactSection() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send (replace with EmailJS)
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const contactItems = [
    {
      icon: Mail,
      label: t.contact.emailLabel,
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: '#F5A623',
      copyable: true,
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: profile.phone,
      href: `tel:${profile.phone}`,
      color: '#22C55E',
      copyable: true,
    },
    {
      icon: MapPin,
      label: t.contact.location,
      value: 'Tarim, Hadhramout, Yemen',
      href: null,
      color: '#EF4444',
      copyable: false,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: profile.phone,
      href: profile.whatsapp,
      color: '#25D366',
      copyable: false,
    },
    {
      icon: GithubIcon,
      label: 'GitHub',
      value: 'mohammed77467120-tech',
      href: profile.github,
      color: '#333',
      copyable: false,
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'mohammed-abdhood',
      href: profile.linkedin,
      color: '#0A66C2',
      copyable: false,
    },
    {
      icon: InstagramIcon,
      label: 'Instagram',
      value: 'm2_k11',
      href: profile.instagram,
      color: '#E1306C',
      copyable: false,
    },
  ]

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-card)' }}>
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
            {t.contact.subtitle}
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
            color: 'var(--text)', marginTop: '0.5rem', letterSpacing: '-0.5px',
          }}>
            {t.contact.title}
          </h2>
          <div style={{
            width: '60px', height: '3px', borderRadius: '2px',
            background: 'var(--gradient-primary)',
            margin: '1rem auto 0',
          }} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '3rem',
          alignItems: 'start',
        }} className="contact-grid">

          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p style={{
              color: 'var(--text-muted)', lineHeight: 1.8,
              marginBottom: '2rem', fontSize: '1rem',
            }}>
              I'm always open to new opportunities, collaborations, and interesting projects. Feel free to reach out through any of the following channels.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactItems.map(({ icon: Icon, label, value, href, color, copyable }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 16px', borderRadius: '14px',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = color + '40'
                    e.currentTarget.style.boxShadow = `0 4px 20px ${color}15`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: color + '15',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        style={{
                          fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)',
                          textDecoration: 'none', display: 'block',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>{value}</span>
                    )}
                  </div>
                  {copyable && <CopyButton text={value} />}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: 'var(--bg)', borderRadius: '20px',
              padding: '2rem', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { key: 'name', label: t.contact.name, type: 'text' },
                { key: 'email', label: t.contact.email, type: 'email' },
                { key: 'subject', label: t.contact.subject, type: 'text' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label style={{
                    display: 'block', fontSize: '0.875rem',
                    fontWeight: 600, color: 'var(--text)', marginBottom: '6px',
                  }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    required
                    value={formData[key as keyof typeof formData]}
                    onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                    style={{
                      width: '100%', padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-card)',
                      color: 'var(--text)', fontSize: '0.95rem',
                      outline: 'none', transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              ))}

              <div>
                <label style={{
                  display: 'block', fontSize: '0.875rem',
                  fontWeight: 600, color: 'var(--text)', marginBottom: '6px',
                }}>
                  {t.contact.message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  style={{
                    width: '100%', padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-card)',
                    color: 'var(--text)', fontSize: '0.95rem',
                    outline: 'none', resize: 'vertical',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', padding: '14px 28px', borderRadius: '12px',
                  border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  fontWeight: 700, fontSize: '1rem',
                  background: status === 'success'
                    ? 'linear-gradient(135deg, #22C55E, #16a34a)'
                    : status === 'error'
                    ? 'linear-gradient(135deg, #EF4444, #dc2626)'
                    : 'var(--gradient-hero)',
                  color: 'white',
                  boxShadow: '0 4px 24px rgba(245,166,35,0.3)',
                  opacity: status === 'sending' ? 0.7 : 1,
                  transition: 'background 0.3s',
                }}
              >
                {status === 'sending' ? (
                  <>{t.contact.sending}</>
                ) : status === 'success' ? (
                  <>{t.contact.success}</>
                ) : status === 'error' ? (
                  <>{t.contact.error}</>
                ) : (
                  <><Send size={18} /> {t.contact.send}</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
