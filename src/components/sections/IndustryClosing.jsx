import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

export default function IndustryClosing() {
  const { industryClosing } = useContent()

  return (
    <section className="bg-[#060f3d] py-20 md:py-28">
      <div className="shell-container">
        <Reveal variant="fade" className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {industryClosing.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
            {industryClosing.text}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
