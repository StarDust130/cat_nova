"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Upload", href: "/upload" },
  { label: "Chat", href: "/chat" },
  { label: "Docs", href: "#faq" },
];

const featureItems = [
  {
    title: "Ultra-fast RAG",
    description:
      "Chunk, embed, and stream answers without waiting minutes for indexing.",
  },
  {
    title: "PDF-native chat",
    description:
      "Follow-up questions stay grounded to citations, tables, and figures.",
  },
  {
    title: "Secure by default",
    description:
      "Isolated sessions with on-device encryption and instant revocation.",
  },
  {
    title: "Markdown-perfect",
    description:
      "Tables, code blocks, and latex render beautifully without broken layouts.",
  },
  {
    title: "Voice-ready",
    description:
      "Mic input and TTS hooks prepared for hands-free review on mobile.",
  },
  {
    title: "Session aware",
    description:
      "Context sticks across follow-ups with smart windowing + recency bias.",
  },
];

const steps = [
  {
    title: "Drop PDFs",
    detail: "Upload multiple docs or drag directly from your files.",
  },
  {
    title: "We index",
    detail: "We vectorize + cache in seconds. No manual setup.",
  },
  {
    title: "Start chatting",
    detail: "Ask, summarize, extract — the assistant cites every answer.",
  },
];

const stats = [
  { label: "Latency", value: "120ms p99" },
  { label: "Docs / session", value: "24" },
  { label: "Citations", value: "100%" },
  { label: "Mobile NPS", value: "74" },
];

