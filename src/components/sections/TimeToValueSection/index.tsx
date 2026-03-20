import { timeToValueSteps } from '../../../data/flowSteps';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import styles from './TimeToValueSection.module.css';

export default function TimeToValueSection() {
  return (
    <section className={styles.sectionDark}>
      <div className={styles.inner}>
        <SectionHeader
          label="Time to Value"
          title="Other Tools Take Weeks. RevPlanner Takes Minutes."
          subtitle="Connect your tools in 5 minutes. Get your first deliverable in 10. No implementation team. No configuration. No content to migrate. Just answers."
          subtitleStyle={{ color: '#ccc' }}
        />
        <div className="flowSteps">
          {timeToValueSteps.map((step, i) => (
            <div key={i} className="flowStep">
              <div className="flowNum">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="flowTime">{step.time}</div>
            </div>
          ))}
        </div>
        <p className={styles.footnote}>
          Compare: Gong takes 60-90 days. Highspot takes 90+ days. Mindtickle takes 3-6 months.{' '}
          <b>RevPlanner delivers value on day one.</b>
        </p>
      </div>
    </section>
  );
}
