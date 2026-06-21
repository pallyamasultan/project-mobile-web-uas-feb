import React, { useState } from "react";
import { Search, Filter, AlertTriangle, EyeOff, Ban, Clock, WifiOff, Smartphone, ShieldAlert } from "lucide-react";

// --- DUMMY DATA ---
const stats = {
  total: 120,
  online: 112,
  offline: 5,
  violation: 14,
  submit: 45
};

const studentsData = [
  { id: "2024010001", name: "Ahmad Fauzi", status: "Online", progress: "3/5 Soal", vio: 0, sanction: "Normal" },
  { id: "2024010002", name: "Budi Hartono", status: "Online-Warn", progress: "2/5 Soal", vio: 1, sanction: "Warn-1" },
  { id: "2024010005", name: "Citra Lestari", status: "Blur", progress: "4/5 Soal", vio: 2, sanction: "Blur42s" },
  { id: "2024010012", name: "Dian Pratama", status: "Keluar", progress: "1/5 Soal", vio: 3, sanction: "Killed" },
  { id: "2024010020", name: "Eka Saputra", status: "Off", progress: "3/5 Soal", vio: 0, sanction: "R-Lost" },
];

const logsData = [
  { time: "09:36:12", name: "Eka Saputra", msg: "CONNECTION_LOST (Low)", desc: "Sesi tersimpan offline di SQLite lokal.", icon: WifiOff, color: "#f59e0b" },
  { time: "09:36:01", name: "Dian Pratama", msg: "SCREEN_RECORD_ATTEMPT (Critical)", desc: "Pemicu: Hukuman 3 (Remote Killed)", icon: ShieldAlert, color: "#ef4444" },
  { time: "09:35:42", name: "Citra Lestari", msg: "APP_SWITCH_EXTENDED (High)", desc: "Pemicu: Hukuman 2 (Screen Blurred 60s)", icon: Smartphone, color: "#f97316" },
  { time: "09:35:10", name: "Budi Hartono", msg: "SCREENSHOT_ATTEMPT (Medium)", desc: "Pemicu: Hukuman 1 (Warning Popup Sent)", icon: AlertTriangle, color: "#f59e0b" },
];
// ------------------

