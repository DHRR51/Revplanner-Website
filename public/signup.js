/* ProvenLoop closed-beta signup -> HubSpot form "ProvenLoop - Closed Beta Waitlist".
   Sends the email plus the visit's UTM values (utm_source, utm_medium, utm_campaign, utm_content).
   UTM rules: values are lowercased, trimmed and capped at 100 characters. They are kept in
   sessionStorage for the visit so a signup on a later page still carries them. A new URL that
   carries any UTM replaces the stored set (last touch inside a visit). Only the four UTM values
   are ever stored; the email is never stored.
   Never shows success unless HubSpot accepted the submission. */
(function () {
  var ENDPOINT = 'https://api.hsforms.com/submissions/v3/integration/submit/246125112/320c5de0-499d-4493-9dcb-a1e6464e02c8';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var STORE_KEY = 'pl_utm';

  function clean(v) {
    return String(v).trim().toLowerCase().slice(0, 100);
  }

  function readStored() {
    try {
      var raw = window.sessionStorage.getItem(STORE_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      var out = {};
      for (var i = 0; i < UTM_KEYS.length; i++) {
        var k = UTM_KEYS[i];
        if (typeof parsed[k] === 'string' && parsed[k]) out[k] = clean(parsed[k]);
      }
      return out;
    } catch (e) {
      return {};
    }
  }

  function captureUtms() {
    var fromUrl = {};
    var found = false;
    try {
      var params = new URLSearchParams(window.location.search);
      for (var i = 0; i < UTM_KEYS.length; i++) {
        var v = params.get(UTM_KEYS[i]);
        if (v !== null) {
          var c = clean(v);
          if (c) { fromUrl[UTM_KEYS[i]] = c; found = true; }
        }
      }
    } catch (e) { /* no URLSearchParams: fall back to stored */ }
    if (!found) return readStored();
    try { window.sessionStorage.setItem(STORE_KEY, JSON.stringify(fromUrl)); } catch (e) { /* storage blocked: use this page's values only */ }
    return fromUrl;
  }

  var UTMS = captureUtms();

  function hutk() {
    var m = document.cookie.match(/(?:^|; )hubspotutk=([^;]+)/);
    return m ? m[1] : undefined;
  }

  function bind(form) {
    var input = form.querySelector('input[type="email"]');
    var button = form.querySelector('button[type="submit"]');
    var msg = form.querySelector('.beta-msg');
    var label = button.textContent;

    function fail(text) {
      msg.textContent = text;
      msg.className = 'beta-msg err';
      button.disabled = false;
      button.textContent = label;
      input.focus();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = input.value.trim();
      msg.className = 'beta-msg';
      msg.textContent = '';
      if (!EMAIL_RE.test(email)) { fail('Enter a valid email address.'); return; }

      button.disabled = true;
      button.textContent = 'Sending...';
      var context = { pageUri: window.location.href, pageName: document.title };
      var t = hutk();
      if (t) context.hutk = t;

      var fields = [{ objectTypeId: '0-1', name: 'email', value: email }];
      var utms = readStored();
      if (!Object.keys(utms).length) utms = UTMS;
      for (var i = 0; i < UTM_KEYS.length; i++) {
        var k = UTM_KEYS[i];
        if (utms[k]) fields.push({ objectTypeId: '0-1', name: k, value: utms[k] });
      }

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: fields, context: context })
      }).then(function (res) {
        if (!res.ok) throw new Error('HubSpot ' + res.status);
        form.innerHTML = '<p class="beta-msg ok" role="status">You\'re on the list. We\'ll email you when your seat opens.</p>';
        if (window.va) window.va('event', { name: 'beta_signup' });
      }).catch(function () {
        fail('That did not go through. Please try again in a moment.');
      });
    });
  }

  function init() {
    var forms = document.querySelectorAll('form.beta-form');
    for (var i = 0; i < forms.length; i++) bind(forms[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
