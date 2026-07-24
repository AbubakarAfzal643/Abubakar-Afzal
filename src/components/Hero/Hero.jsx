import { useEffect, useMemo, useState } from "react";
import { useTypewriter } from "../../hooks/useAnimations";
import { personal, stats } from "../../data/portfolioData";
import { CV_FILE, CV_NAME } from "../../data/cvData";
import "./Hero.css";

const WORDS = [
  "Frontend Developer",
  "React Specialist",
  "MERN Stack Engineer",
  "Software Engineer",
];

const SOCIALS = [
  personal.github ? { label: "GitHub", href: personal.github } : null,
  personal.linkedin ? { label: "LinkedIn", href: personal.linkedin } : null,
  personal.instagram ? { label: "Instagram", href: personal.instagram } : null,
  personal.portfolio ? { label: "Portfolio", href: personal.portfolio } : null,
].filter(Boolean);

export default function Hero() {
  const word = useTypewriter(WORDS, 72, 2500);
  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [firstName, ...rest] = personal.name.split(" ");
  const lastLine = rest.join(" ");

  const statTargets = useMemo(() => stats.map((item) => item.count || 0), []);
  const [statValues, setStatValues] = useState(statTargets.map(() => 0));

  useEffect(() => {
    let animationFrame;
    const startTime = performance.now();
    const duration = 1500;

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setStatValues(statTargets.map((target) => Math.round(target * progress)));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [statTargets]);

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow-1" aria-hidden="true" />
      <div className="hero-glow-2" aria-hidden="true" />
      <div className="hero-rings" aria-hidden="true">
        <span />
        <span />
        <span />
        <div className="hero-rings-dot" />
      </div>
      <div className="container hero-inner">
        <div className="hero-status" role="status">
          <span className="hero-status-dot" />
          Available for opportunities · {personal.location}
        </div>

        <h1 className="hero-name">
          {firstName}
          <br />
          <span className="hero-name-line2">{lastLine}</span>
        </h1>

        <div className="hero-type-row" aria-live="polite">
          <span className="hero-type-sep">/</span>
          <span className="hero-type-word">{word}</span>
          <span className="hero-cursor" aria-hidden="true" />
        </div>

        <p className="hero-tagline">{personal.tagline}</p>

        <div className="hero-actions">
          <a
            href="#projects"
            onClick={go("projects")}
            className="btn btn-primary"
          >
            View my work
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href={CV_FILE}
            download={CV_NAME}
            className="btn btn-cv"
            aria-label="Download CV as PDF"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>

          <a href="#contact" onClick={go("contact")} className="btn btn-secondary">
            Get in touch
          </a>
        </div>

        <div className="hero-stats" aria-label="Quick stats">
          {stats.map((s, index) => {
            const target = s.count || 0;
            const value = `${statValues[index]}${String(s.value).includes("+") ? "+" : ""}`;
            const width = target ? Math.min((target / Math.max(...statTargets)) * 100, 100) : 0;
            return (
              <div key={s.label} className="hero-stat">
                <div className="hero-stat-val">{value}</div>
                <div className="hero-stat-label">{s.label}</div>
                <div className="hero-stat-bar" aria-hidden="true">
                  <div className="hero-stat-progress" style={{ width: `${width}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
