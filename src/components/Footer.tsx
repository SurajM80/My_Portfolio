import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.fullName} · {profile.location}
        </p>
        <a href="#top" className="inline-flex min-h-10 items-center hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
