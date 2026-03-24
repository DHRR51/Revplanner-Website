import type { NavLink, FooterColumn } from '../types';

export const navLinks: NavLink[] = [
  { href: '#health', label: 'System Health', variant: 'default' },
  { href: '#tickets', label: 'What It Does', variant: 'default' },
  { href: '#compare', label: 'Compare', variant: 'default' },
  { href: '#who', label: "Who It's For", variant: 'default' },
  { href: 'https://app.revplanner.app/signup', label: 'Start Free Scan', variant: 'cta' },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'System Health Scan', href: '#' },
      { label: 'Agent Console', href: '#' },
      { label: 'Ticketing System', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    heading: 'Ticket Types',
    links: [
      { label: 'COMP — Competitive Intelligence', href: '#' },
      { label: 'PIPE — Pipeline Recovery', href: '#' },
      { label: 'COACH — Enablement & Coaching', href: '#' },
      { label: 'CONTENT — Enablement Content', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];
