import { useEffect } from "react";

/* Tracks mouse position per card and sets --mx/--my CSS vars
   for the radial gradient hover spotlight */
export function useMouseGlow(selector = ".project-card, .fact-card, .cert-card, .npm-card, .exp-item, .skills-group") {
  useEffect(() => {
    const handleMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + "%";
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%";
      card.style.setProperty("--mx", x);
      card.style.setProperty("--my", y);
    };

    const bind = () => {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener("mousemove", handleMove, { passive: true });
      });
    };

    // Bind immediately + re-bind if DOM changes
    bind();
    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [selector]);
}
