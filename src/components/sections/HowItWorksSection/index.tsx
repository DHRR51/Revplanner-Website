import { platformCards } from '../../../data/howCards';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import styles from './HowItWorksSection.module.css';

export default function HowItWorksSection() {
  return (
    <section className={styles.sectionAlt} id="how">
      <div className={styles.inner}>
        <SectionHeader
          label="The Platform"
          title="Three Systems Working Together"
          subtitle="The Agent Console, Ticketing System, and System Scan form a closed loop. Problems get found, tickets get created, actions get tracked."
        />
        <div className="howGrid">
          {platformCards.map((card, i) => (
            <div key={i} className="howCard">
              <div className="howIcon" data-variant={String(i + 1) as '1' | '2' | '3'}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
