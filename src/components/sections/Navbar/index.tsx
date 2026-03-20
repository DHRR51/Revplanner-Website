import { useState } from 'react';
import { navLinks } from '../../../data/navLinks';
import Button from '../../ui/Button/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const regularLinks = navLinks.filter((l) => l.variant !== 'cta');
  const ctaLink = navLinks.find((l) => l.variant === 'cta');

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          <div className={styles.logoIcon}>R</div>
          RevPlanner
        </a>
        <div className={styles.navLinks}>
          {regularLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
          {ctaLink && (
            <Button variant="nav" href={ctaLink.href}>
              {ctaLink.label}
            </Button>
          )}
        </div>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
        </button>
      </div>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {regularLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {ctaLink && (
            <div className={styles.mobileCta}>
              <Button variant="nav" href={ctaLink.href}>
                {ctaLink.label}
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
