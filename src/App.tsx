import { useCallback, useState } from 'react';
import { projectById } from './data/portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectDialog from './components/ProjectDialog';
import Projects, { type ProjectFilter } from './components/Projects';
import Skills from './components/Skills';

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ProjectFilter>({ kind: 'all' });

  const showProjectsFor = useCallback((skill: string, ids: string[]) => {
    setFilter({ kind: 'skill', skill, ids });
    document.getElementById('projects')?.scrollIntoView({ block: 'start' });
  }, []);

  const closeDialog = useCallback(() => setOpenId(null), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero onOpenProject={setOpenId} />
        <About />
        <Experience />
        <Projects filter={filter} onFilter={setFilter} onOpen={setOpenId} />
        <Skills onShowProjects={showProjectsFor} />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ProjectDialog project={openId ? (projectById(openId) ?? null) : null} onClose={closeDialog} onNavigate={setOpenId} />
    </>
  );
}
