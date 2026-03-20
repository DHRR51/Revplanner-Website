import type { ScanFindingData } from '../../../types';
import FindingDetail from './FindingDetail';
import styles from './ScanFinding.module.css';

interface ScanFindingProps {
  finding: ScanFindingData;
  isOpen: boolean;
  onToggle: () => void;
  animationDelay: number;
}

export default function ScanFinding({ finding, isOpen, onToggle, animationDelay }: ScanFindingProps) {
  return (
    <>
      <div
        className={styles.finding}
        data-type={finding.type}
        data-expanded={isOpen}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      >
        <span className={styles.text}>{finding.text}</span>
        <span className={styles.value}>{finding.value}</span>
        <span className={styles.arrow}>&#x25B6;</span>
      </div>
      <FindingDetail detail={finding.detail} isOpen={isOpen} animationDelay={animationDelay} />
    </>
  );
}
