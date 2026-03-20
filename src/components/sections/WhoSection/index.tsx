import { whoCards } from '../../../data/howCards';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import styles from './WhoSection.module.css';

export default function WhoSection() {
  return (
    <section className={styles.section} id="who">
      <div className={styles.inner}>
        <SectionHeader
          label="Who It's For"
          title="Built for the Person Doing Three Jobs at Once"
          align="center"
        />
        <p className={styles.description}>
          You're the person who runs the Monday pipeline review, builds the quarterly business review, writes the competitive battlecards, coaches the underperforming reps, designs the onboarding program, and still has to hit your own number. You don't have an enablement team. You don't have a RevOps analyst. You have a CRM, a call recording tool, a knowledge base full of stale docs, and not enough hours in the day.{' '}
          <b>RevPlanner is the AI that does the work you keep pushing to next week.</b>
        </p>
        <div className="howGrid">
          {whoCards.map((card, i) => (
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
