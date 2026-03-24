import Navbar from './components/sections/Navbar';
import HeroSection from './components/sections/HeroSection';
import StatsBar from './components/sections/StatsBar';
import HealthSection from './components/sections/HealthSection';
import FlowSection from './components/sections/FlowSection';
import ToolStackSection from './components/sections/ToolStackSection';
import VsSection from './components/sections/VsSection';
import ReplacesSection from './components/sections/ReplacesSection';
import CompareSection from './components/sections/CompareSection';
import QuoteSection from './components/sections/QuoteSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import WhoSection from './components/sections/WhoSection';
import TimeToValueSection from './components/sections/TimeToValueSection';
import FlywheelSection from './components/sections/FlywheelSection';
import SocialProofSection from './components/sections/SocialProofSection';
import CtaSection from './components/sections/CtaSection';
import Footer from './components/sections/Footer';
import SEO from './components/SEO/SEO';
import SchemaContainer from './components/SchemaContainer/SchemaContainer';
import { generateOrganizationSchema, generateSoftwareApplicationSchema } from './utils/schemaGenerators';

function App() {
  return (
    <>
      <SEO
        title="RevPlanner — Your Revenue Engine Has Blind Spots"
        description="AI Revenue Enablement Platform. Automated sales coaching, battlecards, and recovery scripts from your CRM, calls, and knowledge base. No implementation team required."
        keywords="AI sales enablement, revenue coaching, automated battlecards, sales intelligence, CRM analysis, AI revenue engine"
        canonical="https://revplanner.io/"
        ogImage="https://revplanner.io/og-image.png"
      />
      
      <SchemaContainer schema={generateOrganizationSchema()} />
      <SchemaContainer schema={generateSoftwareApplicationSchema()} />

      <Navbar />
      <HeroSection />
      <StatsBar />
      <HealthSection />
      <FlowSection />
      <ToolStackSection />
      <VsSection />
      <ReplacesSection />
      <CompareSection />
      <QuoteSection />
      <HowItWorksSection />
      <WhoSection />
      <TimeToValueSection />
      <FlywheelSection />
      <SocialProofSection />
      <CtaSection />
      <Footer />
    </>
  )
}

export default App
