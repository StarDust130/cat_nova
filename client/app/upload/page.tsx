"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type UploadFile = {
  id: string;
  name: string;
  size: string;
  status: "uploading" | "indexed" | "processing";
  progress: number;
};

const formatSize = (bytes: number) => {
  if (!Number.isFinite(bytes)) return "-";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[unit]}`;
};

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const handleNewFiles = useCallback((incoming: FileList | null) => {
    if (!incoming?.length) return;

    const next: UploadFile[] = Array.from(incoming).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(16).slice(2)}`,
      name: file.name,
      size: formatSize(file.size),
      status: "uploading",
      progress: 8,
    }));

    setFiles((prev) => [...next, ...prev].slice(0, 12));

    next.forEach((file) => {
      const tick = () => {
        setFiles((prev) =>
          prev.map((item) => {
            if (item.id !== file.id) return item;
            const bumped = Math.min(item.progress + Math.random() * 30, 100);
            const done = bumped > 98;
            return {
              ...item,
              progress: done ? 100 : bumped,
              status: done ? "indexed" : "processing",
            };
          }),
        );
      };
      setTimeout(tick, 500 + Math.random() * 700);
      setTimeout(tick, 1100 + Math.random() * 800);
      setTimeout(tick, 1900 + Math.random() * 900);
    });
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsHovering(false);
      handleNewFiles(event.dataTransfer.files);
    },
    [handleNewFiles],
  );

  const onInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleNewFiles(event.target.files);
      event.target.value = "";
    },
    [handleNewFiles],
  );

  const allIndexed = useMemo(
    () => files.every((file) => file.status === "indexed"),
    [files],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
      <div className="absolute inset-0 scanline" aria-hidden />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-10 sm:px-8 lg:px-12">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-cyan-400/70 mb-3">
            <span className="h-px w-6 bg-cyan-500/50" />
            Initialize
          </div>
          <h1 className="font-mono text-4xl font-black uppercase text-white">
            Deploy Documents
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-400">
            Drag files to ingestion zone. Format support: PDF, DOCX, TXT, PPT.
            No limits. Secured tunnel.
          </p>
        </div>

        <motion.label
          onDragOver={(e) => {
            e.preventDefault();
            setIsHovering(true);
          }}
          onDragLeave={() => setIsHovering(false)}
          onDrop={onDrop}
          className="glitch-hover relative flex min-h-[320px] flex-col items-center justify-center border border-cyan-500 bg-background/50 p-8 text-center transition"
          animate={{
            scale: isHovering ? 1.01 : 1,
            borderColor: isHovering ? "rgb(76, 194, 255)" : "rgb(34, 89, 130)",
          }}
        >
          <input type="file" multiple className="hidden" onChange={onInput} />
          <div
            className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none"
            aria-hidden
          />
          <div className="relative flex flex-col items-center gap-3">
            <motion.div
              className="h-12 w-12 border-2 border-cyan-500 flex items-center justify-center text-xl text-cyan-400 font-mono"
              animate={
                isHovering ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }
              }
            >
              &gt;&gt;
            </motion.div>
            <div className="text-lg font-semibold uppercase text-white tracking-wide">
              INGESTION ZONE
            </div>
            <p className="max-w-md text-xs text-zinc-400 font-mono">
              Drag &amp; drop files or tap to select. Multi-format supported.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 border border-cyan-900/50 px-3 py-2 text-[11px] uppercase text-cyan-300 tracking-wider">
              ◆ Encrypted tunnel
            </div>
          </div>
        </motion.label>

        <div className="border border-cyan-900/40 bg-background/50 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-cyan-400 mb-4">
            <span>Upload Queue</span>
            <span className="text-zinc-500">
              {files.length
                ? `${files.length} file${files.length > 1 ? "s" : ""}`
                : "—"}
            </span>
          </div>

          <AnimatePresence initial={false}>
            {files.length === 0 && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border border-dashed border-cyan-900/30 bg-black/20 p-4 text-xs text-zinc-500 font-mono"
              >
                No files queued.
              </motion.div>
            )}

            {files.map((file) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-2 border border-cyan-900/30 bg-black/30 p-3 mb-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="text-xs font-semibold text-cyan-300 font-mono">
                    {file.name}
                  </div>
                  <div className="text-[11px] text-zinc-600">{file.size}</div>
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-64">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span>
                      {file.status === "indexed"
                        ? "[INDEXED]"
                        : file.status === "processing"
                          ? "[PROCESSING]"
                          : "[UPLOADING]"}
                    </span>
                    <span className="text-cyan-400">
                      {Math.round(file.progress)}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-cyan-900/30 border border-cyan-900/40">
                    <div
                      className="h-full bg-cyan-500 transition-all duration-200"
                      style={{ width: `${Math.min(file.progress, 100)}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-zinc-500 font-mono">
            All files indexed before chat mode.
          </div>
          <Link
            href="/chat"
            className={
              files.length === 0 || !allIndexed
                ? "border border-cyan-900/30 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-600 cursor-not-allowed"
                : "border border-cyan-500 bg-cyan-500/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-cyan-400 transition hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(76,194,255,0.25)]"
            }
          >
            Proceed to Chat
          </Link>
        </div>
      </section>
    </main>
  );
}
