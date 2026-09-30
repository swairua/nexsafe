/**
 * Nexsate brand lockup — the client-supplied NEXSATE wordmark
 * (`public/brand/nexsate-wordmark.png`).
 *
 * The artwork is the blue wordmark on a transparent background, so it sits on
 * a light "plate": that keeps it legible over hero photography and blends
 * seamlessly into the solid white header bar and the light footer. The compact
 * blue tile mark lives on as the favicon (`public/favicon.svg`).
 *
 * The source artwork was a 1254×1254 canvas with the wordmark centred; it has
 * been cropped to the mark itself (1116×140) so the browser reserves the
 * correct aspect ratio instead of a square of space.
 *
 * `className` sizes the wordmark image itself; `plateClassName` tunes the plate.
 */
export default function NexsateLogo({
  className = 'h-5 md:h-6',
  plateClassName = '',
  src = '/brand/nexsate-wordmark.png',
  alt = 'Nexsate',
}) {
  return (
    <span
      className={`inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-black/10 ${plateClassName}`}
    >
      <img
        src={src}
        alt={alt}
        width="1116"
        height="140"
        className={`${className} w-auto`}
      />
    </span>
  )
}
