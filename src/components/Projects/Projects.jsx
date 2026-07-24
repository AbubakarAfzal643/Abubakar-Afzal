import { useState, useMemo } from "react";
import { useInView } from "../../hooks/useAnimations";
import { projects, npmPackages } from "../../data/portfolioData";

const CAT_COLORS = { AI: "#4ade80", Web: "#60a5fa", Programming: "#c084fc" };
const FILTERS    = ["All", "AI", "Web", "Programming"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [ref, inView] = useInView();

  const counts = useMemo(() => {
    const o = { All: projects.length };
    FILTERS.slice(1).forEach(f => o[f] = projects.filter(p => p.category === f).length);
    return o;
  }, []);

  const visible = useMemo(() => projects.filter(p => {
    const catOk  = filter === "All" || p.category === filter;
    const q      = search.toLowerCase();
    const termOk = !q || p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tech.some(t => t.toLowerCase().includes(q));
    return catOk && termOk;
  }), [filter, search]);

  const featured = visible.filter(p => p.featured);
  const rest     = visible.filter(p => !p.featured);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">

        {/* ── Header ── */}
        <div className={`projects-header reveal${inView ? " visible" : ""}`}>
          <div>
            <p className="label">Projects</p>
            <h2 className="section-title">Selected work</h2>
          </div>
          <div className="projects-controls">
            <div className="proj-search-wrap">
              <svg className="proj-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="search" className="proj-search" placeholder="Search by name or tech…" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search projects" />
              {search && <button className="proj-search-clear" onClick={() => setSearch("")} aria-label="Clear">×</button>}
            </div>
            <div className="filter-row" role="group" aria-label="Filter">
              {FILTERS.map(f => (
                <button key={f} className={`filter-btn${filter===f?" active":""}`} onClick={() => setFilter(f)} aria-pressed={filter===f}>
                  {f}<span className="filter-count">{counts[f]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {(search || filter !== "All") && (
          <p className="proj-result-count">{visible.length} project{visible.length!==1?"s":""}{search && <> matching <em>"{search}"</em></>}</p>
        )}

        {/* ── Featured grid ── */}
        {featured.length > 0 && (
          <div className="featured-grid">
            {featured.map((p,i) => <ProjectCard key={p.id} project={p} featured delay={i} />)}
          </div>
        )}

        {/* ── Regular grid ── */}
        {rest.length > 0 && (
          <div className="projects-grid" style={{ marginTop: featured.length ? 12 : 0 }}>
            {rest.map((p,i) => <ProjectCard key={p.id} project={p} featured={false} delay={i} />)}
          </div>
        )}

        {visible.length === 0 && (
          <div className="proj-empty">
            <div className="proj-empty-icon">◌</div>
            <p>No results. <button className="proj-empty-reset" onClick={() => { setFilter("All"); setSearch(""); }}>Clear filters</button></p>
          </div>
        )}

        {/* ── NPM Packages ── */}
        <div className={`npm-wrap reveal d2${inView ? " visible" : ""}`}>
          <div className="npm-header">
            <span className="npm-header-label">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{opacity:.5}} aria-hidden="true"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.331h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/></svg>
              npm packages
            </span>
            <div className="npm-header-line" />
            <span className="npm-header-count">{npmPackages.length} published</span>
          </div>
          <div className="npm-grid">
            {npmPackages.map(pkg => (
              <div key={pkg.name} className="npm-card">
                <div className="npm-name">{pkg.name}</div>
                <div className="npm-desc">{pkg.description}</div>
                <div className="npm-foot">
                  <div className="npm-tech">{pkg.tech.map(t => <span key={t} className="badge">{t}</span>)}</div>
                  <a href={pkg.github} className="npm-gh" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, featured, delay }) {
  const [ref, inView] = useInView({ threshold: 0.04 });
  const color = CAT_COLORS[p.category] || "var(--text-2)";

  return (
    <article
      ref={ref}
      className={`project-card${featured ? " featured-card" : ""}`}
      style={{ animationDelay: `${delay * 0.07}s`, animationPlayState: inView ? "running" : "paused" }}
      aria-label={p.name}
    >
      {/* Top row: category + ALWAYS VISIBLE links */}
      <div className="project-top-row">
        <div className="project-cat">
          <span className="project-cat-dot" style={{ background: color }} />
          <span style={{ color }}>{p.category}</span>
        </div>
        <div className="project-card-links">
          {p.live && (
            <a href={p.live} className="project-card-link" target="_blank" rel="noopener noreferrer" aria-label={`${p.name} live site`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live
            </a>
          )}
          {p.github && (
            <a href={p.github} className="project-card-link" target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on GitHub`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          )}
        </div>
      </div>

      <h3 className="project-name">{p.name}</h3>
      <p className="project-summary">{p.summary}</p>

      {featured && (
        <ul className="project-highlights" aria-label="Highlights">
          {p.highlights.map((h,i) => <li key={i}>{h}</li>)}
        </ul>
      )}

      <div className="project-tech" aria-label="Technologies">
        {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
      </div>
    </article>
  );
}
