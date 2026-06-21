import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Types ─────────────────────────────────────────────────────────────────────

type QuestionStatus = "answered" | "flagged" | "empty" | "active";

interface Question {
  id: number;
  type: string;
  points: number;
  text: string;
  hasImage: boolean;
  answer: string;
  status: QuestionStatus;
}

// ── Initial data ──────────────────────────────────────────────────────────────

const INITIAL_QUESTIONS: Question[] = [
  {
    id: 1, type: "Analisis", points: 20,
    text: "Jelaskan perbedaan antara akuntansi keuangan dan akuntansi manajemen, serta berikan contoh penggunaan masing-masing dalam konteks perusahaan manufaktur.",
    hasImage: false, answer: "Akuntansi keuangan berfokus pada pelaporan eksternal kepada investor dan kreditur, sedangkan akuntansi manajemen ditujukan untuk pengambilan keputusan internal.", status: "answered",
  },
  {
    id: 2, type: "Pemahaman", points: 15,
    text: "Uraikan konsep nilai waktu dari uang (time value of money) dan bagaimana konsep tersebut diterapkan dalam keputusan investasi jangka panjang perusahaan.",
    hasImage: false, answer: "Nilai waktu uang adalah konsep bahwa uang yang dimiliki saat ini lebih bernilai dibandingkan jumlah yang sama di masa depan karena potensi penghasilannya.", status: "answered",
  },
  {
    id: 3, type: "Analisis", points: 25,
    text: "Berdasarkan data laporan keuangan PT ABC tahun 2025, analisislah rasio likuiditas perusahaan dan berikan rekomendasi strategis untuk meningkatkan posisi keuangan perusahaan di tahun 2026.",
    hasImage: true, answer: "", status: "active",
  },
  {
    id: 4, type: "Evaluasi", points: 20,
    text: "Evaluasi dampak kebijakan dividen terhadap nilai perusahaan berdasarkan teori Modigliani-Miller dan relevansinya dalam kondisi pasar tidak sempurna.",
    hasImage: false, answer: "", status: "empty",
  },
  {
    id: 5, type: "Sintesis", points: 20,
    text: "Susun analisis SWOT keuangan dari data yang disediakan dan rekomendasikan strategi keuangan terbaik untuk periode 2026–2028.",
    hasImage: false, answer: "", status: "empty",
  },
];

// ── Utility ───────────────────────────────────────────────────────────────────

