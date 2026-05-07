import { useState } from 'react';
import Badge from '../../ui/Badge/Badge';
import GradientText from '../../ui/GradientText/GradientText';
import GoogleIcon from '../../ui/icons/GoogleIcon';
import MicrosoftIcon from '../../ui/icons/MicrosoftIcon';
import styles from './HeroSection.module.css';
import { validateBusinessEmail } from '../../../utils/emailValidation';
import { submitHubSpotForm } from '../../../lib/hubspot';

const FREE_SIGNUP_FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_FREE_SIGNUP as string;

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedProvider, setSubmittedProvider] = useState<'email' | 'google' | 'microsoft' | null>(null);

  async function submit(provider: 'email' | 'google' | 'microsoft') {
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
        { name: 'preferred_signup_method', value: provider },
        { name: 'cta_source', value: 'hero_signup' },
      ],
    });

    setSubmitting(false);

    if (result.ok) {
      setSubmittedProvider(provider);
      setEmail('');
    } else {
      setError('Something went wrong. Please try again or email hello@revplanner.io.');
    }
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
        {submittedProvider ? (
          <div className={styles.successMessage} role="status" aria-live="polite">
            <strong>You&apos;re on the list.</strong> We&apos;ll be in touch with access details shortly.
          </div>
        ) : (
          <>
            <div className={styles.signupRow}>
              <input
                type="email"
                className={styles.signupInput}
                placeholder="Enter your work email"
                aria-label="Work email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onClick={() => submit('email')}
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Sign up for free'}
              </button>
            </div>
            <div className={styles.divider}>
              <span>or</span>
            </div>
            <div className={styles.oauthRow}>
              <button
                className={styles.oauthBtn}
                type="button"
                onClick={() => submit('google')}
                disabled={submitting}
              >
                <GoogleIcon />
                Sign up with Google
              </button>
              <button
                className={styles.oauthBtn}
                type="button"
                onClick={() => submit('microsoft')}
                disabled={submitting}
              >
                <MicrosoftIcon />
                Sign up with Microsoft
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
