import { useState, useEffect, useRef } from "react";
import { useScrollProgress } from "../../hooks/useAnimations";
import { useTheme } from "../../hooks/useTheme";
import "./Navbar.css";
import { CV_FILE, CV_NAME } from "../../data/cvData";
import { personal } from "../../data/portfolioData";

const LINKS = [
  { href: "#about", label: "About", num: "01" },
  { href: "#education", label: "Education", num: "02" },
  { href: "#experience", label: "Experience", num: "03" },
  { href: "#projects", label: "Projects", num: "04" },
  { href: "#skills", label: "Skills", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState(null);
  const [cvFlash, setCvFlash] = useState(false);
  const pillRef = useRef(null);
  const linksRef = useRef([]);
  const progress = useScrollProgress();
  const { isDark, toggle } = useTheme();

  /* scroll tracking */
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive("#" + ids[i]);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* move sliding pill indicator */
  useEffect(() => {
    const idx = LINKS.findIndex((l) => l.href === active);
    const pill = pillRef.current;
    if (!pill) return;
    if (idx === -1) {
      pill.style.opacity = "0";
      return;
    }
    const el = linksRef.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const parentRect = el.closest(".nav-links-wrap").getBoundingClientRect();
    pill.style.opacity = "1";
    pill.style.width = rect.width + "px";
    pill.style.left = rect.left - parentRect.left + "px";
  }, [active]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCv = () => {
    setCvFlash(true);
    setTimeout(() => setCvFlash(false), 1800);
  };

  /* lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`nav${solid ? " nav-solid" : ""}`} role="banner">
        <div className="nav-inner">
          {/* ── Logo ── */}
          <a
            href="#"
            onClick={(e) => go(e, "#hero")}
            className="nav-logo"
            aria-label="Go to top"
          >
            <span className="nav-logo-mark">
              <span className="nav-logo-letter">A</span>
              <span className="nav-logo-glow" aria-hidden="true" />
            </span>
            <span className="nav-logo-text">
              <span className="nav-logo-name">{personal.name}</span>
              <span className="nav-logo-role">{personal.title}</span>
            </span>
          </a>

          {/* ── Desktop nav links ── */}
          <nav className="nav-links-wrap" aria-label="Main navigation">
            <div className="nav-pill-bg" ref={pillRef} aria-hidden="true" />
            <ul className="nav-links" role="list">
              {LINKS.map((l, i) => (
                <li key={l.href} role="listitem">
                  <a
                    href={l.href}
                    ref={(el) => (linksRef.current[i] = el)}
                    onClick={(e) => go(e, l.href)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={`nav-link${active === l.href ? " is-active" : ""}${hovered === i ? " is-hovered" : ""}`}
                    aria-current={active === l.href ? "page" : undefined}
                  >
                    <span className="nav-link-num" aria-hidden="true">
                      {l.num}
                    </span>
                    <span className="nav-link-label">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Right actions ── */}
          <div className="nav-actions">
            {/* Theme toggle */}
            <button
              className="nav-icon-btn"
              onClick={toggle}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              title={isDark ? "Light mode" : "Dark mode"}
            >
              <span className="nav-icon-btn-inner">
                <svg
                  className="icon-moon"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <svg
                  className="icon-sun"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </span>
            </button>

            {/* CV download */}
            <a
              href={CV_FILE}
              download={CV_NAME}
              className={`nav-cv-btn${cvFlash ? " nav-cv-flash" : ""}`}
              onClick={handleCv}
              aria-label="Download Resume"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="nav-cv-icon"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{cvFlash ? "Saved!" : "Resume"}</span>
            </a>

            {/* Collaborate */}
            <a href="#contact" onClick={(e) => go(e, "#contact")} className="nav-cta-btn">
              <span>Collaborate</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>

          {/* ── Hamburger ── */}
          <button
            className={`nav-burger${open ? " is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="burger-icon">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        {/* Progress bar */}
        <div
          className="nav-progress"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </header>

      {/* ── Mobile nav overlay ── */}
      <div
        className={`mobile-overlay${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile nav drawer ── */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {/* Drawer header */}
        <div className="mobile-nav-header">
          <div className="mobile-nav-brand">
            <span className="mobile-nav-brand-mark">S</span>
            <div>
              <div className="mobile-nav-brand-name">{personal.name}</div>
              <div className="mobile-nav-brand-status">
                <span className="mobile-status-dot" />
                Available for work
              </div>
            </div>
          </div>
          <button
            className="mobile-nav-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul className="mobile-nav-links" role="list">
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ "--i": i }}>
              <a
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className={`mobile-nav-link${active === l.href ? " is-active" : ""}`}
              >
                <span className="mobile-nav-num">{l.num}</span>
                <span className="mobile-nav-label">{l.label}</span>
                <svg
                  className="mobile-nav-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        {/* Drawer footer */}
        <div className="mobile-nav-footer">
          <a
            href={CV_FILE}
            download={CV_NAME}
            className="mobile-cv-btn"
            onClick={handleCv}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
          <a href="#contact" onClick={(e) => go(e, "#contact")} className="mobile-collab-btn">
            Collaborate
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>

        {/* Theme toggle row */}
        <div className="mobile-theme-row">
          <span className="mobile-theme-label">
            {isDark ? "Dark mode" : "Light mode"}
          </span>
          <button
            className={`mobile-theme-switch${isDark ? "" : " is-light"}`}
            onClick={toggle}
            aria-label="Toggle theme"
          >
            <span className="switch-thumb">
              {isDark ? (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                </svg>
              )}
            </span>
          </button>
        </div>

        {/* Decorative glow */}
        <div className="mobile-nav-glow" aria-hidden="true" />
      </nav>
    </>
  );
}
