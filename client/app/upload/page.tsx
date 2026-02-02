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
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 pb-16 pt-10 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-200">
              Upload
            </div>
            <h1 className="mt-2 font-heading text-3xl text-white sm:text-4xl">
              Prep your PDFs
            </h1>
            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Drag, drop, and watch them index. Optimized for multi-file,
              touch-friendly interactions.
            </p>
          </div>
          <Link
            href="/chat"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300 hover:text-cyan-200 sm:inline-flex"
          >
            Go to chat →
          </Link>
        </div>

        <motion.label
          onDragOver={(e) => {
            e.preventDefault();
            setIsHovering(true);
          }}
          onDragLeave={() => setIsHovering(false)}
          onDrop={onDrop}
          className="neon-border glass-panel relative flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-cyan-400/40 p-8 text-center shadow-xl transition duration-200"
          animate={{
            scale: isHovering ? 1.01 : 1,
            borderColor: isHovering ? "#5ff5f9" : "rgba(255,255,255,0.2)",
          }}
        >
          <input type="file" multiple className="hidden" onChange={onInput} />
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 via-transparent to-black/30"
            aria-hidden
          />
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl text-cyan-300 shadow-inner">
              ⬆
            </div>
            <div className="text-xl font-semibold text-white">
              Drag & Drop your PDFs
            </div>
            <p className="max-w-md text-sm text-zinc-400">
              Touch-friendly zone with glow feedback. Drop multiple files or tap
              to browse.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-cyan-100">
              Secure session · Local simulation only
            </div>
          </div>
        </motion.label>

        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-sm text-zinc-300">
            <span className="font-semibold text-white">Uploads</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-cyan-200">
              {files.length
                ? `${files.length} file${files.length > 1 ? "s" : ""}`
                : "Waiting for files"}
            </span>
          </div>

          <AnimatePresence initial={false}>
            {files.length === 0 && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-dashed border-white/10 bg-black/30 p-4 text-sm text-zinc-500"
              >
                No files yet — drop your PDFs to begin.
              </motion.div>
            )}

            {files.map((file) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="text-sm font-semibold text-white">
                    {file.name}
                  </div>
                  <div className="text-xs text-zinc-400">{file.size}</div>
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-64">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>
                      {file.status === "indexed"
                        ? "Indexed"
                        : file.status === "processing"
                          ? "Processing"
                          : "Uploading"}
                    </span>
                    <span className="text-cyan-200">
                      {Math.round(file.progress)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500"
                      style={{ width: `${Math.min(file.progress, 100)}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-zinc-400">
            Ready to chat once indexing is done. Status is simulated here.
          </div>
          <Link
            href="/chat"
            className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
              files.length === 0 || !allIndexed
                ? "cursor-not-allowed border border-white/10 text-zinc-500"
                : "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-red-500 text-black shadow-lg shadow-cyan-500/25 hover:scale-[1.01]"
            }`}
            aria-disabled={files.length === 0 || !allIndexed}
          >
            Start Chat
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
