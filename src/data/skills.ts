// ============================================================
// SKILLS DATA
// ============================================================

export interface Skill {
  name: string
  icon: string
  level: number // 0-100
  category: 'frontend' | 'mobile' | 'backend' | 'database' | 'tools' | 'engineering' | 'networking' | 'cybersecurity'
  color: string
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: 'react', level: 90, category: 'frontend', color: '#61DAFB' },
  { name: 'TypeScript', icon: 'typescript', level: 82, category: 'frontend', color: '#3178C6' },
  { name: 'JavaScript', icon: 'javascript', level: 90, category: 'frontend', color: '#F7DF1E' },
  { name: 'HTML5', icon: 'html5', level: 95, category: 'frontend', color: '#E34F26' },
  { name: 'CSS3', icon: 'css3', level: 92, category: 'frontend', color: '#1572B6' },
  { name: 'Tailwind CSS', icon: 'tailwind', level: 88, category: 'frontend', color: '#06B6D4' },
  { name: 'Vite', icon: 'vite', level: 85, category: 'frontend', color: '#646CFF' },

  // Mobile
  { name: 'Flutter', icon: 'flutter', level: 85, category: 'mobile', color: '#02569B' },
  { name: 'Dart', icon: 'dart', level: 83, category: 'mobile', color: '#0175C2' },

  // Backend
  { name: 'PHP', icon: 'php', level: 70, category: 'backend', color: '#777BB4' },
  { name: 'Laravel', icon: 'laravel', level: 68, category: 'backend', color: '#FF2D20' },
  { name: 'REST API', icon: 'api', level: 80, category: 'backend', color: '#06B6D4' },

  // Database
  { name: 'MySQL', icon: 'mysql', level: 75, category: 'database', color: '#4479A1' },
  { name: 'SQL Server', icon: 'mssql', level: 70, category: 'database', color: '#CC2927' },
  { name: 'Firebase', icon: 'firebase', level: 78, category: 'database', color: '#FFCA28' },
  { name: 'Oracle', icon: 'oracle', level: 60, category: 'database', color: '#F80000' },

  // Tools
  { name: 'Git', icon: 'git', level: 85, category: 'tools', color: '#F05032' },
  { name: 'GitHub', icon: 'github', level: 88, category: 'tools', color: '#181717' },
  { name: 'VS Code', icon: 'vscode', level: 95, category: 'tools', color: '#007ACC' },
  { name: 'Figma', icon: 'figma', level: 72, category: 'tools', color: '#F24E1E' },
]

export const skillCategories = [
  { key: 'all', label: { en: 'All', ar: 'الكل' } },
  { key: 'frontend', label: { en: 'Frontend', ar: 'واجهات أمامية' } },
  { key: 'mobile', label: { en: 'Mobile', ar: 'تطبيقات جوال' } },
  { key: 'backend', label: { en: 'Backend', ar: 'خلفية' } },
  { key: 'database', label: { en: 'Databases', ar: 'قواعد بيانات' } },
  { key: 'tools', label: { en: 'Tools', ar: 'أدوات' } },
]
