import React, { useState } from "react";
import { Search, Upload, Download, Edit, X, BookOpen, BarChart, FileText } from "lucide-react";

// --- DUMMY DATA (Figma Style) ---
const questionsData = [
  { id: "AK001.01", mk: "Pengantar Akuntansi", tingkat: "Mudah", topik: "Konsep Dasar", tipe: "Pilihan Ganda", tanya: "Apa yang dimaksud dengan per...", digunakan: "3x", status: "Aktif", fullTanya: "Apa yang dimaksud dengan persamaan dasar akuntansi? Jelaskan komponen-komponen utamanya (Aset, Liabilitas, Ekuitas)." },
  { id: "AK001.02", mk: "Pengantar Akuntansi", tingkat: "Sedang", topik: "Siklus Akuntansi", tipe: "Essay", tanya: "Jelaskan tahapan siklus akuntan...", digunakan: "1x", status: "Aktif", fullTanya: "Jelaskan tahapan siklus akuntansi secara berurutan mulai dari identifikasi transaksi hingga pembuatan jurnal penutup!" },
  { id: "MN001.01", mk: "Manajemen Meneng...", tingkat: "Mudah", topik: "Fungsi Manaje...", tipe: "Pilihan Ganda", tanya: "Manakah yang termasuk fungsi ...", digunakan: "5x", status: "Aktif", fullTanya: "Manakah yang termasuk fungsi dasar manajemen menurut Henry Fayol? A. Planning, B. Organizing, C. Actuating, D. Controlling." },
  { id: "MK002.01", mk: "Manajemen Keuangan", tingkat: "Sulit", topik: "Analisis Laporan", tipe: "Essay", tanya: "Analisis rasio keuangan perusah...", digunakan: "2x", status: "Tidak Aktif", fullTanya: "Lakukan analisis komprehensif terhadap rasio likuiditas dan solvabilitas PT. XYZ berdasarkan laporan keuangan tahun 2025 yang terlampir!" },
  { id: "EK001.01", mk: "Pengantar Ekonomi ...", tingkat: "Sedang", topik: "Permintaan & ...", tipe: "True/False", tanya: "Ketika harga naik, maka jumlah ...", digunakan: "0x", status: "Aktif", fullTanya: "Hukum permintaan menyatakan bahwa: Ketika harga suatu barang naik, maka jumlah barang yang diminta akan turun (ceteris paribus). Benar atau Salah?" },
  { id: "AK002.01", mk: "Audit Keuangan", tingkat: "Sulit", topik: "Prosedur Audit", tipe: "Essay", tanya: "Bagaimana prosedur audit yang...", digunakan: "4x", status: "Aktif", fullTanya: "Bagaimana prosedur audit yang tepat untuk mendeteksi adanya fraud (kecurangan) dalam pengakuan pendapatan perusahaan manufaktur?" },
];

