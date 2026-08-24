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
    title: { en: 'Advanced React & UI Engineering', ar: 'الاحتراف في React وتطوير الواجهات المتقدمة' },
    organization: { en: 'Front-End Projects', ar: 'مشاريع الواجهات الأمامية' },
    description: {
      en: 'Mastered the modern React ecosystem and UI engineering. Built multi-language applications with RTL support, custom hooks, and modern component architecture.',
      ar: 'أتقنت نظام React وتطوير الواجهات المتقدمة. بنيت تطبيقات متعددة اللغات بدعم RTL وHooks مخصصة وتصميمات عصرية.',
    },
    tags: ['React', 'Vite', 'TypeScript', 'i18next'],
  },
  {
    id: 'work-3',
    year: '2024',
    type: 'work',
    title: { en: 'ICMS Healthcare System', ar: 'نظام ICMS للرعاية الصحية' },
    organization: { en: 'Front-End Architecture', ar: 'هندسة الواجهات' },
    description: {
      en: 'Built a comprehensive immunization & care management system with AI chatbot integration (Groq), PDF exports, advanced search, and multi-role access control.',
      ar: 'بنيت نظام إدارة التطعيم والرعاية الصحية الشامل مع دمج روبوت دردشة ذكي وتصدير PDF وبحث متقدم والتحكم متعدد الأدوار.',
    },
    tags: ['React', 'JavaScript', 'AI Chatbot', 'PDF Export'],
    highlight: true,
  },
  {
    id: 'work-4',
    year: '2024',
    type: 'work',
    title: { en: 'Sentinel Auth Security Platform', ar: 'منصة Sentinel Auth الأمنية' },
    organization: { en: 'Security UI & Dashboards', ar: 'واجهات المراقبة الأمنية' },
    description: {
      en: 'Developed a security-first authentication dashboard with real-time threat detection, honeypot endpoints, automated IP blacklisting, and interactive analytics.',
      ar: 'طورت لوحة تحكم أمنية متقدمة مع كشف التهديدات الفوري وفخاخ أمنية وحظر تلقائي لـ IP وتحليلات تفاعلية.',
    },
    tags: ['React', 'Vite', 'Recharts', 'Security UI', 'JWT'],
  },
]
