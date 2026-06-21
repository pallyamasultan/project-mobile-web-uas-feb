import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const CHECKLIST = [
  { id: "firebase", label: "Firebase SDK" },
  { id: "internet", label: "Koneksi Internet" },
  { id: "integrity", label: "Memeriksa Integritas" },
];

export function SplashScreen({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [visibleChecklist, setVisibleChecklist] = useState<string[]>([]);

  useEffect(() => {
    // Animate progress bar to 35%
    const progressTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 35) { clearInterval(interval); return 35; }
          return p + 1;
        });
      }, 30);
    }, 800);

    // Show checklist items
    const t1 = setTimeout(() => setVisibleChecklist(["firebase"]), 600);
    const t2 = setTimeout(() => setVisibleChecklist(["firebase", "internet"]), 900);
    const t3 = setTimeout(() => setVisibleChecklist(["firebase", "internet", "integrity"]), 1200);

    // Check first item
    const c1 = setTimeout(() => setCheckedItems(["firebase"]), 1800);

    // Auto-advance
    const advance = setTimeout(() => onNext(), 4000);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(c1);
      clearTimeout(advance);
    };
  }, []);

  return (
    <div
      className="size-full flex flex-col items-center justify-between py-12 px-6 relative"
      style={{ background: "linear-gradient(160deg, #0B1E3D 0%, #091629 60%, #060F1E 100%)" }}
    >
      {/* Star dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Top spacer */}
      <div className="flex-1" />

      {/* Logo + Title */}
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Logo container */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 140, height: 140 }}
        >
          {/* Outer ring glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)",
            }}
          />
          {/* Logo card */}
          <div
            className="relative flex flex-col items-center justify-center rounded-2xl"
            style={{
              width: 110,
              height: 110,
              background: "linear-gradient(135deg, #1a3a6e 0%, #0e2550 100%)",
              border: "2px solid rgba(234,179,8,0.6)",
              boxShadow: "0 0 24px rgba(234,179,8,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Decorative top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, #B8860B, #F5C518, #B8860B)" }}
            />
            {/* FEB text */}
            <div
              style={{
                color: "#F5C518",
                fontFamily: "serif",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 3,
                lineHeight: 1,
              }}
            >
              FEB
            </div>
            {/* Divider */}
            <div
              className="my-1.5"
              style={{ width: 50, height: 1, background: "rgba(245,197,24,0.5)" }}
            />
            {/* UNSAP text */}
            <div
              style={{
                color: "#F5C518",
                fontFamily: "serif",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
                lineHeight: 1,
              }}
            >
              UNSAP
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            Ujian Akhir Semester
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              letterSpacing: 0.5,
            }}
          >
            Fakultas Ekonomi &amp; Bisnis
          </p>
        </div>
      </motion.div>

      <div className="flex-1" />

      {/* Progress + Checklist */}
      <motion.div
        className="w-full flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {/* Progress bar section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, letterSpacing: 0.3 }}>
              Menginisialisasi sistem...
            </p>
            <p style={{ color: "#F5C518", fontSize: 12, fontWeight: 600 }}>
              {progress}%
            </p>
          </div>
          {/* Track */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 6, background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #B8860B, #F5C518, #FFE066)",
                boxShadow: "0 0 8px rgba(245,197,24,0.6)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </div>

        {/* Checklist card */}
        <div
          className="w-full rounded-2xl p-4 flex flex-col gap-2.5"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <AnimatePresence>
            {CHECKLIST.map((item) => {
              const isVisible = visibleChecklist.includes(item.id);
              const isChecked = checkedItems.includes(item.id);

              if (!isVisible) return null;

              return (
                <motion.div
                  key={item.id}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Status icon */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: 20, height: 20 }}
                  >
                    {isChecked ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="flex items-center justify-center rounded-full"
                        style={{ width: 20, height: 20, background: "rgba(34,197,94,0.2)", border: "1.5px solid #22c55e" }}
                      >
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div
                        className="rounded-full"
                        style={{
                          width: 20,
                          height: 20,
                          border: "1.5px solid rgba(255,255,255,0.3)",
                          background: "transparent",
                        }}
                      />
                    )}
                  </div>
                  {/* Label */}
                  <p
                    style={{
                      color: isChecked ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                      fontSize: 13,
                      fontWeight: isChecked ? 500 : 400,
                      transition: "color 0.3s",
                    }}
                  >
                    {item.label}
                  </p>
                  {/* Loading spinner for unchecked visible items */}
                  {!isChecked && (
                    <motion.div
                      className="ml-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        <path d="M6 1.5A4.5 4.5 0 0 1 10.5 6" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-4"
        style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, letterSpacing: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        v1.0.0
      </motion.p>
    </div>
  );
}
