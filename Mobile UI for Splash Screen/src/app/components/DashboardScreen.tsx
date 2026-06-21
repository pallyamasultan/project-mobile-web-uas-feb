import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UjianPage } from "./UjianPage";
import { RiwayatPage } from "./RiwayatPage";
import { ProfilPage } from "./ProfilPage";

// ── Icons ────────────────────────────────────────────────────────────────────

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M3 9.5L11 3L19 9.5V19C19 19.55 18.55 20 18 20H14V15H8V20H4C3.45 20 3 19.55 3 19V9.5Z"
        fill={active ? "#0B1E3D" : "none"}
        stroke={active ? "#0B1E3D" : "#94a3b8"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExamIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect
        x="4" y="2" width="14" height="18" rx="2"
        fill={active ? "#0B1E3D" : "none"}
        stroke={active ? "#0B1E3D" : "#94a3b8"}
        strokeWidth="1.6"
      />
      <path d="M8 7h6M8 11h6M8 15h4" stroke={active ? "#fff" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HistoryIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke={active ? "#0B1E3D" : "#94a3b8"} strokeWidth="1.6" fill={active ? "#0B1E3D" : "none"} />
      <path d="M11 7v4l3 2" stroke={active ? "#fff" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="3.5" fill={active ? "#0B1E3D" : "none"} stroke={active ? "#0B1E3D" : "#94a3b8"} strokeWidth="1.6" />
      <path d="M4 19c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke={active ? "#0B1E3D" : "#94a3b8"} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function LockOpenIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="2.5" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 7V4.5a2.5 2.5 0 0 1 5 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
      <path d="M6.5 4v2.5l2 1.2" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="7.5" r="5" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
      <path d="M6.5 4.5v3l2 1" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 1h3" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PaperIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
      <path d="M4 5h5M4 7.5h3" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ── Exam data ─────────────────────────────────────────────────────────────────

type ExamStatus = "berlangsung" | "belum";
// minutesLate: how many minutes past the scheduled start. 0 = on time, ≥15 = locked by supervisor.

interface Exam {
  id: string;
  subject: string;
  code: string;
  sks: number;
  time: string;
  duration: string;
  questions: string;
  status: ExamStatus;
  color: string;
  minutesLate: number; // 0 = on time; ≥15 = supervisor-locked
}

const EXAMS: Exam[] = [
  {
    id: "akt301",
    subject: "Akuntansi Manajemen",
    code: "AKT301",
    sks: 3,
    time: "08:00 – 10:00 WIB",
    duration: "120 menit",
    questions: "5 Soal Esai",
    status: "berlangsung",
    color: "#1d4ed8",
    minutesLate: 18, // demo: 18 min late → locked
  },
  {
    id: "ekm201",
    subject: "Ekonomi Mikro",
    code: "EKM201",
    sks: 3,
    time: "13:00 – 14:30 WIB",
    duration: "90 menit",
    questions: "4 Soal Esai",
    status: "belum",
    color: "#6366f1",
    minutesLate: 0,
  },
  {
    id: "mnk303",
    subject: "Manajemen Keuangan",
    code: "MNK303",
    sks: 3,
    time: "15:00 – 16:30 WIB",
    duration: "90 menit",
    questions: "4 Soal Esai",
    status: "belum",
    color: "#8b5cf6",
    minutesLate: 0,
  },
];

const NAV_TABS = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "ujian", label: "Ujian", Icon: ExamIcon },
  { id: "riwayat", label: "Riwayat", Icon: HistoryIcon },
  { id: "profil", label: "Profil", Icon: ProfileIcon },
] as const;

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ExamStatus }) {
  if (status === "berlangsung") {
    return (
      <div
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
        style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}
      >
        <motion.div
          className="rounded-full"
          style={{ width: 7, height: 7, background: "#22c55e", flexShrink: 0 }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span style={{ color: "#16a34a", fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
          BERLANGSUNG
        </span>
      </div>
    );
  }
  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
      style={{ background: "rgba(148,163,184,0.12)", border: "1px solid rgba(148,163,184,0.25)" }}
    >
      <span style={{ fontSize: 11 }}>⏳</span>
      <span style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, letterSpacing: 0.4 }}>
        BELUM DIMULAI
      </span>
    </div>
  );
}

