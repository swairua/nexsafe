import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import SectionHeading from '../ui/SectionHeading.jsx'

export default function IndustryClosing() {
  const { industryClosing } = useContent()

  return (
    <section className="bg-[#060f3d] py-20 md:py-28">
      <div className="shell-container">
        <Reveal variant="fade" className="max-w-3xl">
          <SectionHeading title={industryClosing.title} light titleClassName="text-2xl sm:text-3xl md:text-4xl" />
          <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
            {industryClosing.text}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
