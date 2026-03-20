import { footerColumns } from '../../../data/navLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {footerColumns.map((col) => (
          <div key={col.heading} className={styles.column}>
            <h4>{col.heading}</h4>
            {col.links.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.bottom}>&copy; {new Date().getFullYear()} RevPlanner. All rights reserved.</div>
    </footer>
  );
}
