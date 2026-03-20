import styles from './QuoteSection.module.css';

export default function QuoteSection() {
  return (
    <section className={styles.section}>
      <p className={styles.quoteText}>
        "Your CRM can't hear your calls. Your call intelligence can't read your pipeline. Your knowledge base doesn't know what's missing.{' '}
        <span>RevPlanner cross-references all three, quantifies the gaps, and creates the fix to close them.</span>"
      </p>
      <p className={styles.quoteAttr}>Other tools show you data and leave the work to you. RevPlanner does the work.</p>
    </section>
  );
}
