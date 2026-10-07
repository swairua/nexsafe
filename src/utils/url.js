const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export function resolveSrc(src) {
  if (!src || typeof src !== 'string') return src
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src
  if (!src.startsWith('/uploads/')) return src
  return API_BASE ? API_BASE + src : src
}
