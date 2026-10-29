import { Rich } from "./SectionTag.jsx"

export default function SectionHeading({ eyebrow, title, light = false, as = "h2", size = "default", titleClassName = "" }) {
  return (
    <>
      {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3aa9e0]">{eyebrow}</p> : null}
      <Rich
        as={as}
        className={`${eyebrow ? "mt-3" : ""} ${size === "compact" ? "text-2xl sm:text-3xl" : size === "small" ? "text-xl md:text-2xl" : "text-3xl md:text-[2.6rem]"} font-extrabold leading-[1.12] tracking-tight ${light ? "text-white" : "text-[#0a1a3c]"} ${titleClassName}`}
      >
        {title}
      </Rich>
    </>
  )
}
