import { healthPoints } from '../../../data/healthPoints';
import Button from '../../ui/Button/Button';
import SectionHeader from '../../ui/SectionHeader/SectionHeader';
import ScanCard from '../ScanCard/index';
import styles from './HealthSection.module.css';

export default function HealthSection() {
  return (
    <section className={styles.section} id="health">
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <SectionHeader
              label="System Health Score"
              title={
                <>
                  Know Your Revenue Health
                  <br />
                  In <span className={styles.redSpan}>90 Seconds</span>
                </>
              }
              align="left"
            />
            <p className={styles.intro}>
              RevPlanner scans your CRM deals, call recordings, and knowledge base docs — then
              cross-references everything to find the problems no single tool can see alone.
            </p>
            <div className={styles.points}>
              {healthPoints.map((point) => (
                <div key={point.boldLabel} className={styles.point}>
                  <div
                    className={styles.pointIcon}
                    style={{ background: point.iconBg, color: point.iconColor }}
                  >
                    {point.iconSymbol}
                  </div>
                  <div className={styles.pointText}>
                    <b>{point.boldLabel}</b> {point.text}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" href="revplanner-signup.html">
              Run Your First Scan Free
            </Button>
          </div>

          <div className={styles.visual}>
            <ScanCard />
          </div>
        </div>
      </div>
    </section>
  );
}
