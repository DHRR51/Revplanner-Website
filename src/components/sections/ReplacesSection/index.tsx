import { pricingCards } from '../../../data/pricing';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import styles from './ReplacesSection.module.css';

export default function ReplacesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          label="The Math"
          title="One Platform. Not Four."
          subtitle="Companies without RevPlanner cobble together 4-5 separate tools to cover what RevPlanner does in one. Here's what that looks like."
        />
        <div className={styles.grid}>
          {pricingCards.map((card) => (
            <div
              key={card.variant}
              className={`${styles.card} ${styles[card.variant]}`}
            >
              <div className={styles.cardHeading}>{card.heading}</div>
              <div className={styles.rows}>
                {card.rows.map((row, i) => (
                  <div key={i} className={styles.row}>
                    <span>{row.label}</span>
                    <span
                      className={styles.rowValue}
                      style={{ color: card.variant === 'with' ? 'var(--purple)' : 'var(--dark)' }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className={`${styles.row} ${styles.totalRow}`}>
                  <span className={styles.totalLabel}>Total</span>
                  <span className={styles.totalValue} style={{ color: card.totalColor }}>
                    {card.total}
                  </span>
                </div>
                {card.footnotes.map((note, i) => (
                  <div key={i} className={styles.footnote}>{note}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
