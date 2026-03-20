import { compareHeaders, compareRows } from '../../../data/compare';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import styles from './CompareSection.module.css';

export default function CompareSection() {
  return (
    <section className={styles.sectionAlt} id="compare">
      <div className={styles.inner}>
        <SectionHeader
          label="The Comparison"
          title="We Don't Replace Your Tools. We Make Them Work Together."
          subtitle="RevPlanner reads your CRM, call recordings, and knowledge base simultaneously — then produces deliverables none of them can create alone."
        />
        <table className={styles.table}>
          <thead>
            <tr>
              {compareHeaders.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row, i) => (
              <tr key={i} data-highlight={row.highlight || undefined}>
                <td>{row.feature}</td>
                {[row.revplanner, row.hubspot, row.gong, row.highspot, row.clari].map((cell, j) => (
                  <td key={j} data-type={cell.type}>{cell.text}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
