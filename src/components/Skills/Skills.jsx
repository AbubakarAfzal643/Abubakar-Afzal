import { useInView } from "../../hooks/useAnimations";
import { skills } from "../../data/portfolioData";

const ALL_TECH = [
  "React.js", "Node.js", "MongoDB", "Express.js", "JavaScript", "TypeScript",
  "C++", "Python", "PostgreSQL", "AWS EC2", "AWS S3", "Vercel", "Three.js",
  "WebRTC", "Next.js", "MySQL", "Git", "REST APIs", "JWT", "WebGL",
  "HTML5", "CSS3", "Railway", "Socket.io", "Postman", "Figma", "OOP", "SFML",
];

// Skill proficiency levels for the bar view
const SKILL_LEVELS = {
  "JavaScript": 95, "TypeScript": 78, "C++": 85, "Python": 80, "SQL": 75,
  "React.js": 95, "Next.js": 82, "HTML5": 98, "CSS3": 96, "Three.js": 70, "WebGL": 65,
  "Node.js": 92, "Express.js": 90, "REST APIs": 88, "WebRTC": 72, "Socket.io": 74,
  "MongoDB": 88, "PostgreSQL": 80, "MySQL": 74,
  "AWS EC2": 80, "AWS S3": 78, "Vercel": 94, "Railway": 72,
  "Git": 90, "GitHub": 90, "Postman": 85, "Figma": 70,
};

const GROUP_ICONS = {
  Languages: "{ }",
  Frontend:  "⬡",
  Backend:   "⚙",
  Databases: "◫",
  Cloud:     "☁",
  Tools:     "◈",
};

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <p className="label">Skills</p>
        <h2 className="section-title" style={{ marginBottom: 8 }}>Tech stack</h2>
        <p className="section-sub" style={{ marginBottom: 40 }}>
          Technologies I work with across frontend, backend, databases, and systems.
        </p>

        <div className="skills-grid">
          {Object.entries(skills).map(([group, items], i) => (
            <SkillGroup key={group} group={group} items={items} index={i} parentInView={inView} />
          ))}
        </div>

        {/* Proficiency bars */}
        <div className={`skill-bars-wrap reveal d3${inView ? " visible" : ""}`}>
          <div className="skill-bars-label">Proficiency overview</div>
          <div className="skill-bars-grid">
            {Object.entries(SKILL_LEVELS).slice(0, 16).map(([name, level]) => (
              <SkillBar key={name} name={name} level={level} parentInView={inView} />
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className={`marquee-wrap reveal d4${inView ? " visible" : ""}`} aria-hidden="true">
          <div className="marquee-track">
            {[...ALL_TECH, ...ALL_TECH].map((t, i) => (
              <span key={i} className="marquee-item">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ group, items, index, parentInView }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const visible = parentInView && inView;
  return (
    <div ref={ref} className={`skills-group reveal d${index + 1}${visible ? " visible" : ""}`}>
      <div className="skills-group-name">
        <span className="skills-group-icon" aria-hidden="true">{GROUP_ICONS[group] || "◉"}</span>
        {group}
      </div>
      <div className="skills-tags">
        {items.map((s) => <span key={s} className="skill-tag">{s}</span>)}
      </div>
    </div>
  );
}

function SkillBar({ name, level, parentInView }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const animate = parentInView && inView;
  return (
    <div ref={ref} className="skill-bar-item">
      <div className="skill-bar-top">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct">{level}%</span>
      </div>
      <div className="skill-bar-track" role="progressbar" aria-valuenow={level} aria-valuemin="0" aria-valuemax="100" aria-label={name}>
        <div
          className="skill-bar-fill"
          style={{
            width: animate ? `${level}%` : "0%",
            transition: animate ? "width 1s cubic-bezier(0.16,1,0.3,1)" : "none",
            transitionDelay: animate ? `${Math.random() * 0.3}s` : "0s",
          }}
        />
      </div>
    </div>
  );
}
