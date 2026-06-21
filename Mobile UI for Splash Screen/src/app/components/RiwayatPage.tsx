import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Types ─────────────────────────────────────────────────────────────────────

type RiwayatStatus = "terkumpul" | "dibatalkan" | "terlambat";
type NilaiStatus   = "belum" | "graded" | "cancelled";
type Severity      = "bersih" | "ringan" | "sedang" | "berat";
type SemFilter     = "all" | "sem4" | "sem3" | "sem2";

interface RiwayatItem {
  id: string;
  subject: string;
  code: string;
  semester: string;
  date: string;
  dateRaw: string; // for sorting
  submitTime: string;
  status: RiwayatStatus;
  violations: number;
  severity: Severity;
  nilaiStatus: NilaiStatus;
  score?: number;
  duration: string; // actual time spent
  totalQuestions: number;
  answeredQuestions: number;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const RIWAYAT: RiwayatItem[] = [
  {
    id: "akt301",
    subject: "Akuntansi Manajemen",
    code: "AKT301",
    semester: "Semester 4",
    date: "14 Juni 2026",
    dateRaw: "2026-06-14",
    submitTime: "09:58:32",
    status: "terkumpul",
    violations: 1,
    severity: "ringan",
    nilaiStatus: "belum",
    duration: "1j 58m",
    totalQuestions: 5,
    answeredQuestions: 4,
  },
  {
    id: "stb202",
    subject: "Statistika Bisnis",
    code: "STB202",
    semester: "Semester 4",
    date: "12 Juni 2026",
    dateRaw: "2026-06-12",
    submitTime: "10:02:14",
    status: "terkumpul",
    violations: 0,
    severity: "bersih",
    nilaiStatus: "graded",
    score: 78,
    duration: "2j 00m",
    totalQuestions: 6,
    answeredQuestions: 6,
  },
  {
    id: "mnk303",
    subject: "Manajemen Keuangan",
    code: "MNK303",
    semester: "Semester 4",
    date: "10 Juni 2026",
    dateRaw: "2026-06-10",
    submitTime: "08:45:00",
    status: "dibatalkan",
    violations: 3,
    severity: "berat",
    nilaiStatus: "cancelled",
    duration: "45m",
    totalQuestions: 5,
    answeredQuestions: 2,
  },
  {
    id: "pjk401",
    subject: "Perpajakan",
    code: "PJK401",
    semester: "Semester 4",
    date: "8 Juni 2026",
    dateRaw: "2026-06-08",
    submitTime: "11:55:40",
    status: "terkumpul",
    violations: 0,
    severity: "bersih",
    nilaiStatus: "graded",
    score: 85,
    duration: "1j 55m",
    totalQuestions: 5,
    answeredQuestions: 5,
  },
  {
    id: "ekk201",
    subject: "Ekonomi Makro",
    code: "EKK201",
    semester: "Semester 3",
    date: "15 Des 2025",
    dateRaw: "2025-12-15",
    submitTime: "10:30:00",
    status: "terkumpul",
    violations: 0,
    severity: "bersih",
    nilaiStatus: "graded",
    score: 91,
    duration: "1j 30m",
    totalQuestions: 5,
    answeredQuestions: 5,
  },
  {
    id: "ptm301",
    subject: "Pengantar Manajemen",
    code: "PTM301",
    semester: "Semester 3",
    date: "13 Des 2025",
    dateRaw: "2025-12-13",
    submitTime: "14:10:22",
    status: "terkumpul",
    violations: 1,
    severity: "ringan",
    nilaiStatus: "graded",
    score: 72,
    duration: "1j 40m",
    totalQuestions: 4,
    answeredQuestions: 4,
  },
  {
    id: "mat101",
    subject: "Matematika Ekonomi",
    code: "MAT101",
    semester: "Semester 2",
    date: "20 Jun 2025",
    dateRaw: "2025-06-20",
    submitTime: "09:45:11",
    status: "terlambat",
    violations: 0,
    severity: "ringan",
    nilaiStatus: "graded",
    score: 65,
    duration: "2j 00m",
    totalQuestions: 5,
    answeredQuestions: 5,
  },
];

const SEM_FILTERS: { id: SemFilter; label: string }[] = [
  { id: "all",  label: "Semua Semester" },
  { id: "sem4", label: "Semester 4"     },
  { id: "sem3", label: "Semester 3"     },
  { id: "sem2", label: "Semester 2"     },
];

// ── Config maps ───────────────────────────────────────────────────────────────

const STATUS_CFG: Record<RiwayatStatus, { label: string; icon: string; bg: string; border: string; text: string }> = {
  terkumpul:  { label: "TERKUMPUL",  icon: "✅", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.25)",  text: "#16a34a" },
  dibatalkan: { label: "DIBATALKAN", icon: "🔴", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.25)",  text: "#dc2626" },
  terlambat:  { label: "TERLAMBAT",  icon: "⚠️", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", text: "#b45309" },
};

const SEVERITY_CFG: Record<Severity, { label: string; color: string; bg: string }> = {
  bersih: { label: "Bersih",  color: "#16a34a", bg: "rgba(34,197,94,0.1)"  },
  ringan: { label: "Ringan",  color: "#b45309", bg: "rgba(245,158,11,0.1)" },
  sedang: { label: "Sedang",  color: "#c2410c", bg: "rgba(249,115,22,0.1)" },
  berat:  { label: "Berat",   color: "#dc2626", bg: "rgba(239,68,68,0.1)"  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function applyFilter(data: RiwayatItem[], f: SemFilter) {
  if (f === "all")  return data;
  if (f === "sem4") return data.filter(d => d.semester === "Semester 4");
  if (f === "sem3") return data.filter(d => d.semester === "Semester 3");
  if (f === "sem2") return data.filter(d => d.semester === "Semester 2");
  return data;
}

function scoreColor(s: number) {
  if (s >= 80) return { text: "#16a34a", bg: "rgba(34,197,94,0.1)",  ring: "#22c55e" };
  if (s >= 65) return { text: "#b45309", bg: "rgba(245,158,11,0.1)", ring: "#f59e0b" };
  return               { text: "#dc2626", bg: "rgba(239,68,68,0.1)",  ring: "#ef4444" };
}

// ── Score ring ────────────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const { text, bg, ring } = scoreColor(score);
  const pct  = score / 100;
  const r    = 18;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 52, height: 52 }}>
      <svg width="52" height="52" viewBox="0 0 52 52" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx="26" cy="26" r={r} fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
        <motion.circle
          cx="26" cy="26" r={r} fill="none" stroke={ring} strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - pct) }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="flex flex-col items-center" style={{ zIndex: 1 }}>
        <span style={{ color: text, fontSize: 14, fontWeight: 800, lineHeight: 1 }}>{score}</span>
        <span style={{ color: text, fontSize: 8, opacity: 0.65 }}>/ 100</span>
      </div>
    </div>
  );
}