function countWords(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ── Watermark ─────────────────────────────────────────────────────────────────

function Watermark() {
  const text = "Ahmad Fauzi  ·  2024010001  ·  14/06/2026";
  const rows = 12;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          className="flex"
          style={{
            position: "absolute",
            top: row * 72,
            left: -60,
            right: -60,
            transform: "rotate(-22deg)",
            transformOrigin: "center",
            whiteSpace: "nowrap",
            gap: 0,
          }}
        >
          {Array.from({ length: 4 }).map((_, col) => (
            <span
              key={col}
              style={{
                color: "rgba(11,30,61,0.07)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                paddingRight: 48,
                userSelect: "none",
              }}
            >
              {text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Calculator overlay ────────────────────────────────────────────────────────

function Calculator({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");

  const press = (val: string) => {
    if (val === "AC") { setDisplay("0"); setExpr(""); return; }
    if (val === "⌫") {
      setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
      return;
    }
    if (val === "=") {
      try {
        const result = Function(`"use strict"; return (${expr || display})`)();
        setDisplay(String(parseFloat(result.toFixed(8))));
        setExpr("");
      } catch { setDisplay("Err"); setExpr(""); }
      return;
    }
    const ops = ["+", "−", "×", "÷", "%"];
    if (ops.includes(val)) {
      const opMap: Record<string, string> = { "−": "-", "×": "*", "÷": "/" };
      setExpr((display === "0" ? "" : display) + (opMap[val] || val));
      setDisplay("0");
      return;
    }
    setDisplay((d) => {
      if (d === "0" && val !== ".") return val;
      if (val === "." && d.includes(".")) return d;
      return d + val;
    });
  };

  const rows = [
    ["sin", "cos", "tan", "√"],
    ["x²", "xⁿ", "(", ")"],
    ["AC", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "±", "="],
  ];

  const isOp = (k: string) => ["÷", "×", "−", "+", "="].includes(k);
  const isFn = (k: string) => ["sin", "cos", "tan", "√", "x²", "xⁿ", "(", ")", "AC", "⌫", "%"].includes(k);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.22 }}
      className="absolute bottom-20 right-4 rounded-2xl overflow-hidden"
      style={{
        width: 220,
        zIndex: 50,
        background: "rgba(11,18,35,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600 }}>Kalkulator</span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1 }}>×</button>
      </div>
      {/* Display */}
      <div className="px-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {expr && <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, textAlign: "right", marginBottom: 2 }}>{expr}</div>}
        <div style={{ color: "#F5C518", fontSize: 22, fontWeight: 700, textAlign: "right", letterSpacing: 1 }}>{display}</div>
      </div>
      {/* Keys */}
      <div className="p-2 grid gap-1.5" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {rows.flat().map((k, i) => (
          <button
            key={i}
            onClick={() => press(k)}
            className="rounded-xl flex items-center justify-center"
            style={{
              height: 36,
              fontSize: k.length > 1 ? 9 : 13,
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              background: isOp(k)
                ? "rgba(245,197,24,0.18)"
                : isFn(k)
                ? "rgba(255,255,255,0.07)"
                : "rgba(255,255,255,0.1)",
              color: isOp(k) ? "#F5C518" : isFn(k) ? "rgba(255,255,255,0.6)" : "#ffffff",
            }}
          >
            {k}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ── Soal Nav overlay ──────────────────────────────────────────────────────────

function QuestionNavOverlay({
  questions,
  current,
  onSelect,
  onClose,
}: {
  questions: Question[];
  current: number;
  onSelect: (id: number) => void;
  onClose: () => void;
}) {
  const answered = questions.filter((q) => q.answer.trim()).length;

  const bgMap: Record<QuestionStatus, string> = {
    answered: "rgba(34,197,94,0.18)",
    flagged: "rgba(245,158,11,0.18)",
    active: "rgba(29,78,216,0.25)",
    empty: "rgba(148,163,184,0.1)",
  };
  const borderMap: Record<QuestionStatus, string> = {
    answered: "#22c55e",
    flagged: "#f59e0b",
    active: "#3b82f6",
    empty: "rgba(148,163,184,0.25)",
  };
  const textMap: Record<QuestionStatus, string> = {
    answered: "#22c55e",
    flagged: "#f59e0b",
    active: "#60a5fa",
    empty: "#94a3b8",
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.55)", zIndex: 40, backdropFilter: "blur(2px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full rounded-t-3xl p-5"
        style={{
          background: "rgba(13,22,42,0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "none",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
        }}
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        exit={{ y: 60 }}
        transition={{ type: "spring", stiffness: 340, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <p style={{ color: "#ffffff", fontSize: 14, fontWeight: 700 }}>📋 Navigasi Soal</p>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, width: 28, height: 28, cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 14 }}>×</button>
        </div>

        <div className="grid gap-2.5 mb-4" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
          {questions.map((q) => {
            const st: QuestionStatus = q.id === current ? "active" : q.answer.trim() ? "answered" : q.status === "flagged" ? "flagged" : "empty";
            return (
              <button
                key={q.id}
                onClick={() => { onSelect(q.id); onClose(); }}
                className="rounded-xl flex flex-col items-center justify-center gap-0.5"
                style={{
                  height: 48,
                  background: bgMap[st],
                  border: `1.5px solid ${borderMap[st]}`,
                  cursor: "pointer",
                }}
              >
                <span style={{ color: textMap[st], fontSize: 14, fontWeight: 700 }}>{q.id}</span>
                <span style={{ color: textMap[st], fontSize: 8, opacity: 0.8 }}>{q.points}pt</span>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4">
          {[
            { color: "#22c55e", label: `Terjawab (${questions.filter(q => q.answer.trim()).length})` },
            { color: "#f59e0b", label: `Ditandai (${questions.filter(q => q.status === "flagged").length})` },
            { color: "#94a3b8", label: `Kosong (${questions.filter(q => !q.answer.trim() && q.status !== "flagged").length})` },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="rounded-full" style={{ width: 8, height: 8, background: l.color }} />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Progress jawaban</span>
            <span style={{ color: "#F5C518", fontSize: 11, fontWeight: 600 }}>{answered} / {questions.length} soal</span>
          </div>
          <div className="w-full rounded-full overflow-hidden" style={{ height: 5, background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg,#22c55e,#4ade80)" }}
              animate={{ width: `${(answered / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main ExamScreen ───────────────────────────────────────────────────────────

export function ExamScreen({ onBack }: { onBack: () => void }) {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [currentId, setCurrentId] = useState(3);
  const [timeLeft, setTimeLeft] = useState(5025); // 01:23:45
  const [showCalc, setShowCalc] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitTime, setSubmitTime] = useState("");
  const [lastEdit, setLastEdit] = useState("09:14");
  const [savedPulse, setSavedPulse] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const current = questions.find((q) => q.id === currentId)!;
  const wordCount = countWords(current.answer);
  const isLowTime = timeLeft < 300;

  // Countdown
  useEffect(() => {
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  // Autosave pulse every 30s
  useEffect(() => {
    const t = setInterval(() => {
      setSavedPulse(true);
      setTimeout(() => setSavedPulse(false), 2000);
    }, 30000);
    return () => clearInterval(t);
  }, []);

  const updateAnswer = useCallback((val: string) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === currentId
          ? { ...q, answer: val, status: val.trim() ? "answered" : "active" }
          : q
      )
    );
    const now = new Date();
    setLastEdit(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
  }, [currentId]);

  const toggleFlag = () => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === currentId
          ? { ...q, status: q.status === "flagged" ? (q.answer.trim() ? "answered" : "active") : "flagged" }
          : q
      )
    );
  };

  const isFlagged  = current.status === "flagged";
  const canGoPrev  = currentId > 1;
  const canGoNext  = currentId < questions.length;
  const answered   = questions.filter(q => q.answer.trim()).length;
  const flagged    = questions.filter(q => q.status === "flagged").length;
  const unanswered = questions.length - answered;

  const handleConfirmSubmit = () => {
    const now = new Date();
    setSubmitTime(
      `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")} WIB`
    );
    setShowSubmit(false);
    setSubmitted(true);
    // Return to dashboard after showing success for 3.5s
    setTimeout(() => onBack(), 3500);
  };

  return (
    <div className="size-full flex flex-col relative" style={{ background: "#f8fafc" }}>
      {/* ── Watermark layer ───────────────────────────────────────────────── */}
      <Watermark />

      {/* ── Fixed top bar ─────────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 flex items-center gap-2 px-4 relative"
        style={{
          height: 52,
          background: "linear-gradient(135deg,#0B1E3D 0%,#162d52 100%)",
          zIndex: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}
      >
        {/* Exit button */}
        <button
          onClick={() => setShowExitConfirm(true)}
          className="flex items-center justify-center rounded-lg"
          style={{ width: 32, height: 32, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer", flexShrink: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.5 12H2.5A1 1 0 0 1 1.5 11V3A1 1 0 0 1 2.5 2H5.5" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M9.5 10L12.5 7L9.5 4M12.5 7H5.5" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Timer */}
        <div
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1"
          style={{
            background: isLowTime ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.08)",
            border: `1px solid ${isLowTime ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.12)"}`,
            flexShrink: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke={isLowTime ? "#ef4444" : "rgba(255,255,255,0.5)"} strokeWidth="1.2" fill="none" />
            <path d="M5 3v2l1.5 1" stroke={isLowTime ? "#ef4444" : "rgba(255,255,255,0.5)"} strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <span
            style={{
              color: isLowTime ? "#ef4444" : "#ffffff",
              fontSize: 13,
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: 0.5,
            }}
          >
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Subject code */}
        <div className="flex-1 flex justify-center">
          <div
            className="rounded-lg px-2.5 py-1"
            style={{ background: "rgba(245,197,24,0.12)", border: "1px solid rgba(245,197,24,0.25)" }}
          >
            <span style={{ color: "#F5C518", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>AKT301</span>
          </div>
        </div>

        {/* Question counter */}
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
          <span style={{ color: "#fff" }}>{currentId}</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}> / {questions.length}</span>
        </span>

        {/* Calculator btn */}
        <button
          onClick={() => setShowCalc((v) => !v)}
          className="flex items-center justify-center rounded-lg ml-1"
          style={{
            width: 32,
            height: 32,
            background: showCalc ? "rgba(245,197,24,0.2)" : "rgba(255,255,255,0.08)",
            border: `1px solid ${showCalc ? "rgba(245,197,24,0.4)" : "rgba(255,255,255,0.12)"}`,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="12" rx="2" stroke={showCalc ? "#F5C518" : "rgba(255,255,255,0.6)"} strokeWidth="1.2" fill="none" />
            <path d="M3 4h2.5M8.5 4H11M3 7h2M5.5 7h2M8.5 7h2M3 10h2M5.5 10h2M8.5 10h2" stroke={showCalc ? "#F5C518" : "rgba(255,255,255,0.6)"} strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ── Scrollable body ───────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto relative" style={{ zIndex: 2, paddingBottom: 72 }}>
        <div className="px-4 pt-4 pb-2 flex flex-col gap-3">

          {/* ── Question card ──────────────────────────────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Question header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "linear-gradient(135deg,#0B1E3D,#1a3a6e)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ color: "#F5C518", fontSize: 13, fontWeight: 800, letterSpacing: 0.5 }}>
                  SOAL {currentId}
                </span>
                <span
                  className="rounded-md px-2 py-0.5"
                  style={{ background: "rgba(245,197,24,0.15)", color: "#F5C518", fontSize: 10, fontWeight: 600 }}
                >
                  {current.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="rounded-md px-2 py-0.5"
                  style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: 10, fontWeight: 600 }}
                >
                  {current.points} poin
                </span>
              </div>
            </div>

            <div className="p-4">
              {/* Security badge */}
              <div className="flex items-center gap-1.5 mb-3">
                <div
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
                  style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
                    <path d="M4.5 1L1 2.5V5.5C1 7.5 2.6 9.2 4.5 9.5C6.4 9.2 8 7.5 8 5.5V2.5L4.5 1Z" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="0.9" strokeLinejoin="round" />
                    <path d="M3 5.5L4 6.5L6 4.2" stroke="#ef4444" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ color: "#ef4444", fontSize: 10, fontWeight: 600 }}>Teks tidak bisa diseleksi</span>
                </div>
                <div
                  className="flex items-center gap-1 rounded-full px-2 py-1"
                  style={{ background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.2)" }}
                >
                  <span style={{ color: "#94a3b8", fontSize: 10 }}>🔒 Clipboard diblokir</span>
                </div>
              </div>

              {/* Question text — non-selectable */}
              <p
                style={{
                  color: "#1e293b",
                  fontSize: 14,
                  lineHeight: 1.7,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                {current.text}
              </p>

              {/* Image placeholder */}
              {current.hasImage && (
                <div
                  className="mt-4 rounded-xl flex flex-col items-center justify-center gap-2"
                  style={{
                    height: 100,
                    background: "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
                    border: "1.5px dashed #cbd5e1",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="2" y="5" width="24" height="18" rx="3" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
                    <circle cx="9" cy="11" r="2.5" stroke="#94a3b8" strokeWidth="1.3" fill="none" />
                    <path d="M2 19l6-5 4 4 4-5 10 7" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <span style={{ color: "#94a3b8", fontSize: 11, fontWeight: 500 }}>📊 Tabel Keuangan PT ABC 2025</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Answer area ────────────────────────────────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}
            >
              <span style={{ color: "#475569", fontSize: 12, fontWeight: 600 }}>JAWABAN ANDA</span>
              <div className="flex items-center gap-1.5">
                <div className="rounded" style={{ width: 6, height: 6, background: "#22c55e" }} />
                <span style={{ color: "#94a3b8", fontSize: 10 }}>Auto-save aktif</span>
              </div>
            </div>

            <div className="relative">
              <textarea
                ref={textareaRef}
                value={current.answer}
                onChange={(e) => updateAnswer(e.target.value)}
                placeholder="Tuliskan jawaban Anda di sini..."
                style={{
                  width: "100%",
                  minHeight: 180,
                  padding: "14px 16px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  resize: "vertical",
                  color: "#1e293b",
                  fontSize: 14,
                  lineHeight: 1.7,
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Word counter + last edit */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderTop: "1px solid #f1f5f9", background: "#f8fafc" }}
            >
              <div className="flex items-center gap-1.5">
                <span style={{ color: "#94a3b8", fontSize: 11 }}>
                  <span style={{ color: wordCount > 0 ? "#475569" : "#94a3b8", fontWeight: wordCount > 0 ? 600 : 400 }}>
                    {wordCount}
                  </span>
                  {" kata"}
                </span>
                {wordCount > 0 && (
                  <span style={{ color: "rgba(148,163,184,0.5)" }}>·</span>
                )}
                {wordCount > 0 && (
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>
                    Terakhir diedit{" "}
                    <span style={{ color: "#64748b", fontWeight: 500 }}>{lastEdit}</span>
                  </span>
                )}
              </div>
              {/* Flag indicator */}
              {isFlagged && (
                <div className="flex items-center gap-1">
                  <span style={{ fontSize: 10 }}>🚩</span>
                  <span style={{ color: "#f59e0b", fontSize: 10, fontWeight: 600 }}>Ditandai</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Calculator overlay ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showCalc && <Calculator onClose={() => setShowCalc(false)} />}
      </AnimatePresence>

      {/* ── Soal Nav overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showNav && (
          <QuestionNavOverlay
            questions={questions}
            current={currentId}
            onSelect={setCurrentId}
            onClose={() => setShowNav(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Autosave toast ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {savedPulse && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute flex items-center gap-1.5 rounded-lg px-3 py-1.5"
            style={{
              bottom: 80,
              right: 16,
              zIndex: 30,
              background: "rgba(11,18,35,0.88)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ fontSize: 12 }}>💾</span>
            <span style={{ color: "#ffffff", fontSize: 11, fontWeight: 500 }}>Tersimpan</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fixed footer bar ──────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3"
        style={{
          height: 64,
          zIndex: 20,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Prev */}
        <button
          onClick={() => canGoPrev && setCurrentId((id) => id - 1)}
          disabled={!canGoPrev}
          className="flex items-center justify-center rounded-xl gap-1"
          style={{
            height: 40,
            width: 44,
            background: canGoPrev ? "rgba(11,30,61,0.06)" : "rgba(148,163,184,0.08)",
            border: `1px solid ${canGoPrev ? "rgba(11,30,61,0.15)" : "rgba(148,163,184,0.15)"}`,
            cursor: canGoPrev ? "pointer" : "not-allowed",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke={canGoPrev ? "#0B1E3D" : "#cbd5e1"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={() => canGoNext && setCurrentId((id) => id + 1)}
          disabled={!canGoNext}
          className="flex items-center justify-center rounded-xl"
          style={{
            height: 40,
            width: 44,
            background: canGoNext ? "rgba(11,30,61,0.06)" : "rgba(148,163,184,0.08)",
            border: `1px solid ${canGoNext ? "rgba(11,30,61,0.15)" : "rgba(148,163,184,0.15)"}`,
            cursor: canGoNext ? "pointer" : "not-allowed",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke={canGoNext ? "#0B1E3D" : "#cbd5e1"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Flag */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={toggleFlag}
          className="flex items-center justify-center rounded-xl gap-1"
          style={{
            height: 40,
            width: 44,
            background: isFlagged ? "rgba(245,158,11,0.12)" : "rgba(148,163,184,0.08)",
            border: `1px solid ${isFlagged ? "rgba(245,158,11,0.4)" : "rgba(148,163,184,0.15)"}`,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 15 }}>🚩</span>
        </motion.button>

        {/* Nav soal */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => setShowNav(true)}
          className="flex items-center justify-center gap-1.5 rounded-xl"
          style={{
            height: 40,
            flex: 1,
            background: "rgba(11,30,61,0.06)",
            border: "1px solid rgba(11,30,61,0.15)",
            cursor: "pointer",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="#0B1E3D" opacity="0.6" />
            <rect x="7.5" y="1" width="4.5" height="4.5" rx="1" fill="#0B1E3D" opacity="0.6" />
            <rect x="1" y="7.5" width="4.5" height="4.5" rx="1" fill="#0B1E3D" opacity="0.6" />
            <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="#0B1E3D" opacity="0.6" />
          </svg>
          <span style={{ color: "#0B1E3D", fontSize: 11, fontWeight: 600 }}>Navigasi</span>
        </motion.button>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSubmit(true)}
          className="flex items-center justify-center gap-1.5 rounded-xl relative overflow-hidden"
          style={{
            height: 40,
            flex: 1.4,
            background: "linear-gradient(135deg,#0B1E3D 0%,#1a3a6e 100%)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 3px 12px rgba(11,30,61,0.3)",
          }}
        >
          <motion.div
            className="absolute inset-y-0"
            style={{ width: 40, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)" }}
            animate={{ x: [-40, 200] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5 }}
          />
          <span style={{ fontSize: 13 }}>📤</span>
          <span style={{ color: "#F5C518", fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>KUMPULKAN</span>
        </motion.button>
      </div>

      {/* ── Exit confirm modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            className="absolute inset-0 flex items-end justify-center"
            style={{ background: "rgba(0,0,0,0.6)", zIndex: 50, backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full rounded-t-3xl p-5"
              style={{ background: "#fff", boxShadow: "0 -8px 40px rgba(0,0,0,0.25)" }}
              initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
            >
              {/* Handle */}
              <div className="flex justify-center mb-4">
                <div className="rounded-full" style={{ width: 40, height: 4, background: "#e2e8f0" }} />
              </div>

              {/* Warning icon */}
              <div className="flex justify-center mb-3">
                <div className="flex items-center justify-center rounded-2xl"
                  style={{ width: 56, height: 56, background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.25)" }}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M13 3L2 22h22L13 3Z" stroke="#ef4444" strokeWidth="1.8" fill="rgba(239,68,68,0.1)" strokeLinejoin="round"/>
                    <path d="M13 10v6M13 18.5v1" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <p style={{ color: "#0f172a", fontSize: 16, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>
                Keluar dari Ujian?
              </p>
              <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", lineHeight: 1.6, marginBottom: 6 }}>
                Progress jawaban Anda akan tersimpan otomatis, namun sesi ujian akan ditandai sebagai <span style={{ color: "#dc2626", fontWeight: 600 }}>belum selesai</span>.
              </p>

              {/* Answered summary */}
              <div className="rounded-xl p-3 mb-4 flex items-center justify-between"
                style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
                <span style={{ color: "#9a3412", fontSize: 12 }}>Soal terjawab</span>
                <span style={{ color: "#9a3412", fontSize: 13, fontWeight: 700 }}>
                  {questions.filter(q => q.answer.trim()).length} / {questions.length}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => { setShowExitConfirm(false); onBack(); }}
                  className="w-full flex items-center justify-center rounded-2xl"
                  style={{ height: 50, background: "#dc2626", border: "none", cursor: "pointer" }}
                >
                  <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Ya, Keluar dari Ujian</span>
                </button>
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="w-full flex items-center justify-center rounded-2xl"
                  style={{ height: 50, background: "#f1f5f9", border: "none", cursor: "pointer" }}
                >
                  <span style={{ color: "#475569", fontSize: 14, fontWeight: 500 }}>Lanjutkan Ujian</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit confirmation modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {showSubmit && (
          <motion.div
            className="absolute inset-0 flex items-end justify-center"
            style={{ background: "rgba(0,0,0,0.55)", zIndex: 50, backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full rounded-t-3xl p-5"
              style={{ background: "#fff", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}
              initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
            >
              {/* Handle */}
              <div className="flex justify-center mb-4">
                <div className="rounded-full" style={{ width: 40, height: 4, background: "#e2e8f0" }} />
              </div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center rounded-2xl flex-shrink-0"
                  style={{ width: 48, height: 48, background: "rgba(11,30,61,0.07)" }}>
                  <span style={{ fontSize: 22 }}>📤</span>
                </div>
                <div>
                  <p style={{ color: "#0f172a", fontSize: 16, fontWeight: 700 }}>Kumpulkan Jawaban?</p>
                  <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>
                    Sisa waktu: <span style={{ color: isLowTime ? "#ef4444" : "#0B1E3D", fontWeight: 700 }}>{formatTime(timeLeft)}</span>
                  </p>
                </div>
              </div>

              {/* Summary grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { val: answered,   label: "Terjawab",  color: "#16a34a", bg: "rgba(34,197,94,0.08)"  },
                  { val: flagged,    label: "Ditandai",  color: "#b45309", bg: "rgba(245,158,11,0.08)" },
                  { val: unanswered, label: "Kosong",    color: unanswered > 0 ? "#dc2626" : "#94a3b8",
                    bg: unanswered > 0 ? "rgba(239,68,68,0.08)" : "rgba(148,163,184,0.08)" },
                ].map(s => (
                  <div key={s.label} className="flex flex-col items-center rounded-2xl py-3"
                    style={{ background: s.bg, border: `1px solid ${s.color}22` }}>
                    <span style={{ color: s.color, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{s.val}</span>
                    <span style={{ color: s.color, fontSize: 10, marginTop: 3, opacity: 0.8 }}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex justify-between">
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>Progress pengerjaan</span>
                  <span style={{ color: "#0B1E3D", fontSize: 11, fontWeight: 700 }}>{answered}/{questions.length} soal</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 6, background: "#f1f5f9" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: answered === questions.length ? "#22c55e" : "linear-gradient(90deg,#0B1E3D,#2563eb)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(answered / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Early submit notice */}
              {timeLeft > 0 && (
                <div className="rounded-xl p-3 mb-4 flex gap-2"
                  style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="7" cy="7" r="5.5" stroke="#3b82f6" strokeWidth="1.3" fill="none"/>
                    <path d="M7 5v3M7 9.5v.5" stroke="#3b82f6" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <p style={{ color: "#1d4ed8", fontSize: 11, lineHeight: 1.5 }}>
                    Anda mengumpulkan <span style={{ fontWeight: 700 }}>sebelum waktu habis</span>. Jawaban langsung dikunci — tidak dapat diubah setelah dikumpulkan.
                  </p>
                </div>
              )}

              {/* Unanswered warning */}
              {unanswered > 0 && (
                <div className="rounded-xl p-3 mb-4 flex gap-2"
                  style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M7 1.5L1.5 11.5h11L7 1.5Z" stroke="#ef4444" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
                    <path d="M7 6v2.5M7 10v.5" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <p style={{ color: "#dc2626", fontSize: 11, lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700 }}>{unanswered} soal belum dijawab.</span> Soal yang kosong akan dianggap tidak dijawab.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2.5">
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleConfirmSubmit}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl"
                  style={{ height: 52, background: "linear-gradient(135deg,#0B1E3D,#1a3a6e)", border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(11,30,61,0.25)" }}>
                  <span style={{ fontSize: 16 }}>📤</span>
                  <span style={{ color: "#F5C518", fontSize: 14, fontWeight: 700 }}>Kumpulkan Sekarang</span>
                </motion.button>
                <button onClick={() => setShowSubmit(false)}
                  className="w-full flex items-center justify-center rounded-2xl"
                  style={{ height: 46, background: "#f1f5f9", border: "none", cursor: "pointer" }}>
                  <span style={{ color: "#475569", fontSize: 13, fontWeight: 500 }}>Kembali ke Soal</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Success / post-exam overlay ───────────────────────────────────── */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{ background: "linear-gradient(160deg,#0B1E3D 0%,#091629 60%,#060F1E 100%)", zIndex: 60 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.1 }}
              className="flex items-center justify-center rounded-full mb-5"
              style={{ width: 96, height: 96, background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.4)" }}>
              <motion.svg width="44" height="36" viewBox="0 0 44 36" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}>
                <motion.path d="M3 18L16 31L41 4" stroke="#22c55e" strokeWidth="4"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                />
              </motion.svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ color: "#ffffff", fontSize: 20, fontWeight: 800, textAlign: "center", marginBottom: 6 }}>
              Ujian Berhasil Dikumpulkan
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textAlign: "center", lineHeight: 1.6 }}>
              Jawaban Anda telah dikunci dan dikirim ke sistem.
            </motion.p>

            {/* Receipt card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="w-full rounded-2xl p-4 mt-6 flex flex-col gap-2.5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { label: "Mata Kuliah",      value: "Akuntansi Manajemen (AKT301)" },
                { label: "Waktu Pengumpulan", value: submitTime },
                { label: "Soal Terjawab",    value: `${answered} dari ${questions.length} soal` },
                { label: "Ditandai",         value: `${flagged} soal` },
                { label: "Status",           value: "Menunggu Penilaian" },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{r.label}</span>
                  <span style={{ color: r.label === "Status" ? "#F5C518" : "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 500 }}>{r.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 20 }}>
              Kembali ke dashboard...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
