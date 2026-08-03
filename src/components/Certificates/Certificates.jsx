import { useLayoutEffect, useState } from "react";
import { useInView } from "../../hooks/useAnimations";
import { certificates } from "../../data/portfolioData";

const ISSUER_META = {
  "DeveloperHUB Corporation": { icon: "💼", color: "#34d399" },
  "Ellevo Pathway":            { icon: "🚀", color: "#c084fc" },
  "Quantum Logics":           { icon: "🧠", color: "#60a5fa" },
  "SQA Internship":           { icon: "🧪", color: "#fbbf24" },
  "FAST NUCES Lahore":         { icon: "🎓", color: "#fbbf24" },
};

function CertCard({ cert, index, onOpen }) {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const meta = ISSUER_META[cert.issuer] || { icon: "🎓", color: "#fbbf24" };
  const isTopCard = cert.issuer === "Netsol Technologies" || cert.issuer === "Quantum Logics";
  return (
    <div
      ref={ref}
      className={`cert-card${isTopCard ? " cert-card--top" : ""} reveal d${(index % 4) + 1}${inView ? " visible" : ""}`}
    >
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
  const hasImage = Boolean(cert.image);
  return (
    <div className="cert-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Certificate preview for ${cert.name}`}>
      <div className="cert-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="cert-modal-close" onClick={onClose} aria-label="Close certificate preview">
          ×
        </button>
        {hasImage ? (
          <img src={cert.image} alt={`${cert.name} certificate`} className="cert-modal-image" />
        ) : (
          <div className="cert-modal-placeholder">
            <div className="cert-modal-placeholder-badge">Certificate preview pending</div>
            <div className="cert-modal-placeholder-title">{cert.name}</div>
            <div className="cert-modal-placeholder-copy">
              Add the certificate image to <span>public/certificates</span> and update the data entry when it is ready.
            </div>
          </div>
        )}
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

  useLayoutEffect(() => {
    if (!activeCert) return;

    const scrollY = window.scrollY;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    const previousStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.scrollBehavior = "auto";

    return () => {
      document.body.style.position = previousStyles.position;
      document.body.style.top = previousStyles.top;
      document.body.style.left = previousStyles.left;
      document.body.style.right = previousStyles.right;
      document.body.style.width = previousStyles.width;
      document.body.style.overflow = previousStyles.overflow;
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, [activeCert]);

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
