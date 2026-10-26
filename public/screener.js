/* Stage 0 interview screener -> HubSpot form "ProvenLoop - Stage 0 interview screener".
   Work order Dan 2026-10-26. Same UTM handling as signup.js: the visit's utm_* values ride on
   context.pageUri (sessionStorage key pl_utm, last touch inside a visit). Never stores the answers.
   Work email only: personal email domains are refused here and by the HubSpot form itself.
   Sends no email to the person; HubSpot notifies Dan on every submission.
   Never shows success unless HubSpot accepted the submission. */
(function () {
  var FORM_GUID = '6ee35d9b-343f-4076-a81d-fd824f3d20a1';
  var ENDPOINT = 'https://api.hsforms.com/submissions/v3/integration/submit/246125112/' + FORM_GUID;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PERSONAL = /@(gmail|googlemail|yahoo|ymail|rocketmail|hotmail|outlook|live|msn|aol|icloud|me|mac|proton|protonmail|pm|gmx|mail|yandex|zoho|hey|fastmail|tutanota|comcast|att|verizon|sbcglobal)\.[a-z.]+$/i;
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var STORE_KEY = 'pl_utm';
  // HubSpot contact property for each form input (input name -> property name).
  var FIELDS = { firstname: 'firstname', company: 'company', linkedin: 'hs_linkedin_url',
    stage0_role: 'stage0_role', stage0_quota: 'stage0_quota', stage0_calls_per_week: 'stage0_calls_per_week',
    stage0_ops_support: 'stage0_ops_support', call_recorder: 'call_recorder' };

  function clean(v) { return String(v).trim().toLowerCase().slice(0, 100); }
  function readStored() {
    try {
      var p = JSON.parse(window.sessionStorage.getItem(STORE_KEY) || '{}'), out = {};
      for (var i = 0; i < UTM_KEYS.length; i++) if (typeof p[UTM_KEYS[i]] === 'string' && p[UTM_KEYS[i]]) out[UTM_KEYS[i]] = clean(p[UTM_KEYS[i]]);
      return out;
    } catch (e) { return {}; }
  }
  function captureUtms() {
    var fromUrl = {}, found = false;
    try {
      var params = new URLSearchParams(window.location.search);
      for (var i = 0; i < UTM_KEYS.length; i++) {
        var v = params.get(UTM_KEYS[i]);
        if (v !== null && clean(v)) { fromUrl[UTM_KEYS[i]] = clean(v); found = true; }
      }
    } catch (e) { /* fall back to stored */ }
    if (!found) return readStored();
    try { window.sessionStorage.setItem(STORE_KEY, JSON.stringify(fromUrl)); } catch (e) { /* storage blocked */ }
    return fromUrl;
  }
  var UTMS = captureUtms();
  function pageUri(utms) {
    try {
      var u = new URL(window.location.href);
      for (var i = 0; i < UTM_KEYS.length; i++) { u.searchParams.delete(UTM_KEYS[i]); if (utms[UTM_KEYS[i]]) u.searchParams.set(UTM_KEYS[i], utms[UTM_KEYS[i]]); }
      return u.toString();
    } catch (e) { return window.location.href; }
  }
  function hutk() { var m = document.cookie.match(/(?:^|; )hubspotutk=([^;]+)/); return m ? m[1] : undefined; }
  function linkedinUrl(v) {
    var s = String(v || '').trim();
    if (!/linkedin\.com\/in\//i.test(s)) return null;
    if (!/^https?:\/\//i.test(s)) s = 'https://' + s.replace(/^\/+/, '');
    return s.split('?')[0].replace(/\/+$/, '').slice(0, 200);
  }

  function bind(form) {
    var button = form.querySelector('button[type="submit"]');
    var msg = form.querySelector('.beta-msg');
    var label = button.textContent;
    function fail(text, el) {
      msg.textContent = text; msg.className = 'beta-msg err';
      button.disabled = false; button.textContent = label;
      if (el) el.focus();
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.className = 'beta-msg'; msg.textContent = '';
      var emailEl = form.querySelector('[name="email"]');
      var email = emailEl.value.trim();
      if (!EMAIL_RE.test(email)) return fail('Enter a valid email address.', emailEl);
      if (PERSONAL.test(email)) return fail('Please use your work email.', emailEl);
      var fields = [{ objectTypeId: '0-1', name: 'email', value: email }];
      for (var name in FIELDS) {
        var el = form.querySelector('[name="' + name + '"]');
        if (!el) continue;
        var val = String(el.value || '').trim();
        if (!val) return fail('Please answer every question.', el);
        if (name === 'linkedin') { val = linkedinUrl(val); if (!val) return fail('Enter your LinkedIn profile URL (linkedin.com/in/...).', el); }
        fields.push({ objectTypeId: '0-1', name: FIELDS[name], value: val.slice(0, 200) });
      }
      button.disabled = true; button.textContent = 'Sending...';
      var utms = readStored(); if (!Object.keys(utms).length) utms = UTMS;
      var context = { pageUri: pageUri(utms), pageName: document.title };
      var t = hutk(); if (t) context.hutk = t;
      fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: fields, context: context }) })
        .then(function (res) {
          if (!res.ok) return res.text().then(function (b) { throw new Error(b); });
          if (window.va) window.va('event', { name: 'stage0_screener' });
          window.location.href = form.getAttribute('data-redirect') || '/';
        })
        .catch(function (err) {
          if (/BLOCKED_EMAIL|FREE_EMAIL/i.test(String(err && err.message))) return fail('Please use your work email.', emailEl);
          fail('That did not go through. Please try again in a moment.');
        });
    });
  }
  function init() { var f = document.querySelectorAll('form.screener-form'); for (var i = 0; i < f.length; i++) bind(f[i]); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
