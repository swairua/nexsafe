/** Search overlay panel that drops below the header when the search icon is toggled. */
export default function SearchPanel({ autoFocus = true }) {
  return (
    <div className="menu-anim absolute inset-x-0 top-full rounded-b-2xl border-t border-shell-gray-100 bg-white shadow-xl">
      <div className="shell-container py-6">
        <div className="flex items-center gap-3 rounded-full bg-shell-gray-100 px-5 py-3.5">
          <svg className="h-5 w-5 text-shell-gray-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            autoFocus={autoFocus}
            type="search"
            placeholder="Search nexsate.com"
            className="w-full bg-transparent text-base outline-none placeholder:text-shell-gray-500"
          />
        </div>
      </div>
    </div>
  )
}
