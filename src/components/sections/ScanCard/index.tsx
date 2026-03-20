import { scanFindings, scanScore } from '../../../data/scanFindings';
import { useAccordion } from '../../../hooks/useAccordion';
import Badge from '../../ui/Badge/Badge';
import ScanFinding from '../ScanFinding/index';
import styles from './ScanCard.module.css';

export default function ScanCard() {
  const { openIndices, toggle, toggleExpandAll, allOpen } = useAccordion(scanFindings.length);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Badge variant="scanWarning">6 FINDINGS &middot; 3 CRITICAL</Badge>
        <span className={styles.date}>Scanned 2 min ago</span>
      </div>

      <div className={styles.scoreRow}>
        <div className={styles.scoreRing}>
          <div className={styles.scoreNum}>{scanScore.score}</div>
          <div className={styles.scoreMax}>/{scanScore.maxScore}</div>
        </div>
        <div className={styles.scoreInfo}>
          <h3>System Health: Grade {scanScore.grade}</h3>
          <p>
            {scanScore.deals} deals &middot; {scanScore.calls} calls &middot; {scanScore.docs} docs analyzed
            <br />
            {scanScore.deltaLabel}
          </p>
        </div>
      </div>

      <div className={styles.findings}>
        {scanFindings.map((finding, i) => (
          <ScanFinding
            key={finding.id}
            finding={finding}
            isOpen={openIndices.has(i)}
            onToggle={() => toggle(i)}
            animationDelay={allOpen ? i * 80 : 0}
          />
        ))}
      </div>

      <div className={styles.cta}>
        <button className={styles.ctaBtn} type="button" onClick={toggleExpandAll}>
          Create All 8 Tickets &rarr;
        </button>
      </div>
    </div>
  );
}
