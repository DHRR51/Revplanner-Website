/* POST /api/beta-confirm  { email, firstname }
   Sends the closed-beta confirmation email through Resend after the visitor's
   HubSpot form submission succeeded (called by public/signup.js).
   Guards, in order:
   1. Off unless BETA_EMAIL_ENABLED === '1' (copy must be approved first).
   2. Same-site Origin only.
   3. The email must appear in a HubSpot submission to the beta form within the
      last 15 minutes (read via HUBSPOT_FORMS_TOKEN, forms scope). This stops the
      endpoint being used to mail arbitrary addresses.
   4. Fails loud: returns non-2xx on any failure, never fakes success.
   Env: RESEND_API_KEY, HUBSPOT_FORMS_TOKEN, BETA_EMAIL_ENABLED. */
import { SUBJECT, renderText, renderHtml } from './_beta-email-copy.js';

const FORM_GUID = '320c5de0-499d-4493-9dcb-a1e6464e02c8';
const FROM = 'Dan at ProvenLoop <daniel@send.provenloop.io>';
const REPLY_TO = 'daniel@provenloop.io';
const ALLOWED_ORIGINS = ['https://www.provenloop.io', 'https://provenloop.io'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 15 * 60 * 1000;

async function submittedRecently(email) {
  const url = `https://api.hubapi.com/form-integrations/v1/submissions/forms/${FORM_GUID}?limit=50`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${process.env.HUBSPOT_FORMS_TOKEN}` } });
  if (!res.ok) throw new Error(`hubspot ${res.status}`);
  const data = await res.json();
  const now = Date.now();
  return (data.results || []).some((s) =>
    now - Number(s.submittedAt) <= WINDOW_MS &&
    (s.values || []).some((v) => v.name === 'email' && String(v.value).toLowerCase() === email));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  if (process.env.BETA_EMAIL_ENABLED !== '1') return res.status(204).end();
  const origin = req.headers.origin || '';
  if (!ALLOWED_ORIGINS.includes(origin)) return res.status(403).json({ ok: false });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const email = String((body && body.email) || '').trim().toLowerCase();
  const firstname = String((body && body.firstname) || '').trim().slice(0, 60);
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false });
  // Test convention: qa+<anything>@provenloop.io is never emailed (no inbox; avoids bounces).
  if (/^qa\+[^@]*@provenloop\.io$/.test(email)) return res.status(204).end();

  try {
    // HubSpot can take a few seconds to list a new submission: retry briefly.
    let found = false;
    for (let i = 0; i < 4 && !found; i++) {
      if (i) await new Promise((r) => setTimeout(r, 1500));
      found = await submittedRecently(email);
    }
    if (!found) return res.status(404).json({ ok: false });
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json',
        'Idempotency-Key': `beta-confirm-${email}` },
      body: JSON.stringify({ from: FROM, to: [email], reply_to: REPLY_TO, subject: SUBJECT,
        text: renderText(firstname), html: renderHtml(firstname) }),
    });
    if (!r.ok) { console.error('resend', r.status, await r.text()); return res.status(502).json({ ok: false }); }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('beta-confirm', e.message);
    return res.status(502).json({ ok: false });
  }
}
