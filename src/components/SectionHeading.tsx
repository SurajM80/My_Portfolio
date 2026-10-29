import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = { id: string; index: string; title: string; lead?: ReactNode };

/** Numbered kicker, section title and an optional lead paragraph. */
export default function SectionHeading({ id, index, title, lead }: Props) {
  return (
    <Reveal className="mb-10 grid gap-4 md:mb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-end md:gap-10">
      <div>
        <p className="label mb-3 flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
        </p>
        <h2 id={id} className="text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.025em]">
          {title}
        </h2>
      </div>
      {lead && <p className="max-w-xl text-[1.0625rem] text-muted md:justify-self-end">{lead}</p>}
    </Reveal>
  );
}
