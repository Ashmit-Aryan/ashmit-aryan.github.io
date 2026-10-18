import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getGithubLog, getStack, getWork } from "@/lib/portfolio.functions";

const workQuery = queryOptions({ queryKey: ["work"], queryFn: () => getWork() });
const stackQuery = queryOptions({ queryKey: ["stack"], queryFn: () => getStack() });
const githubQuery = queryOptions({
  queryKey: ["github-log"],
  queryFn: () => getGithubLog(),
  staleTime: 5 * 60_000,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashmit Aryan — Systems & Backend Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Ashmit Aryan, a backend and systems developer specializing in distributed systems, storage, and network architecture.",
      },
      { property: "og:title", content: "Ashmit Aryan — Systems & Backend Engineer" },
      {
        property: "og:description",
        content:
          "Distributed systems, high-throughput network architecture, and fault-tolerant storage engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(workQuery),
      context.queryClient.ensureQueryData(stackQuery),
      context.queryClient.ensureQueryData(githubQuery),
    ]),
  component: Portfolio,
  errorComponent: ({ error }) => (
    <div role="alert" style={{ padding: 32 }}>
      FEED ERROR: {error instanceof Error ? error.message : String(error)}
    </div>
  ),
  notFoundComponent: () => <div style={{ padding: 32 }}>RECORD NOT FOUND.</div>,
});

const history = [
  {
    date: "2024 — PRESENT",
    ref: "JHMUN-DIR-01",
    status: "[STATUS: OPERATIONAL]",
    role: "Technical Lead & Organizer",
    org: "JHMUN (International Collegiate Conference)",
    points: [
      "Directed complete technical infrastructure, public-facing portal, and on-premise network routing for international conference operations.",
      "Architected the delegate accreditation and voting verification engine handling 800+ participants with zero downtime and strict data isolation.",
      "Managed multi-tier volunteer logistics, IT incident response protocols, and production deployment cycles under rigid event timelines.",
    ],
  },
  {
    date: "2023 — 2026",
    ref: "DEV-COMMUNITY-LEAD",
    status: "[STATUS: CONCLUDED]",
    role: "Organizer & Backend Mentor",
    org: "TechStars Student Developer Community",
    points: [
      "Mentored 120+ collegiate engineers on systems programming fundamentals, concurrency primitives in Go, and Linux CLI instrumentation.",
      "Organized 6 technical hackathons, authored algorithmic judging criteria, and ran automated code-evaluation sandbox pipelines.",
    ],
  },
  {
    date: "2021 — 2025",
    ref: "ACAD-DEGREE-ENG",
    status: "[CONFERRAL: 2025]",
    role: "B.Tech in Computer Science and Engineering",
    org: "University Degree Program",
    points: [
      "Core coursework: Distributed Systems, Operating Systems Architecture, Computer Networks (RFC Implementation), Database Engine Design.",
      "Independent thesis focus: Leader election edge-cases and consensus log compaction in resource-constrained node clusters.",
    ],
  },
];

function KeyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="key-row">
      <span>{label}</span>
      <i />
      <strong>{children}</strong>
    </div>
  );
}

function SectionTitle({
  id,
  number,
  title,
  sub,
}: {
  id: string;
  number: string;
  title: string;
  sub: string;
}) {
  return (
    <div id={id} className="section-heading">
      <div>
        <span>
          {number} / {title}
        </span>
        <b>— {sub}</b>
      </div>
      <span>↘</span>
    </div>
  );
}

