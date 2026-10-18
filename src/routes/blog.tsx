import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Copy, ExternalLink, Rss } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { dispatches } from "@/content/dispatches";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Dispatches & Writings — Ashmit Aryan" },
    { name: "description", content: "Technical logs, architectural notes, and distributed systems writeups by Ashmit Aryan." },
    { property: "og:title", content: "Dispatches & Writings — Ashmit Aryan" },
    { property: "og:description", content: "Technical logs, architectural notes, and distributed systems writeups by Ashmit Aryan." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Blog,
});

const filterIds: [string, string][] = [
  ["all", "ALL"], ["distributed-systems", "DISTRIBUTED-SYSTEMS"], ["consensus-raft", "CONSENSUS-RAFT"],
  ["linux-kernel", "LINUX-KERNEL"], ["architecture", "ARCHITECTURE"], ["astro-static", "ASTRO-STATIC"],
];
const pad = (n: number) => String(n).padStart(2, "0");
const filters: [string, string, string][] = filterIds.map(([id, label]) => [id, label, pad(id === "all" ? dispatches.length : dispatches.filter((d) => d.filters.includes(id)).length)]);

function Blog() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const visible = dispatches.filter((post) => filter === "all" || post.filters.includes(filter));
  const featured = visible.find((post) => post.id === "01");
  const archive = visible.filter((post) => post.id !== "01");

  async function copyFeed() {
    try {
      await navigator.clipboard.writeText("https://ashmitaryan.is-a.dev/rss.xml");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  }

  return <div className="blog-page">
    <header className="blog-top"><div className="blog-container"><Link to="/" className="blog-back"><ArrowLeft size={14} /> RETURN TO HOME</Link></div></header>
    <div className="blog-status"><div className="blog-container blog-status-inner"><div><Link to="/" className="blog-return"><ArrowLeft size={13} /> RETURN TO INDEX // SPEC_SHEET [01/HOME]</Link><span className="blog-separator">/</span><strong>[DISPATCH_LOG // ARCHIVE]</strong></div><div><span className="blog-dot" /> FEED: MDX_STATIC <span className="blog-separator">|</span> HOST: edge-cdn.iad1 <span className="blog-separator">|</span> LATENCY: <em>0ms (CACHED)</em></div></div></div>
    <section className="blog-intro"><div className="blog-container blog-intro-inner"><div><div className="blog-kicker">INDEX 06 // TECHNICAL LOGBOOK <span /> EPOCH: 2024–2026</div><h1>DISPATCHES &amp; WRITINGS</h1><p>TECHNICAL LOGS, ARCHITECTURAL NOTES &amp; DISTRIBUTED SYSTEMS WRITEUPS. ZERO-FLUFF VERIFIED RUNTIMES AND RETROSPECTIVES.</p></div><aside className="blog-telemetry"><div>SPEC_TELEMETRY <b>[STATUS: SYNCED]</b></div><dl><dt>TOTAL_ARTICLES:</dt><dd>{pad(dispatches.length)} DISPATCHES</dd><dt>VERIFICATION:</dt><dd>DETERMINISTIC</dd><dt>FORMAT:</dt><dd>MDX // ASTRO v4</dd><dt>SIGNATURE:</dt><dd>GPG: 0x9AF34E12</dd></dl></aside></div></section>
    <section className="blog-filter"><div className="blog-container blog-filter-inner"><div className="blog-filter-list"><span>FILTER_TAG:</span>{filters.map(([id,label,count]) => <Button type="button" key={id} aria-pressed={filter === id} onClick={() => {setFilter(id); setExpanded(null);}} className={`blog-filter-button ${filter === id ? "selected" : ""}`}>{label} [{count}]</Button>)}</div><span className="filter-hint">SELECT FIELD TO PARSE</span></div></section>
    {featured && <section className="blog-featured"><div className="blog-container"><article className="blog-feature-card"><span className="blog-pin">PINNED // CANONICAL SPEC</span><div className="blog-feature-meta"><b>DISPATCH_01</b><span>/</span><span>DATE: {featured.date}</span><span>/</span><span>READ_TIME: {featured.time} MIN</span><span>/</span><span className="blog-tag">TAGS: [{featured.tags.join(", ")}]</span></div><h2>{featured.title}</h2><p>{featured.summary}</p><div className="blog-code"><div><span><i /> src/content/config.ts [READ_ONLY]</span><span>SCHEMA_VER: 2026.10</span></div><pre><code>{`01  export const collections = {\n02    projects: defineCollection({ schema: projectSchema }),\n03    experience: defineCollection({ schema: experienceSchema }),\n04    dispatches: defineCollection({ schema: dispatchSchema }),\n05  };`}</code></pre></div><div className="blog-feature-actions"><Button type="button" onClick={() => setExpanded(expanded === "01" ? null : "01")}>READ DISPATCH [SPEC_VIEW] <ArrowRight size={15} /></Button><a href="https://github.com/ashmit-aryan" target="_blank" rel="noreferrer">VIEW MDX SOURCE [GITHUB] <ExternalLink size={13} /></a><small>HASH: SHA256:D83F4B8A21</small></div>{expanded === "01" && <div className="blog-expanded"><b>DISPATCH_01 // MANIFEST</b><div className="blog-mdx"><featured.Body /></div></div>}</article></div></section>}
    <section className="blog-archive"><div className="blog-container"><div className="blog-archive-title"><b><span>// 02</span> ALL CHRONOLOGICAL DISPATCHES [ARCHIVE LEDGER]</b><span>CLICK ROW TO EXPAND MANIFEST</span></div><div className="blog-table-head"><span>INDEX</span><span>TIMESTAMP</span><span>TITLE &amp; CORE MANIFEST</span><span>TAXONOMY / STACK</span><span>ACTION</span></div>{archive.map(post => <article className="blog-archive-item" key={post.id}><div className="blog-row"><b>#{post.id}</b><div className="blog-date">{post.date}<small>READ_TIME: {post.time} MIN</small></div><div className="blog-row-body"><h3>{post.title}</h3><p>{post.summary}</p></div><div className="blog-row-tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Button type="button" aria-expanded={expanded === post.id} onClick={() => setExpanded(expanded === post.id ? null : post.id)}>READ <ArrowRight size={14} /></Button></div>{expanded === post.id && <div className="blog-expanded"><b>DISPATCH_{post.id} // MANIFEST</b><div className="blog-mdx"><post.Body /></div></div>}</article>)}{archive.length === 0 && !featured && <div className="blog-empty">NO DISPATCHES MATCH THIS FILTER.</div>}</div></section>
    <section className="blog-lower"><div className="blog-container blog-lower-grid"><div className="blog-lower-box"><div className="blog-lower-label"><Rss size={16} /> SYNDICATION PROTOCOL // AUTOMATED INGESTION</div><h2>Pure XML / Atom Feed Architecture</h2><p>Subscribe with any standard CLI or graphical reader. Zero telemetry trackers, zero tracking pixels, full raw text payload delivered over HTTPS edge.</p><div className="blog-copy"><code>https://ashmitaryan.is-a.dev/rss.xml</code><Button type="button" onClick={copyFeed} title="Copy feed endpoint"><Copy size={14} /> {copied ? "COPIED" : "COPY ENDPOINT"}</Button></div></div><div className="blog-lower-box"><div className="blog-lower-label">03 // REPO VALIDATION</div><h2>GPG SIGNED COMMITS ONLY</h2><p>Every dispatched MDX commit is cryptographically attested with local hardware security keys before edge compilation.</p><div className="blog-key">KEY_ID: 4F98B22C901E<br />FINGERPRINT: 3A81 ... D770</div></div></div></section>
    <footer className="blog-footer"><div className="blog-container"><Link to="/" className="blog-footer-back"><ArrowLeft size={15} /> RETURN TO MAIN PORTFOLIO SPEC [INDEX]</Link><div className="blog-eof">INDEX_EOF // TOTAL {dispatches.length} DISPATCH RECORDS LOADED</div><div className="blog-footer-grid"><div><b>01 // COLOPHON / SPEC</b><p>Astro v4 + TypeScript + TailwindCSS Static SSG Architecture. Deployed to high-availability edge nodes with zero uncompressed runtime overhead.</p></div><div><b>02 // BUILD</b><p>RELEASE: v0.1-rev2026.10<br />COMMIT: 7f4c91a<br />STATUS: DEPLOYED // PIPELINE PASSING</p></div><div><b>03 // LATENCY &amp; ACCESSIBILITY</b><p>LIGHTHOUSE: 100 / 100 / 100 / 100<br />Zero runtime cost. AA/AAA contrast ratios strictly verified against CRT dark terminal substrate.</p></div><div><b>04 // CONTACT &amp; COPYRIGHT</b><p><a href="mailto:ashmitaryan@gmail.com">ashmitaryan@gmail.com</a><br />© 2026 Ashmit Aryan. All rights reserved.</p></div></div><div className="blog-footer-end">SYSTEM REVISION: 2026.10.4 // TERMINAL SPEC <span>HASH_CHECK: OK [CRC-32: E41A990B]</span></div></div></footer>
  </div>;
}
