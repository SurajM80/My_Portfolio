import { useEffect, useState } from 'react';
import { profile } from '../data/portfolio';
import { ArrowUpRight, Check, Copy, Download, GitHub, LinkedIn, Mail } from './Icons';
import Reveal from './Reveal';
import { external } from './ui';

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
    >
      {copied ? <Check className="text-accent" /> : <Copy />}
      <span role="status" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  );
}

export default function Contact() {
  const rows = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: <Mail />, newTab: false },
    { label: 'LinkedIn', value: 'in/surajmadane80', href: profile.links.linkedin, icon: <LinkedIn />, newTab: true },
    { label: 'GitHub', value: 'SurajM80', href: profile.links.github, icon: <GitHub />, newTab: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <p className="label mb-3 flex items-center gap-3">
            <span className="text-accent">06</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
          </p>
          <h2 id="contact-title" className="text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
            Let&rsquo;s connect.
          </h2>
          <p className="mt-6 max-w-[30rem] text-[1.0625rem] text-muted">
            I&rsquo;m interested in opportunities involving data analytics, data engineering, machine learning and AI. Feel free to reach out about relevant
            roles, projects or collaborations.
          </p>
          <a
            href={profile.resume.href}
            download={profile.resume.fileName}
            className="mt-8 inline-flex items-center gap-2 font-medium underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent"
          >
            <Download />
            Download resume (PDF)
          </a>
        </Reveal>

        <Reveal delay={100} as="ul" className="self-end rounded-2xl border border-line bg-surface">
          {rows.map((r) => (
            <li key={r.label} className="relative flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0 sm:px-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink">{r.icon}</span>
              <a
                href={r.href}
                {...(r.newTab ? external : {})}
                className="group min-w-0 flex-1 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[inherit] focus-visible:after:outline-2 focus-visible:after:outline-accent"
              >
                <span className="label block">{r.label}</span>
                <span className="block truncate font-medium transition-colors group-hover:text-accent">{r.value}</span>
                {r.newTab && <span className="sr-only">(opens in a new tab)</span>}
              </a>
              {r.label === 'Email' ? <CopyEmail /> : <ArrowUpRight className="shrink-0 text-faint" />}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
