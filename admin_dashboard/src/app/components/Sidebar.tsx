import { Link, useLocation } from "react-router";
import {
  LayoutDashboard, BookOpen, Users, FileQuestion, ClipboardList, Monitor,
  Award, FileText, Settings, LogOut
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Menu Kuliah", path: "/kuliah" },
  { icon: Users, label: "Mahasiswa", path: "/mahasiswa" },
  { icon: FileQuestion, label: "Bank Soal", path: "/bank-soal" },
  { icon: ClipboardList, label: "Jadwal Ujian", path: "/jadwal-ujian" },
  { icon: ClipboardList, label: "Buat Ujian", path: "/ujian/buat" },
  { icon: Monitor, label: "Monitoring", path: "/monitoring" },
  { icon: Award, label: "Penilaian", path: "/penilaian" },
  { icon: FileText, label: "Rekap Nilai", path: "/rekap-nilai" },
  { icon: FileText, label: "Laporan", path: "/laporan" },
  { icon: Settings, label: "Pengaturan", path: "/pengaturan" },
];

export function Sidebar() {
  const location = useLocation();

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
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700, color: "#fff"
          }}>A</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>Admin Panel</div>
            <div style={{ color: "#60a5fa", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em" }}>FEB UNSAP</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                backgroundColor: isActive ? "#3b82f6" : "transparent",
                color: isActive ? "#fff" : "#94a3b8",
                fontWeight: isActive ? 600 : 400,
                fontSize: 13, textDecoration: "none", transition: "all 0.15s", width: "100%", boxSizing: "border-box"
              }}
            >
              <Icon size={16} />
              {item.label}
            </Link>
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
          <Link to="/monitoring" style={{ display: "block", textAlign: "center", textDecoration: "none", marginTop: 8, width: "100%", padding: "5px 0", borderRadius: 6, border: "1px solid rgba(34,197,94,0.35)", backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e", fontSize: 11, fontWeight: 600, cursor: "pointer", boxSizing: "border-box" }}>
            Pantau Sekarang
          </Link>
        </div>
      </div>

      {/* Logout */}
      <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 8 }}>
        <Link
          to="/login"
          style={{
            display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
            borderRadius: 8, border: "none", cursor: "pointer", backgroundColor: "transparent",
            color: "#f87171", fontSize: 13, width: "100%", textDecoration: "none", boxSizing: "border-box"
          }}
        >
          <LogOut size={16} />
          Log Out
        </Link>
      </div>
    </aside>
  );
}
