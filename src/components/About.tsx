import { about } from '../data/portfolio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="about-title" index="01" title="About" />

        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10">
          <Reveal as="dl" className="order-2 grid content-start gap-px self-start overflow-hidden rounded-xl border border-line bg-line md:order-1">
            {about.facts.map((f) => (
              <div key={f.label} className="bg-bg px-5 py-4">
                <dt className="label">{f.label}</dt>
                <dd className="mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
          </Reveal>

          <div className="order-1 max-w-[40rem] space-y-5 text-[1.0625rem] leading-[1.75] md:order-2 md:justify-self-end">
            {about.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 80} className={i === 0 ? 'text-[1.25rem] leading-[1.6] font-medium tracking-[-0.01em] text-ink' : 'text-muted'}>
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
