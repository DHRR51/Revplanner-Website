import { flywheelContent } from '../../../data/flywheel';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import GradientText from '../../ui/GradientText/GradientText';
import styles from './FlywheelSection.module.css';

export default function FlywheelSection() {
  return (
    <section className={styles.sectionDark}>
      <div className={styles.inner}>
        <SectionHeader
          label="The Flywheel"
          title="Every Interaction Makes RevPlanner Smarter About YOUR Team"
        />
        <div className={styles.content}>
          <p className={styles.body}>{flywheelContent.body}</p>
          <div className={styles.quote}>
            "{flywheelContent.quoteBefore}
            <GradientText>{flywheelContent.quoteHighlighted}</GradientText>
            {flywheelContent.quoteAfter}"
          </div>
        </div>
      </div>
    </section>
  );
}
