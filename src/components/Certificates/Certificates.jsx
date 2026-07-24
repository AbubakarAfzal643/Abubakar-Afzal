import { useState } from "react";
import { useInView } from "../../hooks/useAnimations";
import { certificates } from "../../data/portfolioData";

const ISSUER_META = {
  "DeveloperHUB Corporation": { icon: "💼", color: "#34d399" },
  "Ellevo Pathway":            { icon: "🚀", color: "#c084fc" },
  "Quantum Logics":           { icon: "🧠", color: "#60a5fa" },
  "FAST NUCES Lahore":         { icon: "🎓", color: "#fbbf24" },
  IBM:                          { icon: "🔵", color: "#0062ff" },
  freeCodeCamp:                 { icon: "🔥", color: "#00A651" },
  "University of London":      { icon: "🎓", color: "#8b5cf6" },
  Codio:                        { icon: "📘", color: "#f28a00" },
  Alison:                       { icon: "🌿", color: "#22c55e" },
  IEEE:                         { icon: "⚡", color: "#3b82f6" },
};

function CertCard({ cert, index, onOpen }) {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const meta = ISSUER_META[cert.issuer] || { icon: "📜", color: "var(--text-2)" };
  return (
    <div ref={ref} className={`cert-card reveal d${(index % 4) + 1}${inView ? " visible" : ""}`}>
      <div className="cert-icon" style={{ background: `${meta.color}14`, borderColor: `${meta.color}20` }} aria-hidden="true">
        {meta.icon}
      </div>
      <div className="cert-details">
        <div>
          <div className="cert-name">{cert.name}</div>
          <div className="cert-meta">
            <span className="cert-issuer" style={{ color: meta.color }}>{cert.issuer}</span>
            <span className="cert-sep" aria-hidden="true"> | </span>
            <span className="cert-date">{cert.date}</span>
          </div>
        </div>
        <div className="cert-description">{cert.description}</div>
        <button type="button" className="cert-action" onClick={() => onOpen(cert)}>
          See Certificate
        </button>
      </div>
    </div>
  );
}

function CertModal({ cert, onClose }) {
  return (
    <div className="cert-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Certificate preview for ${cert.name}`}>
      <div className="cert-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="cert-modal-close" onClick={onClose} aria-label="Close certificate preview">
          ×
        </button>
        <img src={cert.image} alt={`${cert.name} certificate`} className="cert-modal-image" />
        <div className="cert-modal-content">
          <div className="cert-name">{cert.name}</div>
          <div className="cert-meta">
            <span className="cert-issuer">{cert.issuer}</span>
            <span className="cert-sep" aria-hidden="true">·</span>
            <span className="cert-date">{cert.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certificates() {
  const [ref, inView] = useInView();
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certificates" className="certificates" ref={ref}>
      <div className="container">
        <p className="label">Certificates</p>
        <h2 className="section-title" style={{ marginBottom: 8 }}>Credentials</h2>
        <p className="section-sub" style={{ marginBottom: 40 }}>
          Verified certifications from FAST NUCES, Quantum Logics, and more.
        </p>
        <div className="certs-grid">
          {certificates.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} onOpen={setActiveCert} />
          ))}
        </div>
      </div>
      {activeCert && <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />}
    </section>
  );
}
