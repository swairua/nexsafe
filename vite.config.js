import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite's static middleware runs decodeURI() on the request path and lets a
// URIError escape ("URI malformed"), which the browser shows as a full-page dev
// server error overlay. Any client that sends a path with an invalid percent
// escape can trigger it, so answer 400 here instead. Registered directly inside
// configureServer (not returned) so it runs before Vite's own middlewares.
function malformedUriGuard() {
  return {
    name: 'nexsate-malformed-uri-guard',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = String(req.url || '').split('?')[0]
        try {
          decodeURI(path)
          next()
          return
        } catch {
          server.config.logger.warn(`blocked request with malformed URI: ${req.url}`)
          res.statusCode = 400
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end('400 Bad Request - invalid percent-encoding in request path\n')
        }
      })
    },
  }
}

// Nexsate — Vite + React + Tailwind CSS (public site + admin portal).
// The PHP + SQLite backend runs alongside Vite (started via "npm run dev");
// we proxy /api to it on 127.0.0.1:8000. Using 127.0.0.1 (IPv4) explicitly
// avoids the IPv4/v6 mismatch that caused ECONNREFUSED -> 500 on Windows
// (php -S localhost binds to ::1 only). /uploads is served from public/ by Vite.
export default defineConfig({
  plugins: [malformedUriGuard(), react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        admin: fileURLToPath(new URL('./admin.html', import.meta.url)),
      },
    },
  },})
