import { Analytics } from '@vercel/analytics/react';
import CoLearningHome from './components/sections/CoLearningHome';
import SEO from './components/SEO/SEO';
import SchemaContainer from './components/SchemaContainer/SchemaContainer';
import { generateOrganizationSchema, generateSoftwareApplicationSchema } from './utils/schemaGenerators';

function App() {
  return (
    <>
      <SEO
        title="RevPlanner — Co-learning for Human+Agent Revenue Teams"
        description="The revenue co-learning hub for lean teams running humans + agents. Diagnose, generate, prove reps learned it, and tie it to pipeline — in one tool, grounded in your real CRM. No implementation team, no 12-week rollout."
        keywords="AI revenue enablement, human agent co-learning, agent dock, pipeline saved, sales enablement for lean teams, revenue co-learning, AI SDR orchestration"
        canonical="https://revplanner.io/"
        ogImage="https://revplanner.io/og-image.png"
      />

      <SchemaContainer schema={generateOrganizationSchema()} />
      <SchemaContainer schema={generateSoftwareApplicationSchema()} />

      <CoLearningHome />

      {/* Vercel Web Analytics — privacy-first pageview tracking, complements HubSpot for top-of-funnel data */}
      <Analytics />
    </>
  )
}

export default App
