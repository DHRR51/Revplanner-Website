import type { FlowStep } from '../types';

export const mainFlowSteps: FlowStep[] = [
  {
    num: '🔍',
    title: 'System Scan',
    description:
      'One-click diagnostic that cross-references your CRM, calls, and knowledge base. Scores your health 0-100, surfaces findings with dollar amounts, and generates tickets for every issue.',
    time: 'Automatic detection',
  },
  {
    num: '⭐',
    title: 'Agent Console',
    description:
      '20 AI-powered buttons for on-demand work. Need a battlecard right now? Click "Battlecard." Need to coach a rep? Click "Coach This Rep." The agent generates the deliverable, you review and publish.',
    time: 'On-demand generation',
  },
  {
    num: '🎫',
    title: 'Ticket System',
    description:
      'Every deliverable becomes a ticket you can review, publish to Confluence, send to reps with accountability questions, and track over time. The closed loop that proves ROI.',
    time: 'Review → Publish → Track',
  },
];

export const timeToValueSteps: FlowStep[] = [
  {
    num: '1',
    title: 'Connect Your Tools',
    description:
      'OAuth into your CRM, call intelligence platform, and knowledge base. No data migration. No configuration. No IT ticket.',
    time: '5 minutes',
  },
  {
    num: '2',
    title: 'Run Your First Scan',
    description:
      'RevPlanner analyzes every deal, call, and document — cross-references them all — and delivers your System Health Score with findings.',
    time: '90 seconds',
  },
  {
    num: '3',
    title: 'Get Your First Deliverable',
    description:
      'Click any button in the Agent Console. The AI generates a battlecard, coaching plan, recovery email, or playbook from your actual data. Review it. Publish it. Done.',
    time: '10 minutes',
  },
];
