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
