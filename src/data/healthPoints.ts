import type { HealthPoint } from '../types';

export const healthPoints: HealthPoint[] = [
  {
    iconBg: 'rgba(239,68,68,0.12)',
    iconColor: 'var(--red)',
    iconSymbol: '!',
    boldLabel: 'Cross-source synthesis:',
    text: "We connect a buyer quote from a call recording (\"we chose Salesforce because you couldn't differentiate\") to 5 lost deals in your CRM to a missing battlecard in your knowledge base — and tell you exactly what to build.",
  },
  {
    iconBg: 'rgba(245,158,11,0.12)',
    iconColor: 'var(--orange)',
    iconSymbol: '$',
    boldLabel: 'Dollar amounts on every finding:',
    text: 'Not "your pipeline has issues" — "$319K is stalled across 7 deals with no activity in 14+ days. Here are the deals, here are recovery scripts."',
  },
  {
    iconBg: 'rgba(20,184,166,0.12)',
    iconColor: 'var(--teal)',
    iconSymbol: '✓',
    boldLabel: 'One-click action:',
    text: 'Every finding connects to the Agent Console. Click the button, the AI generates the deliverable — a battlecard, a coaching plan, a recovery script — you review it, and publish or send. No manual work.',
  },
  {
    iconBg: 'rgba(59,130,246,0.12)',
    iconColor: 'var(--blue)',
    iconSymbol: '↻',
    boldLabel: 'Tracks improvement:',
    text: 'Run the scan again in 30 days. See your score go from C- to B+. Prove ROI to leadership with before/after data.',
  },
];
