// ==================== NAV & FOOTER ====================
export interface NavLink {
  href: string;
  label: string;
  variant?: 'default' | 'cta';
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

// ==================== STATS ====================
export interface StatItem {
  number: string;
  label: string;
}

// ==================== HEALTH SECTION ====================
export interface HealthPoint {
  iconBg: string;
  iconColor: string;
  iconSymbol: string;
  boldLabel: string;
  text: string;
}

// ==================== SCAN CARD ====================
export type EvidenceChipType = 'deals' | 'calls' | 'docs' | 'reps';

export interface EvidenceChip {
  type: EvidenceChipType;
  label: string;
}

export interface FindingQuote {
  text: string;
  attribution: string;
}

export interface FindingDetail {
  evidence: EvidenceChip[];
  paragraph: string;
  quote?: FindingQuote;
  ticketType: string;
  ticketName: string;
}

export type FindingType = 'critical' | 'warning' | 'insight';

export interface ScanFindingData {
  id: string;
  type: FindingType;
  text: string;
  value: string;
  detail: FindingDetail;
}

// ==================== FLOW STEPS ====================
export interface FlowStep {
  num: string;
  title: string;
  description: string;
  time: string;
}

// ==================== TOOL STACK ====================
export interface ToolSource {
  name: string;
  does: string;
  cant: string;
}

export interface ToolResultTicketTag {
  label: string;
  colorVar: string;
  bgRgba: string;
  borderRgba: string;
}

export interface ToolResult {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  ticketTag: ToolResultTicketTag;
  actions: string;
}

// ==================== VS SECTION ====================
export interface VsItem {
  text: string;
}

export interface VsCardData {
  label: string;
  items: VsItem[];
  footer: string;
}

// ==================== REPLACES SECTION ====================
export interface PriceRow {
  label: string;
  value: string;
}

export type PricingCardVariant = 'without' | 'with';

export interface PricingCard {
  variant: PricingCardVariant;
  heading: string;
  rows: PriceRow[];
  total: string;
  totalColor: string;
  footnotes: string[];
}

// ==================== COMPARE TABLE ====================
export type CompareCellType = 'check' | 'partial' | 'none';

export interface CompareCell {
  type: CompareCellType;
  text: string;
}

export interface CompareRow {
  feature: string;
  highlight: boolean;
  revplanner: CompareCell;
  hubspot: CompareCell;
  gong: CompareCell;
  highspot: CompareCell;
  clari: CompareCell;
}

// ==================== HOW CARDS ====================
export interface HowCard {
  icon: string;
  title: string;
  description: string;
}

// ==================== FLYWHEEL ====================
export interface FlywheelContent {
  body: string;
  quoteBefore: string;
  quoteHighlighted: string;
  quoteAfter: string;
}

// ==================== SCAN SCORE ====================
export interface ScanScore {
  score: number;
  maxScore: number;
  grade: string;
  deals: number;
  calls: number;
  docs: number;
  deltaLabel: string;
}
