import Button from '../../ui/Button/Button';
import GradientText from '../../ui/GradientText/GradientText';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        You know what needs to happen.<br />
        You just don't have time to do it.<br />
        <GradientText>RevPlanner does.</GradientText>
      </h2>
      <p className={styles.subtitle}>
        We're letting people in cohort by cohort. Join the waitlist to get notified when access opens, plus a calendar link to book a 20-min walkthrough with the founder.
      </p>
      <div className={styles.ctas}>
        <Button variant="primary" href={"#hero-signup"}>Join the Waitlist</Button>
      </div>
    </section>
  );
}
