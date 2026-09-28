/**
 * Nexsate brand lockup — the client-supplied NEXSATE wordmark
 * (`public/brand/nexsate-wordmark.jpg`, 219×43).
 *
 * The artwork is dark charcoal on a white background, so it always sits on a
 * light "plate": that keeps it legible over hero photography and blends
 * seamlessly into the solid white header bar and the light footer. The compact
 * blue tile mark lives on as the favicon (`public/favicon.svg`).
 *
 * `className` sizes the wordmark image itself; `plateClassName` tunes the plate.
 */
export default function NexsateLogo({
  className = 'h-5 md:h-6',
  plateClassName = '',
}) {
  return (
    <span
      className={`inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-black/10 ${plateClassName}`}
    >
      <img
        src="/brand/nexsate-wordmark.jpg"
        alt="Nexsate"
        width="219"
        height="43"
        className={`${className} w-auto`}
      />
    </span>
  )
}
