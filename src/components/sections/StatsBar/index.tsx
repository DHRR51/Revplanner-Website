import { stats } from '../../../data/stats';
import styles from './StatsBar.module.css';

export default function StatsBar() {
  return (
    <div className={styles.statsBar}>
      <div className={styles.container}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statItem}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
