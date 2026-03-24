import { useState } from 'react';
import Badge from '../../ui/Badge/Badge';
import GradientText from '../../ui/GradientText/GradientText';
import GoogleIcon from '../../ui/icons/GoogleIcon';
import MicrosoftIcon from '../../ui/icons/MicrosoftIcon';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  function handleOAuth({ provider }: { provider: string }) {
    window.location.href = `http://localhost:5173/signup?provider=${provider}`;
  }

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSignup() {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    window.location.href = `http://localhost:5173/signup?email=${encodeURIComponent(email)}`;
  }

  return (
    <section className={styles.hero}>
      <Badge variant="hero">The AI Revenue Team You Don&apos;t Have to Hire</Badge>
      <h1 className={styles.h1}>
        Your Revenue Engine
        <br />
        Has <GradientText>Blind Spots</GradientText>.
        <br />
        We Find Them.
      </h1>
      <p className={styles.subtitle}>
        The AI that reads your CRM, listens to your calls, and checks your knowledge base — then
        writes the enablement content, coaching plans, battlecards, and recovery scripts your team
        is missing.
      </p>
      <p className={styles.subNote}>
        No implementation team. No enablement team required. No content to migrate.
      </p>
      <div className={styles.signupWrap}>
        <div className={styles.signupRow}>
          <input
            type="email"
            className={styles.signupInput}
            placeholder="Enter email"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.signupBtn} type="button" onClick={handleSignup}>
            Sign up for free
          </button>
        </div>
         {error && (
            <div className={styles.inputError} role="alert">
              {error}
            </div>
          )}
        <div className={styles.divider}>
          <span>or</span>
        </div>
        <div className={styles.oauthRow}>
          <button className={styles.oauthBtn} type="button" onClick={() => handleOAuth({ provider: 'google' })}>
            <GoogleIcon />
            Sign up with Google
          </button>
          <button className={styles.oauthBtn} type="button" onClick={() => handleOAuth({ provider: 'microsoft' })}>
            <MicrosoftIcon />
            Sign up with Microsoft
          </button>
        </div>
      </div>
    </section>
  );
}
