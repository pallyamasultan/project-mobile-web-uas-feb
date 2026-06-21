import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LateEntryScreenProps {
  onEnter: () => void;
  onBack: () => void;
}

// ── Types ─────────────────────────────────────────────────────────────────────

type ScanStatus = "idle" | "scanning" | "pass" | "fail";
type Step = "warning" | "code" | "scan" | "privacy" | "blocked";

// ── Countdown hook ────────────────────────────────────────────────────────────

function useTimer(startSeconds: number) {
  const [elapsed, setElapsed] = useState(startSeconds);
  useEffect(() => {
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return `${mins}m ${String(secs).padStart(2, "0")}s`;
}

// ── Step indicator ────────────────────────────────────────────────────────────

const STEPS = ["Peringatan", "Kode Akses", "Pemindaian", "Persetujuan"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 px-6 py-3">
      {STEPS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1" style={{ flexShrink: 0 }}>
              <motion.div
                className="flex items-center justify-center rounded-full"
                animate={{
                  background: done ? "#22c55e" : active ? "#F5C518" : "rgba(255,255,255,0.15)",
                  scale: active ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{ width: 24, height: 24, border: `1.5px solid ${done ? "#22c55e" : active ? "#F5C518" : "rgba(255,255,255,0.2)"}` }}
              >
                {done ? (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span style={{ color: active ? "#0B1E3D" : "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 700 }}>{i + 1}</span>
                )}
              </motion.div>
              <span style={{ color: active ? "#F5C518" : done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)", fontSize: 8, fontWeight: active ? 600 : 400, whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <motion.div
                className="flex-1 mx-1"
                style={{ height: 1.5, marginBottom: 14 }}
                animate={{ background: done ? "#22c55e" : "rgba(255,255,255,0.12)" }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── PIN input ─────────────────────────────────────────────────────────────────

function PinInput({ onComplete, error, onClear }: { onComplete: (pin: string) => void; error: string; onClear: () => void }) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKey = (idx: number, val: string) => {
    if (!/^\d$/.test(val) && val !== "") return;
    onClear();
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
    if (next.every(d => d !== "")) onComplete(next.join(""));
  };

  const handleBackspace = (idx: number) => {
    onClear();
    const next = [...digits];
    if (next[idx]) { next[idx] = ""; setDigits(next); }
    else if (idx > 0) { next[idx - 1] = ""; setDigits(next); inputRefs.current[idx - 1]?.focus(); }
  };

  const clear = () => { setDigits(["", "", "", "", "", ""]); inputRefs.current[0]?.focus(); onClear(); };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2.5 justify-center">
        {digits.map((d, i) => (
          <div key={i} className="relative">
            <input
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleKey(i, e.target.value.slice(-1))}
              onKeyDown={e => { if (e.key === "Backspace") handleBackspace(i); }}
              onFocus={() => inputRefs.current[i]?.select()}
              className="text-center rounded-xl"
              style={{
                width: 44,
                height: 52,
                fontSize: 20,
                fontWeight: 700,
                background: error ? "rgba(239,68,68,0.1)" : d ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.06)",
                border: `2px solid ${error ? "rgba(239,68,68,0.5)" : d ? "rgba(245,197,24,0.5)" : "rgba(255,255,255,0.15)"}`,
                color: error ? "#ef4444" : "#F5C518",
                outline: "none",
                caretColor: "transparent",
              }}
            />
          </div>
        ))}
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#ef4444" strokeWidth="1.2" fill="none"/>
            <path d="M6 4v2.5M6 8v.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{ color: "#ef4444", fontSize: 12 }}>{error}</span>
        </motion.div>
      )}
      {digits.some(d => d) && !error && (
        <button onClick={clear} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 11, cursor: "pointer" }}>
          Hapus
        </button>
      )}
    </div>
  );
}

// ── Mini device scan ──────────────────────────────────────────────────────────

const SCAN_ITEMS = [
  { id: "integrity", label: "Integritas Perangkat" },
  { id: "vpn",       label: "Koneksi VPN / Proxy"   },
  { id: "screen",    label: "Screen Recorder Aktif"  },
  { id: "location",  label: "Validasi Lokasi"        },
];

function DeviceScan({ onDone }: { onDone: (pass: boolean) => void }) {
  const [statuses, setStatuses] = useState<Record<string, ScanStatus>>(
    Object.fromEntries(SCAN_ITEMS.map(i => [i.id, "idle"]))
  );

  useEffect(() => {
    const seq = SCAN_ITEMS.flatMap((item, i) => [
      { delay: 400 + i * 900,  id: item.id, status: "scanning" as ScanStatus },
      { delay: 1100 + i * 900, id: item.id, status: "pass"     as ScanStatus },
    ]);
    const timers = seq.map(({ delay, id, status }) =>
      setTimeout(() => setStatuses(s => ({ ...s, [id]: status })), delay)
    );
    const done = setTimeout(() => onDone(true), 400 + SCAN_ITEMS.length * 900 + 800);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  const icon = (s: ScanStatus) => {
    if (s === "pass") return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="flex items-center justify-center rounded-full"
        style={{ width: 20, height: 20, background: "rgba(34,197,94,0.15)", border: "1.5px solid #22c55e" }}>
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.2 5.5L8 1" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </motion.div>
    );
    if (s === "scanning") return (
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        className="rounded-full" style={{ width: 20, height: 20, border: "1.5px solid rgba(255,255,255,0.1)", borderTop: "1.5px solid #F5C518" }} />
    );
    return <div className="rounded-full" style={{ width: 20, height: 20, border: "1.5px solid rgba(255,255,255,0.15)" }} />;
  };

  const done = Object.values(statuses).filter(s => s === "pass").length;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {SCAN_ITEMS.map((item, i) => (
          <div key={item.id}>
            <div className="flex items-center gap-3 px-4 py-3">
              {icon(statuses[item.id])}
              <span style={{ color: statuses[item.id] === "pass" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)", fontSize: 13, flex: 1 }}>{item.label}</span>
              {statuses[item.id] === "pass" && (
                <span style={{ color: "#22c55e", fontSize: 10, fontWeight: 600 }}>AMAN</span>
              )}
              {statuses[item.id] === "scanning" && (
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: "#F5C518", fontSize: 10 }}>Memeriksa...</motion.span>
              )}
            </div>
            {i < SCAN_ITEMS.length - 1 && <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />}
          </div>
        ))}
      </div>
      {/* Progress */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Pemindaian ulang...</span>
          <span style={{ color: "#F5C518", fontSize: 11, fontWeight: 600 }}>{done}/{SCAN_ITEMS.length}</span>
        </div>
        <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.08)" }}>
          <motion.div className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg,#F5C518,#FFE066)" }}
            animate={{ width: `${(done / SCAN_ITEMS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export function LateEntryScreen({ onEnter, onBack }: LateEntryScreenProps) {
  const [step, setStep]         = useState<Step>("warning");
  const [pinError, setPinError] = useState("");
  const [agreed, setAgreed]     = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const lateTime = useTimer(14 * 60 + 23); // student is 14m 23s late

  const VALID_CODE = "482951"; // supervisor's code

  const stepIndex: Record<Step, number> = {
    warning: 0, code: 1, scan: 2, privacy: 3, blocked: 3,
  };

  const handlePin = (pin: string) => {
    if (pin === VALID_CODE) {
      setTimeout(() => setStep("scan"), 300);
    } else {
      setPinError("Kode tidak valid. Hubungi pengawas ujian.");
    }
  };

  const handleAgree = () => {
    if (!agreed) { setAgreeError(true); return; }
    onEnter();
  };

  return (
    <div className="size-full flex flex-col relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#1a0a00 0%,#2d1200 40%,#1a0505 100%)" }}>

      {/* Ambient bg glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 20%, rgba(239,68,68,0.12) 0%, transparent 60%)" }} />

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 pt-2 pb-1" style={{ zIndex: 10 }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 rounded-xl px-3 py-2"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Kembali</span>
        </button>

        {/* Live late timer */}
        <div className="flex items-center gap-1.5 rounded-xl px-3 py-2"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
          <motion.div className="rounded-full" style={{ width: 6, height: 6, background: "#ef4444" }}
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
          <span style={{ color: "#ef4444", fontSize: 12, fontWeight: 600 }}>Terlambat {lateTime}</span>
        </div>
      </div>

      {/* Step bar */}
      {step !== "blocked" && <StepBar current={stepIndex[step]} />}

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <AnimatePresence mode="wait">

          {/* ═══ STEP 1: WARNING ══════════════════════════════════════════════ */}
          {step === "warning" && (
            <motion.div key="warning"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4">

              {/* Warning icon */}
              <div className="flex flex-col items-center gap-2 pt-2 pb-1">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 80, height: 80, background: "rgba(239,68,68,0.15)", border: "2px solid rgba(239,68,68,0.4)" }}>
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <path d="M19 4L3 33h32L19 4Z" stroke="#ef4444" strokeWidth="2" fill="rgba(239,68,68,0.12)" strokeLinejoin="round"/>
                    <path d="M19 15v9M19 27v1.5" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
                <p style={{ color: "#ef4444", fontSize: 18, fontWeight: 800, textAlign: "center" }}>Akses Terlambat</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
                  Anda mencoba memasuki sesi ujian setelah waktu mulai yang ditentukan.
                </p>
              </div>

              {/* Exam info card */}
              <div className="rounded-2xl p-4 flex flex-col gap-3"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ color: "#F5C518", fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>DETAIL UJIAN</p>
                {[
                  { label: "Mata Kuliah", value: "Akuntansi Manajemen (AKT301)" },
                  { label: "Jadwal Mulai", value: "08:00 WIB" },
                  { label: "Waktu Masuk", value: "08:14 WIB" },
                  { label: "Keterlambatan", value: lateTime, highlight: true },
                  { label: "Sisa Waktu Ujian", value: "1j 45m 37d", warn: true },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between">
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{r.label}</span>
                    <span style={{
                      color: r.highlight ? "#ef4444" : r.warn ? "#f59e0b" : "rgba(255,255,255,0.85)",
                      fontSize: 12, fontWeight: r.highlight || r.warn ? 700 : 500,
                    }}>{r.value}</span>
                  </div>
                ))}
              </div>

              {/* Privacy notice box */}
              <div className="rounded-2xl p-4"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <p style={{ color: "#ef4444", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>⚠️ Catatan Privasi & Keamanan</p>
                <div className="flex flex-col gap-2">
                  {[
                    "Keterlambatan Anda dicatat secara permanen dalam sistem.",
                    "Seluruh aktivitas login dan akses akan direkam dan dilaporkan ke pengawas.",
                    "Waktu ujian Anda tetap berjalan sejak 08:00 WIB dan tidak dapat dikembalikan.",
                    "Anda memerlukan kode akses khusus dari pengawas ujian untuk melanjutkan.",
                    "Pelanggaran privasi selama ujian akan berakibat pembatalan sesi.",
                  ].map((t, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="flex-shrink-0 mt-0.5 rounded-full" style={{ width: 4, height: 4, background: "rgba(239,68,68,0.6)", marginTop: 5 }} />
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, lineHeight: 1.5 }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student identity confirm */}
              <div className="rounded-2xl p-4 flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: 42, height: 42, background: "rgba(245,197,24,0.12)", border: "1px solid rgba(245,197,24,0.2)" }}>
                  <span style={{ color: "#F5C518", fontSize: 15, fontWeight: 800 }}>AF</span>
                </div>
                <div>
                  <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Ahmad Fauzi</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>2024010001 · AKT-4B</p>
                </div>
                <div className="ml-auto flex items-center gap-1 rounded-full px-2 py-1"
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}>
                  <span style={{ color: "#ef4444", fontSize: 9, fontWeight: 600 }}>TERLAMBAT</span>
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep("code")}
                className="w-full flex items-center justify-center gap-2 rounded-2xl"
                style={{ height: 52, background: "linear-gradient(135deg,#991b1b,#dc2626)", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(220,38,38,0.3)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="#fff" strokeWidth="1.4" fill="none"/>
                  <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                </svg>
                <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Masukkan Kode Akses Pengawas</span>
              </motion.button>

              <button onClick={onBack}
                className="w-full flex items-center justify-center rounded-2xl"
                style={{ height: 46, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Batalkan & Kembali ke Dashboard</span>
              </button>
            </motion.div>
          )}

          {/* ═══ STEP 2: CODE INPUT ═══════════════════════════════════════════ */}
          {step === "code" && (
            <motion.div key="code"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-5 pt-2">

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-2xl"
                  style={{ width: 64, height: 64, background: "rgba(245,197,24,0.1)", border: "1.5px solid rgba(245,197,24,0.3)" }}>
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect x="3" y="13" width="24" height="15" rx="3" stroke="#F5C518" strokeWidth="1.8" fill="none"/>
                    <path d="M9 13V9a6 6 0 0 1 12 0v4" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                    <circle cx="15" cy="20.5" r="2" fill="#F5C518"/>
                  </svg>
                </div>
                <p style={{ color: "#fff", fontSize: 16, fontWeight: 700, textAlign: "center" }}>Kode Akses Pengawas</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
                  Minta kode 6-digit kepada pengawas ujian di ruangan untuk melanjutkan masuk.
                </p>
              </div>

              {/* Info strip */}
              <div className="rounded-xl p-3 flex items-center gap-3"
                style={{ background: "rgba(245,197,24,0.07)", border: "1px solid rgba(245,197,24,0.15)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#F5C518" strokeWidth="1.3" fill="none"/>
                  <path d="M8 7v4M8 5.5v.5" stroke="#F5C518" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, lineHeight: 1.5, flex: 1 }}>
                  Kode berlaku hanya untuk sesi ini dan akan kedaluwarsa dalam <span style={{ color: "#F5C518", fontWeight: 600 }}>10 menit</span>. Kode tidak dapat digunakan ulang.
                </p>
              </div>

              <PinInput onComplete={handlePin} error={pinError} onClear={() => setPinError("")} />

              <div className="rounded-xl p-3 flex gap-2"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M7 2L1.5 11.5h11L7 2Z" stroke="#ef4444" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
                  <path d="M7 6v3M7 10v.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <p style={{ color: "rgba(239,68,68,0.8)", fontSize: 10, lineHeight: 1.5 }}>
                  Percobaan kode yang gagal berulang kali akan mengunci akses dan dilaporkan ke pengawas.
                </p>
              </div>

              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, textAlign: "center" }}>
                Kode demo: <span style={{ color: "#F5C518", fontWeight: 600, letterSpacing: 2 }}>482951</span>
              </p>
            </motion.div>
          )}

          {/* ═══ STEP 3: DEVICE SCAN ══════════════════════════════════════════ */}
          {step === "scan" && (
            <motion.div key="scan"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 pt-2">

              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="flex items-center justify-center"
                  style={{ width: 64, height: 64 }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="rgba(245,197,24,0.15)" strokeWidth="2" strokeDasharray="4 4"/>
                    <circle cx="32" cy="32" r="20" stroke="#F5C518" strokeWidth="2" strokeDasharray="12 6" strokeLinecap="round"/>
                    <circle cx="32" cy="32" r="8" fill="rgba(245,197,24,0.15)" stroke="#F5C518" strokeWidth="1.5"/>
                    <circle cx="32" cy="32" r="3" fill="#F5C518"/>
                  </svg>
                </motion.div>
                <p style={{ color: "#fff", fontSize: 16, fontWeight: 700, textAlign: "center" }}>Pemindaian Ulang Perangkat</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
                  Sistem memverifikasi ulang keamanan perangkat sebelum memberikan akses terlambat.
                </p>
              </div>

              <DeviceScan onDone={() => setStep("privacy")} />
            </motion.div>
          )}

          {/* ═══ STEP 4: PRIVACY AGREEMENT ════════════════════════════════════ */}
          {step === "privacy" && (
            <motion.div key="privacy"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 pt-2">

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-2xl"
                  style={{ width: 64, height: 64, background: "rgba(34,197,94,0.1)", border: "1.5px solid rgba(34,197,94,0.3)" }}>
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect x="3" y="4" width="24" height="22" rx="3" stroke="#22c55e" strokeWidth="1.8" fill="none"/>
                    <path d="M8 12h14M8 17h10M8 22h7" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="23" cy="7" r="4" fill="#22c55e"/>
                    <path d="M21 7l1.5 1.5L25 5.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ color: "#fff", fontSize: 16, fontWeight: 700, textAlign: "center" }}>Persetujuan Privasi</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
                  Baca dan setujui pernyataan berikut sebelum memasuki ujian.
                </p>
              </div>

              {/* Late entry log notice */}
              <div className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ color: "#F5C518", fontSize: 11, fontWeight: 700, marginBottom: 10, letterSpacing: 0.5 }}>PERNYATAAN MASUK TERLAMBAT</p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: "🔴", text: "Saya memahami bahwa keterlambatan saya telah dicatat dalam sistem akademik." },
                    { icon: "📹", text: "Saya menyetujui bahwa seluruh aktivitas selama ujian dipantau dan direkam." },
                    { icon: "⏱️", text: "Saya menerima bahwa waktu ujian tidak dapat ditambah akibat keterlambatan saya." },
                    { icon: "🔒", text: "Saya tidak akan melakukan kecurangan dalam bentuk apapun selama ujian berlangsung." },
                    { icon: "📋", text: "Saya bertanggung jawab penuh atas semua aktivitas yang terjadi dalam sesi ujian ini." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <span style={{ fontSize: 13, flexShrink: 0 }}>{item.icon}</span>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, lineHeight: 1.55 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entry log */}
              <div className="rounded-xl p-3 flex flex-col gap-1.5"
                style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <p style={{ color: "rgba(239,68,68,0.8)", fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>LOG MASUK OTOMATIS</p>
                {[
                  { key: "Mahasiswa",    val: "Ahmad Fauzi · 2024010001" },
                  { key: "Waktu Masuk", val: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB" },
                  { key: "Terlambat",   val: lateTime },
                  { key: "Kode Akses",  val: "✓ Terverifikasi oleh Pengawas" },
                  { key: "Perangkat",   val: "✓ Lulus pemindaian keamanan" },
                ].map(r => (
                  <div key={r.key} className="flex items-center justify-between">
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>{r.key}</span>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, fontWeight: 500 }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Agree checkbox */}
              <motion.div
                onClick={() => { setAgreed(v => !v); setAgreeError(false); }}
                className="flex items-center gap-3 rounded-xl p-4 cursor-pointer"
                style={{
                  background: agreed ? "rgba(34,197,94,0.08)" : agreeError ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${agreed ? "rgba(34,197,94,0.35)" : agreeError ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.1)"}`,
                }}
                whileTap={{ scale: 0.98 }}>
                <motion.div
                  className="flex items-center justify-center rounded-md flex-shrink-0"
                  animate={{ background: agreed ? "#22c55e" : "transparent", borderColor: agreed ? "#22c55e" : agreeError ? "#ef4444" : "rgba(255,255,255,0.3)" }}
                  style={{ width: 22, height: 22, border: "1.5px solid rgba(255,255,255,0.3)" }}>
                  {agreed && (
                    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  )}
                </motion.div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, lineHeight: 1.5 }}>
                  Saya telah membaca, memahami, dan <span style={{ color: "#fff", fontWeight: 600 }}>menyetujui</span> seluruh pernyataan di atas.
                </p>
              </motion.div>

              {agreeError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ color: "#ef4444", fontSize: 11, textAlign: "center" }}>
                  Anda harus menyetujui pernyataan untuk melanjutkan.
                </motion.p>
              )}

              <motion.button whileTap={{ scale: 0.97 }} onClick={handleAgree}
                className="w-full flex items-center justify-center gap-2 rounded-2xl"
                style={{
                  height: 52,
                  background: agreed ? "linear-gradient(135deg,#14532d,#16a34a)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${agreed ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)"}`,
                  cursor: "pointer",
                  boxShadow: agreed ? "0 4px 16px rgba(22,163,74,0.3)" : "none",
                }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke={agreed ? "#fff" : "rgba(255,255,255,0.3)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ color: agreed ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 14, fontWeight: 700 }}>
                  Masuk Ujian Sekarang
                </span>
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
