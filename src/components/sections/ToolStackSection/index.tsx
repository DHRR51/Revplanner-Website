import { toolSources, toolResults } from '../../../data/toolStack';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import styles from './ToolStackSection.module.css';

export default function ToolStackSection() {
  return (
    <section className={styles.section} id="tickets">
      <div className={styles.inner}>
        <SectionHeader
          label="What RevPlanner Does"
          title="4 Ticket Types. 20 AI Actions. Every Deliverable Built For You."
          subtitle="Your call intelligence platform records conversations. Your CRM stores deals. Your knowledge base holds docs. But none of them talk to each other — so the problems that live between them stay invisible. RevPlanner connects them all, finds the problems, and builds the fix."
        />

        <div className={styles.stackVisual}>
          {/* Sources row */}
          <div className={styles.sourcesRow}>
            {toolSources.map((source) => (
              <div key={source.name} className={styles.tool}>
                <div className={styles.toolName}>{source.name}</div>
                <div className={styles.toolDoes}>{source.does}</div>
                <div className={styles.toolCant}>{source.cant}</div>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className={styles.arrow}>
            <div className={styles.arrowLine} />
            <div className={styles.arrowLabel}>
              RevPlanner generates the deliverables other tools expect you to create yourself
            </div>
            <div className={styles.arrowLine} />
          </div>

          {/* Results */}
          <div className={styles.outputCol}>
            {toolResults.map((result) => (
              <div key={result.title} className={styles.result}>
                <div
                  className={styles.resultIcon}
                  style={{ background: result.iconBg, color: result.iconColor }}
                >
                  {result.icon}
                </div>
                <div className={styles.resultContent}>
                  <h4>{result.title}</h4>
                  <p>{result.description}</p>
                  <div className={styles.roles}>
                    <span
                      className={styles.ticketTag}
                      style={{
                        color: result.ticketTag.colorVar,
                        background: result.ticketTag.bgRgba,
                        border: `1px solid ${result.ticketTag.borderRgba}`,
                      }}
                    >
                      {result.ticketTag.label}
                    </span>
                    &nbsp; {result.actions}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
