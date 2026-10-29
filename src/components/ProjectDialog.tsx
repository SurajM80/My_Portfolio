import { useEffect, useRef, type KeyboardEvent } from 'react';
import { areaLabels, projects, type Project } from '../data/portfolio';
import { ArrowLeft, ArrowRight, ArrowUpRight, Close, GitHub } from './Icons';
import { FilePreview } from './ProjectCard';
import { btnPrimary, external, iconBtn, imageSrcSet } from './ui';

type Props = {
  project: Project | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
};

/**
 * Project details in a native modal <dialog>: the browser handles focus containment,
 * Escape to close and returning focus to the element that opened it.
 */
export default function ProjectDialog({ project, onClose, onNavigate }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (project && !el.open) el.showModal();
    if (!project && el.open) el.close();
    body.current?.scrollTo({ top: 0 });
  }, [project]);

  const index = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prev = index >= 0 ? projects[(index - 1 + projects.length) % projects.length] : null;
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null;

  const onKeyDown = (e: KeyboardEvent) => {
    const typing = (e.target as HTMLElement).closest('input, textarea');
    if (typing) return;
    if (e.key === 'ArrowRight' && next) onNavigate(next.id);
    if (e.key === 'ArrowLeft' && prev) onNavigate(prev.id);
  };

  return (
    <dialog
      ref={dialog}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (e.target === e.currentTarget) dialog.current?.close();
      }}
      className="m-auto h-fit max-h-[min(92dvh,62rem)] w-[min(60rem,calc(100%-1.5rem))] max-w-none overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink shadow-lift"
    >
      {project && (
        <div className="flex max-h-[min(92dvh,62rem)] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-8">
            <p className="label truncate">
              {project.areas.map((a) => areaLabels[a]).join(' · ')} · {project.year}
            </p>
            <button type="button" onClick={() => dialog.current?.close()} className={`${iconBtn} -mr-2 shrink-0`} aria-label="Close project details">
              <Close />
            </button>
          </div>

          <div ref={body} className="overflow-y-auto overscroll-contain px-5 pt-7 pb-8 sm:px-8">
            <h2 id="project-dialog-title" className="text-[clamp(1.625rem,3.5vw,2.25rem)] leading-tight font-semibold tracking-[-0.025em]">
              {project.title}
            </h2>
            <p className="mt-1.5 text-muted">{project.context}</p>
            {project.note && <p className="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm text-accent">{project.note}</p>}

            <figure className="mt-6 overflow-hidden rounded-xl border border-line bg-surface-2">
              {project.image ? (
                <a href={`${project.image.base}-1280.webp`} {...external} className="block" aria-label={`Open full-size screenshot of ${project.title} (opens in a new tab)`}>
                  <img
                    src={`${project.image.base}-1280.webp`}
                    srcSet={imageSrcSet(project.image.base)}
                    sizes="(min-width: 1024px) 880px, 100vw"
                    width={project.image.width}
                    height={project.image.height}
                    alt={project.image.alt}
                    decoding="async"
                    className="h-auto w-full"
                  />
                </a>
              ) : (
                <div className="aspect-[21/8]">
                  <FilePreview project={project} />
                </div>
              )}
            </figure>

            <p className="mt-7 max-w-[44rem] text-[1.125rem] leading-relaxed">{project.summary}</p>

            <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1fr)_15rem]">
              <div className="space-y-8">
                <section>
                  <h3 className="label mb-2">Problem</h3>
                  <p className="text-muted">{project.problem}</p>
                </section>
                <section>
                  <h3 className="label mb-3">Approach</h3>
                  <ol className="space-y-3">
                    {project.approach.map((step, i) => (
                      <li key={step} className="grid grid-cols-[1.75rem_1fr] gap-2 text-muted">
                        <span className="pt-[3px] font-mono text-[12px] text-accent tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
                <section>
                  <h3 className="label mb-3">Outcome</h3>
                  <ul className="space-y-2.5">
                    {project.outcomes.map((o) => (
                      <li key={o} className="relative pl-5 text-muted">
                        <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className="space-y-6 md:border-l md:border-line md:pl-8">
                <section>
                  <h3 className="label mb-3">Stack</h3>
                  <ul className="space-y-1.5 font-mono text-[13px]">
                    {project.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </section>
                <a href={project.repo} {...external} className={`${btnPrimary} w-full`}>
                  <GitHub size={16} />
                  View repository
                  <ArrowUpRight size={14} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </aside>
            </div>
          </div>

          {prev && next && (
            <nav aria-label="Other projects" className="grid grid-cols-2 border-t border-line text-sm">
              <button
                type="button"
                onClick={() => onNavigate(prev.id)}
                className="flex min-h-14 items-center gap-2 px-5 text-left text-muted transition-colors hover:bg-surface-2 hover:text-ink sm:px-8"
              >
                <ArrowLeft size={14} className="shrink-0" />
                <span className="truncate">
                  <span className="sr-only">Previous project: </span>
                  {prev.title}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate(next.id)}
                className="flex min-h-14 items-center justify-end gap-2 border-l border-line px-5 text-right text-muted transition-colors hover:bg-surface-2 hover:text-ink sm:px-8"
              >
                <span className="truncate">
                  <span className="sr-only">Next project: </span>
                  {next.title}
                </span>
                <ArrowRight size={14} className="shrink-0" />
              </button>
            </nav>
          )}
        </div>
      )}
    </dialog>
  );
}
