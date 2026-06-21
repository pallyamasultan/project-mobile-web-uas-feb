import React, { useState } from "react";
import { Save, Send, ShieldCheck, MapPin, ListChecks, Calendar as CalIcon, Clock, BookOpen, AlertTriangle } from "lucide-react";

export function BuatUjian() {
  const [geofence, setGeofence] = useState(200);
  const [blurDuration, setBlurDuration] = useState(60);
  const [tolerance, setTolerance] = useState(3);
  const [shuffle, setShuffle] = useState(true);

  return (
    <div style={{ paddingBottom: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a2035", margin: "0 0 4px 0" }}>Buat Ujian Baru</h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>Rancang ujian, atur keamanan, dan pilih soal dari bank soal.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "8px", backgroundColor: "#fff", border: "1px solid #d1d5db", color: "#374151", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
            <Save size={16} /> Simpan Draft
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "8px", backgroundColor: "#3b82f6", border: "none", color: "#fff", fontWeight: 600, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 6px rgba(59, 130, 246, 0.2)" }}>
            <Send size={16} /> Publikasikan Ujian
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        
        {/* LEFT COLUMN: Main Form */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* KARTU 1: INFORMASI DASAR */}
          <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", gap: "8px" }}>
              <BookOpen size={18} color="#3b82f6" />
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#1a2035", margin: 0 }}>Informasi Dasar Ujian</h2>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Nama / Judul Ujian</label>
                <input type="text" placeholder="Contoh: UAS Akuntansi Manajemen Ganjil 2026" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Mata Kuliah</label>
                <select style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", backgroundColor: "#fff" }}>
                  <option>Pilih Mata Kuliah...</option>
                  <option>AKT301 - Akuntansi Manajemen</option>
                  <option>AKT302 - Akuntansi Keuangan</option>
                  <option>MJM101 - Pengantar Manajemen</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Tanggal Mulai</label>
                  <div style={{ position: "relative" }}>
                    <CalIcon size={16} color="#9ca3af" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                    <input type="date" style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Jam Mulai WIB</label>
                  <div style={{ position: "relative" }}>
                    <Clock size={16} color="#9ca3af" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                    <input type="time" style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Durasi (Menit)</label>
                  <input type="number" defaultValue={120} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
                </div>
              </div>

            </div>
          </div>

          {/* KARTU 3: PILIH SOAL */}
          <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", backgroundColor: "#f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ListChecks size={18} color="#10b981" />
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#1a2035", margin: 0 }}>Soal Ujian Terpilih</h2>
              </div>
              <button style={{ padding: "6px 12px", borderRadius: "6px", backgroundColor: "#10b981", border: "none", color: "#fff", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                + Tambah dari Bank Soal
              </button>
            </div>
            
            <div style={{ padding: "20px" }}>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", color: "#6b7280" }}>
                      <th style={{ padding: "10px 16px", width: "40px" }}>No</th>
                      <th style={{ padding: "10px 16px" }}>Kode</th>
                      <th style={{ padding: "10px 16px" }}>Ringkasan Soal</th>
                      <th style={{ padding: "10px 16px", width: "80px" }}>Bobot</th>
                      <th style={{ padding: "10px 16px", width: "60px", textAlign: "center" }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "12px 16px", color: "#9ca3af" }}>1</td>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#374151" }}>QB-001</td>
                      <td style={{ padding: "12px 16px", color: "#4b5563" }}>Jelaskan konsep ABC costing secara rinci...</td>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#3b82f6" }}>20 Pts</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <button style={{ color: "#ef4444", border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}>×</button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "12px 16px", color: "#9ca3af" }}>2</td>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#374151" }}>QB-002</td>
                      <td style={{ padding: "12px 16px", color: "#4b5563" }}>Hitunglah margin kontribusi perusahaan...</td>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#3b82f6" }}>30 Pts</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <button style={{ color: "#ef4444", border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}>×</button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", color: "#9ca3af" }}>3</td>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#374151" }}>QB-005</td>
                      <td style={{ padding: "12px 16px", color: "#4b5563" }}>Studi Kasus PT. Sinar Jaya tentang rasio...</td>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#3b82f6" }}>50 Pts</td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <button style={{ color: "#ef4444", border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}>×</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px", fontSize: "14px", fontWeight: 600, color: "#1a2035" }}>
                Total Poin: <span style={{ color: "#10b981", marginLeft: "8px" }}>100 / 100</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Parameter Keamanan */}
        <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #fed7aa", boxShadow: "0 4px 12px rgba(234, 88, 12, 0.08)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #fed7aa", backgroundColor: "#fff7ed", display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={18} color="#ea580c" />
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#ea580c", margin: 0 }}>Parameter Keamanan</h2>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Geofence */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin size={14} color="#6b7280" /> Radius Geofence Kampus
                </label>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#ea580c" }}>{geofence} Meter</span>
              </div>
              <input 
                type="range" min="50" max="1000" step="50" 
                value={geofence} onChange={(e) => setGeofence(parseInt(e.target.value))}
                style={{ width: "100%", cursor: "pointer", accentColor: "#ea580c" }} 
              />
              <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "6px", lineHeight: 1.4 }}>Mahasiswa tidak dapat mengakses ujian jika berada di luar radius {geofence}m dari titik pusat FEB UNSAP.</p>
            </div>

            <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: 0 }} />

            {/* Hukuman Toleransi */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: "6px" }}>
                  <AlertTriangle size={14} color="#6b7280" /> Toleransi Pelanggaran
                </label>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#ef4444" }}>Maks {tolerance} Kali</span>
              </div>
              <input 
                type="range" min="1" max="5" step="1" 
                value={tolerance} onChange={(e) => setTolerance(parseInt(e.target.value))}
                style={{ width: "100%", cursor: "pointer", accentColor: "#ef4444" }} 
              />
              <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "6px", lineHeight: 1.4 }}>Jika mahasiswa melanggar lebih dari {tolerance} kali (misal: buka aplikasi lain), sistem akan memicu <b>Hukuman Level 3 (Remote Kill)</b> otomatis.</p>
            </div>

            <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: 0 }} />

            {/* Blur Layar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Durasi Sanksi Blur Layar</label>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input 
                  type="number" 
                  value={blurDuration} onChange={(e) => setBlurDuration(parseInt(e.target.value))}
                  style={{ width: "80px", padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", textAlign: "center" }} 
                />
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Detik</span>
              </div>
            </div>

            <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: 0 }} />

            {/* Shuffle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block" }}>Acak Urutan Soal</label>
                <span style={{ fontSize: "11px", color: "#6b7280" }}>Mencegah mencontek berurutan</span>
              </div>
              <div 
                onClick={() => setShuffle(!shuffle)}
                style={{ 
                  width: "44px", height: "24px", borderRadius: "12px", 
                  backgroundColor: shuffle ? "#10b981" : "#e5e7eb", 
                  position: "relative", cursor: "pointer", transition: "0.2s" 
                }}
              >
                <div style={{ 
                  width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#fff", 
                  position: "absolute", top: "2px", left: shuffle ? "22px" : "2px", 
                  transition: "0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" 
                }} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
