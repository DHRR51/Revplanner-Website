import type { NavLink, FooterColumn } from '../types';

export const navLinks: NavLink[] = [
  { href: '#health', label: 'System Health', variant: 'default' },
  { href: '#tickets', label: 'What It Does', variant: 'default' },
  { href: '#compare', label: 'Compare', variant: 'default' },
  { href: '#who', label: "Who It's For", variant: 'default' },
  { href: "#hero-signup", label: 'Join the Waitlist', variant: 'cta' },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'System Health Scan', href: '#' },
      { label: 'Agent Console', href: '#' },
      { label: 'Ticketing System', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Pricing', href: "#hero-signup" },
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
