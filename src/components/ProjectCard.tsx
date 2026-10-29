import type { PointerEvent } from 'react';
import { areaLabels, type Project } from '../data/portfolio';
import { ArrowRight, FileCode, GitHub } from './Icons';
import { external, imageSrcSet } from './ui';

const languageOf = (file: string) =>
  file.endsWith('.ipynb') ? 'Jupyter Notebook' : file.endsWith('.sql') ? 'SQL script' : file.split('.').pop()?.toUpperCase() ?? '';

/** Shown when a project has no screenshot: the repository's real main file, not a stand-in image. */
export function FilePreview({ project }: { project: Project }) {
  const fileName = project.primaryFile.split('/').pop();
  const repoName = project.repo.split('/').slice(-2).join('/');
  return (
    <div
      className="flex h-full items-center justify-center px-6"
      style={{ backgroundImage: 'radial-gradient(var(--line-strong) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
    >
      <div className="w-full max-w-[18rem] overflow-hidden rounded-xl border border-line bg-surface text-left shadow-card">
        <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5">
          <GitHub size={14} className="shrink-0 text-muted" />
          <span className="truncate font-mono text-[11.5px] text-muted">{repoName}</span>
        </div>
        <div className="flex items-center gap-3 px-3.5 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <FileCode size={18} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-mono text-[12.5px] text-ink">{fileName}</span>
            <span className="label block !text-[10px]">{languageOf(project.primaryFile)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, onOpen }: { project: Project; onOpen: (id: string) => void }) {
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <article
      onPointerMove={onPointerMove}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-lift focus-within:border-line-strong"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        {project.image ? (
          <img
            src={`${project.image.base}-720.webp`}
            srcSet={imageSrcSet(project.image.base)}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            width={project.image.width}
            height={project.image.height}
            alt={project.image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <FilePreview project={project} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="label">
          {areaLabels[project.areas[0]]} · {project.year}
        </p>
        <h3 className="mt-2.5 text-lg leading-snug font-semibold tracking-[-0.015em]">
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {project.title}
            <span className="sr-only"> — view project details</span>
          </button>
        </h3>
        <p className="mt-1 text-sm text-muted">{project.context}</p>
        <p className="mt-3 line-clamp-3 text-[0.9375rem] text-muted">{project.summary}</p>

        <p className="mt-auto pt-5 font-mono text-[12.5px] leading-relaxed text-muted">
          <span className="sr-only">Built with: </span>
          {project.stack.join(' · ')}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span aria-hidden className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-accent">
            View details
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
          <a
            href={project.repo}
            {...external}
            className="relative z-10 -mr-2 inline-flex min-h-10 items-center gap-1.5 rounded-full px-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <GitHub size={16} />
            Code
            <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
