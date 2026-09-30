/* ProvenLoop closed-beta signup -> HubSpot form "ProvenLoop - Closed Beta Waitlist".
   Sends email only. HubSpot records the page URL, so each page's signups are attributable.
   Never shows success unless HubSpot accepted the submission. */
(function () {
  var ENDPOINT = 'https://api.hsforms.com/submissions/v3/integration/submit/246125112/320c5de0-499d-4493-9dcb-a1e6464e02c8';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: [{ objectTypeId: '0-1', name: 'email', value: email }], context: context })
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
