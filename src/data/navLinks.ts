import type { NavLink, FooterColumn } from '../types';

export const navLinks: NavLink[] = [
  { href: '#health', label: 'System Health', variant: 'default' },
  { href: '#tickets', label: 'What It Does', variant: 'default' },
  { href: '#pricing', label: 'Pricing', variant: 'default' },
  { href: '#compare', label: 'Compare', variant: 'default' },
  { href: '#who', label: "Who It's For", variant: 'default' },
  { href: '#hero-signup', label: 'Join the Waitlist', variant: 'cta' },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'System Health Scan', href: '#health' },
      { label: 'Agent Console', href: '#how-it-works' },
      { label: 'Ticketing System', href: '#tickets' },
      { label: 'Integrations', href: '#tool-stack' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    heading: 'Ticket Types',
    links: [
      { label: 'COMP — Competitive Intelligence', href: '#tickets' },
      { label: 'PIPE — Pipeline Recovery', href: '#tickets' },
      { label: 'COACH — Enablement & Coaching', href: '#tickets' },
      { label: 'CONTENT — Enablement Content', href: '#tickets' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Contact', href: 'mailto:dan@revplanner.io' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms.html' },
      { label: 'Privacy Policy', href: '/privacy.html' },
      { label: 'Billing Terms', href: '/pricing-terms.html' },
    ],
  },
];
