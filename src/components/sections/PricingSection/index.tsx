// New component for Revplanner-Website repo.
// Path: src/components/sections/PricingSection/index.tsx
//
// Mounts between ReplacesSection and CompareSection in App.tsx.
// Wired up in 04_App.tsx.diff.
//
// Renders:
//   - 3 subscription plan cards (Solo $50 / SMB $100 / Teams $199)
//   - 3 credit top-up cards ($25 / $50 / $100 dollar-denominated credits)
//
// CTA wiring:
//   - Each plan/credit card → Chargebee Hosted Checkout for that item_price_id
//   - URL template: VITE_CHARGEBEE_CHECKOUT_BASE + '?item=' + planId
//   - Falls back to /signup until Chargebee URLs are live so cards are shippable.

import { plans, creditPackages, type Plan, type CreditPackage } from '../../../data/pricing';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import GradientText from '../../ui/GradientText/GradientText';
import styles from './PricingSection.module.css';

const APP_URL = import.meta.env.VITE_APP_URL as string;
const CHECKOUT_BASE = (import.meta.env.VITE_CHARGEBEE_CHECKOUT_BASE as string) || '';

function planHref(planId: string): string {
  if (CHECKOUT_BASE) return `${CHECKOUT_BASE}?item=${planId}`;
  return `${APP_URL}/signup?plan=${planId}`;
}

function creditHref(packageId: string): string {
  if (CHECKOUT_BASE) return `${CHECKOUT_BASE}?item=${packageId}`;
  return `${APP_URL}/signup?credits=${packageId}`;
}

function PlanCard({ plan }: { plan: Plan }) {
  const cardCls = `${styles.card} ${plan.highlight ? styles.highlight : ''}`;
  const ctaCls = `${styles.cta} ${styles[plan.cta.variant]}`;
  return (
    <div className={cardCls} aria-labelledby={`plan-${plan.id}-heading`}>
      {plan.highlight && <div className={styles.badge}>Most popular</div>}
      <h3 id={`plan-${plan.id}-heading`} className={styles.planName}>{plan.name}</h3>
      <p className={styles.tagline}>{plan.tagline}</p>
      <div className={styles.priceRow}>
        <span className={styles.price}>{plan.price}</span>
        <span className={styles.priceNote}>{plan.priceNote}</span>
      </div>
      <div className={styles.seats}>{plan.seats}</div>
      <p className={styles.description}>{plan.description}</p>
      <ul className={styles.features}>
        {plan.features.map((f, i) => (
          <li key={i} className={f.included ? styles.featureIncluded : styles.featureExcluded}>
            <span aria-hidden="true">{f.included ? '✓' : '—'}</span>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
      <a href={planHref(plan.id)} className={ctaCls}>{plan.cta.label}</a>
    </div>
  );
}

function CreditCard({ pkg }: { pkg: CreditPackage }) {
  return (
    <div className={`${styles.creditCard} ${pkg.bonus ? styles.creditBest : ''}`}>
      {pkg.bonus && <div className={styles.creditBadge}>{pkg.bonus}</div>}
      <div className={styles.creditPrice}>{pkg.price}</div>
      <div className={styles.creditAmount}>{pkg.amount}</div>
      <p className={styles.creditDescription}>{pkg.description}</p>
      <a href={creditHref(pkg.id)} className={`${styles.cta} ${styles.primary}`}>Top up</a>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className={styles.section} aria-labelledby="pricing-heading">
      <div className={styles.inner}>
        <SectionHeader
          label="Pricing"
          title={
            <>
              Three tiers.<br />
              <GradientText>Pay only for what you use.</GradientText>
            </>
          }
          subtitle="Pick the tier that fits your team size. Top up with credits when you run heavy scans."
        />

        <div className={styles.grid}>
          {plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
        </div>

        <div className={styles.creditsBlock}>
          <h3 className={styles.creditsHeading}>Need more usage? Top up with credits.</h3>
          <p className={styles.creditsSubhead}>
            Credits burn down at metered AI cost as you use the platform. Buy a top-up any time.
            Credits never expire.
          </p>
          <div className={styles.creditGrid}>
            {creditPackages.map((pkg) => <CreditCard key={pkg.id} pkg={pkg} />)}
          </div>
        </div>

        <p className={styles.disclaimer}>
          All prices in USD. See <a href="/terms.html">Terms of Service</a> and{' '}
          <a href="/pricing-terms.html">Billing Terms</a> for details. Cancel any time from your
          customer portal.
        </p>
      </div>
    </section>
  );
}
