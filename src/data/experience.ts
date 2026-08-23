// ============================================================
// EXPERIENCE & EDUCATION DATA — Mohammed AbdHood (محمد عبدهود)
// ============================================================

export interface TimelineItem {
  id: string
  year: string
  type: 'education' | 'work' | 'achievement'
  title: { en: string; ar: string }
  organization: { en: string; ar: string }
  description: { en: string; ar: string }
  tags: string[]
  highlight?: boolean
}

export const timelineItems: TimelineItem[] = [
  {
    id: 'edu-1',
    year: '2020 - 2024',
    type: 'education',
    title: { en: 'B.Sc. in Information Technology', ar: 'بكالوريوس تقنية معلومات' },
    organization: { en: 'Faculty of Engineering & IT', ar: 'كلية الهندسة وتقنية المعلومات' },
    description: {
      en: 'Graduated in Information Technology covering software development, database architecture, computer networks, and systems administration.',
      ar: 'تخرجت في تخصص تقنية المعلومات بدراسة متعمقة في هندسة البرمجيات، قواعد البيانات، شبكات الحاسوب، وإدارة الأنظمة والخوادم.',
    },
    tags: ['Information Technology', 'Software Engineering', 'Networks', 'Databases'],
    highlight: true,
  },
  {
    id: 'work-1',
    year: '2022',
    type: 'work',
    title: { en: 'Flutter Mobile Development', ar: 'تطوير تطبيقات Flutter الجوال' },
    organization: { en: 'Freelance & Personal Projects', ar: 'مشاريع حرة وشخصية' },
    description: {
      en: 'Dived deep into Flutter and Dart, building cross-platform mobile applications for Android. Created Mabeaty — an expiry tracker used by local retailers.',
      ar: 'تعمقت في Flutter وDart وبنيت تطبيقات جوال متعددة المنصات. أنشأت تطبيق مبيعاتي لتتبع انتهاء صلاحية المنتجات في المحلات المحلية.',
    },
    tags: ['Flutter', 'Dart', 'Firebase', 'Hive'],
    highlight: true,
  },
  {
    id: 'work-2',
    year: '2023',
    type: 'work',
    title: { en: 'React & Full-Stack Transition', ar: 'الانتقال إلى React والتطوير الكامل' },
    organization: { en: 'Full-Stack Projects', ar: 'مشاريع التطوير الكامل' },
    description: {
      en: 'Mastered React ecosystem and transitioned to full-stack development. Built multi-language apps with RTL support, REST API integration, and modern UI systems.',
      ar: 'أتقنت نظام React الكامل وانتقلت إلى التطوير الشامل. بنيت تطبيقات متعددة اللغات بدعم RTL وتكامل REST API وأنظمة واجهات حديثة.',
    },
    tags: ['React', 'Vite', 'REST API', 'i18next'],
  },
  {
    id: 'work-3',
    year: '2024',
    type: 'work',
    title: { en: 'ICMS Healthcare System', ar: 'نظام ICMS للرعاية الصحية' },
    organization: { en: 'Full-Stack Development', ar: 'تطوير متكامل' },
    description: {
      en: 'Built a comprehensive immunization & care management system with AI chatbot integration (Groq), PDF exports, advanced search, and multi-role access control.',
      ar: 'بنيت نظام إدارة التطعيم والرعاية الصحية الشامل مع دمج روبوت دردشة ذكي وتصدير PDF وبحث متقدم والتحكم متعدد الأدوار.',
    },
    tags: ['React', 'REST API', 'AI Chatbot', 'PDF Export'],
    highlight: true,
  },
  {
    id: 'work-4',
    year: '2024',
    type: 'work',
    title: { en: 'Sentinel Auth Security Platform', ar: 'منصة Sentinel Auth الأمنية' },
    organization: { en: 'Full-Stack + Security', ar: 'تطوير كامل + أمان' },
    description: {
      en: 'Developed a security-first authentication dashboard with real-time threat detection, honeypot endpoints, automated IP blacklisting, and interactive analytics.',
      ar: 'طورت لوحة تحكم أمنية متقدمة مع كشف التهديدات الفوري وفخاخ أمنية وحظر تلقائي لـ IP وتحليلات تفاعلية.',
    },
    tags: ['React', 'C#', 'ASP.NET', 'PostgreSQL', 'JWT'],
  },
  {
    id: 'work-5',
    year: '2025',
    type: 'achievement',
    title: { en: 'Premium Portfolio Launch', ar: 'إطلاق بوابة الأعمال الاحترافية' },
    organization: { en: 'Personal Brand', ar: 'هويتي المهنية' },
    description: {
      en: 'Launched this interactive portfolio with D3.js force graphs, string wave transitions, bilingual support, and glassmorphic design system.',
      ar: 'أطلقت هذه البوابة التفاعلية الاحترافية بشبكة D3 التفاعلية وانتقالات الحبال وثنائية اللغة ونظام التصميم الزجاجي.',
    },
    tags: ['React', 'D3.js', 'TypeScript', 'Vite'],
    highlight: true,
  },
]