function Portfolio() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [isDark, setIsDark] = useState(false);
  const { data: work } = useSuspenseQuery(workQuery);
  const { data: stackRes } = useSuspenseQuery(stackQuery);
  const { data: gh } = useSuspenseQuery(githubQuery);
  const projects = work.data;
  const stack = stackRes.data;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme ? "dark" : "light");
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#index">
            <b>AA</b>
            <i />
            <span>AA SYSTEMS / DEV / SPEC</span>
            <em>[SYS_OK // 200 OK]</em>
          </a>
          <nav>
            {[
              ["01/INDEX", "index"],
              ["02/WORK", "work"],
              ["03/LOG", "log"],
              ["04/STACK", "stack"],
              ["05/ABOUT", "about"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
            <Link to="/blog">06/BLOG</Link>
            <a href="#contact">07/CONTACT</a>
          </nav>
          <div className="top-actions">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              THEME: {isDark ? "DARK" : "LIGHT"}
            </button>
            <a href="/resume.pdf">RESUME.PDF ↗</a>
            <b>
              <UserRound size={15} />
            </b>
          </div>
        </div>
      </header>

      <main>
        <div className="meta-ribbon">
          <span>
            <b>[SPECIFICATION_SHEET // REV_2026.04]</b> <i>■</i> DOC_TYPE: ENGINEER_PORTFOLIO |
            SECTION: 01_HERO_TELEMETRY | GRID: 12-COL FIXED SUBSTRATE
          </span>
          <strong>SUBSTRATE: UNBLEACHED PAPER [OK]</strong>
        </div>
        <section className="intro" id="index">
          <div className="intro-copy">
            <label>
              [SPECIFICATION_SHEET // REV_2026.04] <i />
            </label>
            <h1>
              ASHMIT
              <br />
              ARYAN
            </h1>
            <div className="orange-rule" />
            <h2>Backend and systems developer. Runs JHMUN.</h2>
            <p>
              Specializing in distributed systems, high-throughput network architectures, and
              technical developer communities. Focus on mechanical sympathy, deterministic
              execution, and fault-tolerant storage.
            </p>
            <div className="currently">
              <b>CURRENTLY:</b> RESEARCHING LOCAL LOG CONCURRENCY /{" "}
              <strong>[BENCHMARKING ENGINE: 18.5k req/s]</strong>
            </div>
          </div>
          <aside className="telemetry">
            <div className="box-title">
              <span>01 // TELEMETRY & SPEC_ID</span>
              <b>STABLE</b>
            </div>
            <div className="keys">
              <KeyRow label="LOCATION">New Delhi, IN / UTC+5:30</KeyRow>
              <KeyRow label="ROLE">Systems & Backend Engineer</KeyRow>
              <KeyRow label="EDUCATION">B.Tech CSE (Grad. 2025)</KeyRow>
              <KeyRow label="STATUS">
                <span className="active">Available for Systems Roles [ACTIVE]</span>
              </KeyRow>
              <KeyRow label="KEY FOCUS">Go, Rust, Storage, Linux</KeyRow>
              <KeyRow label="CONTACT">ashmitaryan@gmail.com</KeyRow>
            </div>
            <div className="machine">
              <div>
                <small>PROTOCOL</small>
                <b>TCP / gRPC / Raft Consensus</b>
              </div>
              <div>
                <small>HOST</small>
                <b>x86_64-unknown-linux-gnu</b>
              </div>
              <div>
                <small>UPTIME</small>
                <b>99.98%</b>
              </div>
              <div>
                <small>CRYPT_SIG_VERIFIED</small>
                <b>PGP: 0x94B2E8A1</b>
              </div>
            </div>
          </aside>
        </section>

        <section className="work">
          <SectionTitle
            id="work"
            number="02"
            title="WORK"
            sub="RECORDED ARCHITECTURES [2021–2026]"
          />
          <div className="record-count">
            TOTAL_RECORDS: {String(projects.length).padStart(2, "0")} // SRC:{" "}
            {work.source.toUpperCase()}
          </div>
          <div className="project-head">
            <span>YEAR</span>
            <span>PROJECT / ARCHITECTURAL SPECIFICATION</span>
            <span>ENGINEERING STACK</span>
            <span>DOMAIN / CLASS</span>
            <span>ACTION</span>
          </div>
          {projects.map((p, i) => (
            <article className="project" key={p.title}>
              <div className="project-row">
                <span>{p.year}</span>
                <h3>{p.title}</h3>
                <span>{p.stack}</span>
                <span>{p.domain}</span>
                <button type="button" onClick={() => setExpanded(expanded === i ? null : i)}>
                  {expanded === i ? "[EXPANDED]" : "[EXPAND +]"}
                </button>
              </div>
              {expanded === i && (
                <div className="project-detail">
                  <div className="detail-index">
                    0{i + 1} //{" "}
                    {i === 0 ? "DIAGNOSTIC SPECIFICATION & BENCHMARKS" : "ARCHITECTURAL NOTES"}
                  </div>
                  <p>{p.desc}</p>
                  {p.metric && <div className="metric">{p.metric}</div>}
                  <a
                    href={`https://github.com/ashmit-aryan/${p.repo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    VIEW REPOSITORY <span>github.com/ashmit-aryan/{p.repo} →</span>
                  </a>
                </div>
              )}
            </article>
          ))}
        </section>

        <section>
          <SectionTitle id="log" number="03" title="LOG" sub="COMMIT & TENURE HISTORY" />
          <div className="feed-label">FEED: CHRONOLOGICAL // HEAD</div>
          <div className="history">
            {history.map((item) => (
              <article key={item.ref}>
                <div className="history-meta">
                  <b>{item.date}</b>
                  <span>REF: {item.ref}</span>
                  <em>{item.status}</em>
                </div>
                <div className="history-body">
                  <h3>{item.role}</h3>
                  <h4>{item.org}</h4>
                  {item.points.map((point) => (
                    <p key={point}>
                      <b>+</b>
                      {point}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="feed-label" style={{ marginTop: 32 }}>
            FEED: GITHUB_API // PUBLIC PUSH EVENTS
          </div>
          <div className="history">
            {gh.commits.length === 0 ? (
              <article>
                <div className="history-meta">
                  <b>NO RECENT COMMITS</b>
                  <em>[{gh.error ?? "EMPTY FEED"}]</em>
                </div>
                <div className="history-body">
                  <p>Public push activity will appear here.</p>
                </div>
              </article>
            ) : (
              gh.commits.map((c) => (
                <article key={c.sha + c.repo}>
                  <div className="history-meta">
                    <b>{c.date.slice(0, 10).replaceAll("-", ".")}</b>
                    <span>SHA: {c.sha}</span>
                    <em>[{c.repo}]</em>
                  </div>
                  <div className="history-body">
                    <h4>
                      <a href={c.url} target="_blank" rel="noreferrer">
                        {c.message}
                      </a>
                    </h4>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section>
          <SectionTitle id="stack" number="04" title="STACK" sub="SYSTEM CAPABILITIES & TOOLING" />
          <div className="feed-label">ZERO_FRAMEWORK_FLUFF // HARDENED</div>
          <div className="stack-grid">
            {stack.map((item) => (
              <article key={item.group}>
                <div className="stack-label">
                  <b>{item.group}</b>
                  <span>{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.items}</p>
                <small>Focus: {item.focus}</small>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle id="about" number="05" title="ABOUT" sub="RECORD" />
          <div className="about">
            <aside>
              <h2>
                ENGINEERING
                <br />
                CREED
              </h2>
              <div>LOC: NEW DELHI, INDIA</div>
              <div>PRINCIPLE: MECHANICAL SYMPATHY</div>
              <div>METHOD: ZERO ORNAMENTATION</div>
            </aside>
            <div className="about-copy">
              <p>
                I build backend services and low-level software that prioritize predictability, data
                integrity, and mechanical sympathy. My work revolves around making complex network
                protocols and storage engines run reliably under concurrent load, avoiding brittle
                abstractions in favor of direct, verifiable execution paths.
              </p>
              <p>
                Alongside systems engineering, I run developer communities and organize large-scale
                academic conferences like JHMUN, handling both leadership operations and
                mission-critical event infrastructure. I view engineering and operations through the
                same lens: resilient architecture thrives when you eliminate moving parts and make
                failover explicit.
              </p>
              <div className="about-data">
                <b>READING / ARCHITECTURE</b>
                <span>Designing Data-Intensive Applications (Kleppmann)</span>
                <b>RUNNING HARDWARE</b>
                <span>ThinkPad T480 // Debian 12 Minimal Substrate</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-blog">
          <SectionTitle id="blog" number="06" title="BLOG" sub="TECHNICAL LOGBOOK" />
          <div className="home-blog-body">
            <div>
              <span>DISPATCH_LOG // ARCHIVE</span>
              <h3>Dispatches & Writings</h3>
              <p>Technical logs, architectural notes, and distributed systems writeups.</p>
            </div>
            <Link to="/blog">
              OPEN ARCHIVE <span>↗</span>
            </Link>
          </div>
        </section>
        <section>
          <SectionTitle id="contact" number="07" title="TRANSMISSION" sub="DIRECT CHANNELS" />
          <div className="contact-head">GPG_KEY: AVAILABLE UPON REQUEST</div>
          <div className="contact-grid">
            {[
              [
                "EMAIL",
                "ashmitaryan@gmail.com",
                "SEND TRANSMISSION",
                "mailto:ashmitaryan@gmail.com",
              ],
              [
                "GITHUB",
                "github.com/ashmit-aryan",
                "SOURCE CODE & COMMITS",
                "https://github.com/ashmit-aryan",
              ],
              [
                "LINKEDIN",
                "linkedin.com/in/ashmit-aryan",
                "PROFESSIONAL TENURE",
                "https://linkedin.com/in/ashmit-aryan",
              ],
              [
                "LEETCODE",
                "leetcode.com/u/ashmitaryan",
                "ALGORITHMIC VERIFICATION",
                "https://leetcode.com/u/ashmitaryan",
              ],
            ].map(([a, b, c, d]) => (
              <a href={d} key={a}>
                <small>{a}</small>
                <b>{b}</b>
                <span>{c}</span>
                <ExternalLink size={16} />
              </a>
            ))}
          </div>
          <div className="footer-status">
            <span>DISPATCH GATEWAY: READY // 0 PACKETS DROPPED</span>
            <b>STATUS: LISTENING ON PORT 443</b>
          </div>
        </section>
      </main>
    </div>
  );
}
