// ============================================================
// SKILLS DATA — Strictly from Official CV (23 Verified Skills)
// Categorized Tech Stack — No Arbitrary Ratings / Percentages
// ============================================================

export type SkillCategoryKey =
  | 'frontend'
  | 'mobile'
  | 'database'
  | 'systems'
  | 'engineering'
  | 'tools'

export interface Skill {
  name: string
  icon: string
  category: SkillCategoryKey
  color: string
  tagline: {
    en: string
    ar: string
  }
}

export interface SkillCategory {
  key: 'all' | SkillCategoryKey
  label: {
    en: string
    ar: string
  }
  iconName: string
}

export const skillCategories: SkillCategory[] = [
  { key: 'all', label: { en: 'All Skills', ar: 'كل المهارات' }, iconName: 'Layers' },
  { key: 'frontend', label: { en: 'Front-End Development', ar: 'الواجهات الأمامية' }, iconName: 'Layout' },
  { key: 'mobile', label: { en: 'Mobile Development', ar: 'تطبيقات الجوال' }, iconName: 'Smartphone' },
  { key: 'database', label: { en: 'Databases', ar: 'قواعد البيانات' }, iconName: 'Database' },
  { key: 'systems', label: { en: 'Systems & Networking', ar: 'الأنظمة والشبكات' }, iconName: 'Network' },
  { key: 'engineering', label: { en: 'Software Engineering', ar: 'هندسة البرمجيات' }, iconName: 'Workflow' },
  { key: 'tools', label: { en: 'Tools & Platforms', ar: 'الأدوات والمنصات' }, iconName: 'Wrench' },
]

