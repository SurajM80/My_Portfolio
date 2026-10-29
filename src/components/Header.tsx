import { useEffect, useRef, useState } from 'react';
import { navItems, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { useTheme } from '../hooks/useTheme';
import { Close, Download, Menu, Moon, Sun } from './Icons';
import { btnSmall, iconBtn } from './ui';

const sectionIds = navItems.map((n) => n.id);

export function Wordmark() {
  return (
    <a href="#top" className="group inline-flex items-center gap-2.5 rounded-md font-semibold tracking-[-0.01em] whitespace-nowrap">
      <img src="/favicon.svg" alt="" width={28} height={28} className="size-7 transition-transform duration-300 group-hover:-rotate-6" />
      <span>{profile.name}</span>
    </a>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button type="button" onClick={toggle} className={iconBtn} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}

export default function Header() {
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, outside clicks, or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !menuButton.current?.contains(t)) setOpen(false);
    };
    const mql = window.matchMedia('(min-width: 768px)');
    const onResize = () => mql.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    mql.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      mql.removeEventListener('change', onResize);
    };
  }, [open]);

  const links = [{ id: 'top', label: 'Home' }, ...navItems];

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-bg/85' : 'border-transparent bg-bg/0'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Wordmark />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((item) => {
              const current = item.id === 'top' ? active === null : active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={current ? 'location' : undefined}
                    className={`relative rounded-full px-3 py-2 text-sm transition-colors ${
                      current ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ${
                        current ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a href={profile.resume.href} download={profile.resume.fileName} className={`${btnSmall} max-sm:hidden`}>
            <Download size={15} />
            Resume
          </a>
          <button
            ref={menuButton}
            type="button"
            className={`${iconBtn} md:hidden`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={20} /> : <Menu />}
          </button>
        </div>
      </div>

      <div ref={panel} id="mobile-menu" hidden={!open} className="border-t border-line bg-bg md:hidden">
        <nav aria-label="Mobile" className="container-page py-3">
          <ul>
            {links.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-between border-b border-line text-lg text-ink"
                  aria-current={(item.id === 'top' ? active === null : active === item.id) ? 'location' : undefined}
                >
                  {item.label}
                  <span aria-hidden className="text-faint">→</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={profile.resume.href} download={profile.resume.fileName} className={`${btnSmall} mt-4 mb-2 w-full`}>
            <Download size={15} />
            Download resume
          </a>
        </nav>
      </div>

      <div aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-px bg-accent" />
    </header>
  );
}
