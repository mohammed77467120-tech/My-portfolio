import { ThemeProvider } from './context/ThemeContext'
import { LangProvider } from './context/LangContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'
import ScrollProgress from './components/ui/ScrollProgress'
import BackToTop from './components/ui/BackToTop'

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTop />
      </LangProvider>
    </ThemeProvider>
  )
}

export default App
