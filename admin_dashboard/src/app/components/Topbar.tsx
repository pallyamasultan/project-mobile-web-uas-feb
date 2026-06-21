import { Calendar, Bell } from "lucide-react";
import { useLocation } from "react-router";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/kuliah": "Menu Kuliah",
  "/mahasiswa": "Mahasiswa",
  "/bank-soal": "Bank Soal",
  "/ujian": "Ujian",
  "/monitoring": "Monitoring",
  "/penilaian": "Penilaian",
  "/laporan": "Laporan",
  "/pengaturan": "Pengaturan",
};

export function Topbar() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Halaman";

  return (
    <header
      style={{
        height: 64, backgroundColor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", position: "sticky", top: 0, zIndex: 40,
      }}
    >
      <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1a2035", margin: 0 }}>{title}</h1>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", backgroundColor: "#f5f7fa", padding: "6px 12px", borderRadius: 8 }}>
          <Calendar size={14} />
          10 Nov 2024
        </div>
        <div style={{ position: "relative" }}>
          <button style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Bell size={16} color="#6b7280" />
          </button>
          <span style={{ position: "absolute", top: -2, right: -2, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>F</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2035", lineHeight: 1.2 }}>Fardy Rafi Fauzy</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
