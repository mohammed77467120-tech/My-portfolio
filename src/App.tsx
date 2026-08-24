import { ThemeProvider } from './context/ThemeContext'
import { LangProvider } from './context/LangContext'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import SkillsSection from './components/sections/SkillsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/layout/Footer'
import BackToTop from './components/ui/BackToTop'
import ScrollProgress from './components/ui/ScrollProgress'

function AppContent() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        تخطي إلى المحتوى الرئيسي / Skip to main content
      </a>

      {/* Top Reading Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main id="main-content" style={{ width: '100%', overflowX: 'hidden' }}>
        {/* Unified Hero Section */}
        <HeroSection />

        <div style={{ height: '1px', background: 'var(--border)', maxWidth: '1200px', margin: '0 auto', opacity: 0.6 }} />

        {/* Skills Hub Section */}
        <SkillsSection />

        <div style={{ height: '1px', background: 'var(--border)', maxWidth: '1200px', margin: '0 auto', opacity: 0.6 }} />

        {/* Experience & Timeline Section */}
        <ExperienceSection />

        <div style={{ height: '1px', background: 'var(--border)', maxWidth: '1200px', margin: '0 auto', opacity: 0.6 }} />

        {/* Featured Projects Section */}
        <ProjectsSection />

        <div style={{ height: '1px', background: 'var(--border)', maxWidth: '1200px', margin: '0 auto', opacity: 0.6 }} />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back To Top Floating Action */}
      <BackToTop />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AppContent />
      </LangProvider>
    </ThemeProvider>
  )
}

export default App
