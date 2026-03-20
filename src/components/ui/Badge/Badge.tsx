import type { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  variant: 'hero' | 'scanWarning' | 'ticket';
  children: ReactNode;
}

export default function Badge({ variant, children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}
