import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const query = '(prefers-color-scheme: dark)';

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia(query).matches ? 'dark' : 'light';
}

/** Light/dark theme that follows the OS until the visitor chooses one. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setTheme(currentTheme());
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable — the choice lasts for this visit only */
    }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
