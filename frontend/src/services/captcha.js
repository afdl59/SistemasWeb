// Frontend-only captcha verification stub
// The real verification would happen server-side. For this project we keep it client-only.

export function verifySolution({ success, timeMs, coins }) {
  // placeholder: accept only when success is true and coins >= 3
  if (success && coins >= 3) return { ok: true }
  return { ok: false, reason: 'Requisitos no cumplidos' }
}