export function BankSoal() {
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);

  // Helper untuk warna level kesulitan
  const getTingkatColor = (tingkat: string) => {
    if (tingkat === "Mudah") return "#16a34a"; // Green
    if (tingkat === "Sedang") return "#f59e0b"; // Orange
    if (tingkat === "Sulit") return "#dc2626"; // Red
    return "#374151";
  };

  // Helper untuk warna tipe soal
  const getTipeColor = (tipe: string) => {
    if (tipe === "Pilihan Ganda") return { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" }; // Blue
    if (tipe === "Essay") return { bg: "#faf5ff", color: "#9333ea", border: "#e9d5ff" }; // Purple
    if (tipe === "True/False") return { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" }; // Orange
    return { bg: "#f3f4f6", color: "#4b5563", border: "#e5e7eb" };
  };

  return (
    <div style={{ paddingBottom: "40px", position: "relative" }}>
      
      {/* HEADER & BUTTONS */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a2035", margin: "0 0 4px 0" }}>Bank Soal</h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>Kelola soal dan data Bank Soal dari Soal Ujian digunakan untuk berbagai ujian.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "8px", backgroundColor: "#fff", border: "1px solid #d1d5db", color: "#374151", fontWeight: 600, fontSize: "13px", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            <Upload size={16} /> Import Soal
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "8px", backgroundColor: "#fff", border: "1px solid #d1d5db", color: "#374151", fontWeight: 600, fontSize: "13px", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            <Download size={16} /> Export Soal
          </button>
        </div>
      </div>

      {/* 4 SUMMARY CARDS (Figma Style) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {/* Blue Card */}
        <div style={{ backgroundColor: "#2563eb", borderRadius: "12px", padding: "20px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "8px", textTransform: "uppercase" }}>Total Soal</div>
          <div style={{ fontSize: "32px", fontWeight: 800, marginBottom: "4px" }}>1.102</div>
          <div style={{ fontSize: "13px", color: "#bfdbfe" }}>48 Mata soal</div>
          <FileText size={48} color="rgba(255,255,255,0.15)" style={{ position: "absolute", bottom: "-10px", right: "10px" }} />
        </div>
        
        {/* Green Card */}
        <div style={{ backgroundColor: "#16a34a", borderRadius: "12px", padding: "20px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "8px", textTransform: "uppercase" }}>Digunakan</div>
          <div style={{ fontSize: "32px", fontWeight: 800, marginBottom: "4px" }}>10</div>
          <div style={{ fontSize: "13px", color: "#bbf7d0" }}>83% dari total soal</div>
          <BookOpen size={48} color="rgba(255,255,255,0.15)" style={{ position: "absolute", bottom: "-10px", right: "10px" }} />
        </div>

        {/* Orange Card */}
        <div style={{ backgroundColor: "#ca8a04", borderRadius: "12px", padding: "20px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "8px", textTransform: "uppercase" }}>Total Ujian</div>
          <div style={{ fontSize: "32px", fontWeight: 800, marginBottom: "4px" }}>60</div>
          <div style={{ fontSize: "13px", color: "#fef08a" }}>4.6% total soal</div>
          <BarChart size={48} color="rgba(255,255,255,0.15)" style={{ position: "absolute", bottom: "-10px", right: "10px" }} />
        </div>

        {/* Red Card */}
        <div style={{ backgroundColor: "#dc2626", borderRadius: "12px", padding: "20px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "8px", textTransform: "uppercase" }}>Duplikat Soal</div>
          <div style={{ fontSize: "32px", fontWeight: 800, marginBottom: "4px" }}>24</div>
          <div style={{ fontSize: "13px", color: "#fecaca" }}>4.4% dari soal</div>
          <X size={48} color="rgba(255,255,255,0.15)" style={{ position: "absolute", bottom: "-10px", right: "10px" }} />
        </div>
      </div>

      {/* FILTER BAR & TABLE CONTAINER */}
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        
        {/* Filter Bar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
            <Search size={16} color="#9ca3af" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input type="text" placeholder="Cari soal berdasarkan kode, mata kuli..." style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#f9fafb" }} />
          </div>
          <select style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#fff", color: "#374151" }}>
            <option>Mata Kuliah</option>
          </select>
          <select style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#fff", color: "#374151" }}>
            <option>Tingkat</option>
          </select>
          <select style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#fff", color: "#374151" }}>
            <option>Tipe</option>
          </select>
          <select style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "13px", outline: "none", backgroundColor: "#fff", color: "#374151" }}>
            <option>Status</option>
          </select>
        </div>

        {/* FULL WIDTH TABLE */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#6b7280" }}>
                <th style={{ padding: "16px 20px", fontWeight: 500, width: "40px" }}>No</th>
                <th style={{ padding: "16px 20px", fontWeight: 500 }}>Kode Soal</th>
                <th style={{ padding: "16px 20px", fontWeight: 500 }}>Mata Kuliah</th>
                <th style={{ padding: "16px 20px", fontWeight: 500 }}>Tingkat</th>
                <th style={{ padding: "16px 20px", fontWeight: 500 }}>Topik</th>
                <th style={{ padding: "16px 20px", fontWeight: 500 }}>Tipe</th>
                <th style={{ padding: "16px 20px", fontWeight: 500 }}>Pertanyaan</th>
                <th style={{ padding: "16px 20px", fontWeight: 500, textAlign: "center" }}>Digunakan</th>
                <th style={{ padding: "16px 20px", fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {questionsData.map((q, index) => {
                const tipeStyle = getTipeColor(q.tipe);
                return (
                  <tr 
                    key={q.id} 
                    onClick={() => setSelectedQuestion(q)}
                    style={{ borderBottom: "1px solid #e5e7eb", cursor: "pointer", transition: "background-color 0.2s" }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                  >
                    <td style={{ padding: "16px 20px", color: "#6b7280" }}>{index + 1}</td>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#111827" }}>{q.id}</td>
                    <td style={{ padding: "16px 20px", color: "#4b5563" }}>{q.mk}</td>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: getTingkatColor(q.tingkat) }}>{q.tingkat}</td>
                    <td style={{ padding: "16px 20px", color: "#4b5563" }}>{q.topik}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ backgroundColor: tipeStyle.bg, color: tipeStyle.color, border: `1px solid ${tipeStyle.border}`, padding: "4px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap" }}>
                        {q.tipe}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", color: "#6b7280", maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.tanya}</td>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#3b82f6", textAlign: "center" }}>{q.digunakan}</td>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: q.status === "Aktif" ? "#16a34a" : "#dc2626" }}>{q.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL / DRAWER PRATINJAU SOAL (Penyatuan panduan SCR-W05) */}
      {selectedQuestion && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.3)", zIndex: 99, display: "flex", justifyContent: "flex-end", backdropFilter: "blur(2px)" }} onClick={() => setSelectedQuestion(null)}>
          <div style={{ width: "400px", backgroundColor: "#fff", height: "100%", boxShadow: "-4px 0 20px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", animation: "slideIn 0.3s forwards" }} onClick={e => e.stopPropagation()}>
            
            {/* Drawer Header */}
            <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "#f9fafb" }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1a2035", margin: "0 0 4px 0" }}>Pratinjau Soal</h2>
                <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "monospace" }}>{selectedQuestion.id}</div>
              </div>
              <button onClick={() => setSelectedQuestion(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "4px" }}>
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div style={{ padding: "24px", flex: 1, overflowY: "auto" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                <span style={{ backgroundColor: "#f3f4f6", color: "#4b5563", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>{selectedQuestion.mk}</span>
                <span style={{ backgroundColor: "#f3f4f6", color: "#4b5563", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>{selectedQuestion.topik}</span>
                <span style={{ color: getTingkatColor(selectedQuestion.tingkat), padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, border: `1px solid ${getTingkatColor(selectedQuestion.tingkat)}` }}>{selectedQuestion.tingkat}</span>
              </div>

              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#374151", marginBottom: "12px" }}>Isi Pertanyaan:</h3>
              <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.6, padding: "16px", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                {selectedQuestion.fullTanya}
              </div>

              {selectedQuestion.tipe === "Pilihan Ganda" && (
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ padding: "12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "13px", color: "#374151" }}>A. Planning</div>
                  <div style={{ padding: "12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "13px", color: "#374151" }}>B. Organizing</div>
                  <div style={{ padding: "12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "13px", color: "#374151" }}>C. Actuating</div>
                  <div style={{ padding: "12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "13px", color: "#374151" }}>D. Controlling</div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div style={{ padding: "20px 24px", borderTop: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
              <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", borderRadius: "8px", backgroundColor: "#3b82f6", border: "none", color: "#fff", fontWeight: 600, fontSize: "14px", cursor: "pointer", boxShadow: "0 2px 4px rgba(59, 130, 246, 0.2)" }}>
                <Edit size={16} /> Edit Teks Soal
              </button>
            </div>

          </div>
        </div>
      )}
      
      {/* Inline style for animation */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

    </div>
  );
}
