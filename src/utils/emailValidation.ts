/**
 * Business email validation.
 * Rejects common consumer/personal email providers so signups represent real prospects.
 */

const PERSONAL_EMAIL_DOMAINS = new Set<string>([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.ca',
  'yahoo.co.in',
  'ymail.com',
  'rocketmail.com',
  'hotmail.com',
  'hotmail.co.uk',
  'hotmail.fr',
  'outlook.com',
  'live.com',
  'msn.com',
  'aol.com',
  'aim.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'protonmail.com',
  'proton.me',
  'pm.me',
  'tutanota.com',
  'tutamail.com',
  'fastmail.com',
  'fastmail.fm',
  'gmx.com',
  'gmx.de',
  'gmx.net',
  'mail.com',
  'mail.ru',
  'yandex.com',
  'yandex.ru',
  'zoho.com',
  'hey.com',
  'duck.com',
  'qq.com',
  '163.com',
  '126.com',
  'sina.com',
  'foxmail.com',
  'inbox.com',
  'rediffmail.com',
  'comcast.net',
  'verizon.net',
  'att.net',
  'bellsouth.net',
  'sbcglobal.net',
  'charter.net',
  'cox.net',
  'optonline.net',
  'earthlink.net',
  't-online.de',
  'web.de',
  'free.fr',
  'orange.fr',
  'wanadoo.fr',
  'laposte.net',
  'libero.it',
  'virgilio.it',
  'tiscali.it',
  'btinternet.com',
  'sky.com',
  'rogers.com',
  'shaw.ca',
  'telus.net',
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmailFormat(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function isPersonalEmail(email: string): boolean {
  const at = email.lastIndexOf('@');
  if (at < 0) return false;
  const domain = email.slice(at + 1).trim().toLowerCase();
  return PERSONAL_EMAIL_DOMAINS.has(domain);
}

export type EmailValidation =
  | { ok: true }
  | { ok: false; error: string };

export function validateBusinessEmail(email: string): EmailValidation {
  const trimmed = email.trim();
  if (!trimmed) return { ok: false, error: 'Please enter your email address' };
  if (!isValidEmailFormat(trimmed)) return { ok: false, error: 'Please enter a valid email address' };
  if (isPersonalEmail(trimmed)) return { ok: false, error: 'Please use your work email address' };
  return { ok: true };
}
