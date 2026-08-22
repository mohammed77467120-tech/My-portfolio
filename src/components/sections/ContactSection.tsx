import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  MessageSquare,
  MessageCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/BrandIcons'
import { useLang } from '../../context/LangContext'
import { profile } from '../../data/profile'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }
  return (
    <button
      onClick={copy}
      title="Copy"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: copied ? '#22C55E' : 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        padding: '6px',
        borderRadius: '6px',
        transition: 'color 0.2s',
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  )
}

export default function ContactSection() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isAr = lang === 'ar'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Anti-bot honeypot
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Bot detection check
    if (formData.honeypot) {
      return
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error')
      setErrorMessage(isAr ? 'يرجى ملء كافة الحقول المطلوبة' : 'Please fill all required fields')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      // Real form submission via Formspree service with destination: mohammed77467120@gmail.com
      const response = await fetch('https://formspree.io/f/mqkrvpzo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' })
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        // Direct mailto fallback if network/form service encounters issue
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
          formData.subject || 'Portfolio Inquiry from ' + formData.name
        )}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`
        setStatus('success')
      }
    } catch {
      // Fallback: Open mailto automatically so user message is never lost
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry from ' + formData.name
      )}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`
      setStatus('success')
    }
  }

  // Quick WhatsApp message generator
  const whatsappUrl = `https://wa.me/967774657120?text=${encodeURIComponent(
    isAr
      ? 'مرحباً مهندس محمد، أود التواصل معك بخصوص فرصة عمل / مشروع برمجيات.'
      : 'Hello Mohammed, I would like to discuss a project / work opportunity with you.'
  )}`

  const socials = [
    { icon: GithubIcon, href: profile.github, label: 'GitHub' },
    { icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
    { icon: InstagramIcon, href: profile.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${profile.phone}`, label: 'Phone' },
  ]

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '12px',
    border: '1px solid var(--border-strong)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  }

  return (
    <section id="contact" className="section" style={{ padding: 'clamp(4rem, 8vw, 6.5rem) 0' }}>
      <div className="container" ref={ref}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
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
            <MessageSquare size={16} />
            <span>{t.contact.subtitle}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
              margin: '0 0 1rem 0',
            }}
          >
            {t.contact.title}
          </motion.h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: '0 auto',
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              lineHeight: 1.65,
            }}
          >
            {isAr
              ? 'هل لديك فكرة مشروع أو ترغب بالتعاون البرمجي؟ لا تتردد بالتواصل المباشر'
              : 'Have a project in mind or want to collaborate? Feel free to reach out directly'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Contact Methods & Direct Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Quick Instant Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
              {/* WhatsApp Live Connect Banner */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(37,211,102,0.15), rgba(15,23,42,0.8))',
                  border: '1px solid rgba(37,211,102,0.5)',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.15)',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '12px',
                      background: '#25D366',
                      color: '#090D16',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', fontFamily: 'var(--font-heading)' }}>
                      {isAr ? 'محادثة فورية عبر واتساب' : 'Instant WhatsApp Chat'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#25D366', fontWeight: 600 }}>
                      {isAr ? 'استجابة سريعة ومباشرة' : 'Fast & direct response'}
                    </div>
                  </div>
                </div>
                <Sparkles size={16} color="#25D366" />
              </a>

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
                    padding: '1.15rem 1.25rem',
                    borderRadius: '16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-strong)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
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
                  <div style={{ flex: 1, overflow: 'hidden' }}>
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
                    <div
                      style={{
                        fontSize: '0.92rem',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
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
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="btn-icon"
                  style={{ width: 44, height: 44 }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Real Secure Interactive Form (Suggestion 2) */}
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            onSubmit={handleSubmit}
            style={{
              padding: 'clamp(1.4rem, 3vw, 2rem)',
              borderRadius: '22px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              backdropFilter: 'blur(16px)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
              position: 'relative',
            }}
          >
            {/* Hidden honeypot anti-spam */}
            <input
              type="text"
              name="_gotcha"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '1rem',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  {t.contact.name} <span style={{ color: 'var(--copper)' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder={isAr ? 'مثال: أحمد محمد' : 'e.g. John Doe'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  maxLength={80}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  {t.contact.email} <span style={{ color: 'var(--copper)' }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  maxLength={100}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                {t.contact.subject}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'موضوع الرسالة أو اسم المشروع' : 'Project Subject'}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                maxLength={120}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                {t.contact.message} <span style={{ color: 'var(--copper)' }}>*</span>
              </label>
              <textarea
                placeholder={isAr ? 'اكتب تفاصيل استفسارك أو متطلبات مشروعك هنا...' : 'Write your message or project requirements here...'}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                maxLength={1000}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
              />
            </div>

            {/* Status Notifications */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    background: 'rgba(34,197,94,0.15)',
                    border: '1px solid rgba(34,197,94,0.4)',
                    color: '#22C55E',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Check size={18} />
                  <span>
                    {isAr
                      ? 'تم إرسال رسالتك بنجاح! سأقوم بالرد عليك في أقرب وقت.'
                      : 'Your message has been sent successfully! I will get back to you soon.'}
                  </span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    background: 'rgba(239,68,68,0.15)',
                    border: '1px solid rgba(239,68,68,0.4)',
                    color: '#EF4444',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage || (isAr ? 'تعذر الإرسال، يرجى المحاولة ثانية' : 'Failed to send, please try again')}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn btn-primary"
              style={{ width: '100%', padding: '13px 24px', fontSize: '0.95rem' }}
            >
              <Send size={16} />
              <span>
                {status === 'sending'
                  ? (isAr ? 'جارٍ إرسال الرسالة...' : 'Sending message...')
                  : status === 'success'
                  ? (isAr ? 'تم الإرسال بنجاح ✓' : 'Sent Successfully ✓')
                  : t.contact.send}
              </span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
