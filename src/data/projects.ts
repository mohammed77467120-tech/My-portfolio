// ============================================================
// PROJECTS DATA — Mohammed AbdHood (محمد عبدهود)
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
      en: 'Interactive Healthcare Management Platform',
      ar: 'منصة إدارة الرعاية الصحية التفاعلية',
    },
    description: {
      en: 'A comprehensive healthcare management system for immunization tracking, maternal health, and reproductive care. Built with React, supporting Arabic/English with full RTL layout.',
      ar: 'نظام إدارة رعاية صحية شامل لتتبع التطعيمات وصحة الأمومة والرعاية الإنجابية. مبني بـ React مع دعم كامل للعربية والإنجليزية.',
    },
    category: 'frontend',
    technologies: ['React', 'JavaScript', 'i18next', 'React Router', 'PDF Export', 'AI Chatbot'],
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
    role: { en: 'Front-End Developer', ar: 'مطور واجهات أمامية' },
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
      en: 'A security-first authentication and threat monitoring dashboard interface. Detects and visualizes brute-force, SQL injection, and suspicious login attempts with real-time analytics.',
      ar: 'واجهة منصة مصادقة وأمن متكاملة تكتشف وتصد محاولات الدخول المشبوهة مع تحليلات ورسوم بيانية فورية.',
    },
    category: 'frontend',
    technologies: ['React', 'Vite', 'Recharts', 'Security UI', 'JWT', 'Threat Analytics'],
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
    slug: 'mabeaty-flutter',
    title: {
      en: 'Mabeaty — Product Expiry Tracker',
      ar: 'مبيعاتي — تطبيق تتبع صلاحية المنتجات',
    },
    subtitle: {
      en: 'Product Expiration Tracking App for Retailers',
      ar: 'تطبيق تتبع تاريخ انتهاء المنتجات للمحلات',
    },
    description: {
      en: 'A Flutter mobile application designed for small shop owners (grocery stores, retail shops, cleaners) to track product expiration dates. It monitors inventory shelf life and triggers automated alerts when items are nearing expiry, helping reduce waste and manage stock efficiently.',
      ar: 'تطبيق جوال مبني بـ Flutter مصمم لأصحاب المحلات التجارية الصغيرة (البقالات، محلات التجزئة، المنظفات) لتتبع تواريخ انتهاء صلاحية المنتجات ومراقبة مدة صلاحية البضائع، مع إرسال تنبيهات تلقائية عند قرب انتهاء الصلاحية للمساعدة في تقليل الهدر وإدارة المخزون بكفاءة.',
    },
    category: 'mobile',
    technologies: ['Flutter', 'Dart', 'Hive DB', 'Local Notifications', 'Barcode Scanner', 'Provider'],
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
        'Splash Screen — Animated app launch screen with branding and smooth transitions.',
        'Onboarding Guide — Guided introduction to tracking features, notifications, and stock control.',
        'Dashboard — Real-time overview of expired items, products nearing expiration, and total inventory count.',
        'Add Product — Quick entry form supporting barcode scanning and expiration date logging.',
        'Product Inventory — Categorized list of items with visual status badges (Safe, Warning, Expired).',
        'Expiry Timeline — Chronological timeline of upcoming product expiration dates.',
        'Notification Settings — Customizable alert thresholds (e.g., notify 30, 15, or 7 days prior).',
        'Smart Search & Filter — Search stock by barcode or name and filter by category or status.',
        'Store Management — Account panel for shop owners with general profile and support settings.',
        'Backup & Restore — Backup local database or import existing inventory data.',
      ],
      ar: [
        'شاشة البداية — شاشة إطلاق التطبيق المتحركة مع شعار التطبيق وانتقالات سلسة.',
        'دليل الاستخدام — مقدمة إرشادية للميزات الأساسية مثل التنبيهات وإدارة المنتجات.',
        'لوحة التحكم — ملخص فوري للمنتجات المنتهية، التي تقترب من الانتهاء، وإجمالي المنتجات المسجلة.',
        'إضافة منتج — نموذج سريع لإضافة المنتجات يدعم مسح الباركود وتحديد تاريخ انتهاء الصلاحية.',
        'مخزون المنتجات — قائمة مصنفة بالمنتجات مع مؤشرات ملونة لحالة الصلاحية (آمن، منتهي قريباً، منتهي).',
        'مخطط الصلاحية الزمني — عرض زمني مرتب للمنتجات حسب تاريخ الانتهاء لتسهيل إخلاء الرفوف.',
        'إعدادات التنبيهات — تخصيص فترات الإشعار المسبق (مثلاً تنبيه قبل 30 أو 15 أو 7 أيام من انتهاء الصلاحية).',
        'البحث الذكي والتصفية — البحث عن المنتجات بالاسم أو الباركود وتصفيتها حسب القسم أو الحالة.',
        'إدارة المتجر — الملف الشخصي لمالك البقالة مع خيارات الحساب والتحكم في إشعارات التطبيق.',
        'النسخ الاحتياطي — النسخ الاحتياطي المحلي لقاعدة البيانات واستيراد البيانات لاستعادة المخزون.',
      ],
    },
    role: { en: 'Mobile Developer', ar: 'مطور جوال' },
    duration: { en: '2 months', ar: 'شهرين' },
    status: 'completed',
    features: {
      en: [
        'Real-time expiration date tracking',
        'Automated local alert notifications',
        'Barcode scanner integration for quick entry',
        'Categorized inventory (Food, Cleaners, Cosmetics)',
        'Visual color-coded status badges',
        'Offline capability with local Hive storage',
      ],
      ar: [
        'تتبع تاريخ انتهاء صلاحية المنتجات في الوقت الفعلي',
        'تنبيهات وإشعار محلي تلقائي عند اقتراب الانتهاء',
        'قارئ باركود مدمج لإدخال المنتجات بسرعة',
        'إدارة المخزون وتصنيفه (مواد غذائية، منظفات، كماليات)',
        'شارات حالة ملونة تدل على حالة الصلاحية',
        'قاعدة بيانات محلية سريعة (Hive) تعمل دون اتصال بالإنترنت',
      ],
    },
    githubUrl: 'https://github.com/mohammed77467120-tech',
    featured: true,
    order: 3,
  },
]
