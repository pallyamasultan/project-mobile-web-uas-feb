import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type CheckStatus = "waiting" | "checking" | "pass" | "fail";

interface SecurityItem {
  id: string;
  label: string;
  status: CheckStatus;
}

const INITIAL_ITEMS: SecurityItem[] = [
  { id: "root", label: "Root / Jailbreak", status: "waiting" },
  { id: "rom", label: "Custom ROM", status: "waiting" },
  { id: "devopt", label: "Developer Options", status: "waiting" },
  { id: "usb", label: "USB Debugging", status: "waiting" },
  { id: "clone", label: "Aplikasi Kloningan", status: "waiting" },
];

function StatusIcon({ status }: { status: CheckStatus }) {
  if (status === "pass") {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{ width: 22, height: 22, background: "rgba(34,197,94,0.15)", border: "1.5px solid #22c55e" }}
      >
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    );
  }
  if (status === "fail") {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{ width: 22, height: 22, background: "rgba(239,68,68,0.15)", border: "1.5px solid #ef4444" }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2L8 8M8 2L2 8" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </motion.div>
    );
  }
  if (status === "checking") {
    return (
      <motion.div
        className="flex-shrink-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="rounded-full"
          style={{
            width: 22,
            height: 22,
            border: "1.5px solid rgba(255,255,255,0.1)",
            borderTop: "1.5px solid #F5C518",
          }}
        />
      </motion.div>
    );
  }
  // waiting
  return (
    <div
      className="rounded-full flex-shrink-0"
      style={{ width: 22, height: 22, border: "1.5px solid rgba(255,255,255,0.2)" }}
    />
  );
}

function StatusText({ status }: { status: CheckStatus }) {
  const map: Record<CheckStatus, { text: string; color: string }> = {
    waiting: { text: "Menunggu", color: "rgba(255,255,255,0.3)" },
    checking: { text: "Memeriksa...", color: "#F5C518" },
    pass: { text: "Tidak Terdeteksi", color: "#22c55e" },
    fail: { text: "Terdeteksi!", color: "#ef4444" },
  };
  const { text, color } = map[status];
  return <span style={{ color, fontSize: 11 }}>{text}</span>;
}

function ShieldAnimation({ progress }: { progress: number }) {
  const isComplete = progress >= 40;

  return (
    <div className="flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
        {/* Outer pulse rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ border: "1px solid rgba(245,197,24,0.3)" }}
            initial={{ width: 60, height: 60, opacity: 0.8 }}
            animate={{ width: 60 + i * 28, height: 60 + i * 28, opacity: 0 }}
            transition={{
              duration: 2,
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Shield body */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ scale: isComplete ? [1, 1.08, 1] : 1 }}
          transition={{ duration: 0.4 }}
        >
          <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
            <path
              d="M36 4L8 14V38C8 56 36 76 36 76C36 76 64 56 64 38V14L36 4Z"
              fill="url(#shieldGrad)"
              stroke="url(#shieldStroke)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="shieldGrad" x1="8" y1="4" x2="64" y2="76" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1a3a6e" />
                <stop offset="1" stopColor="#0e2550" />
              </linearGradient>
              <linearGradient id="shieldStroke" x1="8" y1="4" x2="64" y2="76" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5C518" />
                <stop offset="1" stopColor="#B8860B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Icon inside shield */}
          <div className="absolute flex items-center justify-center">
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z"
                fill="rgba(245,197,24,0.15)"
                stroke="#F5C518"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M9 12L11 14L15 10" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function SecurityScreen({ onNext }: { onNext: () => void }) {
  const [items, setItems] = useState<SecurityItem[]>(INITIAL_ITEMS);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sequence = [
      { delay: 300,  id: "root",   status: "checking" as CheckStatus },
      { delay: 1000, id: "root",   status: "pass"     as CheckStatus },
      { delay: 1200, id: "rom",    status: "checking" as CheckStatus },
      { delay: 1900, id: "rom",    status: "pass"     as CheckStatus },
      { delay: 2100, id: "devopt", status: "checking" as CheckStatus },
      { delay: 2800, id: "devopt", status: "pass"     as CheckStatus },
      { delay: 3000, id: "usb",    status: "checking" as CheckStatus },
      { delay: 3700, id: "usb",    status: "pass"     as CheckStatus },
      { delay: 3900, id: "clone",  status: "checking" as CheckStatus },
      { delay: 4600, id: "clone",  status: "pass"     as CheckStatus },
    ];

    const timers = sequence.map(({ delay, id, status }) =>
      setTimeout(() => {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
      }, delay)
    );

    // Progress bar to 100% then auto-advance
    let p = 0;
    const pInterval = setInterval(() => {
      p += 1;
      setProgress(p);
      if (p >= 100) clearInterval(pInterval);
    }, 50);

    const advance = setTimeout(() => onNext(), 5400);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(pInterval);
      clearTimeout(advance);
    };
  }, []);

  return (
    <div
      className="size-full flex flex-col px-5 py-10 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0B1E3D 0%, #091629 60%, #060F1E 100%)" }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col items-center gap-1 mb-6"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div style={{ fontSize: 20 }}>🔒</div>
          <p style={{ color: "#ffffff", fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
            PEMERIKSAAN KEAMANAN
          </p>
        </div>
        <div
          className="w-full"
          style={{ height: 1, background: "rgba(255,255,255,0.1)" }}
        />
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textAlign: "center" }}>
          Sistem sedang memverifikasi integritas perangkat Anda...
        </p>
      </motion.div>

      {/* Shield animation */}
      <motion.div
        className="flex justify-center mb-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div
          className="rounded-2xl flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            width: "100%",
            padding: "16px 0",
          }}
        >
          <ShieldAnimation progress={progress} />
        </div>
      </motion.div>

      {/* Checklist */}
      <motion.div
        className="flex flex-col gap-1 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 6 }}>
          Checklist Keamanan:
        </p>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {items.map((item, idx) => (
            <div key={item.id}>
              <div className="flex items-center gap-3 px-4 py-3">
                <StatusIcon status={item.status} />
                <div className="flex-1">
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>
                    {item.label}
                  </p>
                  <StatusText status={item.status} />
                </div>
              </div>
              {idx < items.length - 1 && (
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginLeft: 16 }} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-full flex flex-col gap-1.5 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Pemeriksaan keamanan...</p>
          <p style={{ color: "#F5C518", fontSize: 11, fontWeight: 600 }}>{progress}%</p>
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 5, background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #B8860B, #F5C518, #FFE066)",
              boxShadow: "0 0 8px rgba(245,197,24,0.5)",
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
