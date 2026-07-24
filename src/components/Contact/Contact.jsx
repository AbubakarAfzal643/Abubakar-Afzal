import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useInView } from "../../hooks/useAnimations";
import { personal } from "../../data/portfolioData";
import { EMAILJS_CONFIG } from "../../config/emailjs";
import { CV_FILE, CV_NAME } from "../../data/cvData";

const ITEMS = [
  {
    icon: "✉",
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: "📱",
    label: "Phone",
    value: personal.phone,
    href: `tel:${personal.phone}`,
  },
  { icon: "📍", label: "Location", value: personal.location, href: null },
];

const SOCIALS = [
  { label: "GitHub", href: personal.github },
  { label: "LinkedIn", href: personal.linkedin },
  { label: "Instagram", href: personal.instagram },
];

/* Form states */
const STATE = {
  IDLE: "idle",
  SENDING: "sending",
  SUCCESS: "success",
  ERROR: "error",
};

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [ref, inView] = useInView();
  const formRef = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(STATE.IDLE);
  const [errMsg, setErrMsg] = useState("");
  const [cvClicked, setCvClicked] = useState(false);
  const [touched, setTouched] = useState({});

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleCv = () => {
    setCvClicked(true);
    setTimeout(() => setCvClicked(false), 2000);
  };

  /* ── Validate ── */
  const errors = {
    name: touched.name && !form.name.trim() ? "Name is required" : "",
    email:
      touched.email && !/\S+@\S+\.\S+/.test(form.email)
        ? "Valid email required"
        : "",
    subject:
      touched.subject && !form.subject.trim() ? "Subject is required" : "",
    message:
      touched.message && form.message.trim().length < 10
        ? "Message too short"
        : "",
  };
  const isValid =
    Object.values(errors).every((e) => !e) &&
    form.name &&
    form.email &&
    form.subject &&
    form.message.length >= 10;

  /* ── Send via EmailJS ── */
  const send = async (e) => {
    e.preventDefault();

    // Mark all touched
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isValid) return;

    // Check if user has configured EmailJS
    if (
      !EMAILJS_CONFIG.SERVICE_ID ||
      EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID"
    ) {
      setStatus(STATE.ERROR);
      setErrMsg(
        "EmailJS not configured yet. Open src/config/emailjs.js and follow the setup instructions to activate email sending.",
      );
      return;
    }

    setStatus(STATE.SENDING);
    setErrMsg("");

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          user_name: form.name.trim(),
          user_email: form.email.trim(),
          user_subject: form.subject.trim(),
          user_message: form.message.trim(),
        },
        EMAILJS_CONFIG.PUBLIC_KEY,
      );
      setStatus(STATE.SUCCESS);
      setForm(EMPTY);
      setTouched({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus(STATE.ERROR);
      setErrMsg(
        err?.text ||
          "Failed to send message. Please try emailing directly at " +
            personal.email,
      );
    }
  };

  const reset = () => {
    setStatus(STATE.IDLE);
    setErrMsg("");
    setForm(EMPTY);
    setTouched({});
  };

  const isSending = status === STATE.SENDING;

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <p className="label">Contact</p>
        <h2 className="section-title" style={{ marginBottom: 40 }}>
          Let's work together
        </h2>

        <div className="contact-grid">
          {/* ── Left info panel ── */}
          <div className={`reveal-left${inView ? " visible" : ""}`}>
            <h3 className="contact-heading">
              Open to internships,
              <br />
              freelance, and <span className="hl">full-time</span> roles
            </h3>
            <p className="contact-sub">
              Whether you have a project in mind, a team to join, or just want
              to talk — reach out and I'll respond as soon as possible.
            </p>

            <div className="contact-items">
              {ITEMS.map((item) =>
                item.href ? (
                  <a key={item.label} href={item.href} className="contact-item">
                    <div className="contact-item-icon" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <div className="contact-item-lbl">{item.label}</div>
                      <div className="contact-item-val">{item.value}</div>
                    </div>
                  </a>
                ) : (
                  <div key={item.label} className="contact-item">
                    <div className="contact-item-icon" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <div className="contact-item-lbl">{item.label}</div>
                      <div className="contact-item-val">{item.value}</div>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="contact-socials" style={{ marginBottom: 20 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="contact-soc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>

            {/* CV Download */}
            <a
              href={CV_FILE}
              download={CV_NAME}
              className={`contact-cv-btn${cvClicked ? " clicked" : ""}`}
              onClick={handleCv}
              aria-label="Download full CV as PDF"
            >
              <span className="contact-cv-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
              <div>
                <span className="contact-cv-label">
                  {cvClicked ? "Downloading…" : "Download Resume"}
                </span>
                <span className="contact-cv-meta">
                  PDF · {personal.name}
                </span>
              </div>
            </a>
          </div>

          {/* ── Right form panel ── */}
          <div
            className={`contact-form-panel reveal-right${inView ? " visible" : ""}`}
          >
            {/* ── SUCCESS ── */}
            {status === STATE.SUCCESS && (
              <div className="form-success">
                <div className="form-success-check" aria-hidden="true">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4>Message sent!</h4>
                <p>
                  Thanks for reaching out. I'll reply to{" "}
                  <strong style={{ color: "var(--text-0)" }}>
                    {form.email || "your email"}
                  </strong>{" "}
                  within 24 hours.
                </p>
                <button className="form-reset-btn" onClick={reset}>
                  Send another message
                </button>
              </div>
            )}

            {/* ── FORM (idle / sending / error) ── */}
            {status !== STATE.SUCCESS && (
              <>
                <div className="form-header">
                  <div className="form-header-title">Send a message</div>
                  <div className="form-header-sub">
                    Sends directly to{" "}
                    <span style={{ color: "var(--text-1)" }}>
                      abubakarafzal643@gmail.com
                    </span>
                  </div>
                </div>

                <form ref={formRef} onSubmit={send} noValidate>
                  <div className="form-body">
                    {/* Error banner */}
                    {status === STATE.ERROR && errMsg && (
                      <div className="form-error-banner" role="alert">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {errMsg}
                      </div>
                    )}

                    <div className="form-row">
                      <div
                        className={`form-field${errors.name ? " has-error" : touched.name && !errors.name ? " is-valid" : ""}`}
                      >
                        <label className="form-label" htmlFor="cf-name">
                          Name *
                        </label>
                        <input
                          id="cf-name"
                          name="name"
                          type="text"
                          className="form-input"
                          placeholder="Your name"
                          value={form.name}
                          onChange={update}
                          onBlur={() =>
                            setTouched((t) => ({ ...t, name: true }))
                          }
                          disabled={isSending}
                          autoComplete="name"
                          aria-describedby={
                            errors.name ? "err-name" : undefined
                          }
                        />
                        {errors.name && (
                          <span
                            className="form-field-err"
                            id="err-name"
                            role="alert"
                          >
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div
                        className={`form-field${errors.email ? " has-error" : touched.email && !errors.email ? " is-valid" : ""}`}
                      >
                        <label className="form-label" htmlFor="cf-email">
                          Email *
                        </label>
                        <input
                          id="cf-email"
                          name="email"
                          type="email"
                          className="form-input"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={update}
                          onBlur={() =>
                            setTouched((t) => ({ ...t, email: true }))
                          }
                          disabled={isSending}
                          autoComplete="email"
                          aria-describedby={
                            errors.email ? "err-email" : undefined
                          }
                        />
                        {errors.email && (
                          <span
                            className="form-field-err"
                            id="err-email"
                            role="alert"
                          >
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`form-field${errors.subject ? " has-error" : touched.subject && !errors.subject ? " is-valid" : ""}`}
                    >
                      <label className="form-label" htmlFor="cf-subject">
                        Subject *
                      </label>
                      <input
                        id="cf-subject"
                        name="subject"
                        type="text"
                        className="form-input"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={update}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, subject: true }))
                        }
                        disabled={isSending}
                        aria-describedby={
                          errors.subject ? "err-subject" : undefined
                        }
                      />
                      {errors.subject && (
                        <span
                          className="form-field-err"
                          id="err-subject"
                          role="alert"
                        >
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    <div
                      className={`form-field${errors.message ? " has-error" : touched.message && !errors.message ? " is-valid" : ""}`}
                    >
                      <label className="form-label" htmlFor="cf-message">
                        Message *
                      </label>
                      <textarea
                        id="cf-message"
                        name="message"
                        className="form-textarea"
                        placeholder="Tell me about your project or opportunity…"
                        value={form.message}
                        onChange={update}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, message: true }))
                        }
                        disabled={isSending}
                        rows={5}
                        aria-describedby={
                          errors.message ? "err-message" : undefined
                        }
                      />
                      <div className="form-char-count">
                        <span
                          style={{
                            color: errors.message ? "var(--red)" : "inherit",
                          }}
                        >
                          {form.message.length}
                        </span>{" "}
                        chars
                        {errors.message && (
                          <span
                            className="form-field-err"
                            id="err-message"
                            role="alert"
                          >
                            {errors.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-footer">
                    <button
                      type="submit"
                      className={`form-submit${isSending ? " is-sending" : ""}${!isValid ? " is-disabled" : ""}`}
                      disabled={isSending}
                      aria-busy={isSending}
                    >
                      {isSending ? (
                        <>
                          <span className="form-spinner" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="form-footer-note">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Delivered to {personal.email}
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
