import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProfilPageProps { onLogout: () => void; }

// ── Mini score bar chart ──────────────────────────────────────────────────────

const SCORE_HISTORY = [
  { label: "MAT", score: 65, sem: 2 },
  { label: "PTM", score: 72, sem: 3 },
  { label: "EKK", score: 91, sem: 3 },
  { label: "PJK", score: 85, sem: 4 },
  { label: "STB", score: 78, sem: 4 },
];

function ScoreChart() {
  const max = 100;
  return (
    <div className="flex items-end justify-between gap-1.5 px-1" style={{ height: 64 }}>
      {SCORE_HISTORY.map((s, i) => {
        const h = Math.round((s.score / max) * 56);
        const color = s.score >= 80 ? "#22c55e" : s.score >= 70 ? "#f59e0b" : "#ef4444";
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <span style={{ color: "#94a3b8", fontSize: 8 }}>{s.score}</span>
            <motion.div
              className="w-full rounded-t-md"
              style={{ height: h, background: color, opacity: 0.85 }}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            />
            <span style={{ color: "#94a3b8", fontSize: 8 }}>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── IPK ring ─────────────────────────────────────────────────────────────────

function IpkRing({ ipk }: { ipk: number }) {
  const pct  = ipk / 4.0;
  const r    = 28;
  const circ = 2 * Math.PI * r;
  const color = ipk >= 3.5 ? "#22c55e" : ipk >= 3.0 ? "#f59e0b" : "#ef4444";
  const grade = ipk >= 3.5 ? "Cum Laude" : ipk >= 3.0 ? "Sangat Memuaskan" : "Memuaskan";
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
        <svg width="72" height="72" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
          <circle cx="36" cy="36" r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
          <motion.circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - pct) }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <div className="flex flex-col items-center" style={{ zIndex: 1 }}>
          <span style={{ color, fontSize: 16, fontWeight: 800, lineHeight: 1 }}>{ipk.toFixed(2)}</span>
          <span style={{ color: "#94a3b8", fontSize: 8 }}>/ 4.00</span>
        </div>
      </div>
      <span style={{ color, fontSize: 9, fontWeight: 600 }}>{grade}</span>
    </div>
  );
}

// ── Confirm modal ─────────────────────────────────────────────────────────────

function ConfirmModal({ title, message, confirmLabel, confirmColor, onConfirm, onCancel }: {
  title: string; message: string; confirmLabel: string;
  confirmColor: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <motion.div className="absolute inset-0 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 60, backdropFilter: "blur(4px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onCancel}>
      <motion.div className="w-full rounded-t-3xl p-6"
        style={{ background: "#fff", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}
        initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
        transition={{ type: "spring", stiffness: 360, damping: 34 }}
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-center mb-4">
          <div className="rounded-full" style={{ width: 40, height: 4, background: "#e2e8f0" }} />
        </div>
        <p style={{ color: "#0f172a", fontSize: 16, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>{title}</p>
        <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", lineHeight: 1.6, marginBottom: 24 }}>{message}</p>
        <div className="flex flex-col gap-2.5">
          <motion.button whileTap={{ scale: 0.97 }} onClick={onConfirm}
            className="w-full flex items-center justify-center rounded-2xl"
            style={{ height: 50, background: confirmColor, border: "none", cursor: "pointer" }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{confirmLabel}</span>
          </motion.button>
          <button onClick={onCancel}
            className="w-full flex items-center justify-center rounded-2xl"
            style={{ height: 50, background: "#f1f5f9", border: "none", cursor: "pointer" }}>
            <span style={{ color: "#475569", fontSize: 14, fontWeight: 500 }}>Batal</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Reusable row ──────────────────────────────────────────────────────────────

function MenuRow({ icon, label, value, sub, accent, onClick, rightEl }: {
  icon: React.ReactNode; label: string; value?: string; sub?: string;
  accent?: string; onClick?: () => void; rightEl?: React.ReactNode;
}) {
  return (
    <motion.div whileTap={onClick ? { scale: 0.985 } : {}} onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5"
      style={{ cursor: onClick ? "pointer" : "default" }}>
      <div className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{ width: 36, height: 36, background: accent ? `${accent}15` : "#f1f5f9" }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ color: "#0f172a", fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{label}</p>
        {value && <p style={{ color: "#64748b", fontSize: 11, marginTop: 1 }}>{value}</p>}
        {sub   && <p style={{ color: "#94a3b8", fontSize: 10, marginTop: 1 }}>{sub}</p>}
      </div>
      {rightEl ?? (onClick && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3L9 7L5 11" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ))}
    </motion.div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#f8fafc", margin: "0 16px" }} />;
}

function SectionCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="mx-4 rounded-2xl overflow-hidden"
      style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      {title && (
        <div className="px-4 pt-3 pb-1.5" style={{ borderBottom: "1px solid #f8fafc" }}>
          <p style={{ color: "#94a3b8", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{title}</p>
        </div>
      )}
      {children}
    </div>
  );
}

// ── Recent activity ───────────────────────────────────────────────────────────

const ACTIVITY = [
  { icon: "📝", text: "Ujian AKT301 dikumpulkan",  time: "Hari ini, 09:58",   color: "#22c55e" },
  { icon: "🔐", text: "Login berhasil",             time: "Hari ini, 08:12",   color: "#3b82f6" },
  { icon: "⚠️",  text: "Pelanggaran terdeteksi",   time: "Kemarin, 10:10",    color: "#f59e0b" },
  { icon: "✅", text: "Ujian STB202 selesai",       time: "12 Jun, 10:02",     color: "#22c55e" },
  { icon: "🔐", text: "Login dari perangkat baru", time: "12 Jun, 07:55",     color: "#6366f1" },
];

// ── Main export ───────────────────────────────────────────────────────────────

export function ProfilPage({ onLogout }: ProfilPageProps) {
  const [showLogout,    setShowLogout]    = useState(false);
  const [showSwitch,    setShowSwitch]    = useState(false);
  const [showEditName,  setShowEditName]  = useState(false);
  const [editName,      setEditName]      = useState("Ahmad Fauzi");
  const [displayName,   setDisplayName]   = useState("Ahmad Fauzi");
  const [notifications, setNotifications] = useState(true);
  const [showActivity,  setShowActivity]  = useState(false);

  const handleLogout = () => { setShowLogout(false); onLogout(); };
  const handleSwitch = () => { setShowSwitch(false); onLogout(); };

  return (
    <div className="size-full flex flex-col relative" style={{ background: "#f1f5f9" }}>

      {/* ── Hero header ──────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg,#0B1E3D 0%,#162d52 100%)", padding: "18px 16px 28px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 85% 20%, rgba(245,197,24,0.09) 0%, transparent 55%), radial-gradient(circle at 15% 80%, rgba(37,99,235,0.12) 0%, transparent 50%)" }} />

        <div className="flex items-center gap-4 relative">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="flex items-center justify-center rounded-2xl"
              style={{ width: 66, height: 66, background: "linear-gradient(135deg,#1a3a6e,#2563eb)", border: "2.5px solid rgba(245,197,24,0.55)", boxShadow: "0 0 24px rgba(245,197,24,0.18)" }}>
              <span style={{ color: "#F5C518", fontSize: 26, fontWeight: 800 }}>AF</span>
            </div>
            {/* edit badge */}
            <motion.div whileTap={{ scale: 0.9 }} onClick={() => setShowEditName(true)}
              className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full"
              style={{ width: 24, height: 24, background: "#F5C518", border: "2px solid #0B1E3D", cursor: "pointer" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M7.5 1.5L9.5 3.5 3.5 9.5H1.5V7.5L7.5 1.5Z" stroke="#0B1E3D" strokeWidth="1.1" strokeLinejoin="round" fill="none"/>
              </svg>
            </motion.div>
          </div>

          <div className="flex-1 min-w-0">
            <p style={{ color: "#fff", fontSize: 18, fontWeight: 800, lineHeight: 1.2 }}>{displayName}</p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>NIM: 2024010001</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <div className="flex items-center gap-1 rounded-full px-2 py-0.5"
                style={{ background: "rgba(34,197,94,0.18)", border: "1px solid rgba(34,197,94,0.3)" }}>
                <div className="rounded-full" style={{ width: 5, height: 5, background: "#22c55e" }} />
                <span style={{ color: "#4ade80", fontSize: 9, fontWeight: 600 }}>Aktif</span>
              </div>
              <div className="rounded-full px-2 py-0.5"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 9 }}>Akuntansi · Sem 4</span>
              </div>
              <div className="rounded-full px-2 py-0.5"
                style={{ background: "rgba(245,197,24,0.12)", border: "1px solid rgba(245,197,24,0.25)" }}>
                <span style={{ color: "#F5C518", fontSize: 9 }}>FEB UNSAP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-4 gap-2 mt-4 relative">
          {[
            { val: "7",   label: "Ujian"    },
            { val: "5",   label: "Lulus"    },
            { val: "81",  label: "Rata-rata"},
            { val: "48",  label: "SKS"      },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center rounded-xl py-2"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <span style={{ color: "#F5C518", fontSize: 16, fontWeight: 800, lineHeight: 1 }}>{s.val}</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 8, marginTop: 2 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll body ──────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pt-4" style={{ paddingBottom: 90 }}>

        {/* ── IPK + Score chart ─────────────────────────────────────────────── */}
        <div className="mx-4 rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <div className="px-4 pt-3 pb-1.5" style={{ borderBottom: "1px solid #f8fafc" }}>
            <p style={{ color: "#94a3b8", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Prestasi Akademik</p>
          </div>
          <div className="flex items-center gap-4 px-4 py-4">
            <IpkRing ipk={3.42} />
            <div className="flex-1">
              <p style={{ color: "#0f172a", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Riwayat Nilai</p>
              <ScoreChart />
            </div>
          </div>
          {/* Progress SKS */}
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span style={{ color: "#64748b", fontSize: 11 }}>Progress SKS</span>
              <span style={{ color: "#0B1E3D", fontSize: 11, fontWeight: 700 }}>48 / 144 SKS</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 7, background: "#f1f5f9" }}>
              <motion.div className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg,#0B1E3D,#2563eb)" }}
                initial={{ width: 0 }} animate={{ width: "33%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              />
            </div>
            <p style={{ color: "#94a3b8", fontSize: 10, marginTop: 4 }}>33% dari total 144 SKS program studi</p>
          </div>
        </div>

        {/* ── Informasi Akademik ────────────────────────────────────────────── */}
        <SectionCard title="Informasi Akademik">
          <MenuRow accent="#2563eb" label="Program Studi" value="S1 Akuntansi" sub="Jalur Reguler"
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L1.5 5.5V7C1.5 10.5 4.2 13.7 8 14.5C11.8 13.7 14.5 10.5 14.5 7V5.5L8 2Z" stroke="#2563eb" strokeWidth="1.3" fill="rgba(37,99,235,0.12)" strokeLinejoin="round"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#7c3aed" label="Semester & Tahun" value="Semester 4 · 2025/2026"
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2.5" stroke="#7c3aed" strokeWidth="1.3" fill="rgba(124,58,237,0.1)"/><path d="M5 7h6M5 9.5h4" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#0891b2" label="Dosen Wali" value="Dr. Hendra Kusuma, M.Ak"
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#0891b2" strokeWidth="1.3" fill="rgba(8,145,178,0.1)"/><path d="M2.5 14c0-3.5 2.5-5.5 5.5-5.5s5.5 2 5.5 5.5" stroke="#0891b2" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#059669" label="Kelas" value="AKT-4B" sub="Kapasitas 32 mahasiswa"
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13V7l5-4 5 4v6" stroke="#059669" strokeWidth="1.3" fill="rgba(5,150,105,0.1)" strokeLinejoin="round"/><rect x="6" y="9" width="4" height="4" rx="0.5" stroke="#059669" strokeWidth="1.1" fill="none"/></svg>}
          />
        </SectionCard>

        {/* ── Informasi Akun ────────────────────────────────────────────────── */}
        <SectionCard title="Informasi Akun">
          <MenuRow accent="#0B1E3D" label="Nama Lengkap" value={displayName} onClick={() => setShowEditName(true)}
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#0B1E3D" strokeWidth="1.3" fill="rgba(11,30,61,0.1)"/><path d="M2.5 14c0-3.5 2.5-5.5 5.5-5.5s5.5 2 5.5 5.5" stroke="#0B1E3D" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#475569" label="NIM" value="2024010001" sub="Nomor Induk Mahasiswa"
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="#475569" strokeWidth="1.3" fill="rgba(71,85,105,0.1)"/><path d="M5 7h6M5 9.5h4" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#475569" label="Password" value="••••••••••" sub="Tanggal lahir sebagai password"
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="5" width="11" height="8.5" rx="1.5" stroke="#475569" strokeWidth="1.3" fill="rgba(71,85,105,0.1)"/><path d="M5.5 5V4a2.5 2.5 0 0 1 5 0v1" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#16a34a" label="Status Verifikasi"
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L2 5v4c0 3.5 2.5 6 6 7 3.5-1 6-3.5 6-7V5L8 2Z" stroke="#16a34a" strokeWidth="1.3" fill="rgba(22,163,74,0.1)" strokeLinejoin="round"/><path d="M5.5 8L7.2 9.8L11 6" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            rightEl={<div className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}><div className="rounded-full" style={{ width: 5, height: 5, background: "#22c55e" }}/><span style={{ color: "#16a34a", fontSize: 10, fontWeight: 600 }}>Terverifikasi</span></div>}
          />
        </SectionCard>

        {/* ── Aktivitas Terakhir ────────────────────────────────────────────── */}
        <div className="mx-4 rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <div onClick={() => setShowActivity(v => !v)}
            className="flex items-center justify-between px-4 pt-3 pb-3 cursor-pointer"
            style={{ borderBottom: showActivity ? "1px solid #f8fafc" : "none" }}>
            <p style={{ color: "#94a3b8", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Aktivitas Terakhir</p>
            <motion.svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              animate={{ rotate: showActivity ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <path d="M3 5L7 9L11 5" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>
          <AnimatePresence>
            {showActivity && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: "hidden" }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3"
                    style={{ borderTop: i > 0 ? "1px solid #f8fafc" : "none" }}>
                    <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                      style={{ width: 34, height: 34, background: `${a.color}12`, fontSize: 14 }}>
                      {a.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ color: "#0f172a", fontSize: 12, fontWeight: 500 }}>{a.text}</p>
                      <p style={{ color: "#94a3b8", fontSize: 10, marginTop: 1 }}>{a.time}</p>
                    </div>
                    <div className="rounded-full" style={{ width: 6, height: 6, background: a.color, flexShrink: 0 }} />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Preferensi ───────────────────────────────────────────────────── */}
        <SectionCard title="Preferensi">
          <MenuRow accent="#f59e0b" label="Notifikasi Ujian" sub="Pengingat jadwal & hasil nilai"
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a4 4 0 0 1 4 4v2.5l1 1.5H3l1-1.5V6a4 4 0 0 1 4-4Z" stroke="#f59e0b" strokeWidth="1.3" fill="rgba(245,158,11,0.1)"/><path d="M6.5 12a1.5 1.5 0 0 0 3 0" stroke="#f59e0b" strokeWidth="1.2" fill="none"/></svg>}
            rightEl={
              <motion.div onClick={() => setNotifications(v => !v)}
                className="relative rounded-full flex-shrink-0"
                style={{ width: 42, height: 24, background: notifications ? "#0B1E3D" : "#e2e8f0", cursor: "pointer" }}>
                <motion.div className="absolute top-1 rounded-full"
                  style={{ width: 16, height: 16, background: notifications ? "#F5C518" : "#fff" }}
                  animate={{ left: notifications ? 22 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.div>
            }
          />
          <Divider/>
          <MenuRow accent="#6366f1" label="Bahasa Aplikasi" value="Bahasa Indonesia" onClick={() => {}}
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#6366f1" strokeWidth="1.3" fill="rgba(99,102,241,0.1)"/><path d="M8 2.5a9 9 0 0 1 0 11M2.5 8h11" stroke="#6366f1" strokeWidth="1.1" strokeLinecap="round" fill="none"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#0891b2" label="Tema Aplikasi" value="Default (Navy)" onClick={() => {}}
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#0891b2" strokeWidth="1.3" fill="rgba(8,145,178,0.1)"/><path d="M8 4v4l3 2" stroke="#0891b2" strokeWidth="1.2" strokeLinecap="round"/></svg>}
          />
        </SectionCard>

        {/* ── Keamanan ──────────────────────────────────────────────────────── */}
        <SectionCard title="Keamanan & Privasi">
          <MenuRow accent="#7c3aed" label="Ganti Password" value="Ubah tanggal lahir sebagai password" onClick={() => {}}
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="7" width="12" height="8" rx="1.5" stroke="#7c3aed" strokeWidth="1.3" fill="rgba(124,58,237,0.1)"/><path d="M5 7V5.5a3 3 0 0 1 6 0V7" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round" fill="none"/><circle cx="8" cy="11" r="1" fill="#7c3aed"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#0B1E3D" label="Riwayat Login" value="Terakhir: Hari ini 09:41 WIB" sub="Perangkat: Mobile Chrome" onClick={() => {}}
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#0B1E3D" strokeWidth="1.3" fill="rgba(11,30,61,0.08)"/><path d="M8 5.5v2.5l2 1.2" stroke="#0B1E3D" strokeWidth="1.2" strokeLinecap="round"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#dc2626" label="Pelanggaran Ujian" value="Total 2× pelanggaran" sub="1× Ringan · 1× Sedang" onClick={() => {}}
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L2 13h12L8 2Z" stroke="#dc2626" strokeWidth="1.3" fill="rgba(220,38,38,0.1)" strokeLinejoin="round"/><path d="M8 7v3M8 11.5v.5" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round"/></svg>}
          />
          <Divider/>
          <MenuRow accent="#475569" label="Tentang Aplikasi" value="FEB UNSAP Exam v1.0.0" sub="Build: Jun 2026"
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="3" stroke="#475569" strokeWidth="1.3" fill="rgba(71,85,105,0.08)"/><path d="M8 7v4M8 5.5v.5" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg>}
          />
        </SectionCard>

        {/* ── Account actions ───────────────────────────────────────────────── */}
        <div className="mx-4 flex flex-col gap-2.5">
          <motion.div whileTap={{ scale: 0.97 }} onClick={() => setShowSwitch(true)}
            className="flex items-center gap-3 rounded-2xl px-4 py-4"
            style={{ background: "#fff", border: "1px solid #e0e7ff", cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-center rounded-xl"
              style={{ width: 38, height: 38, background: "rgba(99,102,241,0.1)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="6" cy="6" r="2.5" stroke="#6366f1" strokeWidth="1.3" fill="none"/>
                <circle cx="12" cy="6" r="2.5" stroke="#6366f1" strokeWidth="1.3" fill="none"/>
                <path d="M1.5 15c0-2.5 2-4 4.5-4" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                <path d="M11 11l2 2 4-4" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p style={{ color: "#4f46e5", fontSize: 14, fontWeight: 600 }}>Masuk Akun Lain</p>
              <p style={{ color: "#818cf8", fontSize: 11, marginTop: 1 }}>Ganti ke akun mahasiswa berbeda</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3L9 7L5 11" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.div>

          <motion.div whileTap={{ scale: 0.97 }} onClick={() => setShowLogout(true)}
            className="flex items-center gap-3 rounded-2xl px-4 py-4"
            style={{ background: "#fff3f3", border: "1px solid #fecaca", cursor: "pointer" }}>
            <div className="flex items-center justify-center rounded-xl"
              style={{ width: 38, height: 38, background: "rgba(239,68,68,0.1)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 16H3.5A1.5 1.5 0 0 1 2 14.5v-11A1.5 1.5 0 0 1 3.5 2H7" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M12 13l4-4-4-4M16 9H7" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p style={{ color: "#dc2626", fontSize: 14, fontWeight: 600 }}>Keluar</p>
              <p style={{ color: "#f87171", fontSize: 11, marginTop: 1 }}>Logout dari sesi aktif</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3L9 7L5 11" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.div>
        </div>

        <p style={{ color: "#cbd5e1", fontSize: 10, textAlign: "center", paddingBottom: 8 }}>
          FEB UNSAP · Sistem Ujian Digital · v1.0.0
        </p>
      </div>

      {/* ── Edit name sheet ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showEditName && (
          <motion.div className="absolute inset-0 flex items-end justify-center"
            style={{ background: "rgba(0,0,0,0.45)", zIndex: 60, backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowEditName(false)}>
            <motion.div className="w-full rounded-t-3xl p-6"
              style={{ background: "#fff" }}
              initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
              onClick={e => e.stopPropagation()}>
              <div className="flex justify-center mb-4">
                <div className="rounded-full" style={{ width: 40, height: 4, background: "#e2e8f0" }} />
              </div>
              <p style={{ color: "#0f172a", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Edit Nama Tampilan</p>
              <p style={{ color: "#94a3b8", fontSize: 12, marginBottom: 16 }}>Nama akan ditampilkan di profil dan watermark ujian.</p>
              <input value={editName} onChange={e => setEditName(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a", outline: "none", boxSizing: "border-box", background: "#f8fafc" }}
                autoFocus
              />
              <div className="flex gap-2.5 mt-4">
                <button onClick={() => setShowEditName(false)}
                  className="flex-1 flex items-center justify-center rounded-xl"
                  style={{ height: 46, background: "#f1f5f9", border: "none", cursor: "pointer" }}>
                  <span style={{ color: "#64748b", fontSize: 13, fontWeight: 500 }}>Batal</span>
                </button>
                <motion.button whileTap={{ scale: 0.97 }}
                  onClick={() => { setDisplayName(editName); setShowEditName(false); }}
                  className="flex-1 flex items-center justify-center rounded-xl"
                  style={{ height: 46, background: "linear-gradient(135deg,#0B1E3D,#1a3a6e)", border: "none", cursor: "pointer" }}>
                  <span style={{ color: "#F5C518", fontSize: 13, fontWeight: 700 }}>Simpan</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Confirm modals ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLogout && <ConfirmModal title="Keluar dari Akun?" message={`Anda akan logout dari akun ${displayName}. Sesi aktif akan diakhiri.`} confirmLabel="Ya, Keluar" confirmColor="#dc2626" onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showSwitch && <ConfirmModal title="Ganti Akun?" message="Anda akan diarahkan ke halaman login untuk masuk dengan akun mahasiswa lain." confirmLabel="Masuk Akun Lain" confirmColor="#4f46e5" onConfirm={handleSwitch} onCancel={() => setShowSwitch(false)} />}
      </AnimatePresence>
    </div>
  );
}
