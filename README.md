# RevPlanner — Marketing Website

Landing page for **RevPlanner**, the AI revenue team you don't have to hire.

RevPlanner is a B2B SaaS platform that reads your CRM data, call recordings, and knowledge base to automatically generate battlecards, coaching plans, pipeline recovery scripts, and enablement content — without needing a dedicated enablement team.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 8 |
| Styling | CSS Modules + CSS custom properties |
| Linting | ESLint 9 + typescript-eslint + eslint-plugin-react-hooks |
| Font | DM Sans |

No third-party UI libraries, no CSS-in-JS, no client-side router. Pure React marketing landing page.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Single-page component tree (no routing)
├── styles/
│   ├── variables.css     # Design tokens (colors, typography)
│   └── globals.css       # Reset + shared utility classes
├── types/index.ts        # Centralised TypeScript interfaces
├── data/                 # Pure typed data arrays (all copy/content lives here)
├── hooks/
│   └── useAccordion.ts   # Accordion expand/collapse
└── components/
    ├── ui/               # Primitive components: Button, Badge, GradientText, SectionHeader
    └── sections/         # One folder per page section (index.tsx + .module.css)
```

### Page Sections (top → bottom)

| Section | Description |
|---|---|
| `Navbar` | Nav links + "Start Free Scan" CTA |
| `HeroSection` | Headline, email signup, Google/Microsoft OAuth |
| `StatsBar` | 5 key numbers (5 min setup, 90 sec scan, $487K avg pipeline risk found…) |
| `HealthSection` | Revenue Health Score concept |
| `FlowSection` | Platform loop: System Scan → Agent Console → Ticket System |
| `ToolStackSection` | Why CRM + Calls + KB alone aren't enough |
| `VsSection` | Old way vs. RevPlanner way (battlecard example) |
| `ReplacesSection` | Pricing comparison vs. 4 individual tools |
| `CompareSection` | Feature matrix vs. HubSpot, Gong, Highspot, Clari |
| `QuoteSection` | Testimonial pull quote |
| `HowItWorksSection` | Deep dive into Agent Console, Ticketing System, System Scan |
| `WhoSection` | Target persona: the solo revenue operator |
| `TimeToValueSection` | 3-step onboarding (connect → scan → first deliverable) |
| `FlywheelSection` | AI learning loop |
| `SocialProofSection` | Customer logo bar |
| `CtaSection` | Final CTA: free scan + demo |
| `Footer` | Links: Product, Ticket Types, Company, Resources |

### Ticket Types

RevPlanner outputs four categories of AI-generated tickets:

- **`COMP`** — Competitive Intelligence (battlecards, objection handling, win/loss)
- **`PIPE`** — Pipeline Recovery (at-risk deals, forecast checks)
- **`COACH`** — Enablement & Coaching (rep coaching, 1:1 prep, performance reviews)
- **`CONTENT`** — Enablement Content (playbooks, case studies, role plays, onboarding)

---

## Content & Data

All section copy is data-driven. Content is stored in typed files under `src/data/` and injected into presentational section components, keeping copy changes isolated from component logic.

---

## Adding New Sections

1. Create `src/components/sections/MySectionName/index.tsx` and `MySectionName.module.css`.
2. Add any data to a new or existing file in `src/data/`.
3. Import and render the component in `src/App.tsx`.
