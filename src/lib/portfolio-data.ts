export type Project = { year: string; title: string; stack: string; domain: string; desc: string; metric?: string; repo: string };
export type StackGroup = { group: string; tag: string; title: string; items: string; focus: string };

// Placeholder payloads — replaced by PORTFOLIO_API_URL responses once linked.
export const placeholderProjects: Project[] = [
  { year: "2025", title: "Distributed Raft Key-Value Store", stack: "Go, Raft Consensus, gRPC, Protobuf", domain: "Distributed Systems", desc: "Log-replicated fault-tolerant storage engine with dynamic membership changes, snapshotting, and leader election semantics. Implements strict serializable consistency guarantees across volatile peer clusters.", repo: "raft-kv" },
  { year: "2024", title: "High-Concurrency Reverse Proxy", stack: "Rust, Tokio Runtime, epoll", domain: "Systems / Network", desc: "Zero-copy async TCP socket forwarding with custom lock-free round-robin balancer and continuous background HTTP/TCP health evaluation. Built to bypass standard user-space memory thrashing under high-cardinality concurrent connections.", metric: "BENCHMARK: Zero memory leaks observed under 50k sustained idle keep-alive streams.", repo: "tokio-proxy" },
  { year: "2024", title: "JHMUN Operations & Delegate Matrix", stack: "TypeScript, Postgres, Redis, Astro", domain: "Operations / Web", desc: "Operational engine orchestrating committee allocations, delegate identity validation, and roll-call ballots for 800+ participants. Features optimistic locking in PostgreSQL to prevent double-booking of international delegacies.", metric: "METRIC: Handled concurrent registration wave with p95 < 35ms on single standard VPS instance.", repo: "jhmun-ops" },
  { year: "2023", title: "Linux Kernel Memory Allocator Visualizer", stack: "C, Linux Kernel, eBPF, Python", domain: "Kernel / Systems", desc: "Real-time instrumentation probing the Linux physical buddy allocator via kprobes. Hooked into __alloc_pages and free_pages to map order-N page coalescing, fragmentation thresholds, and slab allocator caches.", repo: "buddy-trace" },
  { year: "2021", title: "NASA APOD Viewer", stack: "Java, Android SDK, SQLite, Retrofit", domain: "Mobile Client", desc: "Offline-first astronomy explorer consuming NASA Open APIs. Implements strict SQLite write-through local image and metadata caching with lazy network sync.", repo: "nasa-apod" },
];

export const placeholderStack: StackGroup[] = [
  { group: "GROUP 01 // SYSTEMS", tag: "[CORE]", title: "Languages & Runtimes", items: "Go (Golang), Rust, C (POSIX), TypeScript, Python 3, POSIX Shell (Bash/Zsh)", focus: "Goroutine schedulers, memory safety, pointer semantics." },
  { group: "GROUP 02 // NETWORK", tag: "[WIRE]", title: "Distributed & Transport", items: "Raft Consensus, gRPC, Protobuf v3, WebSockets, TCP/IP, eBPF, NGINX", focus: "Streaming sockets, serialization overhead, RPC contracts." },
  { group: "GROUP 03 // STORAGE", tag: "[PERSISTENCE]", title: "Databases & Engines", items: "PostgreSQL, Redis (In-Memory), SQLite, RocksDB (LSM), BadgerDB v4", focus: "Write-ahead logging (WAL), B-Trees, transactional durability." },
  { group: "GROUP 04 // INFRA", tag: "[HOST]", title: "Environment & Tooling", items: "Linux / Arch / Debian, Docker Engine, Kubernetes, Git, GNU Make, GitHub Actions CI", focus: "Reproducible container builds, systemd units, automated tests." },
  { group: "GROUP 05 // CLIENT & RUNTIME", tag: "[SURFACE]", title: "Islands & Render Layers", items: "Astro (Static Architecture), Tailwind CSS, React (zero-bundle islands only), Node.js Runtime", focus: "Zero-JS default payloads, uncompressed HTML delivery, zero hydration bottlenecks." },
];
