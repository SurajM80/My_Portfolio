import { useRef, useState, type KeyboardEvent } from 'react';
import { projectById, stages } from '../data/portfolio';
import { ArrowRight } from './Icons';

/**
 * The data lifecycle as an accessible tab list. Each stage names the tools used
 * and links to the projects that demonstrate it.
 */
export default function PipelineExplorer({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[index];
  const last = stages.length - 1;

  const select = (i: number) => {
    setIndex(i);
    tabs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <p className="label" id="pipeline-label">
          How I work with data
        </p>
        <p className="label tabular-nums" aria-hidden>
          {String(index + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
        </p>
      </div>

      <div className="relative">
        {/* Track between the first and last node centres; the fill follows the selected stage. */}
        <div aria-hidden className="absolute top-[15px] right-[10%] left-[10%] h-px bg-line-strong">
          <div
            className="h-full origin-left bg-accent transition-transform duration-500 ease-out"
            style={{ transform: `scaleX(${index / last})` }}
          />
        </div>

        <div role="tablist" aria-labelledby="pipeline-label" className="relative grid grid-cols-5" onKeyDown={onKeyDown}>
          {stages.map((s, i) => {
            const selected = i === index;
            const passed = i < index;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`stage-tab-${s.id}`}
                aria-selected={selected}
                aria-controls="stage-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                className="group flex flex-col items-center gap-2 rounded-lg pb-1 focus-visible:outline-offset-2"
              >
                <span
                  className={`flex size-[31px] items-center justify-center rounded-full border font-mono text-[11px] transition-colors duration-300 ${
                    selected
                      ? 'border-accent bg-accent text-accent-ink'
                      : passed
                        ? 'border-accent bg-surface text-accent'
                        : 'border-line-strong bg-surface text-muted group-hover:border-ink group-hover:text-ink'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`text-[11px] leading-none sm:text-xs ${selected ? 'font-medium text-ink' : 'text-muted group-hover:text-ink'}`}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id="stage-panel"
        aria-labelledby={`stage-tab-${stage.id}`}
        tabIndex={0}
        className="mt-6 grid rounded-xl border border-line bg-bg/60 p-4 sm:p-5"
      >
        {/* Every stage shares one grid cell, so the card keeps the height of the tallest stage. */}
        {stages.map((s) => (
          <div key={s.id} className={`[grid-area:1/1] ${s.id === stage.id ? 'swap-in' : 'invisible'}`}>
            <h3 className="text-lg font-semibold tracking-[-0.01em]">{s.title}</h3>
            <p className="mt-1.5 text-[0.9375rem] text-muted">{s.description}</p>

            <dl className="mt-4 grid gap-3 text-sm">
              <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt className="label pt-0.5">Tools</dt>
                <dd className="font-mono text-[13px] text-ink">{s.tools.join(' · ')}</dd>
              </div>
              <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt className="label pt-1.5">Seen in</dt>
                <dd>
                  <ul className="flex flex-col">
                    {s.projectIds.map((id) => {
                      const project = projectById(id);
                      if (!project) return null;
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            onClick={() => onOpenProject(id)}
                            className="group/link inline-flex min-h-8 items-center gap-1.5 rounded text-left text-[0.9375rem] font-medium text-ink hover:text-accent"
                          >
                            {project.title}
                            <ArrowRight size={14} className="text-faint transition-transform group-hover/link:translate-x-0.5 group-hover/link:text-accent" />
                          </button>
                        </li>
                      );
                    })}
                    {s.experience && (
                      <li>
                        <a href="#experience" className="inline-flex min-h-8 items-center gap-1.5 text-[0.9375rem] text-muted hover:text-accent">
                          {s.experience}
                        </a>
                      </li>
                    )}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
