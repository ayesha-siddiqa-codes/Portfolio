import { useEffect, useRef, useState } from "react";
import { profile, skills, projects, experience, certifications } from "./data.js";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Fades sections in as they scroll into view
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Cards in a row: swipeable on phones, highlights the centred card
function Rail({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-active", e.intersectionRatio > 0.6)),
      { root: el, threshold: [0.6] }
    );
    [...el.children].forEach((c) => io.observe(c));
    return () => io.disconnect();
  });
  return <div ref={ref} className="grid rail reveal-stagger">{children}</div>;
}

function Nav({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const links = ["about", "skills", "projects", "resume", "contact"];
  return (
    <header className="nav">
      <a href="#top" className="logo" aria-label={profile.name}>
        <span className="mono"><img src="/monogram.webp" alt="" width="46" height="46" /></span>
        <span className="logo-name">{profile.name}</span>
      </a>
      <nav className={open ? "open" : ""}>
        {links.map((l) => (
          <a key={l} href={`#${l}`} onClick={() => setOpen(false)}>{l}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <button aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero wrap">
      <div>
        <p className="eyebrow">Portfolio</p>
        <h1>{profile.name}</h1>
        <div className="rule"><span>✦</span></div>
        <h2>{profile.title}</h2>
        <p className="lead">{profile.tagline}</p>
        <div className="cta">
          <a className="btn" href="#projects">View projects</a>
          <a className="btn ghost" href="#contact">Contact me</a>
        </div>
      </div>
      <div className="arch">
        <img
          src="/monogram.webp"
          alt="AS monogram of Ayesha Siddiqa"
          width="640"
          height="640"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}

function Section({ id, title, band, children }) {
  return (
    <section id={id} className={band ? "section band" : "section"}>
      <div className="wrap reveal">
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Projects() {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [filter, setFilter] = useState("All");
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <Section id="projects" title="Featured Work" band>
      <div className="filters">
        {categories.map((c) => (
          <button key={c} className={c === filter ? "chip active" : "chip"} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="swipe-hint">Swipe to see more →</p>
      <Rail>
        {shown.map((p) => (
          <article className="card" key={p.title}>
            <div className="card-head">
              <h3>{p.title}</h3>
              {p.status && (
                <span className={p.status === "Live" ? "badge" : "badge progress"}>{p.status}</span>
              )}
            </div>
            <p>{p.description}</p>
            <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="links">
              {p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
              {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live demo</a>}
            </div>
            {p.note && <p className="note">{p.note}</p>}
          </article>
        ))}
      </Rail>
    </Section>
  );
}

function Resume() {
  return (
    <Section id="resume" title="Resume">
      <div className="resume">
        <div>
          <h3>Experience & Education</h3>
          <ol className="timeline reveal-stagger">
            {experience.map((x) => (
              <li key={x.role}>
                <strong>{x.role}</strong>
                <span className="period">{x.org} · {x.period}</span>
                <p>{x.detail}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3>Certifications</h3>
          <ul className="certs reveal-stagger">
            {certifications.map((c) => (
              <li key={c.title}>
                {c.link ? <a href={c.link} target="_blank" rel="noreferrer">{c.title}</a> : c.title}
                {c.date && <span className="cert-date">{c.date}</span>}
              </li>
            ))}
          </ul>
          <a className="btn" href={profile.resumeUrl} download>Download resume</a>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const empty = { name: "", email: "", message: "", website: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({ type: "ok", text: "Thank you! Your message has been sent." });
      setForm(empty);
    } catch (err) {
      setStatus({
        type: "err",
        text: err.message === "Failed to fetch" ? "Could not reach the server. Please email me directly." : err.message
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section id="contact" title="Let's Create Something Extraordinary" band>
      <div className="contact">
        <div>
          <p>Looking for an intern, a junior developer or a website for your business? Send me a message and I'll get back to you soon.</p>
          <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a> ·{" "}
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </p>
        </div>
        <form onSubmit={submit}>
          <label>Name
            <input name="name" value={form.name} onChange={change} required maxLength={80} />
          </label>
          <label>Email
            <input type="email" name="email" value={form.email} onChange={change} required />
          </label>
          <label>Message
            <textarea name="message" rows="5" value={form.message} onChange={change} required maxLength={2000} />
          </label>
          {/* hidden field: real people never fill this in, bots do */}
          <input name="website" value={form.website} onChange={change} className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" />
          <button className="btn" disabled={busy}>{busy ? "Sending..." : "Send message"}</button>
          {status.text && <p className={`status ${status.type}`} role="status">{status.text}</p>}
        </form>
      </div>
    </Section>
  );
}

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useReveal();

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <Section id="about" title="About Me">
          {profile.about.map((p, i) => <p key={i}>{p}</p>)}
        </Section>
        <Section id="skills" title="What I Do">
          <div className="grid skills reveal-stagger">
            {Object.entries(skills).map(([group, items]) => (
              <div className="card" key={group}>
                <h3>{group}</h3>
                <div className="tags">{items.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
            ))}
          </div>
        </Section>
        <Projects />
        <Resume />
        <Contact />
      </main>
      <footer>
        <span className="script">{profile.name}</span>
        <small>Strategy · Creativity · Purpose</small>
      </footer>
    </>
  );
}