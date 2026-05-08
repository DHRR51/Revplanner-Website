import { useEffect, useState } from 'react';
import Badge from '../../ui/Badge/Badge';
import GradientText from '../../ui/GradientText/GradientText';
import styles from './HeroSection.module.css';
import { validateBusinessEmail } from '../../../utils/emailValidation';
import { submitHubSpotForm } from '../../../lib/hubspot';

const FREE_SIGNUP_FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_FREE_SIGNUP as string;
const HERO_INPUT_ID = 'hero-email-input';

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Focus the email input when any "Join the Waitlist" CTA is clicked, even if the
  // user is already on the section (otherwise nav CTA appears to "do nothing").
  useEffect(() => {
    function focusInput() {
      // Delay so smooth-scroll finishes before focus
      setTimeout(() => {
        const el = document.getElementById(HERO_INPUT_ID) as HTMLInputElement | null;
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a[href="#hero-signup"]');
      if (anchor) focusInput();
    }

    document.addEventListener('click', handleClick);

    // Also focus on initial page load if URL already contains the hash
    if (window.location.hash === '#hero-signup') focusInput();

    return () => document.removeEventListener('click', handleClick);
  }, []);

  async function submit() {
    const validation = validateBusinessEmail(email);
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    setError('');
    setSubmitting(true);

    const result = await submitHubSpotForm({
      formId: FREE_SIGNUP_FORM_ID,
      fields: [
        { name: 'email', value: email.trim() },
        { name: 'cta_source', value: 'hero_signup' },
      ],
    });

    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
      setEmail('');
    } else {
      setError('Something went wrong. Please try again or email hello@revplanner.io.');
    }
  }

  return (
    <section id="hero-signup" className={styles.hero}>
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
        {submitted ? (
          <div className={styles.successMessage} role="status" aria-live="polite">
            <strong>You&apos;re on the waitlist.</strong> We&apos;ll email you with next steps and a calendar link to book a 20-min walkthrough.
          </div>
        ) : (
          <>
            <div className={styles.signupRow}>
              <input
                id={HERO_INPUT_ID}
                type="email"
                className={styles.signupInput}
                placeholder="Enter your work email"
                aria-label="Work email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
                disabled={submitting}
              />
              {error && (
                <div className={styles.inputError} role="alert">
                  {error}
                </div>
              )}
              <button
                className={styles.signupBtn}
                type="button"
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Join the waitlist'}
              </button>
            </div>
            <p className={styles.ssoNote}>
              Google and Microsoft single sign-on available at launch.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