const faq = [
  {
    q: "Is this production-ready?",
    a: "This is a fully client-side experience with mocked APIs. Swap the data layer with your RAG stack and keep the same UI behaviors.",
  },
  {
    q: "Do you stream tokens?",
    a: "Yes. The demo simulates streaming; connect to SSE or websockets and reuse the typing indicator + AI bubble components.",
  },
  {
    q: "Mobile support?",
    a: "Built mobile-first with large hit targets, bottom input, and drawer sidebar for documents.",
  },
  {
    q: "Security posture?",
    a: "Session scoping, quick revoke, and status chips are baked into the UI so you can map to your auth model.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,77,103,0.08),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(95,245,249,0.08),transparent_22%),radial-gradient(circle_at_70%_70%,rgba(244,91,255,0.1),transparent_26%)]"
        aria-hidden
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-20 pt-8 sm:px-8 lg:px-12">
        <header className="sticky top-0 z-20 mb-6 bg-background/60 backdrop-blur">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="neon-border glass-panel flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-semibold text-cyan-200">
                CN
              </div>
              <div>
                <div className="text-sm font-semibold text-white">CatNova</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  PDF Intelligence
                </div>
              </div>
            </div>
            <nav className="hidden items-center gap-5 text-sm text-zinc-300 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-cyan-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/upload"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-cyan-500/20"
            >
              <span
                className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500 opacity-60"
                aria-hidden
              />
              <span className="relative">Launch</span>
              <span className="relative text-lg leading-none">↗</span>
            </Link>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between gap-4"
        >
          <div className="glass-panel neon-border rounded-full px-4 py-2 text-sm text-cyan-200">
            CatNova OS · Realtime PDF chat
          </div>
          <div className="hidden text-xs uppercase tracking-[0.2em] text-zinc-400 sm:block">
            Alpha channel
          </div>
        </motion.div>

        <div
          className="relative mt-10 grid gap-12 lg:grid-cols-[1.15fr,0.85fr]"
          id="product"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-200">
              <span className="h-[1px] w-12 bg-cyan-300" />
              Instant answers from your PDFs
            </div>
            <h1
              className="font-heading text-4xl leading-tight text-white sm:text-5xl sm:leading-tight lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Chat with your PDFs. Instantly.
            </h1>
            <p className="max-w-xl text-lg text-zinc-300 sm:text-xl">
              Drop any document. CatNova ingests, vectors, and streams answers
              in seconds — with neon-grade precision, citations, and
              code-friendly markdown.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/upload"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500 px-6 py-3 text-base font-semibold text-black shadow-lg shadow-cyan-500/20 transition-transform duration-150 hover:scale-[1.01]"
              >
                <span
                  className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500 opacity-60"
                  aria-hidden
                />
                <span className="relative">Upload PDFs</span>
                <span className="relative ml-2 text-sm">→</span>
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Try Demo
                <span className="text-lg">⟶</span>
              </Link>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg sm:grid-cols-2 lg:grid-cols-3">
              {featureItems.slice(0, 6).map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 rounded-xl border border-white/5 bg-black/30 p-4"
                >
                  <div className="text-sm uppercase tracking-wide text-cyan-200">
                    {item.title}
                  </div>
                  <p className="text-sm text-zinc-300">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            className="glass-panel neon-border glow-shadow relative h-full rounded-3xl border border-white/10 p-6"
          >
            <div
              className="absolute inset-px rounded-[26px] border border-white/10"
              aria-hidden
            />
            <div
              className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -right-10 bottom-10 h-44 w-44 rounded-full bg-fuchsia-500/20 blur-3xl"
              aria-hidden
            />
            <div className="relative flex flex-col gap-5">
              <div className="flex items-center justify-between text-sm text-zinc-300">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                  Realtime Indexer
                </span>
                <span className="text-xs uppercase text-cyan-200">Live</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-inner">
                <div className="flex items-center justify-between text-sm text-zinc-300">
                  <span>Status · 3 PDFs</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 text-[11px] text-cyan-200">
                    <span className="h-2 w-2 animate-ping rounded-full bg-cyan-300" />
                    Streaming
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  {[
                    "Quarterly_report.pdf",
                    "Pricing_deck.pdf",
                    "API_reference.pdf",
                  ].map((file, idx) => (
                    <div
                      key={file}
                      className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                    >
                      <div className="text-sm text-white">{file}</div>
                      <div className="flex items-center gap-2 text-xs text-cyan-200">
                        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                          <span
                            className="block h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500"
                            style={{ width: `${70 + idx * 10}%` }}
                          />
                        </span>
                        {70 + idx * 10}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-zinc-200">
                  <span>Answer preview</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-cyan-200">
                    Cited
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-300">
                  “Section 4.2 confirms the rollout cost at $48k with a 3.2x ROI
                  in Q2. See Figure 7 for latency benchmarks.”
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Grounded answer
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          className="mt-14 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          id="metrics"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">
              Signals
            </div>
            <div className="text-xs text-zinc-400">
              Mobile-first · Streaming UI · Cyberpunk grid
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="glass-panel neon-border relative overflow-hidden rounded-2xl border border-white/10 px-4 py-4"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                  {item.label}
                </div>
                <div className="mt-2 text-xl font-semibold text-white">
                  {item.value}
                </div>
                <div
                  className="absolute right-3 top-3 h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400/15 to-fuchsia-500/15 blur-xl"
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr,1.1fr]" id="demo">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass-panel neon-border relative rounded-3xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-200">
                Live preview
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                Synced
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>User · APAC rollout</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-cyan-200">
                    live
                  </span>
                </div>
                <p className="mt-2 text-zinc-100">
                  “Generate a 3-bullet exec summary with costs and risks.”
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>AI · cited</span>
                  <span className="flex items-center gap-2 text-[11px] text-emerald-200">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                    streaming
                  </span>
                </div>
                <div className="mt-2 space-y-2 text-sm text-zinc-100">
                  <p>
                    - Budget: $48k rollout, expected ROI 3.2x in Q2 (Fig 7).
                  </p>
                  <p>- Latency: 120ms p99 with CDN warmup, aligns with SLO.</p>
                  <p>
                    - Risks: vendor signature pending; security appendix
                    redlines.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-cyan-200">
                <span className="rounded-full border border-cyan-300/30 bg-white/5 px-3 py-1">
                  Code blocks
                </span>
                <span className="rounded-full border border-cyan-300/30 bg-white/5 px-3 py-1">
                  Tables
                </span>
                <span className="rounded-full border border-cyan-300/30 bg-white/5 px-3 py-1">
                  Citations
                </span>
                <span className="rounded-full border border-cyan-300/30 bg-white/5 px-3 py-1">
                  Follow-ups
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">
                Pipeline
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <div className="loader-cyber h-8 w-8" aria-hidden />
                <span>GPU ready</span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="glass-panel neon-border relative rounded-2xl border border-white/10 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400/70 to-fuchsia-500/70 text-sm font-semibold text-black">
                      {idx + 1}
                    </span>
                    <div className="text-base font-semibold text-white">
                      {step.title}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">{step.detail}</p>
                  <div
                    className="absolute right-4 top-4 h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 blur-xl"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm text-zinc-300">
              Edge cases covered: multi-file drop, mobile-safe buttons,
              low-bandwidth feedback, and graceful fallback for slow uploads.
            </div>
          </motion.div>
        </div>

        <div
          className="mt-14 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          id="feature-grid"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">
              Stacks ready
            </div>
            <div className="text-xs text-zinc-400">
              Hook to your vector store + LLM of choice
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((item) => (
              <div
                key={item.title}
                className="glass-panel neon-border flex flex-col gap-2 rounded-2xl border border-white/10 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">
                    {item.title}
                  </div>
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(95,245,249,0.7)]" />
                </div>
                <p className="text-sm text-zinc-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-14 grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-black/40 to-white/5 p-6 backdrop-blur"
          id="faq"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">
                FAQ
              </div>
              <div className="text-2xl font-semibold text-white">
                Build confidence fast
              </div>
            </div>
            <Link
              href="/upload"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Upload now →
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {faq.map((item) => (
              <div
                key={item.q}
                className="glass-panel neon-border rounded-2xl border border-white/10 p-4"
              >
                <div className="text-sm font-semibold text-white">{item.q}</div>
                <p className="mt-2 text-sm text-zinc-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-red-500/20 p-6 text-center shadow-lg"
        >
          <div className="text-sm uppercase tracking-[0.28em] text-cyan-100">
            Ready
          </div>
          <div className="mt-2 text-3xl font-semibold text-white">
            Ship a real AI PDF copilot
          </div>
          <p className="mt-2 text-sm text-zinc-200">
            Wire up your RAG endpoints, keep the UI. Built for investors,
            operators, and customers who demand premium polish.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/upload"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500 px-6 py-3 text-base font-semibold text-black shadow-lg shadow-cyan-500/20"
            >
              <span
                className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500 opacity-60"
                aria-hidden
              />
              <span className="relative">Upload now</span>
              <span className="relative ml-2">↗</span>
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Try the chat
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
