import type { VsCardData } from '../types';

export const themCard: VsCardData = {
  label: 'The Old Way',
  items: [
    { text: 'Notice a competitor keeps winning your deals' },
    { text: 'Spend 2 weeks gathering deal data and call notes' },
    { text: 'Write a battlecard in Google Docs from scratch' },
    { text: 'Email it to the team and hope they read it' },
    { text: 'No idea if it works. Repeat in 6 months when it\'s stale.' },
  ],
  footer: 'You do all the work. You have no proof it changed anything.',
};

export const usCard: VsCardData = {
  label: 'The RevPlanner Way',
  items: [
    { text: 'RevPlanner detects the competitive pattern from your CRM + calls automatically' },
    { text: 'Click "Battlecard" — AI generates it from your actual deal data in 10 minutes' },
    { text: 'Review it, publish to Confluence with one click' },
    { text: 'Send to reps with accountability questions — they confirm they\'ve read it' },
    { text: 'Measure whether win rate improves. System flags when it needs updating.' },
  ],
  footer: 'The AI does the work. You review and click send. You prove it worked.',
};
