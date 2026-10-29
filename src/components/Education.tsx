import { credentials, education } from '../data/portfolio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="education-title" index="05" title="Education & credentials" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="label mb-2">Education</h3>
            <ol>
              {education.map((e, i) => (
                <Reveal as="li" key={e.school} delay={i * 70} className="border-b border-line py-6 last:border-b-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-lg font-semibold tracking-[-0.015em]">
                      {e.school}
                      <span className="font-normal text-muted">, {e.place}</span>
                    </p>
                    <p className="font-mono text-[13px] text-muted tabular-nums">{e.period}</p>
                  </div>
                  <p className="mt-1.5">{e.degree}</p>
                  {(e.detail || e.score) && <p className="mt-1 text-sm text-muted">{[e.detail, e.score].filter(Boolean).join(' · ')}</p>}
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="label mb-2">Certifications & activities</h3>
            <ul>
              {credentials.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 70} className="flex items-start justify-between gap-4 border-b border-line py-6 last:border-b-0">
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.015em]">{c.title}</p>
                    <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                  </div>
                  <span className="label mt-1.5 shrink-0 !text-[10px]">{c.kind}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
