import { defineConfig } from 'vite'

// Static multi-page marketing site (v9 dark, 2026-11-18). Each page is a self-contained HTML file; public/ is copied as-is
// (including public/video/provenloop-video.html, the embedded product video).
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'index': 'index.html',
        'no-crm': 'no-crm.html',
        'vs-chatgpt': 'vs-chatgpt.html',
        'why-different': 'why-different.html',
        'who-its-for': 'who-its-for.html',
        'keep-your-workflow': 'keep-your-workflow.html',
        'practice': 'practice.html',
        'account-room': 'account-room.html',
        'provenchat': 'provenchat.html',
        'call-prep': 'call-prep.html',
        'qualification': 'qualification.html',
        'content-library': 'content-library.html',
        'prospect-match': 'prospect-match.html',
        'agents': 'agents.html',
        interview: 'interview.html',
        'interview-thanks': 'interview/thanks.html',
        'beta-thanks': 'beta/thanks.html',
        privacy: 'privacy.html',
        terms: 'terms.html',
      },
    },
  },
})
