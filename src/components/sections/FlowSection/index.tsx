import { mainFlowSteps } from '../../../data/flowSteps';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import styles from './FlowSection.module.css';

export default function FlowSection() {
  return (
    <section className={styles.section} id="flow">
      <div className={styles.inner}>
        <SectionHeader
          label="How It Works"
          title="Two Ways to Get Deliverables"
          subtitle="Run a System Scan to find problems automatically, or use the Agent Console to generate what you need on demand."
        />
        <div className="flowSteps">
          {mainFlowSteps.map((step) => (
            <div key={step.title} className="flowStep">
              <div className="flowNum">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="flowTime">{step.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
