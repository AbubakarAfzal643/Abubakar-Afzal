import { Terminal } from "../ui/Terminal";
import { useInView } from "../../hooks/useAnimations";
import { personal } from "../../data/portfolioData";

const SOCIALS = [
  personal.github ? { label: "GitHub", href: personal.github } : null,
  personal.linkedin ? { label: "LinkedIn", href: personal.linkedin } : null,
  personal.instagram ? { label: "Instagram", href: personal.instagram } : null,
  personal.portfolio ? { label: "Portfolio", href: personal.portfolio } : null,
].filter(Boolean);

export default function About() {
  const [ref, inView] = useInView();

  const commands = [
    "whoami",
    "cat about.txt",
    "cat skills-soft.txt",
  ];

  const outputs = {
    0: [`${personal.name} — ${personal.title}`],
    1: [
      "Building responsive web apps and interactive UIs.",
      "Clean code, design systems, and performant experiences.",
    ],
    2: [
      "Communication · Teamwork · Adaptability",
      "Leadership · Problem-Solving · Collaboration",
    ],
  };

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <div>
            <p className="label">About</p>
            <h2 className="section-title" style={{ marginBottom: 32 }}>
              Building for the real world
            </h2>
            <div className={`about-body reveal${inView ? " visible" : ""}`}>
              <p className="about-p">
                Hi, I’m <strong className="text-accent-blue">Abubakar Afzal</strong>, a <strong className="text-accent-green">MERN Stack Developer</strong> who builds beautiful, functional, and <strong className="text-accent-purple">user-centered</strong> digital experiences.
              </p>
              <p className="about-p">
                I believe <strong className="text-accent-orange">design</strong> is more than just looking pretty—it’s about solving problems and creating intuitive, enjoyable experiences.
              </p>
              <p className="about-p">
                Whether it’s a website, mobile app, or digital product, I bring a commitment to <strong className="text-accent-cyan">design excellence</strong> and user-centered thinking to every project.
              </p>

              <div className="hero-socials">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social"
                    aria-label={s.label}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="about-facts">
            <Terminal
              commands={commands}
              outputs={outputs}
              username={personal.name.split(" ")[0]}
              typingSpeed={40}
              delayBetweenCommands={700}
              enableSound={false}
              className="max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
