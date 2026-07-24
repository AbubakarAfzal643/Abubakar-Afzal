import { useEffect, useRef, useState, useCallback } from "react";

// ── Intersection observer — fires once when element enters viewport
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return [ref, inView];
}

// ── Typewriter effect
export function useTypewriter(words, speed = 80, pause = 2400) {
  const [text, setText] = useState("");
  const state = useRef({ wi: 0, ci: 0, del: false });
  useEffect(() => {
    let t;
    const tick = () => {
      const { wi, ci, del } = state.current;
      const word = words[wi];
      if (!del && ci < word.length) {
        setText(word.slice(0, ci + 1));
        state.current.ci++;
        t = setTimeout(tick, speed);
      } else if (!del && ci === word.length) {
        t = setTimeout(() => { state.current.del = true; tick(); }, pause);
      } else if (del && ci > 0) {
        setText(word.slice(0, ci - 1));
        state.current.ci--;
        t = setTimeout(tick, speed / 2);
      } else {
        state.current = { wi: (wi + 1) % words.length, ci: 0, del: false };
        t = setTimeout(tick, 300);
      }
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);
  return text;
}

// ── Scroll progress 0–100
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setP(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return p;
}

// ── Animated counter — counts up when inView
export function useCounter(target, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Active section tracker
export function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const h = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 100) { setActive(ids[i]); return; }
      }
      setActive("");
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [ids]);
  return active;
}
