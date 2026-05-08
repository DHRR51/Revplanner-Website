import styles from './SocialProofSection.module.css';

export default function SocialProofSection() {
  const logos = ['Your Logo Here', 'Your Logo Here', 'Your Logo Here', 'Your Logo Here'];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.label}>Trusted By Revenue Teams</div>
        <div className={styles.logoRow}>
          {logos.map((text, i) => (
            <div key={i} className={styles.logo}>{text}</div>
          ))}
        </div>
        <div className={styles.caption}>
          Logo bar activates after first 5 customers. Join the waitlist to be among the first.
        </div>
      </div>
    </section>
  );
}