// ── Single card ───────────────────────────────────────────────────────────────

function RiwayatCard({ item, index }: { item: RiwayatItem; index: number }) {
  const [open, setOpen] = useState(false);
  const sc  = STATUS_CFG[item.status];
  const svc = SEVERITY_CFG[item.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.055, duration: 0.3 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        opacity: item.status === "dibatalkan" ? 0.82 : 1,
      }}
    >
      {/* accent bar */}
      <div style={{
        height: 3,
        background: item.status === "terkumpul"
          ? "linear-gradient(90deg,#22c55e,#4ade80)"
          : item.status === "dibatalkan"
          ? "#ef4444"
          : "linear-gradient(90deg,#f59e0b,#fbbf24)",
      }} />

      <div className="p-4">
        {/* ── Header row ──────────────────────────────────────────────────── */}
        <div className="flex items-start gap-3 mb-3">
          {/* Score ring or cancelled mark */}
          {item.nilaiStatus === "graded" && item.score !== undefined ? (
            <ScoreRing score={item.score} />
          ) : item.nilaiStatus === "belum" ? (
            <div className="flex flex-col items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: 52, height: 52, background: "rgba(148,163,184,0.08)", border: "1.5px dashed #cbd5e1" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#cbd5e1" strokeWidth="1.4" fill="none" />
                <path d="M9 6v3.5M9 11.5v.5" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: 52, height: 52, background: "rgba(239,68,68,0.06)", border: "1.5px solid rgba(239,68,68,0.2)" }}>
              <span style={{ fontSize: 20 }}>✕</span>
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p style={{ color: "#0f172a", fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>
              {item.subject}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="rounded px-1.5 py-0.5"
                style={{ background: "rgba(148,163,184,0.1)", color: "#475569", fontSize: 10, fontWeight: 600 }}>
                {item.code}
              </span>
              <span style={{ color: "#94a3b8", fontSize: 10 }}>·</span>
              <span style={{ color: "#94a3b8", fontSize: 10 }}>{item.semester}</span>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 flex-shrink-0"
            style={{ background: sc.bg, border: `1px solid ${sc.border}` }}>
            <span style={{ fontSize: 9 }}>{sc.icon}</span>
            <span style={{ color: sc.text, fontSize: 9, fontWeight: 700, letterSpacing: 0.3 }}>{sc.label}</span>
          </div>
        </div>

        {/* ── Info chips row ───────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {/* Date */}
          <div className="flex items-center gap-1 rounded-lg px-2 py-1.5"
            style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
              <path d="M1 5h10M4 1v2M8 1v2" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{ color: "#475569", fontSize: 10, fontWeight: 500 }}>{item.date}</span>
          </div>

          {/* Submit time */}
          <div className="flex items-center gap-1 rounded-lg px-2 py-1.5"
            style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
              <path d="M6 3.5v2.5l1.8 1.2" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <span style={{ color: "#475569", fontSize: 10 }}>
              {item.status === "dibatalkan" ? "Force Kill" : "Submit"}: {item.submitTime}
            </span>
          </div>

          {/* Violations */}
          <div className="flex items-center gap-1 rounded-lg px-2 py-1.5"
            style={{ background: svc.bg, border: `1px solid ${svc.color}22` }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M6 1l5 9.5H1L6 1Z" stroke={svc.color} strokeWidth="1.2" fill="none" strokeLinejoin="round" />
              <path d="M6 5v2M6 8.5v.5" stroke={svc.color} strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <span style={{ color: svc.color, fontSize: 10, fontWeight: 600 }}>
              {item.violations}× {svc.label}
            </span>
          </div>
        </div>

        {/* ── Nilai row ────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between rounded-xl px-3 py-2.5 mb-3"
          style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
          <span style={{ color: "#64748b", fontSize: 12 }}>Nilai Akhir</span>
          {item.nilaiStatus === "graded" && item.score !== undefined ? (
            <div className="flex items-center gap-2">
              <div className="rounded-full px-2.5 py-0.5"
                style={{ background: scoreColor(item.score).bg }}>
                <span style={{ color: scoreColor(item.score).text, fontSize: 12, fontWeight: 800 }}>
                  {item.score}
                </span>
              </div>
              <span style={{ color: "#94a3b8", fontSize: 10 }}>
                {item.score >= 80 ? "A" : item.score >= 70 ? "B" : item.score >= 60 ? "C" : "D"}
              </span>
            </div>
          ) : item.nilaiStatus === "belum" ? (
            <div className="flex items-center gap-1.5">
              <motion.div className="rounded-full"
                style={{ width: 6, height: 6, background: "#f59e0b" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }} />
              <span style={{ color: "#b45309", fontSize: 11, fontWeight: 500 }}>Menunggu Penilaian</span>
            </div>
          ) : (
            <span style={{ color: "#dc2626", fontSize: 11, fontWeight: 500 }}>— (Dibatalkan)</span>
          )}
        </div>

        {/* ── Expandable detail ────────────────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{ overflow: "hidden" }}
            >
              <div className="rounded-xl p-3 mb-3 flex flex-col gap-2"
                style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
                <p style={{ color: "#475569", fontSize: 11, fontWeight: 600, marginBottom: 2 }}>Detail Pengerjaan</p>
                <div className="flex items-center justify-between">
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>Soal Terjawab</span>
                  <span style={{ color: "#0f172a", fontSize: 11, fontWeight: 600 }}>
                    {item.answeredQuestions} / {item.totalQuestions}
                  </span>
                </div>
                <div style={{ height: 4, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", background: "#22c55e", borderRadius: 99 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.answeredQuestions / item.totalQuestions) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>Durasi Pengerjaan</span>
                  <span style={{ color: "#0f172a", fontSize: 11, fontWeight: 600 }}>{item.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>Jumlah Pelanggaran</span>
                  <span style={{ color: svc.color, fontSize: 11, fontWeight: 600 }}>
                    {item.violations}× ({svc.label})
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Toggle detail ─────────────────────────────────────────────────── */}
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl"
          style={{ height: 34, background: "#f8fafc", border: "1px solid #f1f5f9", cursor: "pointer" }}
        >
          <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <path d="M2 4.5L6 7.5L10 4.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          <span style={{ color: "#94a3b8", fontSize: 11 }}>{open ? "Sembunyikan" : "Lihat Detail"}</span>
        </button>
      </div>
    </motion.div>
  );
}

