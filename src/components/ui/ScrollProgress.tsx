import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '3px', zIndex: 9999,
      background: 'transparent',
    }}>
      <motion.div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #F5A623, #E056A0, #3ECFCF)',
          backgroundSize: '200% 100%',
          transformOrigin: 'left',
          boxShadow: '0 0 8px rgba(245,166,35,0.5)',
        }}
      />
    </div>
  )
}