export const skills: Skill[] = [
  // 1. Front-End Development
  {
    name: 'React',
    icon: 'react',
    category: 'frontend',
    color: '#61DAFB',
    tagline: {
      en: 'Component Architecture & Interactive Single Page Apps',
      ar: 'بناء الواجهات التفاعلية وتطبيقات الصفحة الواحدة',
    },
  },
  {
    name: 'JavaScript (ES6+)',
    icon: 'javascript',
    category: 'frontend',
    color: '#F7DF1E',
    tagline: {
      en: 'Modern Async Logic, Web APIs & DOM Manipulation',
      ar: 'البرمجة اللاتزامية، واجهات المتصفح وهيكلة البيانات',
    },
  },
  {
    name: 'HTML5 & CSS3',
    icon: 'html5',
    category: 'frontend',
    color: '#E34F26',
    tagline: {
      en: 'Semantic Markup, Flexbox/Grid & Modern Layouts',
      ar: 'الهيكلة الدلالية وتنسيقات CSS المتقدمة والمتجاوبة',
    },
  },
  {
    name: 'Responsive Web Design',
    icon: 'responsive',
    category: 'frontend',
    color: '#38BDF8',
    tagline: {
      en: 'Mobile-First Layouts & Cross-Device Compatibility',
      ar: 'تصميم مرن ومتوافق مع مختلف أحجام الشاشات والأجهزة',
    },
  },
  {
    name: 'UI/UX Design',
    icon: 'uiux',
    category: 'frontend',
    color: '#F43F5E',
    tagline: {
      en: 'User Experience Principles & Intuitive Interface Design',
      ar: 'دراسة تجربة المستخدم وبناء واجهات سلسة وجذابة',
    },
  },

  // 2. Mobile Development
  {
    name: 'Flutter',
    icon: 'flutter',
    category: 'mobile',
    color: '#02569B',
    tagline: {
      en: 'High-Performance Cross-Platform Apps (Android & iOS)',
      ar: 'تطبيقات جوال عالية الأداء ومشتركة لنظامي Android و iOS',
    },
  },
  {
    name: 'Dart',
    icon: 'dart',
    category: 'mobile',
    color: '#0175C2',
    tagline: {
      en: 'Object-Oriented Core & Asynchronous Mobile Logic',
      ar: 'البرمجة كائنية التوجه وإدارة البيانات لتطبيقات الموبايل',
    },
  },
  {
    name: 'Firebase',
    icon: 'firebase',
    category: 'mobile',
    color: '#FFCA28',
    tagline: {
      en: 'Realtime Database, Authentication & Cloud Services',
      ar: 'قواعد بيانات فورية، المصادقة والخدمات السحابية',
    },
  },

  // 3. Databases
  {
    name: 'MySQL',
    icon: 'mysql',
    category: 'database',
    color: '#4479A1',
    tagline: {
      en: 'Relational Database Design, Normalization & Queries',
      ar: 'تصميم الجداول العلائقية، الفهرسة والاستعلامات السريعة',
    },
  },
  {
    name: 'SQL Server',
    icon: 'mssql',
    category: 'database',
    color: '#CC2927',
    tagline: {
      en: 'Enterprise Relational Databases & T-SQL Procedures',
      ar: 'قواعد بيانات المؤسسات وإجراءات T-SQL المتقدمة',
    },
  },
  {
    name: 'Oracle Database',
    icon: 'oracle',
    category: 'database',
    color: '#EA1B22',
    tagline: {
      en: 'Enterprise-Grade SQL & High-Availability Database Management',
      ar: 'أنظمة قواعد البيانات الضخمة وإدارة الأداء والمؤسسات',
    },
  },

  // 4. Systems & Networking
  {
    name: 'Linux (Ubuntu)',
    icon: 'linux',
    category: 'systems',
    color: '#E95420',
    tagline: {
      en: 'Terminal Administration, Permissions & Service Management',
      ar: 'إدارة خوادم لينكس، أوامر الطرفية وإدارة الصلاحيات والخدمات',
    },
  },
  {
    name: 'Windows Server',
    icon: 'windows',
    category: 'systems',
    color: '#0078D7',
    tagline: {
      en: 'Server Administration, Active Directory & Roles',
      ar: 'إدارة خوادم ويندوز، إدارة المستخدمين والخدمات الشبكية',
    },
  },
  {
    name: 'Computer Networking',
    icon: 'network',
    category: 'systems',
    color: '#14B8A6',
    tagline: {
      en: 'TCP/IP Protocols, Subnetting, Routing & Diagnostics',
      ar: 'بروتوكولات TCP/IP، توجيه الشبكات وحل مشكلات الاتصال',
    },
  },
  {
    name: 'Information Security & Cybersecurity',
    icon: 'security',
    category: 'systems',
    color: '#EF4444',
    tagline: {
      en: 'Security Fundamentals, Threat Mitigation & Data Protection',
      ar: 'أساسيات حماية البيانات، تشفير الاتصال والوقاية من التهديدات',
    },
  },

  // 5. Software Engineering
  {
    name: 'Software Engineering Principles',
    icon: 'principles',
    category: 'engineering',
    color: '#A855F7',
    tagline: {
      en: 'SOLID Principles, Clean Code & Scalable Architecture',
      ar: 'مبادئ SOLID، الكود النظيف والتصميم المعماري القابل للتوسع',
    },
  },
  {
    name: 'System Analysis & Design',
    icon: 'analysis',
    category: 'engineering',
    color: '#3B82F6',
    tagline: {
      en: 'Requirement Engineering, UML Modeling & Workflow Design',
      ar: 'تحليل المتطلبات البرمجية، نمذجة UML وتخطيط تدفق البيانات',
    },
  },
  {
    name: 'Agile & Kanban',
    icon: 'agile',
    category: 'engineering',
    color: '#10B981',
    tagline: {
      en: 'Iterative Sprints, Continuous Delivery & Team Workflows',
      ar: 'إدارة دورة حياة المشاريع، التخطيط المرحلي والعمل الجماعي',
    },
  },

  // 6. Tools & Platforms
  {
    name: 'Git & GitHub',
    icon: 'github',
    category: 'tools',
    color: '#F05032',
    tagline: {
      en: 'Branching Strategies, Version Control & Collaboration',
      ar: 'إدارة النسخ البرمجية، التفريع والتعاون الجماعي عبر GitHub',
    },
  },
  {
    name: 'Figma',
    icon: 'figma',
    category: 'tools',
    color: '#F24E1E',
    tagline: {
      en: 'UI Wireframing, Interactive Prototypes & Design Systems',
      ar: 'تصميم النماذج الأولية وتجهيز تصاميم الواجهات للبرمجة',
    },
  },
  {
    name: 'WordPress',
    icon: 'wordpress',
    category: 'tools',
    color: '#21759B',
    tagline: {
      en: 'CMS Configuration, Customization & Content Management',
      ar: 'إدارة وتخصيص أنظمة إدارة المحتوى والمواقع الديناميكية',
    },
  },
  {
    name: 'Microsoft Office',
    icon: 'office',
    category: 'tools',
    color: '#D83B01',
    tagline: {
      en: 'Technical Documentation, Spreadsheets & Reporting',
      ar: 'التوثيق التقني، إعداد التقارير وتحليل البيانات المكتبية',
    },
  },
]
