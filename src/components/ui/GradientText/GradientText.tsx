import type { ReactNode } from 'react';
import styles from './GradientText.module.css';

interface GradientTextProps {
  children: ReactNode;
}

export default function GradientText({ children }: GradientTextProps) {
  return <span className={styles.gradient}>{children}</span>;
}
