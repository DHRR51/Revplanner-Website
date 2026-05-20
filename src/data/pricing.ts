// Drop-in replacement for src/data/pricing.ts in Revplanner-Website repo.
// Three subscription tiers + three dollar-denominated credit top-up packages.
//
// IMPORTANT: Credit packages are dollar-denominated. Customers see "$25 in
// credits" and burn it down at 3x Claude's metered cost as they use the
// platform. They never see tokens — that's an internal accounting unit.

import type { PricingCard } from '../types';

// ────────────────────────────────────────────────────────────────────
// Subscription tiers
// ────────────────────────────────────────────────────────────────────

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: 'solo' | 'smb' | 'teams';
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  seats: string;                  // human-readable seat description
  description: string;
  features: PlanFeature[];
  cta: { label: string; variant: 'primary' | 'secondary' };
  highlight?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'solo',
    name: 'Solo Enabler',
    tagline: 'For the solo revenue operator.',
    price: '$50',
    priceNote: '/mo',
    seats: '1 user',
    description:
      'You are the whole revenue team. RevPlanner gives you the enablement, coaching, and pipeline-recovery output of a four-person team.',
    features: [
      { text: 'Full RevPlanner platform', included: true },
      { text: 'COMP, PIPE, COACH, CONTENT tickets', included: true },
      { text: '1 user seat', included: true },
      { text: 'Email support', included: true },
      { text: 'Token top-ups available', included: true },
    ],
    cta: { label: 'Start Solo', variant: 'secondary' },
  },
  {
    id: 'smb',
    name: 'SMB Team',
    tagline: 'For small revenue teams.',
    price: '$100',
    priceNote: '/mo',
    seats: 'Up to 5 users',     // placeholder — confirm with Dan before live
    description:
      'Sales, RevOps, and CS leadership working from the same source of truth. One platform, every revenue function.',
    features: [
      { text: 'Everything in Solo', included: true },
      { text: 'Up to 5 user seats', included: true },
      { text: 'Team-shared ticket queue', included: true },
      { text: 'Priority email + chat support', included: true },
      { text: 'Token top-ups available', included: true },
    ],
    cta: { label: 'Start SMB', variant: 'primary' },
    highlight: true,
  },
  {
    id: 'teams',
    name: 'Teams',
    tagline: 'For full revenue organizations.',
    price: '$199',
    priceNote: '/mo',
    seats: 'Up to 20 users',
    description:
      'Full sales org, multiple managers, layered enablement workflows. The same platform, sized for a real team.',
    features: [
      { text: 'Everything in SMB', included: true },
      { text: 'Up to 20 user seats', included: true },
      { text: 'Role-based access', included: true },
      { text: 'Priority support + SLA', included: true },
      { text: 'Token top-ups available', included: true },
    ],
    cta: { label: 'Start Teams', variant: 'secondary' },
  },
];

// ────────────────────────────────────────────────────────────────────
// Token top-up credit packages (one-time Charges in Chargebee)
// ────────────────────────────────────────────────────────────────────

export interface CreditPackage {
  id: 'credits-25' | 'credits-50' | 'credits-100';
  price: string;
  amount: string;             // what the customer sees in their balance after buying
  description: string;
  bonus?: string;             // optional "best value" badge
}

// Customer-facing copy is denominated in dollars of credit, NOT in tokens.
// The 3x markup means a $25 credit pack covers $8.33 of actual Claude usage.
export const creditPackages: CreditPackage[] = [
  {
    id: 'credits-25',
    price: '$25',
    amount: '$25 in credits',
    description: 'Top up when your monthly allowance runs low. Credits never expire.',
  },
  {
    id: 'credits-50',
    price: '$50',
    amount: '$50 in credits',
    description: 'Most popular for power users who run weekly deep scans.',
  },
  {
    id: 'credits-100',
    price: '$100',
    amount: '$100 in credits',
    description: 'For teams running multiple deep scans across large CRMs.',
    bonus: 'Best value',
  },
];

// ────────────────────────────────────────────────────────────────────
// EXISTING: Comparison cards used by ReplacesSection — DO NOT REMOVE
// ────────────────────────────────────────────────────────────────────

export const pricingCards: PricingCard[] = [
  {
    variant: 'without',
    heading: 'WITHOUT REVPLANNER',
    rows: [
      { label: 'Content management platform', value: '$15K-$40K/yr' },
      { label: 'AI coaching tool', value: '$8K-$20K/yr' },
      { label: 'Pipeline intelligence tool', value: '$12K-$30K/yr' },
      { label: 'Revenue orchestration layer', value: '$15K-$40K/yr' },
    ],
    total: '$50K-$130K/yr',
    totalColor: 'var(--red)',
    footnotes: [
      '+ 4 separate implementations (8-16 weeks each)',
      '+ requires an enablement team to create the content',
    ],
  },
  {
    variant: 'with',
    heading: 'WITH REVPLANNER',
    rows: [
      { label: 'Competitive intelligence', value: 'Included' },
      { label: 'AI coaching + 30/60/90 plans', value: 'Included' },
      { label: 'Pipeline recovery + rep accountability', value: 'Included' },
      { label: 'Enablement content generation (8 types)', value: 'Included' },
    ],
    total: '$600-$2,388/yr',
    totalColor: 'var(--purple)',
    footnotes: [
      '1 implementation (5 minutes)',
      'AI generates the content — no enablement team needed',
    ],
  },
];
