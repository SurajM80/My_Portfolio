import { areaLabels, profile, projects, type Area } from '../data/portfolio';
import { ArrowUpRight, Close, GitHub } from './Icons';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { external } from './ui';

export type ProjectFilter = { kind: 'all' } | { kind: 'area'; area: Area } | { kind: 'skill'; skill: string; ids: string[] };

type Props = {
  filter: ProjectFilter;
  onFilter: (f: ProjectFilter) => void;
  onOpen: (id: string) => void;
};

const areas = Object.keys(areaLabels) as Area[];

const matches = (filter: ProjectFilter, id: string, projectAreas: Area[]) =>
  filter.kind === 'all' || (filter.kind === 'area' ? projectAreas.includes(filter.area) : filter.ids.includes(id));

export default function Projects({ filter, onFilter, onOpen }: Props) {
  const visible = projects.filter((p) => matches(filter, p.id, p.areas));

  const tabs: { key: string; label: string; count: number; active: boolean; value: ProjectFilter }[] = [
    { key: 'all', label: 'All', count: projects.length, active: filter.kind === 'all', value: { kind: 'all' } },
    ...areas.map((area) => ({
      key: area,
      label: areaLabels[area],
      count: projects.filter((p) => p.areas.includes(area)).length,
      active: filter.kind === 'area' && filter.area === area,
      value: { kind: 'area', area } as ProjectFilter,
    })),
  ];

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          index="03"
          title="Selected projects"
          lead="Pipelines, dashboards, SQL analysis and machine learning. Every project links to its public repository, and the screenshots come from my own work."
        />

        <Reveal className="mb-8 flex flex-wrap items-center gap-2">
          {filter.kind === 'skill' ? (
            <div className="flex flex-wrap items-center gap-3" role="status">
              <p className="text-[0.9375rem] text-muted">
                Showing {visible.length} project{visible.length === 1 ? '' : 's'} using <span className="font-medium text-ink">{filter.skill}</span>
              </p>
              <button
                type="button"
                onClick={() => onFilter({ kind: 'all' })}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 text-sm hover:border-ink"
              >
                <Close size={14} />
                Clear filter
              </button>
            </div>
          ) : (
            <div role="group" aria-label="Filter projects by area" className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={t.active}
                  onClick={() => onFilter(t.value)}
                  className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
                    t.active ? 'border-ink bg-ink text-bg' : 'border-line-strong bg-surface text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  {t.label}
                  <span className={`font-mono text-[11px] tabular-nums ${t.active ? 'opacity-70' : 'text-faint'}`}>{t.count}</span>
                </button>
              ))}
            </div>
          )}
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 70}>
              <ProjectCard project={p} onOpen={onOpen} />
            </Reveal>
          ))}
          <Reveal as="li" delay={(visible.length % 3) * 70}>
            <a
              href={profile.links.github}
              {...external}
              className="group flex h-full min-h-56 flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6 transition-colors hover:border-ink"
            >
              <GitHub size={24} className="text-muted transition-colors group-hover:text-ink" />
              <span>
                <span className="flex items-center gap-1.5 text-lg font-semibold tracking-[-0.015em]">
                  More on GitHub
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="mt-1 block text-sm text-muted">Notebooks, SQL practice and smaller analyses, including an Excel coffee-shop sales study.</span>
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
