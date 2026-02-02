"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  "Non-linear retrieval",
  "Multi-format indexing",
  "Encrypted channels",
  "Zero-knowledge sessions",
  "Real-time synthesis",
  "Citation grounding",
];

const specs = [
  { label: "Latency", value: "<120ms", unit: "p99" },
  { label: "Throughput", value: "512", unit: "req/s" },
  { label: "Documents", value: "24", unit: "max/session" },
  { label: "Uptime", value: "99.9", unit: "%" },
];

const architecture = [
  { title: "Multi-Format", desc: "PDF, DOCX, TXT, PPT with format-aware parsing" },
  { title: "Zero-Knowledge", desc: "Encrypted channels, no storage, instant revocation" },
  { title: "Real-Time", desc: "Sub-120ms latency, streaming synthesis, live citations" },
  { title: "Deterministic", desc: "Reproducible outputs, grounded generation" },
  { title: "Scalable", desc: "Distributed indexing, GPU acceleration, auto-sharding" },
  { title: "Observable", desc: "Full audit logs, token tracking, confidence scores" },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
      <div className="absolute inset-0 scanline" aria-hidden />

      <header className="sticky top-0 z-50 border-b border-cyan-900/30 bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 border border-cyan-400 flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">CATNOVA</span>
          </div>
          <nav className="hidden gap-6 text-xs font-semibold uppercase tracking-wide text-zinc-400 sm:flex">
            <Link href="#system" className="transition hover:text-cyan-400">
              System
            </Link>
            <Link href="/upload" className="transition hover:text-cyan-400">
              Upload
            </Link>
            <Link href="/chat" className="transition hover:text-cyan-400">
              Chat
            </Link>
          </nav>
          <Link
            href="/upload"
            className="border border-cyan-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-400 transition hover:bg-cyan-500/10 hover:shadow-[0_0_16px_rgba(76,194,255,0.3)]"
          >
            Access
          </Link>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-7xl flex-col px-5 py-16 sm:px-8 lg:px-12" id="system">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-20 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-cyan-400/70">
            <span className="h-px w-8 bg-cyan-500/50" />
            System Ready
          </div>
          <h1 className="max-w-4xl font-mono text-5xl font-black uppercase leading-tight text-white sm:text-6xl lg:text-7xl">
            INTERROGATE YOUR DOCUMENTS.
          </h1>
          <p className="max-w-2xl text-sm text-zinc-300 sm:text-base">
            Classified document intelligence. Extracted knowledge. Real-time synthesis from encrypted channels. No logs. No traces.
          </p>
        </motion.div>

        <div className="mb-20 flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/upload"
              className="border border-cyan-500 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cyan-400 transition hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(76,194,255,0.25)]"
            >
              Initialize Upload
            </Link>
            <Link
              href="/chat"
              className="border border-cyan-900 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-400 transition hover:border-cyan-700 hover:text-cyan-300"
            >
              Explore Chat
            </Link>
          </div>
        </div>

        <div className="mb-20 grid gap-4 border-l border-cyan-900/50 pl-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature} className="text-xs uppercase tracking-widest text-cyan-400">
              ▸ {feature}
            </div>
          ))}
        </div>

        <div className="mb-20 border border-cyan-900/40 bg-background/50 p-6">
          <div className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-wider text-cyan-400/70">
            <span className="h-px w-6 bg-cyan-500/50" />
            Performance Metrics
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {specs.map((item) => (
              <div key={item.label} className="border-l border-cyan-900/30 pl-4">
                <div className="text-xs font-mono uppercase text-zinc-500">{item.label}</div>
                <div className="mt-2 font-mono text-lg font-bold text-cyan-400">
                  {item.value}
                  <span className="ml-1 text-xs text-zinc-500">{item.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 border border-cyan-900/40 bg-background/50 p-6">
          <div className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-wider text-cyan-400/70">
            <span className="h-px w-6 bg-cyan-500/50" />
            Data Flow
          </div>
          <div className="grid gap-4 font-mono text-xs text-zinc-400 sm:grid-cols-3">
            <div className="border-l-2 border-cyan-500/50 pl-4">
              <div className="text-cyan-400">→ INGESTION</div>
              <p className="mt-2">Parallel chunk extraction, vector encoding, secure tokenization</p>
            </div>
            <div className="border-l-2 border-cyan-600/40 pl-4">
              <div className="text-cyan-300">→ INDEXING</div>
              <p className="mt-2">Distributed caching, semantic hashing, citation tracking</p>
            </div>
            <div className="border-l-2 border-cyan-700/30 pl-4">
              <div className="text-cyan-200">→ SYNTHESIS</div>
              <p className="mt-2">LLM pipeline, cross-reference validation, stream output</p>
            </div>
          </div>
        </div>

        <div className="mb-20 border border-cyan-900/40 bg-background/50 p-6">
          <div className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-wider text-cyan-400/70">
            <span className="h-px w-6 bg-cyan-500/50" />
            Architecture
          </div>
          <div className="grid gap-4 text-xs text-zinc-300 sm:grid-cols-2 lg:grid-cols-3">
            {architecture.map((item) => (
              <div key={item.title} className="border border-cyan-900/30 p-4">
                <div className="font-mono font-bold text-cyan-400">{item.title}</div>
                <p className="mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="border border-cyan-500 bg-transparent px-8 py-8 text-center shadow-[0_0_20px_rgba(76,194,255,0.15)]"
        >
          <div className="text-[11px] uppercase tracking-widest text-cyan-400/80">
            Ready for deployment
          </div>
          <h2 className="mt-3 font-mono text-3xl font-black uppercase text-white sm:text-4xl">
            Activate System
          </h2>
          <p className="mt-3 text-sm text-zinc-300">
            Wire your vector store. Plug in your LLM. Deploy classified intelligence.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/upload"
              className="border border-cyan-500 bg-cyan-500/5 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cyan-400 transition hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(76,194,255,0.25)]"
            >
              Initialize
            </Link>
            <Link
              href="/chat"
              className="border border-cyan-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-400 transition hover:border-cyan-700 hover:text-cyan-300"
            >
              Demo
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
