/* Closed-beta confirmation email copy.
   STATUS: PLACEHOLDER built only from Dan-approved beta wording (HeyReach v2, 10-12).
   Replace with the SDR's Growth OS-approved version before setting BETA_EMAIL_ENABLED=1.
   House style: no em/en dashes, no smart quotes, no price. */
export const SUBJECT = 'Your ProvenLoop closed beta application';

function greet(firstname) { return firstname ? `Hi ${firstname},` : 'Hi,'; }

const LINES = [
  'Thanks for applying to the ProvenLoop closed beta. Your application is in.',
  'I review every application myself, and you will hear back from me within 2 business days.',
  'The closed beta: twenty-five to fifty AEs, 60 days, free during the beta, plus your founding-member rate locked for 12 months.',
  'If you have questions in the meantime, just reply to this email.',
];

export function renderText(firstname) {
  return [greet(firstname), '', ...LINES.flatMap((l) => [l, '']), '- Dan', 'ProvenLoop'].join('\n');
}

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

export function renderHtml(firstname) {
  const ps = [greet(firstname), ...LINES].map((l) => `<p style="margin:0 0 14px">${esc(l)}</p>`).join('');
  return `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:15px;line-height:1.55;color:#151320;max-width:560px">${ps}<p style="margin:0">- Dan<br>ProvenLoop</p></div>`;
}
