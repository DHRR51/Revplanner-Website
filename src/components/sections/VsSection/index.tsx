import { themCard, usCard } from '../../../data/vsItems';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import styles from './VsSection.module.css';

export default function VsSection() {
  return (
    <section className={styles.section} id="vs">
      <div className={styles.inner}>
        <SectionHeader
          label="The Difference"
          title="The Old Way Takes Weeks. The New Way Takes Minutes."
          subtitle="Every revenue team has the same problems. The difference is how long it takes to fix them."
        />
        <div className={styles.vsGrid}>
          <div className={`${styles.vsCard} ${styles.vsThem}`}>
            <div className={styles.vsLabel}>{themCard.label}</div>
            {themCard.items.map((item, i) => (
              <div key={i} className={styles.vsItem}>
                <span className={styles.vsIconThem}>{i + 1}.</span>
                {item.text}
              </div>
            ))}
            <div className={styles.vsFooter}>{themCard.footer}</div>
          </div>
          <div className={`${styles.vsCard} ${styles.vsUs}`}>
            <div className={styles.vsLabel}>{usCard.label}</div>
            {usCard.items.map((item, i) => (
              <div key={i} className={styles.vsItem}>
                <span className={styles.vsIconUs}>&#x2713;</span>
                {item.text}
              </div>
            ))}
            <div className={styles.vsFooter}>{usCard.footer}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
