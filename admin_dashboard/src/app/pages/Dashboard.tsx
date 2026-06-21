import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileQuestion,
  ClipboardList,
  Monitor,
  Award,
  FileText,
  Settings,
  LogOut,
  Bell,
  Calendar,
  Plus,
  Activity,
  BarChart2,
  TrendingUp,
  Smartphone,
  Globe,
  ChevronRight,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const examActivityData = [
  { day: "Sen", audit1: 28, audit2: 22, manKeu: 18, ekonomi: 14 },
  { day: "Sel", audit1: 35, audit2: 30, manKeu: 25, ekonomi: 20 },
  { day: "Rab", audit1: 42, audit2: 28, manKeu: 32, ekonomi: 18 },
  { day: "Kam", audit1: 38, audit2: 35, manKeu: 28, ekonomi: 24 },
  { day: "Jum", audit1: 50, audit2: 42, manKeu: 36, ekonomi: 30 },
  { day: "Sab", audit1: 30, audit2: 25, manKeu: 20, ekonomi: 15 },
  { day: "Min", audit1: 18, audit2: 15, manKeu: 12, ekonomi: 8 },
];

const studentStatusData = [
  { name: "Lulus", value: 58, color: "#22c55e" },
  { name: "Belum Ujian", value: 27, color: "#f97316" },
  { name: "Tidak Lulus", value: 8, color: "#ef4444" },
  { name: "Absen", value: 7, color: "#9ca3af" },
];

const userTypeData = [
  { name: "Mahasiswa", value: 44.5, color: "#3b82f6" },
  { name: "Dosen", value: 38.7, color: "#a855f7" },
  { name: "Staff", value: 11.4, color: "#f97316" },
  { name: "Admin", value: 5.4, color: "#22c55e" },
];

const platformData = [
  { name: "Android", pct: 45.4, color: "#22c55e", icon: "📱" },
  { name: "iOS", pct: 32.1, color: "#3b82f6", icon: "🍎" },
  { name: "Chrome", pct: 18.7, color: "#f97316", icon: "🌐" },
  { name: "Firefox", pct: 3.2, color: "#a855f7", icon: "🦊" },
  { name: "Safari", pct: 0.6, color: "#6b7280", icon: "🧭" },
];

const activeExams = [
  { name: "Audit 1", time: "08:00 - 10:00", color: "#3b82f6", participants: 42 },
  { name: "Audit 2", time: "10:00 - 12:00", color: "#22c55e", participants: 38 },
  { name: "Manajemen Keuangan", time: "13:00 - 15:00", color: "#f97316", participants: 55 },
  { name: "Ekonomi Pembangunan", time: "15:00 - 17:00", color: "#a855f7", participants: 31 },
];

