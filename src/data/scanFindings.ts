import type { ScanFindingData, ScanScore } from '../types';

export const scanScore: ScanScore = {
  score: 68,
  maxScore: 100,
  grade: 'C-',
  deals: 21,
  calls: 14,
  docs: 25,
  deltaLabel: 'Down 7 points from last scan',
};

export const scanFindings: ScanFindingData[] = [
  {
    id: 'finding-1',
    type: 'critical',
    text: 'Missing Salesforce Battlecard',
    value: '$97K lost',
    detail: {
      evidence: [
        { type: 'deals', label: '5 deals lost' },
        { type: 'calls', label: '12 call mentions' },
        { type: 'docs', label: '0 battlecards' },
      ],
      paragraph:
        '5 deals totaling $97,800 lost to Salesforce in the last 90 days. Salesforce mentioned in 12 recorded calls. No battlecard exists in your knowledge base.',
      quote: {
        text: "We went with Salesforce because your team couldn't articulate why we should choose them instead.",
        attribution: '— Marcus Chen, VP Operations at RetailMax (Jan 14 call)',
      },
      ticketType: 'COMP',
      ticketName: 'Generate Salesforce Battlecard',
    },
  },
  {
    id: 'finding-2',
    type: 'critical',
    text: '7 Deals Stalled — No Activity 14+ Days',
    value: '$319K risk',
    detail: {
      evidence: [
        { type: 'deals', label: '7 deals at risk' },
        { type: 'deals', label: '$319K pipeline' },
        { type: 'calls', label: 'No follow-ups' },
      ],
      paragraph:
        '7 deals worth $319,400 have had zero activity in 14+ days. No next steps documented. Top 2: MegaRetail ($68K, 21 days stalled) and StackBuild ($52K, 18 days stalled).',
      ticketType: 'PIPE',
      ticketName: 'Stalled Deal Recovery Plan',
    },
  },
  {
    id: 'finding-3',
    type: 'critical',
    text: 'Pricing Objection Causing 40% of Losses',
    value: '$66K lost',
    detail: {
      evidence: [
        { type: 'deals', label: '4 deals lost to pricing' },
        { type: 'calls', label: '8 calls flagged' },
        { type: 'docs', label: 'No handler exists' },
      ],
      paragraph:
        '40% of closed-lost deals cite pricing. 8 recorded calls show reps deflecting pricing questions instead of reframing value. No pricing objection handler exists in your knowledge base.',
      quote: {
        text: "We loved the product but couldn't justify the cost compared to what we're paying now.",
        attribution: '— Lisa Park, Dir. of Sales at CloudFirst (Feb 3 call)',
      },
      ticketType: 'COMP',
      ticketName: 'Build Pricing Objection Handler',
    },
  },
  {
    id: 'finding-4',
    type: 'warning',
    text: '4 Reps Below Coaching Benchmarks',
    value: '8-18% win rate',
    detail: {
      evidence: [
        { type: 'reps', label: '4 reps flagged' },
        { type: 'calls', label: 'Talk ratio >70%' },
        { type: 'deals', label: 'Win rate 15+ pts below avg' },
      ],
      paragraph:
        'James (78% talk, 8% win), Sarah (71% talk, 12% win), Mike (69% talk, 18% win), and Alex (72% talk, 15% win). Team average win rate is 32%. All four have fewer than 6 discovery questions per call.',
      ticketType: 'COACH',
      ticketName: 'Personalized Coaching Plans (4 reps)',
    },
  },
  {
    id: 'finding-5',
    type: 'warning',
    text: '88% of Knowledge Base Content is Stale',
    value: '22 of 25 docs',
    detail: {
      evidence: [
        { type: 'docs', label: '22 stale docs' },
        { type: 'docs', label: 'Avg age: 276 days' },
      ],
      paragraph:
        "22 of 25 knowledge base documents haven't been updated in 180+ days. Average document age is 276 days. Includes 3 competitive battlecards and 2 pricing guides that are actively referenced in lost deal calls.",
      ticketType: 'PREP',
      ticketName: 'Content Refresh — Priority Docs',
    },
  },
  {
    id: 'finding-6',
    type: 'insight',
    text: 'Multi-Threading Doubles Close Rate',
    value: '2.1x win rate',
    detail: {
      evidence: [
        { type: 'deals', label: '3+ contacts = 32% win' },
        { type: 'deals', label: '1-2 contacts = 15% win' },
      ],
      paragraph:
        'Deals with 3+ contacts engaged close at 32% vs. 15% for single-threaded deals. Only 38% of current pipeline is multi-threaded. Expanding contact coverage on 13 single-threaded deals could add $142K in weighted pipeline.',
      ticketType: 'PIPE',
      ticketName: 'Multi-Thread Expansion Plan',
    },
  },
];
