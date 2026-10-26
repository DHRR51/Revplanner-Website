/* Closed-beta confirmation email copy.
   STATUS: PLACEHOLDER built only from Dan-approved beta wording (HeyReach v2, 10-12).
   Replace with the SDR's Growth OS-approved version before setting BETA_EMAIL_ENABLED=1.
   House style: no em/en dashes, no smart quotes, no price. */
export const SUBJECT = 'You\'re on the list: ProvenLoop closed beta';

function greet(firstname) { return firstname ? `Hi ${firstname},` : 'Hi,'; }

const LINES = [
  'Thanks for signing up for the ProvenLoop closed beta. You\'re on the list.',
  'I\'m letting people in in small groups. When your spot opens, you\'ll get a sign-in link from me, and an onboarding agent will set you up in minutes.',
  'The closed beta: 60 days free, then forty percent off your subscription for good.',
  'If you have questions in the meantime, just reply to this email.',
  'While you wait, follow ProvenLoop on LinkedIn: linkedin.com/company/provenloop',
];

export function renderText(firstname) {
  return [greet(firstname), '', ...LINES.flatMap((l) => [l, '']), '- Dan', 'ProvenLoop'].join('\n');
}

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

export function renderHtml(firstname) {
  const ps = [greet(firstname), ...LINES].map((l) => `<p style="margin:0 0 14px">${esc(l)}</p>`).join('');
  return `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:15px;line-height:1.55;color:#151320;max-width:560px">${ps}<p style="margin:0">- Dan<br>ProvenLoop</p></div>`;
}