// ── Summary stats bar ─────────────────────────────────────────────────────────

function SummaryBar({ data }: { data: RiwayatItem[] }) {
  const graded   = data.filter(d => d.nilaiStatus === "graded" && d.score !== undefined);
  const avg      = graded.length ? Math.round(graded.reduce((s, d) => s + (d.score ?? 0), 0) / graded.length) : null;
  const clean    = data.filter(d => d.severity === "bersih").length;
  const done     = data.filter(d => d.status === "terkumpul").length;
  const { text: avgColor } = avg ? scoreColor(avg) : { text: "#94a3b8" };

  return (
    <div className="grid grid-cols-3 gap-2 px-4 py-3 flex-shrink-0"
      style={{ background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
      {[
        { label: "Rata-rata",   val: avg !== null ? `${avg}` : "–", sub: "nilai",          color: avgColor  },
        { label: "Terkumpul",   val: `${done}`,                     sub: "ujian",          color: "#16a34a" },
        { label: "Bersih",      val: `${clean}`,                    sub: "tanpa pelanggaran", color: "#2563eb" },
      ].map(s => (
        <div key={s.label} className="flex flex-col items-center rounded-xl py-2.5"
          style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
          <span style={{ color: s.color, fontSize: 20, fontWeight: 800, lineHeight: 1 }}>{s.val}</span>
          <span style={{ color: "#94a3b8", fontSize: 9, marginTop: 2, textAlign: "center", lineHeight: 1.3 }}>
            {s.label}<br />{s.sub}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function RiwayatPage() {
  const [semFilter, setSemFilter] = useState<SemFilter>("all");
  const [dropOpen, setDropOpen]   = useState(false);
  const filtered = applyFilter(RIWAYAT, semFilter);
  const activeLabel = SEM_FILTERS.find(f => f.id === semFilter)?.label ?? "Semua Semester";

  return (
    <div className="size-full flex flex-col" style={{ background: "#f1f5f9" }}>

      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg,#0B1E3D 0%,#162d52 100%)", padding: "14px 16px 18px", flexShrink: 0 }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 2 }}>Ahmad Fauzi · 2024010001</p>
        <p style={{ color: "#fff", fontSize: 17, fontWeight: 700 }}>📊 Riwayat Ujian</p>

        {/* Semester filter dropdown */}
        <div className="relative mt-3">
          <button
            onClick={() => setDropOpen(v => !v)}
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" />
              <path d="M1 4.5h10M4 1v2M8 1v2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}>{activeLabel}</span>
            <motion.svg width="10" height="10" viewBox="0 0 10 10" fill="none"
              animate={{ rotate: dropOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
              <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" strokeLinecap="round" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {dropOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1 rounded-xl overflow-hidden"
                style={{ zIndex: 50, minWidth: 180, background: "rgba(13,22,42,0.97)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 8px 28px rgba(0,0,0,0.4)" }}
              >
                {SEM_FILTERS.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => { setSemFilter(f.id); setDropOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3"
                    style={{
                      background: semFilter === f.id ? "rgba(245,197,24,0.1)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    {semFilter === f.id && (
                      <div className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: "#F5C518" }} />
                    )}
                    <span style={{ color: semFilter === f.id ? "#F5C518" : "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: semFilter === f.id ? 600 : 400, marginLeft: semFilter === f.id ? 0 : 14 }}>
                      {f.label}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Summary stats ────────────────────────────────────────────────────── */}
      <SummaryBar data={filtered} />

      {/* ── Cards list ───────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={semFilter}
            className="flex flex-col gap-3 px-4 pt-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <div className="rounded-2xl flex items-center justify-center"
                  style={{ width: 64, height: 64, background: "#f1f5f9" }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="11" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
                    <path d="M14 9v5l3 3" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 13 }}>Belum ada riwayat ujian</p>
              </div>
            ) : (
              filtered.map((item, i) => (
                <RiwayatCard key={item.id} item={item} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
