"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Document = {
  id: string;
  name: string;
  status: "indexed" | "processing" | "uploading";
};

const startMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "System initialized. Ready to interrogate documents. Supported operations: semantic search, multi-document synthesis, citation grounding. Awaiting query.",
  },
  {
    id: "2",
    role: "user",
    content: "Summarize the key compliance findings across all documents.",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Processing query across 3 documents. Retrieving relevant passages. Zero-knowledge synthesis active. — Findings: [1] Q1 audit identified 2 critical gaps in access controls. [2] Policy doc revision recommended. [3] Risk assessment escalated. Complete report ready for download.",
  },
];

const docs: Document[] = [
  { id: "1", name: "Q1_Audit_Report.pdf", status: "indexed" },
  { id: "2", name: "Compliance_Policy_2024.docx", status: "indexed" },
  { id: "3", name: "Risk_Assessment.pdf", status: "indexed" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(startMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback(() => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(
      () => {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content:
            "Processing your query. Retrieving from indexed documents. Analyzing and synthesizing results. — Query processed successfully.",
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      },
      1200 + Math.random() * 1200,
    );
  }, [input, isTyping]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
      <div className="absolute inset-0 scanline" aria-hidden />

      <div className="relative flex h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <aside
          className={
            drawerOpen
              ? "fixed inset-0 z-50 flex flex-col border-r border-cyan-900/40 bg-background/95 backdrop-blur-sm lg:static lg:w-64 lg:z-auto lg:bg-transparent lg:border-r lg:border-cyan-900/40"
              : "hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-cyan-900/40 lg:bg-transparent"
          }
        >
          <div className="flex items-center justify-between border-b border-cyan-900/40 px-4 py-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              Documents
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="lg:hidden text-cyan-400 hover:text-cyan-300 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto border-b border-cyan-900/40 px-3 py-4">
            {docs.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="glitch-hover mb-2 border border-cyan-900/30 bg-black/30 px-3 py-2 text-[11px] text-cyan-300 font-mono transition hover:border-cyan-500/50 hover:bg-black/50"
              >
                <div className="truncate">{doc.name}</div>
                <div className="mt-1 text-[10px] text-zinc-600 uppercase">
                  [{doc.status}]
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-cyan-900/40 px-4 py-3">
            <Link
              href="/upload"
              className="block w-full border border-cyan-500 bg-cyan-500/5 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-cyan-400 transition hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(76,194,255,0.2)]"
            >
              Add Documents
            </Link>
          </div>
        </aside>

        {/* Main Chat Area */}
        <section className="relative flex flex-1 flex-col">
          {/* Header */}
          <header className="border-b border-cyan-900/40 px-4 py-3 lg:px-6 lg:py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-mono text-lg font-semibold uppercase text-white">
                  Chat Session
                </h1>
                <p className="mt-1 text-[11px] text-zinc-500 font-mono">
                  {docs.length} documents indexed • Zero-knowledge mode active
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden border border-cyan-500 px-3 py-2 text-xs font-semibold uppercase text-cyan-400 hover:bg-cyan-500/10"
              >
                Docs
              </button>
            </div>
          </header>

          {/* Messages */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto px-4 py-6 lg:px-6 chat-scroll"
          >
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 flex gap-3"
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 h-6 w-6 border border-cyan-500 flex items-center justify-center text-[10px] font-mono text-cyan-400 bg-black/50">
                      ■
                    </div>
                  )}

                  <div
                    className={
                      message.role === "assistant"
                        ? "flex-1 max-w-md lg:max-w-2xl border border-cyan-900/40 bg-black/30 px-4 py-3"
                        : "ml-auto max-w-md lg:max-w-2xl border border-zinc-700 bg-zinc-900/50 px-4 py-3"
                    }
                  >
                    <p
                      className={
                        message.role === "assistant"
                          ? "text-sm leading-relaxed text-zinc-300 font-mono"
                          : "text-sm leading-relaxed text-zinc-300"
                      }
                    >
                      {message.content}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0 h-6 w-6 border border-zinc-600 flex items-center justify-center text-[10px] font-mono text-zinc-400 bg-black/50">
                      ◆
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex gap-3"
              >
                <div className="flex-shrink-0 h-6 w-6 border border-cyan-500 flex items-center justify-center text-[10px] font-mono text-cyan-400 bg-black/50">
                  ■
                </div>
                <div className="border border-cyan-900/40 bg-black/30 px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="h-1.5 w-1.5 bg-cyan-500 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.4,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-cyan-900/40 bg-background/50 px-4 py-4 lg:px-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Query your documents..."
                className="flex-1 border border-cyan-900/40 bg-black/50 px-4 py-3 text-sm text-cyan-300 placeholder-zinc-700 font-mono transition focus:border-cyan-500/60 focus:outline-none focus:bg-black/60"
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || !input.trim()}
                className={
                  isTyping || !input.trim()
                    ? "border border-cyan-900/20 px-4 py-3 text-xs font-semibold uppercase text-zinc-600 cursor-not-allowed"
                    : "border border-cyan-500 bg-cyan-500/5 px-4 py-3 text-xs font-semibold uppercase text-cyan-400 transition hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(76,194,255,0.2)]"
                }
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
