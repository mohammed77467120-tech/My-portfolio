// ============================================================
// PROJECTS DATA — Mohammed Ramadan Rajab AbdHood
// ============================================================

export interface Project {
  id: string
  slug: string
  title: { en: string; ar: string }
  subtitle: { en: string; ar: string }
  description: { en: string; ar: string }
  longDescription?: { en: string; ar: string }
  category: 'frontend' | 'mobile' | 'backend' | 'fullstack' | 'academic'
  technologies: string[]
  coverImage: string
  screenshots: string[]
  screenshotDescriptions?: { en: string[]; ar: string[] }
  role: { en: string; ar: string }
  duration: { en: string; ar: string }
  status: 'completed' | 'in-progress' | 'planned' | 'archived'
  features: { en: string[]; ar: string[] }
  githubUrl?: string
  liveDemo?: string
  featured: boolean
  order: number
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'icms',
    title: {
      en: 'ICMS — Immunization & Care Management System',
      ar: 'نظام إدارة التطعيم والرعاية الصحية',
    },
    subtitle: {
      en: 'Full-Stack Healthcare Management Platform',
      ar: 'منصة إدارة الرعاية الصحية الشاملة',
    },
    description: {
      en: 'A comprehensive healthcare management system for immunization tracking, maternal health, and reproductive care. Built with React and integrated with a real backend, supporting Arabic/English with full RTL layout.',
      ar: 'نظام إدارة رعاية صحية شامل لتتبع التطعيمات وصحة الأمومة والرعاية الإنجابية. مبني بـ React مع دعم كامل للعربية والإنجليزية.',
    },
    category: 'fullstack',
    technologies: ['React', 'JavaScript', 'REST API', 'i18next', 'React Router', 'PDF Export', 'AI Chatbot'],
    coverImage: '/projects/icms/dashboard.png',
    screenshots: [
      '/projects/icms/dashboard.png',
      '/projects/icms/dashboard2.png',
      '/projects/icms/login.png',
      '/projects/icms/users.png',
      '/projects/icms/vaccine.png',
      '/projects/icms/reproductive.png',
    ],
    screenshotDescriptions: {
      en: [
        'Main Dashboard — Real-time overview of immunization statistics, active cases, and system health metrics at a glance.',
        'Analytics Dashboard — Detailed charts and graphs showing vaccination rates, maternal health trends, and monthly progress reports.',
        'Login Screen — Secure authentication portal with role-based access control, supporting both Arabic and English interfaces.',
        'User Management — Comprehensive admin panel to manage system users, assign roles, and control access permissions.',
        'Vaccine Module — Track vaccine inventory, schedule immunization appointments, and monitor stock levels across all health centers.',
        'Reproductive Health — Dedicated module for maternal care records, pregnancy tracking, and reproductive health management.',
      ],
      ar: [
        'لوحة التحكم الرئيسية — نظرة عامة فورية على إحصائيات التطعيم والحالات النشطة ومؤشرات صحة النظام.',
        'لوحة التحليلات — مخططات ورسوم بيانية تفصيلية لمعدلات التطعيم واتجاهات صحة الأمومة والتقارير الشهرية.',
        'شاشة تسجيل الدخول — بوابة مصادقة آمنة مع التحكم في الوصول القائم على الأدوار، تدعم العربية والإنجليزية.',
        'إدارة المستخدمين — لوحة تحكم شاملة لإدارة مستخدمي النظام وتعيين الأدوار والتحكم في الصلاحيات.',
        'وحدة اللقاحات — تتبع مخزون اللقاحات وجدولة مواعيد التطعيم ومراقبة مستويات المخزون في جميع المراكز الصحية.',
        'الصحة الإنجابية — وحدة متخصصة لسجلات رعاية الأمومة وتتبع الحمل وإدارة الصحة الإنجابية.',
      ],
    },
    role: { en: 'Full-Stack Developer', ar: 'مطور متكامل' },
    duration: { en: '6 months', ar: '6 أشهر' },
    status: 'completed',
    features: {
      en: [
        'Immunization tracking & scheduling',
        'Maternal health & pregnancy records',
        'AI chatbot integration (Groq)',
        'Multi-language support (AR/EN) with RTL',
        'PDF export & reporting',
        'Advanced search with NLP',
        'User & role management',
        'Vaccine inventory management',
      ],
      ar: [
        'تتبع وجدولة التطعيمات',
        'سجلات صحة الأمومة والحمل',
        'دمج روبوت دردشة ذكي (Groq)',
        'دعم متعدد اللغات مع RTL',
        'تصدير PDF والتقارير',
        'بحث متقدم بالذكاء الاصطناعي',
        'إدارة المستخدمين والصلاحيات',
        'إدارة مخزون اللقاحات',
      ],
    },
    githubUrl: 'https://github.com/mohammed77467120-tech',
    featured: true,
    order: 1,
  },
  {
    id: '2',
    slug: 'sentinel-auth',
    title: {
      en: 'Sentinel Auth — Security Monitoring Platform',
      ar: 'سنتينيل أوث — منصة المراقبة الأمنية',
    },
    subtitle: {
      en: 'Identity & Threat Monitoring Dashboard',
      ar: 'لوحة تحكم المصادقة ومراقبة التهديدات',
    },
    description: {
      en: 'A full-stack security-first authentication and threat monitoring dashboard. Detects and blocks brute-force, SQL injection, and suspicious login attempts with real-time analytics.',
      ar: 'منصة مصادقة وأمن متكاملة تكتشف وتصد هجمات القوة العمياء وحقن SQL ومحاولات الدخول المشبوهة مع تحليلات فورية.',
    },
    category: 'fullstack',
    technologies: ['React', 'Vite', 'Recharts', 'C#', 'ASP.NET Core 6', 'PostgreSQL', 'JWT', 'BCrypt'],
    coverImage: '/projects/auth/screen1.png',
    screenshots: [
      '/projects/auth/screen1.png',
      '/projects/auth/screen2.png',
      '/projects/auth/screen3.png',
      '/projects/auth/screen4.png',
      '/projects/auth/screen5.png',
      '/projects/auth/screen6.png',
    ],
    screenshotDescriptions: {
      en: [
        'Security Overview — Live threat dashboard displaying real-time attack attempts, blocked IPs, and system security score.',
        'Login Portal — Hardened authentication page with honeypot detection, CAPTCHA integration, and brute-force protection.',
        'Threat Analytics — Interactive Recharts visualizations showing attack velocity trends, geographic origin maps, and risk distributions.',
        'IP Management — Automated blacklist panel with manual override controls, whitelist management, and IP reputation scoring.',
        'Attack Log — Detailed event timeline of all suspicious activities including SQL injection attempts, XSS vectors, and anomalies.',
        'User Sessions — Active session monitoring dashboard with device fingerprinting, geolocation tracking, and anomaly alerts.',
      ],
      ar: [
        'نظرة أمنية عامة — لوحة التهديدات الحية تعرض محاولات الهجوم الفورية وعناوين IP المحظورة ودرجة أمان النظام.',
        'بوابة تسجيل الدخول — صفحة مصادقة محصنة مع كشف الفخاخ الأمنية ودعم CAPTCHA والحماية من هجمات القوة العمياء.',
        'تحليلات التهديدات — تصورات تفاعلية تُظهر اتجاهات سرعة الهجوم وخرائط المصدر الجغرافي وتوزيعات المخاطر.',
        'إدارة عناوين IP — لوحة القائمة السوداء التلقائية مع عناصر تحكم يدوية وإدارة القائمة البيضاء وتقييم سمعة IP.',
        'سجل الهجمات — جدول زمني تفصيلي لجميع الأنشطة المشبوهة بما فيها محاولات حقن SQL وهجمات XSS والشذوذات.',
        'جلسات المستخدمين — لوحة مراقبة الجلسات النشطة مع بصمة الجهاز وتتبع الموقع الجغرافي وتنبيهات الشذوذ.',
      ],
    },
    role: { en: 'Full-Stack Developer', ar: 'مطور متكامل' },
    duration: { en: '3 months', ar: '3 أشهر' },
    status: 'completed',
    features: {
      en: [
        'Real-time threat monitoring dashboard',
        'Honeypot endpoint system',
        'Progressive tarpitting & rate limiting',
        'Automated IP blacklisting',
        'Interactive charts (attack velocity, pie charts)',
        'Risk scoring per request',
        'JWT Authentication',
      ],
      ar: [
        'لوحة مراقبة التهديدات الفورية',
        'نظام الفخاخ الأمنية (Honeypot)',
        'تأخير الاستجابة التدريجي وتحديد المعدل',
        'حظر تلقائي لعناوين IP',
        'مخططات تفاعلية (سرعة الهجوم، مخططات دائرية)',
        'تسجيل درجة خطر لكل طلب',
        'مصادقة JWT',
      ],
    },
    githubUrl: 'https://github.com/mohammed77467120-tech',
    featured: true,
    order: 2,
  },
  {
    id: '3',
    slug: 'expir-flutter',
    title: {
      en: 'Expir — Permissions Management App',
      ar: 'Expir — تطبيق إدارة الصلاحيات',
    },
    subtitle: {
      en: 'Flutter Mobile Application',
      ar: 'تطبيق جوال بـ Flutter',
    },
    description: {
      en: 'A Flutter mobile application for managing user permissions and access control. Features a clean, modern UI with smooth navigation and role-based access management.',
      ar: 'تطبيق جوال بـ Flutter لإدارة صلاحيات المستخدمين والتحكم في الوصول. يتميز بواجهة حديثة ونظيفة مع تنقل سلس وإدارة الأدوار.',
    },
    category: 'mobile',
    technologies: ['Flutter', 'Dart', 'Mobile UI', 'State Management'],
    coverImage: '/projects/expir/screen1.jpg',
    screenshots: [
      '/projects/expir/screen1.jpg',
      '/projects/expir/screen2.jpg',
      '/projects/expir/screen3.jpg',
      '/projects/expir/screen4.jpg',
      '/projects/expir/screen5.jpg',
      '/projects/expir/screen6.jpg',
      '/projects/expir/screen7.jpg',
      '/projects/expir/screen8.jpg',
      '/projects/expir/screen9.jpg',
      '/projects/expir/screen10.jpg',
    ],
    screenshotDescriptions: {
      en: [
        'Splash Screen — Animated app launch screen with branding and smooth transition into the main application.',
        'Onboarding — Guided introduction to the app features with clean Material Design illustrations and step-by-step walkthroughs.',
        'Login Screen — Secure user authentication with email/password login, biometric support, and forgot password flow.',
        'Home Dashboard — Quick overview of active permissions, pending requests, and recent activity summary.',
        'Permissions List — Complete list of all user permissions with status indicators and quick toggle controls.',
        'Permission Detail — Detailed view of a single permission with full description, assigned users, and modification history.',
        'User Profile — User account management page with avatar, personal info editing, and notification preferences.',
        'Request Flow — Step-by-step permission request process with justification form and approval chain visualization.',
        'Notifications — Real-time notification center for permission approvals, rejections, and system alerts.',
        'Settings — App configuration screen with theme selection, language preferences, and security settings.',
      ],
      ar: [
        'شاشة البداية — شاشة إطلاق التطبيق المتحركة مع العلامة التجارية والانتقال السلس إلى التطبيق الرئيسي.',
        'تعريف بالتطبيق — مقدمة إرشادية لميزات التطبيق مع رسومات Material Design نظيفة وجولات تفصيلية.',
        'شاشة تسجيل الدخول — مصادقة آمنة للمستخدم مع تسجيل الدخول بالبريد والكلمة السرية ودعم المقاييس الحيوية.',
        'لوحة الرئيسية — نظرة سريعة على الصلاحيات النشطة والطلبات المعلقة وملخص النشاط الأخير.',
        'قائمة الصلاحيات — قائمة كاملة بجميع صلاحيات المستخدم مع مؤشرات الحالة وعناصر التبديل السريع.',
        'تفاصيل الصلاحية — عرض تفصيلي لصلاحية واحدة مع الوصف الكامل والمستخدمين المعينين وسجل التعديلات.',
        'الملف الشخصي — صفحة إدارة حساب المستخدم مع الصورة الرمزية وتحرير المعلومات الشخصية وتفضيلات الإشعارات.',
        'تدفق الطلب — عملية طلب الصلاحيات خطوة بخطوة مع نموذج التبرير وتصور سلسلة الموافقة.',
        'الإشعارات — مركز إشعارات فوري لموافقات الصلاحيات والرفض والتنبيهات النظامية.',
        'الإعدادات — شاشة تكوين التطبيق مع اختيار السمة وتفضيلات اللغة وإعدادات الأمان.',
      ],
    },
    role: { en: 'Mobile Developer', ar: 'مطور جوال' },
    duration: { en: '2 months', ar: 'شهرين' },
    status: 'completed',
    features: {
      en: [
        'Role-based access control',
        'Clean Material Design UI',
        'Smooth page transitions',
        'Permission management dashboard',
        'User profile management',
      ],
      ar: [
        'التحكم في الوصول بناءً على الأدوار',
        'واجهة Material Design نظيفة',
        'انتقالات سلسة بين الصفحات',
        'لوحة تحكم إدارة الصلاحيات',
        'إدارة ملفات المستخدمين',
      ],
    },
    githubUrl: 'https://github.com/mohammed77467120-tech',
    featured: true,
    order: 3,
  },
]
