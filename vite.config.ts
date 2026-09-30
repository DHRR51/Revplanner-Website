import { defineConfig } from 'vite'

// Static multi-page marketing site. Each page is a self-contained HTML file; public/ is copied as-is.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        'account-rooms': 'account-rooms.html',
        'agent-chat': 'agent-chat.html',
        'content-library': 'content-library.html',
        'prospect-match': 'prospect-match.html',
        clips: 'clips.html',
      },
    },
  },
})