const recentActivities = [
  { name: "Budi Hartono", action: "Menyelesaikan ujian Audit 1", time: "23/10/2024", initials: "BH", color: "#3b82f6" },
  { name: "Siti Rahayu", action: "Mendaftar ujian Manajemen Keuangan", time: "23/10/2024", initials: "SR", color: "#22c55e" },
  { name: "Ahmad Fauzi", action: "Mengupload berkas ke Bank Soal", time: "22/10/2024", initials: "AF", color: "#f97316" },
  { name: "Dewi Lestari", action: "Login ke sistem", time: "22/10/2024", initials: "DL", color: "#a855f7" },
  { name: "Eko Prasetyo", action: "Menyelesaikan ujian Ekonomi Pembangunan", time: "21/10/2024", initials: "EP", color: "#ef4444" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "Menu Kuliah" },
  { icon: Users, label: "Mahasiswa" },
  { icon: FileQuestion, label: "Bank Soal" },
  { icon: ClipboardList, label: "Ujian" },
  { icon: Monitor, label: "Monitoring" },
  { icon: Award, label: "Penilaian" },
  { icon: FileText, label: "Laporan" },
  { icon: Settings, label: "Pengaturan" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Sidebar({ activePage, onNavigate }: { activePage: string; onNavigate: (page: string) => void }) {
  return (
    <aside
      style={{
        width: 220,
        minWidth: 220,
        backgroundColor: "#1a2035",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            A
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>
              Admin Panel
            </div>
            <div style={{ color: "#60a5fa", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em" }}>
              FEB UNSAP
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                backgroundColor: isActive ? "#3b82f6" : "transparent",
                color: isActive ? "#fff" : "#94a3b8",
                fontWeight: isActive ? 600 : 400,
                fontSize: 13,
                textAlign: "left",
                transition: "all 0.15s",
                width: "100%",
              }}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Live Monitoring status */}
      <div style={{ padding: "12px 12px 0" }}>
        <div style={{ backgroundColor: "#0f172a", borderRadius: 10, padding: "12px", border: "1px solid rgba(34,197,94,0.25)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e" }}>Live Monitoring Aktif</span>
          </div>
          <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.5 }}>3 ujian berlangsung</div>
          <button style={{ marginTop: 8, width: "100%", padding: "5px 0", borderRadius: 6, border: "1px solid rgba(34,197,94,0.35)", backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
            Pantau Sekarang
          </button>
        </div>
      </div>

      {/* Logout */}
      <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 8 }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            backgroundColor: "transparent",
            color: "#f87171",
            fontSize: 13,
            width: "100%",
          }}
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
}

function Topbar({ title }: { title: string }) {
  return (
    <header
      style={{
        height: 64,
        backgroundColor: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1a2035", margin: 0 }}>{title}</h1>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "#6b7280",
            backgroundColor: "#f5f7fa",
            padding: "6px 12px",
            borderRadius: 8,
          }}
        >
          <Calendar size={14} />
          10 Nov 2024
        </div>

        {/* Bell */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.08)",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Bell size={16} color="#6b7280" />
          </button>
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </span>
        </div>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            F
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2035", lineHeight: 1.2 }}>
              Fardy Rafi Fauzy
            </div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function WelcomeBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #dbeafe 0%, #ede9fe 50%, #dbeafe 100%)",
        borderRadius: 16,
        padding: "24px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid rgba(59,130,246,0.15)",
        marginBottom: 24,
      }}
    >
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2035", margin: "0 0 6px" }}>
          Selamat Datang Kembali, Fardy Rafi Fauzy 👋
        </h2>
        <p style={{ fontSize: 13, color: "#4b5563", margin: "0 0 12px", maxWidth: 480 }}>
          Sistem Ujian FEB UNSAP aktif dan berjalan normal. Pantau aktivitas ujian, kelola soal, dan monitor mahasiswa secara real-time.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#6b7280" }}>Mahasiswa Aktif:</span>
          <span
            style={{
              backgroundColor: "#3b82f6",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              padding: "2px 10px",
              borderRadius: 20,
            }}
          >
            22 / 3105
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          style={{
            padding: "9px 18px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Plus size={14} />
          Buat Ujian
        </button>
        <button
          style={{
            padding: "9px 18px",
            backgroundColor: "transparent",
            color: "#3b82f6",
            border: "1.5px solid #3b82f6",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Activity size={14} />
          Live Monitoring
        </button>
        <button
          style={{
            padding: "9px 18px",
            backgroundColor: "transparent",
            color: "#6b7280",
            border: "1.5px solid #d1d5db",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <FileText size={14} />
          Export Laporan
        </button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  iconColor,
  icon: Icon,
  ring,
  ringColor,
}: {
  title: string;
  value: string;
  subtitle: string;
  iconColor: string;
  icon?: React.ElementType;
  ring?: number;
  ringColor?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500, marginBottom: 8, letterSpacing: "0.02em" }}>
            {title}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#1a2035", lineHeight: 1 }}>
            {value}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>{subtitle}</div>
        </div>
        {ring !== undefined ? (
          <div style={{ position: "relative", width: 52, height: 52 }}>
            <svg width={52} height={52} viewBox="0 0 52 52">
              <circle cx={26} cy={26} r={20} fill="none" stroke="#f0f2f5" strokeWidth={5} />
              <circle
                cx={26}
                cy={26}
                r={20}
                fill="none"
                stroke={ringColor || "#3b82f6"}
                strokeWidth={5}
                strokeDasharray={`${(ring / 100) * 125.6} 125.6`}
                strokeLinecap="round"
                transform="rotate(-90 26 26)"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: ringColor || "#3b82f6",
              }}
            >
              {ring}%
            </div>
          </div>
        ) : Icon ? (
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: `${iconColor}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={22} color={iconColor} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ExamActivityChart() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        flex: 2,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a2035", margin: 0 }}>
          Aktivitas Ujian 7 Hari Terakhir
        </h3>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "Audit 1", color: "#3b82f6" },
            { label: "Audit 2", color: "#22c55e" },
            { label: "Man. Keuangan", color: "#f97316" },
            { label: "Ekonomi Pemb.", color: "#a855f7" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6b7280" }}>
              <div style={{ width: 10, height: 3, borderRadius: 2, backgroundColor: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={examActivityData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Line key="audit1"  type="monotone" dataKey="audit1"  stroke="#3b82f6" strokeWidth={2} dot={false} name="Audit 1" />
          <Line key="audit2"  type="monotone" dataKey="audit2"  stroke="#22c55e" strokeWidth={2} dot={false} name="Audit 2" />
          <Line key="manKeu"  type="monotone" dataKey="manKeu"  stroke="#f97316" strokeWidth={2} dot={false} name="Man. Keuangan" />
          <Line key="ekonomi" type="monotone" dataKey="ekonomi" stroke="#a855f7" strokeWidth={2} dot={false} name="Ekonomi Pemb." />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ActiveExamsCard() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a2035", margin: 0 }}>
          Ujian Aktif Saat Ini
        </h3>
        <span
          style={{
            backgroundColor: "#dcfce7",
            color: "#16a34a",
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 20,
          }}
        >
          {activeExams.length} Aktif
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {activeExams.map((exam) => (
          <div
            key={exam.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderRadius: 8,
              backgroundColor: "#f9fafb",
              borderLeft: `3px solid ${exam.color}`,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2035" }}>{exam.name}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{exam.time}</div>
            </div>
            <div
              style={{
                backgroundColor: `${exam.color}15`,
                color: exam.color,
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 20,
              }}
            >
              {exam.participants} org
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivityCard() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a2035", margin: 0 }}>
          Aktivitas Terbaru
        </h3>
        <button style={{ fontSize: 11, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
          Lihat Semua
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {recentActivities.map((act) => (
          <div key={act.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: `${act.color}20`,
                color: act.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 11,
                flexShrink: 0,
              }}
            >
              {act.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#1a2035", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {act.name}
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {act.action}
              </div>
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af", flexShrink: 0 }}>{act.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({
  data,
  centerLabel,
  centerValue,
}: {
  data: { name: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
}) {
  return (
    <div style={{ position: "relative", width: 140, height: 140 }}>
      <PieChart width={140} height={140}>
        <Pie
          data={data}
          cx={65}
          cy={65}
          innerRadius={44}
          outerRadius={62}
          paddingAngle={2}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, i) => (
            <Cell key={`donut-cell-${entry.name}-${i}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: "#1a2035", lineHeight: 1 }}>{centerValue}</div>
        {centerLabel && <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{centerLabel}</div>}
      </div>
    </div>
  );
}

function StudentStatusCard() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a2035", margin: "0 0 16px" }}>
        Ringkasan Status Mahasiswa
      </h3>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <DonutChart data={studentStatusData} centerLabel="Total" centerValue="200" />
        <div style={{ flex: 1 }}>
          {studentStatusData.map((item) => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: item.color }} />
                <span style={{ fontSize: 12, color: "#4b5563" }}>{item.name}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1a2035" }}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserTypeCard() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a2035", margin: "0 0 16px" }}>
        Pengguna Berdasarkan Jenis
      </h3>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <DonutChart data={userTypeData} centerLabel="Pengguna" centerValue="34" />
        <div style={{ flex: 1 }}>
          {userTypeData.map((item) => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: item.color }} />
                <span style={{ fontSize: 12, color: "#4b5563" }}>{item.name}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1a2035" }}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformCard() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a2035", margin: "0 0 16px" }}>
        Perangkat &amp; Platform
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {platformData.map((p) => (
          <div key={p.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>{p.icon}</span>
                <span style={{ fontSize: 13, color: "#1a2035", fontWeight: 500 }}>{p.name}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1a2035" }}>{p.pct}%</span>
            </div>
            <div style={{ height: 5, backgroundColor: "#f0f2f5", borderRadius: 4 }}>
              <div
                style={{
                  height: 5,
                  backgroundColor: p.color,
                  borderRadius: 4,
                  width: `${p.pct}%`,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 24,
        padding: "16px 0",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 12, color: "#6b7280" }}>
        <span style={{ fontWeight: 600, color: "#1a2035" }}>Sistem Ujian FEB UNSAP</span>
        {" "}—{" "}Harga + Transparansi + Akuntabilitas
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[
          { label: "Server Time", value: "10 Nov 2024, 09:41" },
          { label: "Status Server", value: "🟢 Online" },
          { label: "Database", value: "3,105 entri" },
          { label: "Mahasiswa Aktif", value: "22" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>{s.label}:</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#1a2035" }}>{s.value}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────


export function Dashboard() {
  return (
    <>
      <WelcomeBanner />

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <StatCard title="Ujian Hari Ini" value="12" subtitle="Dari 60 Ujian" iconColor="#f97316" icon={ClipboardList} />
        <StatCard title="Total Mahasiswa" value="185" subtitle="Terdaftar Aktif" iconColor="#3b82f6" icon={Users} />
        <StatCard title="Ujian Aktif" value="24" subtitle="46 Aktif Sekarang" iconColor="#f97316" icon={TrendingUp} />
        <StatCard title="Tingkat Kelulusan" value="76%" subtitle="Dari total peserta" iconColor="#22c55e" ring={76} ringColor="#22c55e" />
        <StatCard title="Skor Sistem" value="87%" subtitle="Performa sistem" iconColor="#3b82f6" ring={87} ringColor="#3b82f6" />
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <ExamActivityChart />
        <ActiveExamsCard />
        <RecentActivityCard />
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
        <StudentStatusCard />
        <UserTypeCard />
        <PlatformCard />
      </div>

      <Footer />
    </>
  );
}
