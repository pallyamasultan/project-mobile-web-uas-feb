import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Types ─────────────────────────────────────────────────────────────────────

type ExamStatus = "berlangsung" | "belum" | "selesai" | "dibatalkan";
type FilterTab = "semua" | "hari-ini" | "mendatang" | "selesai";

interface UjianItem {
  id: string;
  subject: string;
  code: string;
  sks: number;
  date: string;
  time: string;
  duration: string;
  questions: number;
  type: string;
  status: ExamStatus;
  score?: number;
  room: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const UJIAN_DATA: UjianItem[] = [
  {
    id: "akt301",
    subject: "Akuntansi Manajemen",
    code: "AKT301",
    sks: 3,
    date: "Hari Ini",
    time: "08:00 – 10:00",
    duration: "120 menit",
    questions: 5,
    type: "Esai",
    status: "berlangsung",
    room: "Lab Komputer A",
  },
  {
    id: "ekm201",
    subject: "Ekonomi Mikro",
    code: "EKM201",
    sks: 3,
    date: "Hari Ini",
    time: "13:00 – 14:30",
    duration: "90 menit",
    questions: 4,
    type: "Esai",
    status: "belum",
    room: "Lab Komputer B",
  },
  {
    id: "mnk303",
    subject: "Manajemen Keuangan",
    code: "MNK303",
    sks: 3,
    date: "18 Jun 2026",
    time: "09:00 – 11:00",
    duration: "120 menit",
    questions: 5,
    type: "Esai",
    status: "belum",
    room: "Aula FEB",
  },
  {
    id: "stb202",
    subject: "Statistika Bisnis",
    code: "STB202",
    sks: 3,
    date: "12 Jun 2026",
    time: "08:00 – 10:00",
    duration: "120 menit",
    questions: 6,
    type: "Pilihan Ganda",
    status: "selesai",
    score: 78,
    room: "Lab Komputer A",
  },
  {
    id: "pjk401",
    subject: "Perpajakan",
    code: "PJK401",
    sks: 3,
    date: "10 Jun 2026",
    time: "13:00 – 15:00",
    duration: "120 menit",
    questions: 5,
    type: "Esai",
    status: "selesai",
    score: 85,
    room: "Ruang 204",
  },
  {
    id: "adk501",
    subject: "Audit & Keuangan",
    code: "ADK501",
    sks: 4,
    date: "8 Jun 2026",
    time: "10:00 – 12:00",
    duration: "120 menit",
    questions: 5,
    type: "Esai",
    status: "dibatalkan",
    room: "Lab Komputer C",
  },
];

const FILTERS: { id: FilterTab; label: string }[] = [
  { id: "semua",     label: "Semua"     },
  { id: "hari-ini",  label: "Hari Ini"  },
  { id: "mendatang", label: "Mendatang" },
  { id: "selesai",   label: "Selesai"   },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ExamStatus, { label: string; bg: string; border: string; text: string; dot: string }> = {
  berlangsung: { label: "BERLANGSUNG", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.3)",  text: "#16a34a", dot: "#22c55e"  },
  belum:       { label: "BELUM DIMULAI", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", text: "#b45309", dot: "#f59e0b" },
  selesai:     { label: "SELESAI",     bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)", text: "#1d4ed8", dot: "#3b82f6" },
  dibatalkan:  { label: "DIBATALKAN",  bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)", text: "#dc2626", dot: "#ef4444"  },
};

function filterData(data: UjianItem[], tab: FilterTab): UjianItem[] {
  if (tab === "semua")     return data;
  if (tab === "hari-ini")  return data.filter(d => d.date === "Hari Ini");
  if (tab === "mendatang") return data.filter(d => d.status === "belum" && d.date !== "Hari Ini");
  if (tab === "selesai")   return data.filter(d => d.status === "selesai" || d.status === "dibatalkan");
  return data;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ExamStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 flex-shrink-0"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      {status === "berlangsung" ? (
        <motion.div className="rounded-full flex-shrink-0"
          style={{ width: 6, height: 6, background: c.dot }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }} />
      ) : (
        <div className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: c.dot }} />
      )}
      <span style={{ color: c.text, fontSize: 10, fontWeight: 700, letterSpacing: 0.4 }}>{c.label}</span>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "#16a34a" : score >= 65 ? "#b45309" : "#dc2626";
  const bg    = score >= 80 ? "rgba(34,197,94,0.1)" : score >= 65 ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)";
  return (
    <div className="flex flex-col items-center justify-center rounded-xl"
      style={{ width: 48, height: 48, background: bg, border: `1.5px solid ${color}22`, flexShrink: 0 }}>
      <span style={{ color, fontSize: 16, fontWeight: 800, lineHeight: 1 }}>{score}</span>
      <span style={{ color, fontSize: 8, opacity: 0.7 }}>/ 100</span>
    </div>
  );
}

