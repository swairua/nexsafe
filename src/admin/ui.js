// Shared compact-admin tokens: one place defines tap targets, input sizing,
// cards and sticky offsets so every admin panel stays dense and thumb-usable.
//
// - Buttons are min 44px tall (WCAG touch target).
// - Text inputs render at 16px so iOS Safari does not auto-zoom on focus.
// - Sticky bars pin below the shell header via --admin-bar (3.5rem = h-14).
export const BTN =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg px-3 py-2 text-sm font-medium"
export const BTN_SM =
  "inline-flex min-h-[36px] items-center justify-center rounded-md px-2.5 py-1 text-xs font-medium"
export const BTN_MINI =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-2 py-1 text-xs font-medium"
export const INPUT =
  "w-full rounded-lg border border-shell-gray-300 bg-white px-3 py-2 text-base text-shell-gray-900 outline-none focus:border-shell-gray-900 focus:ring-1 focus:ring-shell-gray-900 sm:text-sm"
export const CARD = "rounded-xl bg-white p-3 ring-1 ring-shell-gray-300 sm:p-4"
export const SAVE_BAR =
  "sticky top-[var(--admin-bar,3.5rem)] z-10 mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/95 p-2.5 ring-1 ring-shell-gray-300 backdrop-blur sm:p-3"
export const PANEL_TITLE = "truncate text-base font-bold text-shell-gray-900 sm:text-lg"
