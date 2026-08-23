import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import translations from '../data/translations'

type Lang = 'en' | 'ar'

interface LangContextType {
  lang: Lang
  t: typeof translations['en']
  toggleLang: () => void
  isRTL: boolean
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'en'
  })

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    localStorage.setItem('lang', lang)
    if (lang === 'ar') {
      document.title = 'محمد عبدهود | Mohammed AbdHood — خريج تقنية معلومات ومطور تطبيقات الويب والموبايل'
    } else {
      document.title = 'Mohammed AbdHood | محمد عبدهود — Information Technology Graduate & Web Developer'
    }
  }, [lang])

  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en')

  return (
    <LangContext.Provider value={{
      lang,
      t: translations[lang],
      toggleLang,
      isRTL: lang === 'ar',
    }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
