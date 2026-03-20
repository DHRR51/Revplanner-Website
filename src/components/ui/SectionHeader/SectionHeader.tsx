import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  subtitleStyle?: React.CSSProperties;
}

export default function SectionHeader({ label, title, subtitle, align = 'center', subtitleStyle }: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${align === 'left' ? styles.left : ''}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.title}>{title}</div>
      {subtitle && (
        <div className={styles.subtitle} style={subtitleStyle}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
