import { useEffect, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200, rx = -200, ry = -200, raf;

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    };

    const burst = (x, y) => {
      const cols = ["#fff","#60a5fa","#4ade80","#c084fc","#f59e0b"];
      for (let i = 0; i < 7; i++) {
        const el = document.createElement("div");
        el.className = "c-burst";
        const a = (i / 7) * Math.PI * 2;
        const d = 20 + Math.random() * 22;
        const s = 2.5 + Math.random() * 3.5;
        el.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${cols[i%cols.length]};--dx:${(Math.cos(a)*d).toFixed(1)}px;--dy:${(Math.sin(a)*d).toFixed(1)}px;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 520);
      }
    };

    const HOVER  = 'a,button,[role="button"],label,.filter-btn,.skill-tag,.marquee-item,.contact-soc,.footer-link,.npm-gh,.hero-social,.nav-link,.nav-cta,.btt,.proj-empty-reset';
    const TEXT   = 'input,textarea,select';

    const set = (s) => {
      ["hover","text","click"].forEach(c => {
        dot.classList.toggle(c, c===s);
        ring.classList.toggle(c, c===s);
      });
    };

    const onOver = (e) => {
      if (e.target.matches(TEXT))  { set("text");  return; }
      if (e.target.matches(HOVER)) { set("hover"); return; }
    };
    const onOut = (e) => {
      if (e.target.matches(TEXT+","+HOVER)) set(null);
    };

    const onDown = (e) => { set("click"); burst(e.clientX, e.clientY); };
    const onUp   = () => setTimeout(() => set(null), 130);
    const hide   = () => { dot.style.opacity="0"; ring.style.opacity="0"; };
    const show   = () => { dot.style.opacity="1"; ring.style.opacity="1"; };

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove",    onMove,  { passive: true });
    window.addEventListener("mousedown",    onDown);
    window.addEventListener("mouseup",      onUp);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mousedown",    onDown);
      window.removeEventListener("mouseup",      onUp);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="c-dot"  aria-hidden="true" />
      <div ref={ringRef} className="c-ring" aria-hidden="true" />
    </>
  );
}
