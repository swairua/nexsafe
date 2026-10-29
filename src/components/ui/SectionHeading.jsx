import { Rich } from "./SectionTag.jsx"

export default function SectionHeading({ eyebrow, title, light = false, as = "h2", size = "default", weight = "extrabold", titleClassName = "" }) {
  return (
    <>
      {eyebrow ? <p className={`inline-flex w-fit items-center rounded-full border border-[#3aa9e0]/20 bg-[#3aa9e0]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${light ? "text-[#8ad7f5]" : "text-[#087da5]"} shadow-[0_0_14px_2px_rgba(58,169,224,0.12)]`}>{eyebrow}</p> : null}
      <Rich
        as={as}
        className={`${eyebrow ? "mt-3" : ""} ${size === "compact" ? "text-2xl sm:text-3xl" : size === "small" ? "text-xl md:text-2xl" : "text-3xl md:text-[2.6rem]"} ${weight === "bold" ? "font-bold" : "font-extrabold"} leading-[1.12] tracking-tight ${light ? "text-white" : "text-[#0a1a3c]"} ${titleClassName}`}
      >
        {title}
      </Rich>
    </>
  )
}
