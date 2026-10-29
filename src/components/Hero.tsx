import { highlights, profile } from '../data/portfolio';
import { ArrowRight, Download, LinkedIn } from './Icons';
import PipelineExplorer from './PipelineExplorer';
import Reveal from './Reveal';
import { btnPrimary, btnSecondary, external, textLink } from './ui';

export default function Hero({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Static blueprint grid that fades out toward the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent)] opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-page grid items-center gap-12 pt-12 pb-14 sm:pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pt-24 lg:pb-20">
        <div>
          <Reveal>
            <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {profile.location}
              </span>
              <span aria-hidden className="text-line-strong">/</span>
              <span>{profile.degreeShort}</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 id="hero-title" className="mt-6 text-[clamp(2.5rem,7vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.04em] lg:text-[clamp(3rem,4.4vw,4rem)]">
              {profile.name}
              <span className="block text-muted">
                {/* Keep the last two words together so the line never ends on a lone "&". */}
                {profile.headline.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="whitespace-nowrap">{profile.headline.split(' ').slice(-2).join(' ')}</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-relaxed text-muted">{profile.intro}</p>
          </Reveal>

          <Reveal delay={240} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className={`${btnPrimary} group`}>
              Explore my work
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={profile.resume.href} download={profile.resume.fileName} className={btnSecondary}>
              <Download />
              Download resume
            </a>
            <a href={profile.links.linkedin} {...external} className={`${textLink} ml-1 min-h-11`}>
              <LinkedIn size={16} />
              Connect on LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <PipelineExplorer onOpenProject={onOpenProject} />
        </Reveal>
      </div>

      <div className="container-page pb-16 sm:pb-20">
        <Reveal as="dl" delay={120} className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {highlights.map((h, i) => (
            <div
              key={h.label}
              className={`py-5 pr-4 ${i % 2 === 1 ? 'border-l border-line pl-4 sm:pl-6' : ''} ${i > 1 ? 'border-t border-line lg:border-t-0' : ''} ${
                i === 2 ? 'lg:border-l lg:pl-6' : ''
              }`}
            >
              <dt className="label">{h.label}</dt>
              <dd className="mt-2">
                <span className="block font-medium tracking-[-0.01em]">{h.value}</span>
                <span className="mt-0.5 block text-sm text-muted">{h.detail}</span>
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