// --- HELPER COMPONENTS ---
function StatusBadge({ status }: { status: string }) {
  if (status === "Online") return <span style={{ padding: "4px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, backgroundColor: "#dcfce7", color: "#16a34a" }}>🟢 Online</span>;
  if (status === "Online-Warn") return <span style={{ padding: "4px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, backgroundColor: "#fef3c7", color: "#d97706", border: "1px solid #fde68a" }}>🟡 Online</span>;
  if (status === "Blur") return <span style={{ padding: "4px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, backgroundColor: "#ffedd5", color: "#ea580c" }}>🟠 Blur</span>;
  if (status === "Keluar") return <span style={{ padding: "4px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, backgroundColor: "#fee2e2", color: "#dc2626" }}>🔴 Keluar</span>;
  if (status === "Off") return <span style={{ padding: "4px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, backgroundColor: "#f3f4f6", color: "#6b7280" }}>⚪ Off</span>;
  return null;
}

export function Monitoring() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
      {/* HEADER STATS */}
      <div style={{
        display: "flex", gap: "16px", flexWrap: "wrap", backgroundColor: "#fff", padding: "16px 20px",
        borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderRight: "1px solid #e5e7eb", paddingRight: "16px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Total Peserta:</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#1a2035" }}>{stats.total}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderRight: "1px solid #e5e7eb", paddingRight: "16px" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#22c55e" }} />
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Online:</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#16a34a" }}>{stats.online}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderRight: "1px solid #e5e7eb", paddingRight: "16px" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#eab308" }} />
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Offline:</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#ca8a04" }}>{stats.offline}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderRight: "1px solid #e5e7eb", paddingRight: "16px" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#f97316" }} />
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Pelanggaran:</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#ea580c" }}>{stats.violation}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Sudah Submit:</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#1a2035" }}>{stats.submit}</span>
        </div>
      </div>

      {/* SPLIT LAYOUT */}
      <div style={{ display: "flex", gap: "20px", flex: 1, alignItems: "flex-start" }}>
        
        {/* LEFT COLUMN: TABLE (70%) */}
        <div style={{ flex: "7", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#1a2035", margin: 0 }}>Aktivitas Mahasiswa (Live)</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ position: "relative" }}>
                <Search size={14} color="#9ca3af" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Cari NIM/Nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ padding: "8px 12px 8px 32px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "13px", outline: "none", width: "200px" }}
                />
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", backgroundColor: "#fff", fontSize: "13px", color: "#374151", cursor: "pointer" }}>
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", color: "#6b7280", fontWeight: 600 }}>
                  <th style={{ padding: "12px 20px", whiteSpace: "nowrap" }}>NIM</th>
                  <th style={{ padding: "12px 20px" }}>Nama Mahasiswa</th>
                  <th style={{ padding: "12px 20px" }}>Status</th>
                  <th style={{ padding: "12px 20px" }}>Progress</th>
                  <th style={{ padding: "12px 20px" }}>Vio</th>
                  <th style={{ padding: "12px 20px" }}>Sanksi</th>
                  <th style={{ padding: "12px 20px", textAlign: "right" }}>Aksi Pengawas</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((std, i) => (
                  <tr key={std.id} style={{
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: std.status === "Keluar" ? "#fef2f2" : std.status === "Blur" ? "#fff7ed" : std.status === "Online-Warn" ? "#fffbeb" : "#fff",
                    transition: "background-color 0.2s"
                  }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#1a2035" }}>{std.id}</td>
                    <td style={{ padding: "16px 20px", color: "#374151", fontWeight: 500 }}>{std.name}</td>
                    <td style={{ padding: "16px 20px" }}><StatusBadge status={std.status} /></td>
                    <td style={{ padding: "16px 20px", color: "#6b7280" }}>{std.progress}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontWeight: 700, color: std.vio >= 3 ? "#dc2626" : std.vio > 0 ? "#ea580c" : "#16a34a" }}>{std.vio}</span>
                    </td>
                    <td style={{ padding: "16px 20px", color: "#6b7280", fontSize: "12px" }}>{std.sanction}</td>
                    <td style={{ padding: "16px 20px", display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                      {std.status !== "Keluar" ? (
                        <>
                          <button title="Kirim Peringatan" style={{ width: 32, height: 32, borderRadius: 6, border: "1px solid #fde68a", backgroundColor: "#fffbeb", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <AlertTriangle size={16} />
                          </button>
                          <button title="Force Blur Layar 60s" style={{ width: 32, height: 32, borderRadius: 6, border: "1px solid #fed7aa", backgroundColor: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <EyeOff size={16} />
                          </button>
                          <button title="Hentikan Ujian (Kill Switch)" style={{ width: 32, height: 32, borderRadius: 6, border: "1px solid #fecaca", backgroundColor: "#fef2f2", color: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <Ban size={16} />
                          </button>
                        </>
                      ) : (
                        <span style={{ fontSize: "11px", color: "#9ca3af", fontStyle: "italic", paddingTop: 8 }}>Sesi Berakhir</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: STREAM LOG (30%) */}
        <div style={{ flex: "3", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "600px" }}>
          <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#1a2035", margin: 0 }}>Stream Log Pelanggaran</h2>
          </div>
          
          <div style={{ padding: "20px", overflowY: "auto", flex: 1, backgroundColor: "#fafafa" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
              {/* Vertical line connecting logs */}
              <div style={{ position: "absolute", left: "15px", top: 0, bottom: 0, width: "2px", backgroundColor: "#e5e7eb", zIndex: 0 }} />
              
              {logsData.map((log, i) => {
                const Icon = log.icon;
                return (
                  <div key={i} style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#fff", border: `2px solid ${log.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} color={log.color} />
                    </div>
                    <div style={{ flex: 1, paddingBottom: "16px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a2035" }}>{log.name}</span>
                        <span style={{ fontSize: "11px", color: "#6b7280", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={10} /> {log.time}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: log.color, marginBottom: "4px" }}>
                        {log.msg}
                      </div>
                      <div style={{ fontSize: "12px", color: "#4b5563", lineHeight: 1.4 }}>
                        {log.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button style={{ width: "100%", padding: "10px", marginTop: "10px", borderRadius: "8px", border: "1px dashed #d1d5db", backgroundColor: "transparent", color: "#6b7280", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
              Muat Log Terdahulu
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
