import { personal } from "../../data/portfolioData";

const YEAR = new Date().getFullYear();
const go = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-icon" aria-hidden="true">
            {personal.name.charAt(0)}
          </div>
          {personal.name}
        </div>

        <span className="footer-copy">
          © {YEAR} · Built by {personal.name}
        </span>

        <nav className="footer-links" aria-label="Footer links">
          {["about", "experience", "projects", "skills", "contact"].map(
            (id) => (
              <button key={id} className="footer-link" onClick={() => go(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ),
          )}
        </nav>
      </div>
    </footer>
  );
}