function UjianCard({ item, index, onStart }: { item: UjianItem; index: number; onStart?: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const active = item.status === "berlangsung";
  const done   = item.status === "selesai" || item.status === "dibatalkan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.32 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        boxShadow: active
          ? "0 4px 20px rgba(11,30,61,0.1), 0 1px 4px rgba(0,0,0,0.05)"
          : "0 1px 8px rgba(0,0,0,0.05)",
        border: active ? "1px solid rgba(11,30,61,0.08)" : "1px solid #f1f5f9",
        opacity: item.status === "dibatalkan" ? 0.72 : 1,
      }}
    >
      {/* Top accent */}
      <div style={{
        height: 3,
        background: active ? "linear-gradient(90deg,#0B1E3D,#2563eb)"
          : item.status === "selesai"    ? "linear-gradient(90deg,#3b82f6,#60a5fa)"
          : item.status === "dibatalkan" ? "#e2e8f0"
          : "linear-gradient(90deg,#f59e0b,#fbbf24)",
      }} />

      <div className="p-4">
        {/* Row 1: subject + score/status */}
        <div className="flex items-start gap-3 mb-3">
          {/* Subject icon */}
          <div className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ width: 40, height: 40, background: active ? "rgba(11,30,61,0.07)" : "rgba(148,163,184,0.1)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2.5" y="1.5" width="13" height="15" rx="2"
                stroke={active ? "#0B1E3D" : "#94a3b8"} strokeWidth="1.4" fill="none" />
              <path d="M5.5 6h7M5.5 9h7M5.5 12h4.5"
                stroke={active ? "#0B1E3D" : "#94a3b8"} strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p style={{ color: "#0f172a", fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>
              {item.subject}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="rounded px-1.5 py-0.5"
                style={{ background: "rgba(148,163,184,0.12)", color: "#475569", fontSize: 10, fontWeight: 600 }}>
                {item.code}
              </span>
              <span style={{ color: "#94a3b8", fontSize: 10 }}>{item.sks} SKS</span>
              <span style={{ color: "#cbd5e1", fontSize: 10 }}>·</span>
              <span style={{ color: "#94a3b8", fontSize: 10 }}>{item.type}</span>
            </div>
          </div>

          {item.score !== undefined ? (
            <ScoreBadge score={item.score} />
          ) : (
            <StatusBadge status={item.status} />
          )}
        </div>

        {/* Row 2: date + time chips */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
              <path d="M1 5h10M4 1v2M8 1v2" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{ color: active ? "#0B1E3D" : "#64748b", fontSize: 11, fontWeight: active ? 600 : 400 }}>
              {item.date}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
              <path d="M6 3.5v2.5l1.8 1.2" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <span style={{ color: "#64748b", fontSize: 11 }}>{item.time}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v1M6 10v1M1 6h1M10 6h1" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="6" cy="6" r="3" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
            </svg>
            <span style={{ color: "#64748b", fontSize: 11 }}>{item.duration}</span>
          </div>
        </div>

        {/* Expandable detail row */}
        <motion.div
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ overflow: "hidden" }}
        >
          <div className="flex items-center gap-2 mb-3 pt-1 flex-wrap">
            <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
              style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10V4l4-3 4 3v6" stroke="#94a3b8" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
                <rect x="4.5" y="7" width="3" height="3" rx="0.5" stroke="#94a3b8" strokeWidth="1" fill="none" />
              </svg>
              <span style={{ color: "#64748b", fontSize: 11 }}>{item.room}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
              style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
                <path d="M3.5 5.5h5M3.5 7.5h3" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span style={{ color: "#64748b", fontSize: 11 }}>{item.questions} Soal</span>
            </div>
            {item.status === "selesai" && (
              <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <span style={{ color: "#16a34a", fontSize: 11, fontWeight: 500 }}>✓ Terkumpul</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Actions row */}
        <div className="flex items-center gap-2">
          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center gap-1 rounded-xl px-3 py-2"
            style={{ background: "#f8fafc", border: "1px solid #f1f5f9", cursor: "pointer", flexShrink: 0 }}
          >
            <motion.svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M2 4.5L6 7.5L10 4.5" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            <span style={{ color: "#94a3b8", fontSize: 11 }}>Detail</span>
          </button>

          {/* CTA button */}
          {active && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onStart}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl relative overflow-hidden"
              style={{ height: 38, background: "linear-gradient(135deg,#0B1E3D,#1a3a6e)", border: "none", cursor: "pointer", boxShadow: "0 3px 10px rgba(11,30,61,0.25)" }}
            >
              <motion.div className="absolute inset-y-0"
                style={{ width: 40, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)" }}
                animate={{ x: [-40, 260] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              />
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#F5C518" strokeWidth="1.3" fill="none" />
                <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0" stroke="#F5C518" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              </svg>
              <span style={{ color: "#F5C518", fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>MULAI UJIAN</span>
            </motion.button>
          )}

          {item.status === "belum" && (
            <div className="flex-1 flex items-center justify-center gap-1.5 rounded-xl"
              style={{ height: 38, background: "#f1f5f9", border: "1px solid #e2e8f0" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
                <path d="M6 4v2.5l1.5 1" stroke="#cbd5e1" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span style={{ color: "#cbd5e1", fontSize: 11, fontWeight: 600 }}>Belum Dimulai</span>
            </div>
          )}

          {item.status === "selesai" && (
            <div className="flex-1 flex items-center justify-center gap-1.5 rounded-xl"
              style={{ height: 38, background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#3b82f6" strokeWidth="1.2" fill="none" />
                <path d="M3.5 6L5.2 7.8L8.5 4" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: "#1d4ed8", fontSize: 11, fontWeight: 600 }}>Lihat Hasil</span>
            </div>
          )}

          {item.status === "dibatalkan" && (
            <div className="flex-1 flex items-center justify-center gap-1.5 rounded-xl"
              style={{ height: 38, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <span style={{ color: "#dc2626", fontSize: 11, fontWeight: 600 }}>Dibatalkan</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function UjianPage({ onStartExam }: { onStartExam: () => void }) {
  const [filter, setFilter] = useState<FilterTab>("semua");
  const filtered = filterData(UJIAN_DATA, filter);

  const counts = {
    berlangsung: UJIAN_DATA.filter(d => d.status === "berlangsung").length,
    selesai:     UJIAN_DATA.filter(d => d.status === "selesai").length,
    belum:       UJIAN_DATA.filter(d => d.status === "belum").length,
  };

  return (
    <div className="size-full flex flex-col" style={{ background: "#f1f5f9" }}>

      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg,#0B1E3D 0%,#162d52 100%)", padding: "14px 16px 20px", flexShrink: 0 }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 2 }}>Semester Genap 2025/2026</p>
        <p style={{ color: "#fff", fontSize: 17, fontWeight: 700 }}>📋 Daftar Ujian</p>

        {/* Stat chips */}
        <div className="flex gap-2 mt-3">
          {[
            { label: "Berlangsung", val: counts.berlangsung, color: "#22c55e" },
            { label: "Menunggu",    val: counts.belum,        color: "#f59e0b" },
            { label: "Selesai",     val: counts.selesai,      color: "#60a5fa" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-1.5 rounded-full px-3 py-1"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="rounded-full" style={{ width: 6, height: 6, background: s.color }} />
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
                <span style={{ color: "#fff", fontWeight: 700 }}>{s.val}</span> {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter tabs ───────────────────────────────────────────────────────── */}
      <div className="flex gap-2 px-4 py-3 flex-shrink-0" style={{ background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
        {FILTERS.map(f => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="relative rounded-full px-3 py-1.5 flex-shrink-0"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              {active && (
                <motion.div layoutId="filter-pill" className="absolute inset-0 rounded-full"
                  style={{ background: "#0B1E3D" }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }} />
              )}
              <span className="relative z-10" style={{ color: active ? "#F5C518" : "#94a3b8", fontSize: 12, fontWeight: active ? 700 : 400 }}>
                {f.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── List ─────────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="flex flex-col gap-3 px-4 pt-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <div className="rounded-2xl flex items-center justify-center"
                  style={{ width: 64, height: 64, background: "#f1f5f9" }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="3" y="3" width="22" height="22" rx="4" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
                    <path d="M8 10h12M8 14h8" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 13 }}>Tidak ada ujian di kategori ini</p>
              </div>
            ) : (
              filtered.map((item, i) => (
                <UjianCard
                  key={item.id}
                  item={item}
                  index={i}
                  onStart={item.status === "berlangsung" ? onStartExam : undefined}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
