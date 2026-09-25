/** Small red kicker/eyebrow label used above section headings */
export default function SectionTag({ children, light = false }) {
  return (
    <span
      className={`inline-block text-xs font-bold uppercase tracking-[0.14em] ${
        light ? 'text-shell-yellow' : 'text-shell-red'
      }`}
    >
      {children}
    </span>
  )
}
