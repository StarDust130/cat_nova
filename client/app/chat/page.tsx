"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const documents = [
  { name: "Quarterly_Report.pdf", status: "Indexed" },
  { name: "Pricing_deck.pdf", status: "Processing" },
  { name: "API_reference.pdf", status: "Indexed" },
];

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Summarize the rollout plan and highlight blockers for APAC.",
  },
  {
    id: "2",
    role: "ai",
    content:
      "Here is a concise summary:\n\n- Rollout window: Q2, staged by region with fallback to Q3.\n- Infra: latency target 120ms p99; CDN warmup scheduled.\n- Blockers: pending vendor signature (Figure 2.4) and two redlines in Security Appendix.\n\nCan I draft stakeholder updates?",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID ? crypto.randomUUID() : `ai-${Date.now()}`,
        role: "ai",
        content:
          "Drafting response... This is a mock reply with citations: [Section 3.1], [Table 7]. In production, this would stream token-by-token with markdown and code blocks supported.",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-b from-black/80 via-black/70 to-black/90">
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-5 px-4 pb-28 pt-8 sm:px-8">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="glass-panel neon-border flex h-full flex-col gap-4 rounded-3xl border border-white/10 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-200">
              Documents
            </div>
            <div className="flex flex-col gap-3">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-3 text-sm text-white"
                >
                  <div className="truncate">{doc.name}</div>
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                      doc.status === "Indexed"
                        ? "bg-emerald-500/20 text-emerald-200"
                        : "bg-amber-500/20 text-amber-100"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat */}
        <section className="glass-panel neon-border relative flex w-full flex-col rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                Chat
              </div>
              <div className="text-lg font-semibold text-white">
                AI PDF Copilot
              </div>
            </div>
            <button
              className="md:hidden rounded-full border border-white/15 px-3 py-1 text-xs text-cyan-100"
              onClick={() => setDrawerOpen(true)}
            >
              Docs
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {documents.map((doc) => (
              <span
                key={doc.name}
                className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-zinc-200"
              >
                {doc.name}
              </span>
            ))}
          </div>

          <div className="chat-scroll relative mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg sm:max-w-[80%] ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-cyan-500/70 to-fuchsia-500/70 text-black"
                        : "glass-panel border border-white/10 bg-black/50 text-zinc-100"
                    }`}
                  >
                    {message.content.split("\n").map((line, idx) => (
                      <p key={idx} className="mb-1 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-cyan-100">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400 delay-100" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-400 delay-200" />
                </div>
                AI drafting...
              </div>
            )}
          </div>

          <div className="sticky bottom-0 left-0 right-0 mt-4 rounded-2xl border border-white/10 bg-black/60 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about your PDFs..."
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-300"
              />
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={sendMessage}
                className="relative inline-flex h-12 w-28 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500 text-sm font-semibold text-black shadow-lg shadow-cyan-500/25"
              >
                <span
                  className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500 opacity-70"
                  aria-hidden
                />
                <span className="relative">Send</span>
              </motion.button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Markdown, code blocks, and citations supported.</span>
              <span>Streaming simulated.</span>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur"
            onClick={() => setDrawerOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl border border-white/10 bg-black/90 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-white">
                  Documents
                </div>
                <button
                  className="text-xs text-cyan-200"
                  onClick={() => setDrawerOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white"
                  >
                    <span className="truncate">{doc.name}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                        doc.status === "Indexed"
                          ? "bg-emerald-500/20 text-emerald-200"
                          : "bg-amber-500/20 text-amber-100"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
