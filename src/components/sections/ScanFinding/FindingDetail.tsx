import type { FindingDetail } from '../../../types';
import styles from './FindingDetail.module.css';

interface FindingDetailProps {
  detail: FindingDetail;
  isOpen: boolean;
  animationDelay: number;
}

export default function FindingDetail({ detail, isOpen, animationDelay }: FindingDetailProps) {
  if (!isOpen) return null;

  return (
    <div
      className={styles.detail}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className={styles.title}>Evidence</div>
      <div className={styles.evidence}>
        {detail.evidence.map((chip, i) => (
          <span key={i} className={styles.chip} data-type={chip.type}>
            {chip.label}
          </span>
        ))}
      </div>
      <p className={styles.paragraph}>{detail.paragraph}</p>
      {detail.quote && (
        <div className={styles.quote}>
          {detail.quote.text}
          <span>{detail.quote.attribution}</span>
        </div>
      )}
      <div className={styles.ticketPreview}>
        <span className={styles.ticketType}>{detail.ticketType}</span>
        <span className={styles.ticketName}>{detail.ticketName}</span>
        <span className={styles.ticketBtn}>Create &rarr;</span>
      </div>
    </div>
  );
}
