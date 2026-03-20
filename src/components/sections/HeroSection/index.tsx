import Badge from '../../ui/Badge/Badge';
import GradientText from '../../ui/GradientText/GradientText';
import GoogleIcon from '../../ui/icons/GoogleIcon';
import MicrosoftIcon from '../../ui/icons/MicrosoftIcon';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  function handleOAuth() {
    window.location.href = 'revplanner-signup.html';
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
          />
          <a href="revplanner-signup.html" className={styles.signupBtn}>
            Sign up for free
          </a>
        </div>
        <div className={styles.divider}>
          <span>or</span>
        </div>
        <div className={styles.oauthRow}>
          <button className={styles.oauthBtn} type="button" onClick={handleOAuth}>
            <GoogleIcon />
            Sign up with Google
          </button>
          <button className={styles.oauthBtn} type="button" onClick={handleOAuth}>
            <MicrosoftIcon />
            Sign up with Microsoft
          </button>
        </div>
      </div>
    </section>
  );
}
