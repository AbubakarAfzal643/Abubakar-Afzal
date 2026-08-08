import { useInView } from "../../hooks/useAnimations";
import { experiences } from "../../data/portfolioData";

export default function Experience() {
  const [ref, inView] = useInView();
  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <p className="label">Experience</p>
        <h2 className="section-title" style={{ marginBottom: 8 }}>Where I've worked</h2>
        <p className="section-sub" style={{ marginBottom: 40 }}>
          Contributing and practising my skills since 2024.
        </p>
        <div className={`exp-list reveal${inView ? " visible" : ""}`}>
          {experiences.map((exp, i) => (
            <ExpItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpItem({ exp, index }) {
  const [ref, inView] = useInView({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      className={`exp-item reveal d${index + 1}${inView ? " visible" : ""}`}
      style={{ '--accent-color': exp.accent }}
    >
      {/* Left accent bar */}
      <div className="exp-accent-bar" />

      <div className="exp-top">
        <div className="exp-left">
          <div
            className="exp-dot-wrap"
            style={{ background: `${exp.accent}12`, borderColor: `${exp.accent}30` }}
          >
            <div className="exp-dot-inner" style={{ background: exp.accent }} />
          </div>
          <div>
            <div className="exp-role">{exp.role}</div>
            <div className="exp-company" style={{ color: exp.accent }}>{exp.company} · {exp.location}</div>
          </div>
        </div>
        <div className="exp-right">
          <div className="exp-period">{exp.period}</div>
          <span className="exp-tag">{exp.type}</span>
        </div>
      </div>

      <ul className="exp-bullets" aria-label={`Responsibilities at ${exp.company}`}>
        {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
      </ul>

      <style>{`.exp-item:hover .exp-accent-bar { opacity: 1 !important; }`}</style>
    </div>
  );
}
