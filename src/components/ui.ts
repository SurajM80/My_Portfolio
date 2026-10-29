// Shared class strings so buttons and links look identical everywhere.

const btn =
  'inline-flex items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98]';

export const btnPrimary = `${btn} h-11 px-5 bg-ink text-bg hover:bg-accent hover:text-accent-ink`;
export const btnSecondary = `${btn} h-11 px-5 border border-line-strong bg-surface text-ink hover:border-ink`;
export const btnSmall = `${btn} h-9 px-4 text-sm border border-line-strong bg-surface text-ink hover:border-ink`;
export const iconBtn =
  'inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink';
export const textLink =
  'inline-flex items-center gap-1.5 font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent hover:text-accent';

export const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** Responsive sources produced by scripts/build-images.mjs. */
export const imageSrcSet = (base: string) => `${base}-720.webp 720w, ${base}-1280.webp 1280w`;
