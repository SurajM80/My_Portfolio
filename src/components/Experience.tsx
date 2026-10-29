import { experience } from '../data/portfolio';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index="02"
          title="Experience"
          lead="Internships in agentic AI and data science, and an earlier independent business role."
        />

        <ol className="relative">
          {experience.map((job, i) => (
            <Reveal
              as="li"
              key={job.company}
              delay={i * 60}
              className="relative grid gap-3 border-t border-line py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 md:py-10"
            >
              <div className="flex items-center gap-3 md:block">
                <p className="font-mono text-[13px] text-muted tabular-nums">{job.period}</p>
                {i === 0 && (
                  <p className="label inline-flex rounded-full bg-accent-soft px-2 py-0.5 !text-[10px] !text-accent md:mt-2">Most recent</p>
                )}
              </div>

              <article>
                <header>
                  <h3 className="text-xl font-semibold tracking-[-0.015em]">
                    {job.role} <span className="font-normal text-muted">· {job.company}</span>
                  </h3>
                  {(job.team || job.location) && (
                    <p className="mt-1 text-sm text-muted">{[job.team, job.location].filter(Boolean).join(' · ')}</p>
                  )}
                </header>

                <p className="mt-4 max-w-[46rem] text-ink">{job.summary}</p>

                {job.points.length > 0 && (
                  <ul className="mt-4 max-w-[46rem] space-y-2.5">
                    {job.points.map((point) => (
                      <li key={point} className="relative pl-5 text-muted">
                        <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {job.tools.length > 0 && (
                  <p className="mt-5 font-mono text-[13px] text-muted">
                    <span className="sr-only">Tools: </span>
                    {job.tools.join(' · ')}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
