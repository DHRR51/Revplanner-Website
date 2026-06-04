import { useEffect, useRef, useState } from 'react';
import './CoLearningHome.css';
import { submitHubSpotForm } from '../../../lib/hubspot';
import { validateBusinessEmail } from '../../../utils/emailValidation';

// Cross-origin demo app (W-014). Try the Demo -> signup wizard, Sign In -> login.
const DEMO = 'https://revplanner-demo-fe.onrender.com';
const SIGNUP = `${DEMO}/signup`;
const LOGIN = `${DEMO}/login`;

// Reuse the existing "Free Signup Waitlist" HubSpot form (portal/form via env, same as the old hero).
const WAITLIST_FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_FREE_SIGNUP as string;

// Brand lightning logo
const Logo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13 2 L4.5 13.5 H11 L9 22 L19.5 9 H13 Z" fill="#fff" />
  </svg>
);

export default function CoLearningHome() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Cohort waitlist — reuses the existing HubSpot "Free Signup Waitlist" form.
  const [waitEmail, setWaitEmail] = useState('');
  const [waitErr, setWaitErr] = useState('');
  const [waitSubmitting, setWaitSubmitting] = useState(false);
  const [waitSubmitted, setWaitSubmitted] = useState(false);

  async function submitWaitlist() {
    const v = validateBusinessEmail(waitEmail);
    if (!v.ok) {
      setWaitErr(v.error);
      return;
    }
    setWaitErr('');
    setWaitSubmitting(true);
    const result = await submitHubSpotForm({
      formId: WAITLIST_FORM_ID,
      fields: [
        { name: 'email', value: waitEmail.trim() },
        { name: 'cta_source', value: 'cohome_cohort_waitlist' },
      ],
    });
    setWaitSubmitting(false);
    if (result.ok) {
      setWaitSubmitted(true);
      setWaitEmail('');
    } else {
      setWaitErr('Something went wrong. Please try again or email hello@revplanner.io.');
    }
  }

  // Hologram showcase modal: open/close, slideshow, auto-advance, dots/arrows/Esc.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const play = root.querySelector<HTMLElement>('#heroPlay');
    const modal = root.querySelector<HTMLElement>('#holo');
    const track = root.querySelector<HTMLElement>('#holoTrack');
    const dots = root.querySelector<HTMLElement>('#holoDots');
    const prev = root.querySelector<HTMLElement>('#holoPrev');
    const next = root.querySelector<HTMLElement>('#holoNext');
    const closeBtn = root.querySelector<HTMLElement>('#holoClose');
    if (!play || !modal || !track || !dots || !prev || !next || !closeBtn) return;

    const slides = track.children.length;
    let i = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const built: HTMLElement[] = [];
    for (let s = 0; s < slides; s++) {
      const d = document.createElement('i');
      const idx = s;
      d.addEventListener('click', () => go(idx));
      dots.appendChild(d);
      built.push(d);
    }
    function render() {
      track!.style.transform = `translateX(-${i * 100}%)`;
      const ds = dots!.children;
      for (let k = 0; k < ds.length; k++) (ds[k] as HTMLElement).className = k === i ? 'on' : '';
    }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => go(i + 1), 4200);
    }
    function go(n: number) {
      i = (n + slides) % slides;
      render();
      restart();
    }
    function open(e?: Event) {
      if (e) e.preventDefault();
      modal!.classList.add('open');
      i = 0;
      render();
      restart();
    }
    function close() {
      modal!.classList.remove('open');
      if (timer) clearInterval(timer);
    }
    const onModalClick = (e: MouseEvent) => {
      if (e.target === modal) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onPrev = () => go(i - 1);
    const onNext = () => go(i + 1);

    play.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    modal.addEventListener('click', onModalClick);
    document.addEventListener('keydown', onKey);

    return () => {
      if (timer) clearInterval(timer);
      play.removeEventListener('click', open);
      closeBtn.removeEventListener('click', close);
      prev.removeEventListener('click', onPrev);
      next.removeEventListener('click', onNext);
      modal.removeEventListener('click', onModalClick);
      document.removeEventListener('keydown', onKey);
      built.forEach((d) => d.remove());
    };
  }, []);

  // Hero: procedural low-poly purple triangle mesh on the canvas.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const hero = root.querySelector<HTMLElement>('.hero');
    const canvas = root.querySelector<HTMLCanvasElement>('.poly');
    if (!hero || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    function draw() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = hero!.offsetWidth;
      const h = hero!.offsetHeight;
      if (!w || !h) return;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.max(8, Math.round(w / 120));
      const rows = Math.max(6, Math.round(h / 120));
      const cw = w / cols;
      const ch = h / rows;
      const p: number[][][] = [];
      for (let y = 0; y <= rows; y++) {
        p[y] = [];
        for (let x = 0; x <= cols; x++) {
          const jx = x === 0 || x === cols ? 0 : rnd(-cw * 0.42, cw * 0.42);
          const jy = y === 0 || y === rows ? 0 : rnd(-ch * 0.42, ch * 0.42);
          p[y][x] = [x * cw + jx, y * ch + jy];
        }
      }
      const col = (cx: number, cy: number) => {
        const t = 1 - Math.min(1, Math.hypot(cx / w - 0.5, cy / h - 0.42) * 1.25);
        const pink = Math.random() < 0.14;
        const hue = pink ? 298 : rnd(258, 284);
        const sat = pink ? 70 : rnd(54, 74);
        const lum = Math.max(14, Math.min(58, 24 + t * 30 + rnd(-9, 12) + (pink ? 9 : 0)));
        return `hsl(${hue} ${sat}% ${lum}%)`;
      };
      const tri = (a: number[], b: number[], c: number[]) => {
        const cx = (a[0] + b[0] + c[0]) / 3;
        const cy = (a[1] + b[1] + c[1]) / 3;
        const f = col(cx, cy);
        ctx!.fillStyle = f;
        ctx!.strokeStyle = f;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(a[0], a[1]);
        ctx!.lineTo(b[0], b[1]);
        ctx!.lineTo(c[0], c[1]);
        ctx!.closePath();
        ctx!.fill();
        ctx!.stroke();
      };
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const a = p[y][x];
          const b = p[y][x + 1];
          const c = p[y + 1][x];
          const d = p[y + 1][x + 1];
          tri(a, b, c);
          tri(b, d, c);
        }
      }
    }
    draw();
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(draw, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(rt);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="cohome" ref={rootRef}>
      {/* NAV */}
      <nav>
        <div className="wrap nav-in">
          <div className="brand">
            <span className="logo"><Logo /></span>
            RevPlanner
          </div>
          <div className="nav-links">
            <a href="#shift">Why now</a>
            <a href="#loop">The loop</a>
            <a href="#dock">Agent Dock</a>
            <a href="#who">Who it's for</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="nav-cta">
            <a className="signin" href={LOGIN}>Sign In</a>
            <a className="btn btn-primary" href={SIGNUP}>Try the Demo</a>
          </div>
        </div>
      </nav>

      {/* 1 · HERO */}
      <header className="hero">
        <canvas className="poly" aria-hidden="true" />
        <div className="wrap">
          <span className="eyebrow">For lean revenue teams running humans + agents</span>
          <h1><span className="grad-text">Co-learning</span><br />for<br />Human+Agent<br />Revenue Teams</h1>
          <a className="play" href="#" id="heroPlay" aria-label="Watch the platform showcase">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </a>
          <p className="lead">The entire enablement loop — diagnose, generate, prove your reps learned it, tie it to pipeline — in one tool your managers actually use, and it gets smarter on your data every week.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={SIGNUP}>Try the Demo →</a>
            <a className="btn btn-ghost" href={LOGIN}>Sign In</a>
          </div>
          <p className="microcopy">No implementation team. No 12-week rollout. Grounded in your real CRM, calls, and docs.</p>
        </div>
      </header>

      {/* 2 · THE SHIFT */}
      <section id="shift" className="sec-light dots">
        <div className="wrap center">
          <div className="sec-eyebrow">The shift</div>
          <h2 className="h2">The revenue org is becoming a small team + an agent fleet.</h2>
          <p className="lead">A handful of humans now orchestrate CRM copilots, AI SDRs, and custom agents. The tools built for that world don't exist yet — so nobody measures or coordinates the blended team.</p>
          <div className="grid shift-grid">
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" /><path d="M2 22h20" /><path d="M10 6h.01M10 10h.01M10 14h.01M14 6h.01M14 10h.01M14 14h.01" /></svg></div>
              <h3>Legacy suites are built for big human teams</h3>
              <p>Gong, Highspot, Mindtickle assume a large headcount, a 12-week rollout, and enterprise budget. Wrong shape for a lean team.</p>
            </div>
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg></div>
              <h3>Point AI tools each solve a sliver</h3>
              <p>One writes content, one summarizes calls, one scores reps. None of them connect, and none tie back to pipeline.</p>
            </div>
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17l-8.5-8.5-5 5L2 7" /><path d="M16 17h6v-6" /></svg></div>
              <h3>Nobody measures the blended org</h3>
              <p>Your humans and your agents work the same deals — but no system grades them together or proves what's actually working.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · THE LOOP */}
      <section id="loop" className="sec-dark">
        <div className="wrap center">
          <div className="sec-eyebrow">The loop</div>
          <h2 className="h2">One closed loop, on your real data.</h2>
          <p className="lead">Diagnose the gap, generate the fix, confirm the rep actually learned it, and measure the dollars it moved — then start again, smarter.</p>
          <div className="loop-row">
            <div className="loop-step">
              <div className="tag">live</div>
              <div className="n">1</div>
              <h3>Diagnose</h3>
              <p>System Scan reads your CRM + calls and grades your revenue health — flagging the deals and gaps at risk.</p>
            </div>
            <div className="loop-arrow">→</div>
            <div className="loop-step">
              <div className="tag">live</div>
              <div className="n">2</div>
              <h3>Generate</h3>
              <p>The agent drafts the enablement — battlecards, talk tracks, coaching — grounded in your real deals, in seconds.</p>
            </div>
            <div className="loop-arrow">→</div>
            <div className="loop-step">
              <div className="n">3</div>
              <h3>Prove it landed</h3>
              <p>A short knowledge-check confirms the rep absorbed it — so you know it stuck, not just that it was sent.</p>
            </div>
            <div className="loop-arrow">→</div>
            <div className="loop-step">
              <div className="n">4</div>
              <h3>Measure the $</h3>
              <p>Pipeline Saved ties the behavior change back to revenue — measured before/after, not assumed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · AGENT DOCK */}
      <section id="dock" className="sec-light dots">
        <div className="wrap">
          <div className="center">
            <div className="sec-eyebrow">New · Agent Dock</div>
            <h2 className="h2">Dock your agents. They learn alongside your humans.</h2>
            <p className="lead">Your CRM copilot, your AI SDRs, your custom GPTs — plug them into RevPlanner over a standard protocol. They read your accumulated outcome data and act through your tools, under scopes you control.</p>
          </div>
          <div className="grid dock-grid">
            <div className="hub">
              <div className="hub-center">
                <span className="logo"><Logo /></span>
                <b>RevPlanner</b>
                <span>the revenue co-learning hub</span>
              </div>
              <div className="dock-chips">
                <div className="dock-chip"><span className="d" />CRM copilot</div>
                <div className="dock-chip"><span className="d" />AI SDR</div>
                <div className="dock-chip"><span className="d" />Custom GPT</div>
                <div className="dock-chip"><span className="d" />Partner agent</div>
              </div>
            </div>
            <div>
              <ul className="dock-list">
                <li><span className="ck">→</span> Your whole AI stack gets RevPlanner-smart — every agent can query competency, Pipeline Saved, and deal-grounded context.</li>
                <li><span className="ck">→</span> Docked agents contribute signals back, so the outcome record gets richer the more you connect.</li>
                <li><span className="ck">→</span> Per-agent scopes, approval to dock, full audit, one-click kill switch — governance a CRO can sign off on.</li>
                <li><span className="ck">→</span> The more of your stack docks in, the more RevPlanner becomes the connective tissue of your revenue org.</li>
              </ul>
              <span className="badge-note badge-soon">Rolling out with our first cohort</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · CO-LEARNING BENEFITS */}
      <section className="sec-dark">
        <div className="wrap center">
          <div className="sec-eyebrow">Why it compounds</div>
          <h2 className="h2">Built so the team gets better every week.</h2>
          <div className="grid ben-grid">
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
              <h3>Do more with a smaller team</h3>
              <p>One manager + a fleet of agents covers what used to take a whole enablement org.</p>
            </div>
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 7l-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></svg></div>
              <h3>Compounding by design</h3>
              <p>Every outcome feeds the next recommendation — month 6 is meant to be sharper than month 1.</p>
            </div>
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></svg></div>
              <h3>Measured, not assumed</h3>
              <p>Pipeline Saved ties enablement to real before/after dollars — you see what worked.</p>
            </div>
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg></div>
              <h3>Knowledge survives churn</h3>
              <p>Competency and context live in the system, not in the rep who just left.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · PROOF / CREDIBILITY */}
      <section className="sec-light dots">
        <div className="wrap">
          <div className="center">
            <div className="sec-eyebrow">Proof</div>
            <h2 className="h2">Run it on your real pipeline — see the grade.</h2>
            <p className="lead">Connect your CRM and RevPlanner scores your revenue health on live data: a real grade, the dollars at risk, the gaps to fix. No mock numbers.</p>
          </div>
          <div className="grid proof-grid">
            <div className="scan-card">
              <div className="scan-head">
                <div className="scan-grade" style={{ color: '#F59E0B', borderColor: '#F59E0B' }}>C</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>System Health · live scan</div>
                  <div style={{ fontSize: 12, color: '#9A9AA8' }}>Example output — your numbers, your deals</div>
                </div>
              </div>
              <div className="scan-stats">
                <div><div className="v" style={{ color: '#F59E0B' }}>$268K</div><div className="l">at risk</div></div>
                <div><div className="v" style={{ color: '#F59E0B' }}>5</div><div className="l">content gaps</div></div>
                <div><div className="v" style={{ color: '#3B82F6' }}>2</div><div className="l">reps need coaching</div></div>
              </div>
            </div>
            <div className="card founder">
              <span className="badge-note">Founder story</span>
              <p>“We run our own company this way — a tiny human team orchestrating a fleet of agents. RevPlanner is the system we built to measure and coordinate that. We're the prototype customer.”</p>
              <div className="who">Dan Hughes<span>Founder, RevPlanner</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · WHO IT'S FOR */}
      <section id="who" className="sec-dark">
        <div className="wrap center">
          <div className="sec-eyebrow">Who it's for</div>
          <h2 className="h2">Lean revenue orgs running a human + agent model.</h2>
          <p className="lead">Built for teams the enterprise suites won't price down to — and that don't want a 12-week rollout.</p>
          <div className="grid who-grid">
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M2 13h20" /></svg></div>
              <h3>Mid-market B2B SaaS</h3>
              <p>~20–100 reps, manager-led enablement, no dedicated enablement department.</p>
            </div>
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /><circle cx="10" cy="11" r="1" /><circle cx="14" cy="11" r="1" /></svg></div>
              <h3>Already AI-augmenting</h3>
              <p>You've added copilots and AI SDRs and need one place to coordinate + measure them.</p>
            </div>
            <div className="card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" /><path d="M16 12a2 2 0 0 0 0 4h5v-4z" /></svg></div>
              <h3>Can't-afford / don't-fit Gong</h3>
              <p>You want the loop without the enterprise price tag, services fee, or rollout slog.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 · PRICING TEASER */}
      <section id="pricing" className="sec-light">
        <div className="wrap">
          <div className="price">
            <div className="sec-eyebrow" style={{ color: '#B6AEFF' }}>Pricing</div>
            <h2>Priced for mid-market. Anti-enterprise by design.</h2>
            <p>Self-serve, no implementation team, no $50K services fee. Start in minutes, not quarters.</p>
            <div className="row">
              <div><div className="v">No</div><div className="l">12-week rollout</div></div>
              <div><div className="v">No</div><div className="l">services fee</div></div>
              <div><div className="v">Self-serve</div><div className="l">start today</div></div>
            </div>
            <a className="btn btn-primary" href={SIGNUP}>Try the Demo →</a>
          </div>
        </div>
      </section>

      {/* 9 · FINAL CTA */}
      <section id="waitlist" className="final sec-dark">
        <div className="wrap">
          <div className="sec-eyebrow">Get started</div>
          <h2 className="h2">See your revenue health in a few minutes.</h2>
          <p className="lead center">Try the demo on your own pipeline, or join the cohort waitlist for hands-on onboarding.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={SIGNUP}>Try the Demo →</a>
          </div>
          {waitSubmitted ? (
            <p className="waitlist-ok" role="status" aria-live="polite">
              You're on the cohort waitlist — we'll email you with next steps.
            </p>
          ) : (
            <>
              <form
                className="waitlist-form"
                onSubmit={(e) => { e.preventDefault(); void submitWaitlist(); }}
              >
                <input
                  className="waitlist-input"
                  type="email"
                  placeholder="Enter your work email"
                  aria-label="Work email address"
                  value={waitEmail}
                  onChange={(e) => setWaitEmail(e.target.value)}
                  disabled={waitSubmitting}
                />
                <button className="btn btn-primary" type="submit" disabled={waitSubmitting}>
                  {waitSubmitting ? 'Joining…' : 'Join the cohort waitlist'}
                </button>
                {waitErr && <div className="waitlist-err" role="alert">{waitErr}</div>}
              </form>
              <p className="waitlist-note">Cohort spots are limited. No spam — we'll email you with next steps.</p>
            </>
          )}
        </div>
      </section>

      {/* 10 · FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-in">
            <div className="foot-col" style={{ maxWidth: 260 }}>
              <div className="brand" style={{ fontSize: 17, marginBottom: 10 }}>
                <span className="logo" style={{ width: 28, height: 28 }}><Logo /></span>RevPlanner
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>The revenue co-learning hub for lean human + agent teams.</p>
            </div>
            <div className="foot-col">
              <h4>Product</h4>
              <a href="#loop">The loop</a>
              <a href="#dock">Agent Dock</a>
              <a href="#who">Who it's for</a>
              <a href={SIGNUP}>Try the demo</a>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <a href="#who">Who it's for</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <div className="foot-col">
              <h4>Legal</h4>
              <a href="/terms.html">Terms</a>
              <a href="/privacy.html">Privacy</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 RevPlanner. All rights reserved.</span>
            <span>The revenue co-learning hub for lean human + agent teams.</span>
          </div>
        </div>
      </footer>

      {/* HOLOGRAPHIC PLATFORM SHOWCASE */}
      <div className="holo-overlay" id="holo" role="dialog" aria-modal="true" aria-label="Platform showcase">
        <div className="holo">
          <button className="holo-close" id="holoClose" aria-label="Close">✕</button>
          <div className="holo-view">
            <div className="holo-track" id="holoTrack">
              <div className="holo-slide">
                <span className="holo-eyebrow">Diagnose</span>
                <h3>See your revenue health in seconds</h3>
                <p>System Scan grades your pipeline on live data and flags the deals and gaps at risk.</p>
                <div className="holo-visual"><div className="hv-row">
                  <div className="hv-grade" style={{ borderColor: 'rgba(245,158,11,.6)', color: '#FBD27A' }}>C<span>74</span></div>
                  <div className="hv-stats">
                    <div><b style={{ color: '#FFC56B' }}>$268K</b><span>at risk</span></div>
                    <div><b style={{ color: '#FFC56B' }}>5</b><span>content gaps</span></div>
                    <div><b style={{ color: '#8FB7FF' }}>2</b><span>need coaching</span></div>
                  </div>
                </div></div>
              </div>
              <div className="holo-slide">
                <span className="holo-eyebrow">Generate</span>
                <h3>Draft enablement from real deals</h3>
                <p>The agent writes the battlecard, talk track, or coaching — grounded in your actual pipeline.</p>
                <div className="holo-visual">
                  <div className="hv-chead"><span className="hv-pill">CONTENT · email sequence</span><span className="hv-live">● generating</span></div>
                  <div className="hv-lines"><span style={{ width: '92%' }} /><span style={{ width: '80%' }} /><span style={{ width: '86%' }} /><span style={{ width: '58%' }} /></div>
                  <div className="hv-foot">Grounded in your real deals · drafted in seconds</div>
                </div>
              </div>
              <div className="holo-slide">
                <span className="holo-eyebrow">Prove it landed</span>
                <h3>Confirm the rep actually learned it</h3>
                <p>A short knowledge-check verifies the rep absorbed it — so you know it stuck, not just that it was sent.</p>
                <div className="holo-visual"><div className="hv-score">4<span>/5</span></div><div className="hv-sub">Knowledge check passed — competitive positioning</div></div>
              </div>
              <div className="holo-slide">
                <span className="holo-eyebrow">Measure the $</span>
                <h3>Tie it to pipeline dollars</h3>
                <p>Pipeline Saved ties the behavior change back to revenue — measured before/after, not assumed.</p>
                <div className="holo-visual"><div className="hv-big" style={{ color: '#7DF0CE' }}>$398K</div><div className="hv-sub">Pipeline Saved · example, measured before/after</div></div>
              </div>
              <div className="holo-slide">
                <span className="holo-eyebrow">Agent Dock</span>
                <h3>Plug your agents into the hub</h3>
                <p>Your CRM copilot, AI SDRs, and custom GPTs dock in and learn alongside your humans, governed.</p>
                <div className="holo-visual"><div className="hv-dock"><span>CRM copilot</span><span>AI SDR</span><span>Custom GPT</span><span>Partner agent</span></div><div className="hv-sub">Docked into the RevPlanner co-learning hub</div></div>
              </div>
            </div>
          </div>
          <div className="holo-foot">
            <button className="holo-arrow" id="holoPrev" aria-label="Previous">‹</button>
            <div className="holo-dots" id="holoDots" />
            <button className="holo-arrow" id="holoNext" aria-label="Next">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
