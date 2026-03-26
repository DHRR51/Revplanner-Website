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
        Connect your tools in 5 minutes. Get your first deliverable in 10. No implementation. No content to write. No programs to build.
      </p>
      <div className={styles.ctas}>
        <Button variant="primary" href={`${(import.meta.env.VITE_APP_URL as string)}/signup`}>Run Free System Scan</Button>
        <Button variant="secondary" href={`${(import.meta.env.VITE_APP_URL as string)}/signup`}>Schedule a Demo</Button>
      </div>
    </section>
  );
}
