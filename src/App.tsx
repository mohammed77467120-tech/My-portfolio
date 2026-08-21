import { ThemeProvider } from './context/ThemeContext'
import { LangProvider } from './context/LangContext'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/layout/Footer'
import BackToTop from './components/ui/BackToTop'
import ScrollProgress from './components/ui/ScrollProgress'
import D3StringTransition from './components/d3/D3StringTransition'

function AppContent() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Top Reading Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Portfolio Sections with D3 String Wave Transitions */}
      <main id="main-content">
        <HeroSection />

        <D3StringTransition color="#F5A623" accentColor="#3ECFCF" />

        <AboutSection />

        <D3StringTransition color="#3ECFCF" accentColor="#F5A623" />

        <SkillsSection />

        <D3StringTransition color="#646CFF" accentColor="#3ECFCF" />

        <ExperienceSection />

        <D3StringTransition color="#F5A623" accentColor="#646CFF" />

        <ProjectsSection />

        <D3StringTransition color="#3ECFCF" accentColor="#F5A623" />

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
