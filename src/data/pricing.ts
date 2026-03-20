import type { PricingCard } from '../types';

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
    total: '$468-$4,428/yr',
    totalColor: 'var(--purple)',
    footnotes: [
      '1 implementation (5 minutes)',
      'AI generates the content — no enablement team needed',
    ],
  },
];
