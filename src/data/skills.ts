// ============================================================
// SKILLS DATA — Clean Tech Stack (No Arbitrary Ratings)
// ============================================================

export interface Skill {
  name: string
  icon: string
  category: 'frontend' | 'mobile' | 'backend' | 'database' | 'tools'
  color: string
  tagline: {
    en: string
    ar: string
  }
}

export const skills: Skill[] = [
  // Frontend
  {
    name: 'React',
    icon: 'react',
    category: 'frontend',
    color: '#61DAFB',
    tagline: { en: 'SPA Architecture & Custom Hooks', ar: 'تطبيقات أحادية الصفحة وHooks مخصصة' },
  },
  {
    name: 'JavaScript (ES6+)',
    icon: 'javascript',
    category: 'frontend',
    color: '#F7DF1E',
    tagline: { en: 'Async Logic & DOM Manipulation', ar: 'المنطق البرمجي والتعامل مع DOM' },
  },
  {
    name: 'HTML5 & CSS3',
    icon: 'html5',
    category: 'frontend',
    color: '#E34F26',
    tagline: { en: 'Semantic Layouts & Modern Styling', ar: 'هيكلة دلالية وتصميمات معاصرة' },
  },
  {
    name: 'Vite',
    icon: 'vite',
    category: 'frontend',
    color: '#646CFF',
    tagline: { en: 'Lightning Fast Tooling & Bundling', ar: 'أدوات بناء وتجميع فائقة السرعة' },
  },

  // Mobile
  {
    name: 'Flutter',
    icon: 'flutter',
    category: 'mobile',
    color: '#02569B',
    tagline: { en: 'Cross-Platform Android & iOS Apps', ar: 'تطبيقات جوال مشتركة للأندرويد وiOS' },
  },
  {
    name: 'Dart',
    icon: 'dart',
    category: 'mobile',
    color: '#0175C2',
    tagline: { en: 'Object-Oriented Mobile Core', ar: 'برمجة كائنية لتطبيقات الجوال' },
  },

  // Backend
  {
    name: 'RESTful APIs',
    icon: 'api',
    category: 'backend',
    color: '#06B6D4',
    tagline: { en: 'JSON Endpoints & Client Integration', ar: 'ربط واجهات البرمجية وتكامل البيانات' },
  },
  {
    name: 'PHP',
    icon: 'php',
    category: 'backend',
    color: '#777BB4',
    tagline: { en: 'Server Scripting & Web Services', ar: 'سكربتات الخادم والخدمات البرمجية' },
  },
  {
    name: 'Laravel',
    icon: 'laravel',
    category: 'backend',
    color: '#FF2D20',
    tagline: { en: 'MVC Web Framework', ar: 'إطار عمل MVC م ميز للويب' },
  },

  // Database
  {
    name: 'MySQL',
    icon: 'mysql',
    category: 'database',
    color: '#4479A1',
    tagline: { en: 'Relational Schema Design & Queries', ar: 'تصميم الجداول والاستعلامات العلاقاتية' },
  },
  {
    name: 'Firebase',
    icon: 'firebase',
    category: 'database',
    color: '#FFCA28',
    tagline: { en: 'Realtime Database & Authentication', ar: 'قواعد بيانات فورية والمصادقة' },
  },
  {
    name: 'SQL Server',
    icon: 'mssql',
    category: 'database',
    color: '#CC2927',
    tagline: { en: 'Enterprise Database Systems', ar: 'أنظمة قواعد البيانات للمؤسسات' },
  },

  // Tools
  {
    name: 'Git & GitHub',
    icon: 'github',
    category: 'tools',
    color: '#F05032',
    tagline: { en: 'Version Control & Workflow', ar: 'إدارة النسخ والعمل الجماعي' },
  },
  {
    name: 'VS Code',
    icon: 'vscode',
    category: 'tools',
    color: '#007ACC',
    tagline: { en: 'Primary Engineering Workspace', ar: 'بيئة التطوير والبرمجة الرئيسية' },
  },
  {
    name: 'Figma',
    icon: 'figma',
    category: 'tools',
    color: '#F24E1E',
    tagline: { en: 'UI/UX Prototyping & Inspection', ar: 'تحويل التصاميم إلى كود تفاعلي' },
  },
]

export const skillCategories = [
  { key: 'all', label: { en: 'All Skills', ar: 'كل المهارات' } },
  { key: 'frontend', label: { en: 'Front-End', ar: 'الواجهات الأمامية' } },
  { key: 'mobile', label: { en: 'Mobile Apps', ar: 'تطبيقات الجوال' } },
  { key: 'backend', label: { en: 'Backend', ar: 'الأنظمة الخلفية' } },
  { key: 'database', label: { en: 'Databases', ar: 'قواعد البيانات' } },
  { key: 'tools', label: { en: 'Tools & Workflow', ar: 'الأدوات والعمليات' } },
]
