// JSON-LD Schema Generators for RevPlanner

export const generateOrganizationSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org/',
  '@type': 'Organization',
  name: 'RevPlanner',
  description: 'AI Revenue Enablement Platform - Automated Sales Coaching, Battlecards & Scripts',
  url: 'https://revplanner.io',
  logo: 'https://revplanner.io/logo.png',
  sameAs: [
    'https://twitter.com/RevPlannerAI',
    'https://linkedin.com/company/revplanner',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@revplanner.io',
  },
});

export const generateSoftwareApplicationSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org/',
  '@type': 'SoftwareApplication',
  name: 'RevPlanner',
  applicationCategory: 'BusinessApplication',
  description: 'AI-powered sales enablement platform that automates coaching, battlecards, scripts, and recovery content from CRM, calls, and knowledge bases',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
