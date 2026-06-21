import React, { useState } from "react";
import { Download, Printer, Search, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";

// --- DUMMY DATA ---
const stats = {
  avg: 82.5,
  max: 98,
  min: 45
};

const studentsScore = [
  { id: "2024010001", name: "Ahmad Fauzi", benar: 4, salah: 1, nilai: 80, ket: "Lulus", status: "Aman" },
  { id: "2024010002", name: "Budi Hartono", benar: 3, salah: 2, nilai: 65, ket: "Lulus", status: "Aman" },
  { id: "2024010005", name: "Citra Lestari", benar: 2, salah: 3, nilai: 45, ket: "Remedial", status: "Aman" },
  { id: "2024010012", name: "Dian Pratama", benar: 0, salah: 5, nilai: 0, ket: "Diskualifikasi", status: "Melanggar (Kill)" },
  { id: "2024010020", name: "Eka Saputra", benar: 5, salah: 0, nilai: 98, ket: "Lulus", status: "Aman" },
];
// ------------------

export function RekapNilai() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
      {/* HEADER CONTROLS */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: "16px 20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: 0, paddingRight: "16px", borderRight: "1px solid #e2e8f0" }}>
            Rekapitulasi Nilai
          </h2>
          <select style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", color: "#334155", outline: "none", backgroundColor: "#f8fafc" }}>
            <option>Semester Genap 2025/2026</option>
            <option>Semester Ganjil 2025/2026</option>
          </select>
          <select style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", color: "#334155", outline: "none", backgroundColor: "#f8fafc" }}>
            <option>UAS Akuntansi Manajemen (AKT301)</option>
            <option>UTS Akuntansi Manajemen (AKT301)</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "6px", backgroundColor: "#10b981", color: "#fff", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            <Download size={16} /> Export Excel
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "6px", backgroundColor: "#ef4444", color: "#fff", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            <Printer size={16} /> Cetak PDF
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1, backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Minus size={24} color="#3b82f6" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Nilai Rata-rata Kelas</p>
            <h3 style={{ margin: 0, fontSize: "24px", color: "#0f172a", fontWeight: 800 }}>{stats.avg}</h3>
          </div>
        </div>
        <div style={{ flex: 1, backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TrendingUp size={24} color="#22c55e" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Nilai Tertinggi</p>
            <h3 style={{ margin: 0, fontSize: "24px", color: "#16a34a", fontWeight: 800 }}>{stats.max}</h3>
          </div>
        </div>
        <div style={{ flex: 1, backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TrendingDown size={24} color="#ef4444" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Nilai Terendah</p>
            <h3 style={{ margin: 0, fontSize: "24px", color: "#dc2626", fontWeight: 800 }}>{stats.min}</h3>
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: 0 }}>Daftar Nilai Mahasiswa</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Cari NIM/Nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "8px 12px 8px 32px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none", width: "200px" }}
              />
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff", fontSize: "13px", color: "#475569", cursor: "pointer" }}>
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>
        
        <div style={{ overflowX: "auto", flex: 1 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 600 }}>
                <th style={{ padding: "14px 20px" }}>NIM</th>
                <th style={{ padding: "14px 20px" }}>Nama Mahasiswa</th>
                <th style={{ padding: "14px 20px", textAlign: "center" }}>Benar</th>
                <th style={{ padding: "14px 20px", textAlign: "center" }}>Salah</th>
                <th style={{ padding: "14px 20px", textAlign: "center" }}>Nilai Akhir</th>
                <th style={{ padding: "14px 20px" }}>Keterangan</th>
                <th style={{ padding: "14px 20px" }}>Integritas</th>
                <th style={{ padding: "14px 20px", textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {studentsScore.map((std, i) => (
                <tr key={std.id} style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: std.ket === "Diskualifikasi" ? "#fef2f2" : "#fff", transition: "background-color 0.2s" }}>
                  <td style={{ padding: "14px 20px", fontWeight: 600, color: "#1e293b" }}>{std.id}</td>
                  <td style={{ padding: "14px 20px", color: "#334155", fontWeight: 500 }}>{std.name}</td>
                  <td style={{ padding: "14px 20px", textAlign: "center", color: "#16a34a", fontWeight: 600 }}>{std.benar}</td>
                  <td style={{ padding: "14px 20px", textAlign: "center", color: "#dc2626", fontWeight: 600 }}>{std.salah}</td>
                  <td style={{ padding: "14px 20px", textAlign: "center", fontWeight: 800, color: std.nilai >= 70 ? "#16a34a" : std.nilai === 0 ? "#dc2626" : "#f59e0b", fontSize: "15px" }}>
                    {std.nilai}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ 
                      padding: "4px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: 600,
                      backgroundColor: std.ket === "Lulus" ? "#dcfce7" : std.ket === "Remedial" ? "#fef3c7" : "#fee2e2",
                      color: std.ket === "Lulus" ? "#16a34a" : std.ket === "Remedial" ? "#d97706" : "#dc2626"
                    }}>
                      {std.ket}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", color: std.status.includes("Aman") ? "#16a34a" : "#dc2626", fontWeight: 500, fontSize: "12px" }}>
                    {std.status}
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <button style={{ color: "#3b82f6", background: "none", border: "none", fontSize: "12px", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
                      Detail Jawaban
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ padding: "12px 20px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc" }}>
          <span style={{ fontSize: "12px", color: "#64748b" }}>Menampilkan 1-5 dari 120 Mahasiswa</span>
          <div style={{ display: "flex", gap: "4px" }}>
            <button style={{ padding: "6px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", backgroundColor: "#fff", cursor: "pointer", fontSize: "12px" }}>Prev</button>
            <button style={{ padding: "6px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", backgroundColor: "#0f172a", color: "#fff", cursor: "pointer", fontSize: "12px" }}>1</button>
            <button style={{ padding: "6px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", backgroundColor: "#fff", cursor: "pointer", fontSize: "12px" }}>2</button>
            <button style={{ padding: "6px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", backgroundColor: "#fff", cursor: "pointer", fontSize: "12px" }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