function ExamCard({ exam, index, onStart, onLate }: { exam: Exam; index: number; onStart?: () => void; onLate?: () => void }) {
  const active   = exam.status === "berlangsung";
  const isLocked = active && exam.minutesLate >= 15; // ≥15 min late → supervisor code required

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.38, ease: "easeOut" }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#ffffff",
        boxShadow: isLocked
          ? "0 4px 20px rgba(239,68,68,0.12), 0 1px 4px rgba(0,0,0,0.06)"
          : active
          ? "0 4px 20px rgba(29,78,216,0.12), 0 1px 4px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Color accent bar */}
      <div style={{ height: 3, background: isLocked ? "linear-gradient(90deg,#ef4444,#b91c1c)" : active ? `linear-gradient(90deg,${exam.color},#60a5fa)` : "#e2e8f0" }} />

      <div className="p-4">
        {/* Top row: subject + badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <p
              style={{
                color: "#0f172a",
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: 2,
              }}
            >
              {exam.subject}
            </p>
            <div className="flex items-center gap-2">
              <span
                className="rounded-md px-1.5 py-0.5"
                style={{
                  background: active ? "rgba(29,78,216,0.08)" : "rgba(148,163,184,0.12)",
                  color: active ? "#1d4ed8" : "#64748b",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                {exam.code}
              </span>
              <span style={{ color: "#94a3b8", fontSize: 11 }}>{exam.sks} SKS</span>
            </div>
          </div>
          {isLocked ? (
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 flex-shrink-0"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
              <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
                <rect x="0.5" y="4.5" width="8" height="5" rx="1" stroke="#ef4444" strokeWidth="1" fill="none"/>
                <path d="M2.5 4.5V3a2 2 0 0 1 4 0v1.5" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" fill="none"/>
              </svg>
              <span style={{ color: "#ef4444", fontSize: 10, fontWeight: 700 }}>TERLAMBAT</span>
            </div>
          ) : (
            <StatusBadge status={exam.status} />
          )}
        </div>

        {/* Meta info row */}
        <div
          className="rounded-xl flex items-center gap-0 mb-4 overflow-hidden"
          style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}
        >
          <div className="flex items-center gap-1.5 px-3 py-2.5 flex-1">
            <ClockIcon />
            <span style={{ color: "#475569", fontSize: 12, fontWeight: 500 }}>{exam.time}</span>
          </div>
          <div style={{ width: 1, height: 28, background: "#e2e8f0" }} />
          <div className="flex items-center gap-1.5 px-3 py-2.5">
            <TimerIcon />
            <span style={{ color: "#475569", fontSize: 12 }}>{exam.duration}</span>
          </div>
          <div style={{ width: 1, height: 28, background: "#e2e8f0" }} />
          <div className="flex items-center gap-1.5 px-3 py-2.5">
            <PaperIcon />
            <span style={{ color: "#475569", fontSize: 12 }}>{exam.questions}</span>
          </div>
        </div>

        {/* Action buttons — three states */}
        {active && !isLocked && (
          /* On time → direct entry */
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2 rounded-xl overflow-hidden relative"
            style={{ height: 44, background: "linear-gradient(135deg,#0B1E3D,#1a3a6e)", border: "none", cursor: "pointer", boxShadow: "0 3px 12px rgba(11,30,61,0.3)" }}
          >
            <motion.div className="absolute inset-y-0"
              style={{ width: 50, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }}
              animate={{ x: [-50, 340] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2 }}
            />
            <LockOpenIcon />
            <span style={{ color: "#F5C518", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>MULAI UJIAN</span>
          </motion.button>
        )}

        {active && isLocked && (
          /* ≥15 min late → supervisor code required */
          <div className="flex flex-col gap-2">
            {/* Locked warning strip */}
            <div className="rounded-xl px-3 py-2.5 flex items-center gap-2"
              style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="6" width="11" height="7" rx="1.5" stroke="#ef4444" strokeWidth="1.3" fill="none"/>
                <path d="M4 6V4.5a3 3 0 0 1 6 0V6" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                <circle cx="7" cy="9.5" r="1" fill="#ef4444"/>
              </svg>
              <div className="flex-1">
                <p style={{ color: "#ef4444", fontSize: 11, fontWeight: 700, lineHeight: 1.3 }}>Akses Dikunci — Terlambat {exam.minutesLate} menit</p>
                <p style={{ color: "rgba(239,68,68,0.65)", fontSize: 10, lineHeight: 1.4 }}>Diperlukan kode dari pengawas untuk masuk.</p>
              </div>
            </div>

            {/* Supervisor code button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onLate}
              className="w-full flex items-center justify-center gap-2 rounded-xl overflow-hidden relative"
              style={{ height: 44, background: "linear-gradient(135deg,#7f1d1d,#b91c1c)", border: "none", cursor: "pointer", boxShadow: "0 3px 12px rgba(185,28,28,0.3)" }}
            >
              <motion.div className="absolute inset-y-0"
                style={{ width: 50, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }}
                animate={{ x: [-50, 340] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.5 }}
              />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="6" width="11" height="7" rx="1.5" stroke="#fff" strokeWidth="1.3" fill="none"/>
                <path d="M4 6V4.5a3 3 0 0 1 6 0V6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
              </svg>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>Gunakan Kode Pengawas</span>
            </motion.button>
          </div>
        )}

        {!active && (
          /* Not started yet → disabled */
          <div className="w-full flex items-center justify-center gap-2 rounded-xl"
            style={{ height: 44, background: "#f1f5f9", border: "1px solid #e2e8f0", cursor: "not-allowed" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#cbd5e1" strokeWidth="1.4" fill="none"/>
              <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
            </svg>
            <span style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>BELUM DIMULAI</span>
          </div>
        )}
      </div>
    </motion.div>

  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function DashboardScreen({ onStartExam, onLateEntry, onLogout }: { onStartExam: () => void; onLateEntry: () => void; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="size-full flex flex-col" style={{ background: "#f1f5f9" }}>

      {/* ── Compact profile header — hidden on profil tab ─────────────────── */}
      {activeTab !== "profil" && <div
        style={{
          background: "linear-gradient(135deg,#0B1E3D 0%,#162d52 100%)",
          padding: "10px 16px 14px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, rgba(245,197,24,0.06) 0%, transparent 60%)" }} />
        <motion.div
          className="relative flex items-center gap-3"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Avatar */}
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0 relative"
            style={{ width: 40, height: 40, background: "linear-gradient(135deg,#1a3a6e,#2563eb)", border: "1.5px solid rgba(245,197,24,0.45)" }}
          >
            <span style={{ color: "#F5C518", fontSize: 14, fontWeight: 800 }}>AF</span>
            <div className="absolute rounded-full" style={{ width: 9, height: 9, background: "#22c55e", border: "1.5px solid #0B1E3D", bottom: -1, right: -1 }} />
          </div>
          {/* Info — all on one line */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, lineHeight: 1 }}>Ahmad Fauzi</p>
              <div className="rounded-full px-1.5 py-0.5" style={{ background: "rgba(245,197,24,0.15)", border: "1px solid rgba(245,197,24,0.28)" }}>
                <span style={{ color: "#F5C518", fontSize: 9, fontWeight: 600 }}>Akuntansi · Sem 4</span>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 2 }}>2024010001</p>
          </div>
          {/* Bell */}
          <button style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 7, cursor: "pointer", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M9 2a5 5 0 0 1 5 5v3l1.5 2H2.5L4 10V7a5 5 0 0 1 5-5Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" fill="none" />
              <path d="M7 14a2 2 0 0 0 4 0" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" fill="none" />
            </svg>
          </button>
        </motion.div>
      </div>}

      {/* ── Tab content ─────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === "ujian" && (
          <motion.div key="ujian" className="flex-1 overflow-hidden"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }} style={{ paddingBottom: 68 }}>
            <UjianPage onStartExam={onStartExam} />
          </motion.div>
        )}
        {activeTab === "riwayat" && (
          <motion.div key="riwayat" className="flex-1 overflow-hidden"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }} style={{ paddingBottom: 68 }}>
            <RiwayatPage />
          </motion.div>
        )}
        {activeTab === "profil" && (
          <motion.div key="profil" className="flex-1 overflow-hidden"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }} style={{ paddingBottom: 68 }}>
            <ProfilPage onLogout={onLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Home tab scrollable body ─────────────────────────────────────────── */}
      {activeTab === "home" && (
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {/* Overlap card pull-up */}
        <div
          className="mx-4 rounded-2xl px-4 py-3 flex items-center justify-between -mt-4 relative z-10"
          style={{
            background: "#ffffff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <div>
            <p style={{ color: "#0f172a", fontSize: 14, fontWeight: 700 }}>
              📋 Ujian Hari Ini
            </p>
            <p style={{ color: "#94a3b8", fontSize: 11, marginTop: 1 }}>{today}</p>
          </div>
          <div
            className="flex items-center justify-center rounded-xl px-3 py-1.5"
            style={{ background: "rgba(11,30,61,0.07)" }}
          >
            <span style={{ color: "#0B1E3D", fontSize: 12, fontWeight: 700 }}>
              {EXAMS.length} Ujian
            </span>
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-3 mx-4 mt-3">
          {[
            { label: "Berlangsung", value: "1", color: "#22c55e", bg: "rgba(34,197,94,0.08)" },
            { label: "Belum Dimulai", value: "2", color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
            { label: "Selesai", value: "0", color: "#94a3b8", bg: "rgba(148,163,184,0.1)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 flex flex-col items-center gap-1"
              style={{ background: stat.bg, border: `1px solid ${stat.color}22` }}
            >
              <span style={{ color: stat.color, fontSize: 20, fontWeight: 800, lineHeight: 1 }}>
                {stat.value}
              </span>
              <span style={{ color: stat.color, fontSize: 10, fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Exam cards list */}
        <div className="flex flex-col gap-3 px-4 mt-4">
          {EXAMS.map((exam, i) => (
            <ExamCard key={exam.id} exam={exam} index={i}
              onStart={exam.status === "berlangsung" ? onStartExam : undefined}
              onLate={exam.status === "berlangsung" ? onLateEntry : undefined}
            />
          ))}
        </div>
      </div>
      )}

      {/* ── Bottom navigation ───────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-2"
        style={{
          height: 68,
          background: "#ffffff",
          borderTop: "1px solid #f1f5f9",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        {NAV_TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex flex-col items-center justify-center gap-1 relative"
              style={{
                flex: 1,
                height: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                paddingTop: 10,
              }}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 rounded-full"
                  style={{ height: 3, width: 24, background: "#0B1E3D" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon active={active} />
              <span
                style={{
                  color: active ? "#0B1E3D" : "#94a3b8",
                  fontSize: 10,
                  fontWeight: active ? 700 : 400,
                  letterSpacing: 0.2,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
