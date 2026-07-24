import { useInView } from "../../hooks/useAnimations";
import { education } from "../../data/portfolioData";

export default function Education() {
  const [ref, inView] = useInView();

  return (
    <section id="education" className="education" ref={ref}>
      <div className="container">
        <p className="label">Education</p>
        <h2 className="section-title" style={{ marginBottom: 24 }}>
          Academic background
        </h2>
        <p className="section-sub" style={{ marginBottom: 36 }}>
          Strong foundations in computer science, software engineering, and applied problem-solving.
        </p>

        <div className={`edu-list reveal${inView ? " visible" : ""}`}>
          {education.map((item) => (
            <article
              key={`${item.school}-${item.period}`}
              className="edu-item"
              style={{
                  background: `var(--bg-1) `,
                "--edu-accent": item.accent,
              }}
            >
              <div
                className="edu-accent-line"
                style={{
                  background: `linear-gradient(180deg, ${item.accent}, rgba(255,255,255,0.08))`,
                }}
              />
              <div className="edu-top">
                <div className="edu-left">
                  <div
                    className="edu-dot-wrap"
                    style={{
                      background: `${item.accent}20`,
                      borderColor: `${item.accent}40`,
                    }}
                  >
                    <div
                      className="edu-dot-inner"
                      style={{ background: item.accent }}
                    />
                  </div>
                  <div>
                    <div className="edu-school">{item.school}</div>
                    {/* <div className="edu-full">{item.full}</div> */}
                  </div>
                </div>
                <div className="edu-right">
                  <div className="edu-period">{item.period}</div>
                </div>
              </div>
              <div className="edu-degree">{item.degree}</div>
              <div className="edu-location">{item.location}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
