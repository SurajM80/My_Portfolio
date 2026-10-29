import { skillGroups } from '../data/portfolio';
import { ArrowRight } from './Icons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Skills({ onShowProjects }: { onShowProjects: (skill: string, ids: string[]) => void }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          index="04"
          title="Skills"
          lead="Tools I have used in coursework, internships and projects. Where a skill appears in a project, select it to see the work."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={(gi % 3) * 70} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <h3 className="label mb-3">{group.title}</h3>
              <ul className="divide-y divide-line">
                {group.skills.map((skill) => {
                  const count = skill.projectIds?.length ?? 0;
                  const content = (
                    <>
                      <span className="font-medium">{skill.name}</span>
                      {skill.note && <span className="text-sm text-muted">{skill.note}</span>}
                    </>
                  );
                  return (
                    <li key={skill.name}>
                      {count > 0 ? (
                        <button
                          type="button"
                          onClick={() => onShowProjects(skill.name, skill.projectIds!)}
                          className="group flex min-h-11 w-full items-center gap-2 py-2 text-left"
                        >
                          {content}
                          <span className="ml-auto inline-flex shrink-0 items-center gap-1 font-mono text-[11.5px] text-faint transition-colors group-hover:text-accent">
                            {count} project{count === 1 ? '' : 's'}
                            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                          </span>
                          <span className="sr-only">— show projects using {skill.name}</span>
                        </button>
                      ) : (
                        <div className="flex min-h-11 items-center gap-2 py-2">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
