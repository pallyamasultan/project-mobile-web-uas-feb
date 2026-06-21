import { useState } from "react";
import { Search, RotateCcw, Download, Upload, Plus, Eye, Edit2, Trash2, Copy } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

// ── Data ─────────────────────────────────────────────────────────────────────

const difficultyData = [
  { name: "Mudah",  value: 47, color: "#22c55e" },
  { name: "Sedang", value: 31, color: "#f59e0b" },
  { name: "Sulit",  value: 22, color: "#ef4444" },
];

const tipeData = [
  { name: "Pilihan Ganda", value: 67, color: "#3b82f6" },
  { name: "Essay",         value: 24, color: "#a855f7" },
  { name: "True/False",    value: 9,  color: "#f97316" },
];

const top5MK = [
  { name: "Pengantar Akuntansi",  count: 246, color: "#3b82f6" },
  { name: "Manajemen Strategik",  count: 198, color: "#a855f7" },
  { name: "Audit Keuangan",       count: 176, color: "#22c55e" },
  { name: "Manajemen Keuangan",   count: 142, color: "#f59e0b" },
  { name: "Ekonomi Pembangunan",  count: 118, color: "#ef4444" },
];

const allSoal = [
  { no: 1,  kode: "AK001.01", mk: "Pengantar Akuntansi",    tingkat: "Mudah",  topik: "Konsep Dasar",         tipe: "Pilihan Ganda", pertanyaan: "Apa yang dimaksud dengan persamaan dasar akuntansi dalam pencatatan transaksi?",          digunakan: 3, status: "Aktif" },
  { no: 2,  kode: "AK001.02", mk: "Pengantar Akuntansi",    tingkat: "Sedang", topik: "Siklus Akuntansi",     tipe: "Essay",         pertanyaan: "Jelaskan tahapan siklus akuntansi yang lengkap beserta contoh implementasinya!",           digunakan: 1, status: "Aktif" },
  { no: 3,  kode: "MN001.01", mk: "Manajemen Menengah",     tingkat: "Mudah",  topik: "Fungsi Manajemen",     tipe: "Pilihan Ganda", pertanyaan: "Manakah yang termasuk fungsi manajemen menurut Henry Fayol dalam teori manajemen klasik?",   digunakan: 5, status: "Aktif" },
  { no: 4,  kode: "MK002.01", mk: "Manajemen Keuangan",     tingkat: "Sulit",  topik: "Analisis Laporan",     tipe: "Essay",         pertanyaan: "Analisis rasio keuangan perusahaan dan berikan rekomendasi strategi keuangan yang tepat!",   digunakan: 2, status: "Tidak Aktif" },
  { no: 5,  kode: "EK001.01", mk: "Pengantar Ekonomi Mikro",tingkat: "Sedang", topik: "Permintaan & Penawaran",tipe: "True/False",   pertanyaan: "Ketika harga naik, maka jumlah permintaan akan selalu meningkat (Benar/Salah)?",            digunakan: 0, status: "Aktif" },
  { no: 6,  kode: "AK002.01", mk: "Audit Keuangan",         tingkat: "Sulit",  topik: "Prosedur Audit",       tipe: "Essay",         pertanyaan: "Bagaimana prosedur audit yang harus dilakukan auditor dalam memeriksa laporan keuangan?",    digunakan: 4, status: "Aktif" },
  { no: 7,  kode: "MN002.01", mk: "Manajemen Strategik",    tingkat: "Sedang", topik: "Analisis SWOT",        tipe: "Pilihan Ganda", pertanyaan: "Dalam analisis SWOT, faktor yang berasal dari lingkungan internal perusahaan adalah?",       digunakan: 6, status: "Aktif" },
  { no: 8,  kode: "EK002.01", mk: "Ekonomi Pembangunan",    tingkat: "Mudah",  topik: "Indikator Ekonomi",    tipe: "Pilihan Ganda", pertanyaan: "Indikator utama yang digunakan untuk mengukur pertumbuhan ekonomi suatu negara adalah?",      digunakan: 2, status: "Aktif" },
  { no: 9,  kode: "AK001.03", mk: "Pengantar Akuntansi",    tingkat: "Mudah",  topik: "Jurnal Umum",          tipe: "True/False",    pertanyaan: "Debit selalu menambah saldo akun aset dan kredit selalu menguranginya (Benar/Salah)?",      digunakan: 1, status: "Aktif" },
  { no: 10, kode: "MN003.01", mk: "Perilaku Organisasi",    tingkat: "Sedang", topik: "Motivasi Kerja",       tipe: "Essay",         pertanyaan: "Jelaskan teori motivasi Maslow dan aplikasinya dalam lingkungan kerja modern saat ini!",     digunakan: 3, status: "Tidak Aktif" },
  { no: 11, kode: "MK002.02", mk: "Manajemen Keuangan",     tingkat: "Sulit",  topik: "Capital Budgeting",    tipe: "Pilihan Ganda", pertanyaan: "Metode Capital Budgeting yang mempertimbangkan nilai waktu uang secara tepat adalah metode?", digunakan: 2, status: "Aktif" },
  { no: 12, kode: "AK002.02", mk: "Audit Keuangan",         tingkat: "Mudah",  topik: "Standar Audit",        tipe: "Pilihan Ganda", pertanyaan: "Standar audit yang berlaku umum di Indonesia diterbitkan oleh lembaga profesi yaitu?",       digunakan: 0, status: "Aktif" },
];

const PAGE_SIZE = 8;

const tingkatColor: Record<string, { bg: string; text: string }> = {
  "Mudah":  { bg: "#dcfce7", text: "#16a34a" },
  "Sedang": { bg: "#fef9c3", text: "#b45309" },
  "Sulit":  { bg: "#fee2e2", text: "#dc2626" },
};
const tipeColor: Record<string, { bg: string; text: string }> = {
  "Pilihan Ganda": { bg: "#dbeafe", text: "#1d4ed8" },
  "Essay":         { bg: "#f3e8ff", text: "#7c3aed" },
  "True/False":    { bg: "#ffedd5", text: "#c2410c" },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function BankSoal() {
  const [search, setSearch]   = useState("");
  const [mk, setMk]           = useState("");
  const [tingkat, setTingkat] = useState("");
  const [tipe, setTipe]       = useState("");
  const [status, setStatus]   = useState("");
  const [page, setPage]       = useState(1);

  const filtered = allSoal.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch  = !search  || s.pertanyaan.toLowerCase().includes(q) || s.kode.toLowerCase().includes(q) || s.mk.toLowerCase().includes(q);
    const matchMk      = !mk      || s.mk === mk;
    const matchTingkat = !tingkat || s.tingkat === tingkat;
    const matchTipe    = !tipe    || s.tipe === tipe;
    const matchStatus  = !status  || s.status === status;
    return matchSearch && matchMk && matchTingkat && matchTipe && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => { setSearch(""); setMk(""); setTingkat(""); setTipe(""); setStatus(""); setPage(1); };

  const totalAktif = allSoal.filter((s) => s.status === "Aktif").length;
  const digunakan  = allSoal.filter((s) => s.digunakan > 0).length;

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

      {/* ── Left: main content ─────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a2035", margin: 0 }}>Bank Soal</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>
              Kelola soal dan data Bank Soal dari Soal Ujian digunakan untuk berbagai ujian.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={btnOutline}><Upload size={14} /> Import Soal</button>
            <button style={btnOutline}><Download size={14} /> Export Soal</button>
            <button style={btnPrimary}><Plus size={14} /> Tambah Soal</button>
          </div>
        </div>

        {/* Dark gradient stat cards */}
        <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
          {[
            {
              label: "Total Soal", value: "1.102", sub: "48 Mata soal",
              grad: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
              icon: "📝",
            },
            {
              label: "Digunakan", value: String(digunakan), sub: `${Math.round((digunakan / allSoal.length) * 100)}% dari total soal`,
              grad: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
              icon: "✅",
            },
            {
              label: "Total Ujian", value: "60", sub: "4.6% total soal",
              grad: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
              icon: "📋",
            },
            {
              label: "Duplikat Soal", value: "24", sub: "4.4% dari soal",
              grad: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
              icon: "⚠️",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1, borderRadius: 14, padding: "18px 20px",
                background: s.grad,
                boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* decorative circle */}
              <div style={{ position: "absolute", top: -18, right: -18, width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)" }} />
              <div style={{ position: "absolute", bottom: -24, right: 12, width: 60, height: 60, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)" }} />
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 500, letterSpacing: "0.04em", marginBottom: 8, textTransform: "uppercase" }}>
                {s.label}
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, color: "#fff" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 6 }}>{s.sub}</div>
                </div>
                <div style={{ fontSize: 26, opacity: 0.85 }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: 2 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 2, minWidth: 200 }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Cari soal berdasarkan kode, mata kuliah, atau pertanyaan..."
                style={{ width: "100%", padding: "8px 10px 8px 32px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#374151", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <select value={mk} onChange={(e) => { setMk(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Mata Kuliah</option>
              {[...new Set(allSoal.map((s) => s.mk))].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={tingkat} onChange={(e) => { setTingkat(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Tingkat</option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sulit">Sulit</option>
            </select>
            <select value={tipe} onChange={(e) => { setTipe(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Tipe</option>
              <option value="Pilihan Ganda">Pilihan Ganda</option>
              <option value="Essay">Essay</option>
              <option value="True/False">True/False</option>
            </select>
            <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
            <button onClick={reset} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, border: "1px solid #e5e7eb", backgroundColor: "#f9fafb", color: "#6b7280", cursor: "pointer" }}>
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #f0f2f5" }}>
                {["No", "Kode Soal", "Mata Kuliah", "Tingkat", "Topik", "Tipe", "Pertanyaan", "Digunakan", "Status", "Aksi"].map((h) => (
                  <th key={h} style={{ padding: "10px 10px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={10} style={{ padding: 32, textAlign: "center", color: "#9ca3af" }}>Tidak ada soal ditemukan.</td></tr>
              ) : (
                paginated.map((s, i) => (
                  <tr key={s.kode} style={{ borderBottom: "1px solid #f0f2f5", backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "10px 10px", color: "#9ca3af" }}>{s.no}</td>
                    <td style={{ padding: "10px 10px", fontWeight: 700, color: "#374151", whiteSpace: "nowrap" }}>{s.kode}</td>
                    <td style={{ padding: "10px 10px", color: "#374151", whiteSpace: "nowrap", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis" }}>{s.mk}</td>
                    <td style={{ padding: "10px 10px" }}>
                      <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600, backgroundColor: tingkatColor[s.tingkat].bg, color: tingkatColor[s.tingkat].text, whiteSpace: "nowrap" }}>
                        {s.tingkat}
                      </span>
                    </td>
                    <td style={{ padding: "10px 10px", color: "#374151", whiteSpace: "nowrap", maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis" }}>{s.topik}</td>
                    <td style={{ padding: "10px 10px" }}>
                      <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600, backgroundColor: tipeColor[s.tipe].bg, color: tipeColor[s.tipe].text, whiteSpace: "nowrap" }}>
                        {s.tipe}
                      </span>
                    </td>
                    <td style={{ padding: "10px 10px", color: "#4b5563", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={s.pertanyaan}>
                      {s.pertanyaan}
                    </td>
                    <td style={{ padding: "10px 10px", textAlign: "center" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 20, borderRadius: 20, fontSize: 11, fontWeight: 700, backgroundColor: s.digunakan > 0 ? "#dbeafe" : "#f3f4f6", color: s.digunakan > 0 ? "#1d4ed8" : "#9ca3af" }}>
                        {s.digunakan}x
                      </span>
                    </td>
                    <td style={{ padding: "10px 10px" }}>
                      <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600, backgroundColor: s.status === "Aktif" ? "#dcfce7" : "#fee2e2", color: s.status === "Aktif" ? "#16a34a" : "#dc2626" }}>
                        {s.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 10px" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        <ABtn icon={<Eye size={12} color="#6b7280" />}    border="#e5e7eb"  bg="#f9fafb"  title="Detail" />
                        <ABtn icon={<Edit2 size={12} color="#3b82f6" />}  border="#bfdbfe"  bg="#eff6ff"  title="Edit" />
                        <ABtn icon={<Copy size={12} color="#a855f7" />}   border="#e9d5ff"  bg="#faf5ff"  title="Duplikat" />
                        <ABtn icon={<Trash2 size={12} color="#ef4444" />} border="#fecaca"  bg="#fef2f2"  title="Hapus" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: "1px solid #f0f2f5" }}>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Menampilkan {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} soal
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              <PBtn label="‹" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PBtn key={p} label={String(p)} onClick={() => setPage(p)} active={p === page} />
              ))}
              <PBtn label="›" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right sidebar ───────────────────────────────────────────── */}
      <div style={{ width: 230, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Distribusi Tingkat Kesulitan */}
        <div style={sideCard}>
          <h4 style={sideTitle}>Distribusi Soal per Tingkat Kesulitan</h4>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <PieChart width={120} height={120}>
                <Pie data={difficultyData} cx={55} cy={55} innerRadius={36} outerRadius={52} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {difficultyData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2035" }}>1.102</div>
                <div style={{ fontSize: 9, color: "#9ca3af" }}>Total</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {difficultyData.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "#4b5563" }}>{d.name}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#1a2035" }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribusi Tipe Soal */}
        <div style={sideCard}>
          <h4 style={sideTitle}>Distribusi Soal per Tipe</h4>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <PieChart width={120} height={120}>
                <Pie data={tipeData} cx={55} cy={55} innerRadius={36} outerRadius={52} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {tipeData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a2035" }}>1.102</div>
                <div style={{ fontSize: 9, color: "#9ca3af" }}>Total</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {tipeData.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "#4b5563" }}>{d.name}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#1a2035" }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 MK */}
        <div style={sideCard}>
          <h4 style={sideTitle}>Top 5 Mata Kuliah (Jumlah Soal)</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {top5MK.map((m, i) => (
              <div key={m.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: `${m.color}20`, color: m.color, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 11, color: "#374151", fontWeight: 500, maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1a2035" }}>{m.count}</span>
                </div>
                <div style={{ height: 4, backgroundColor: "#f0f2f5", borderRadius: 4 }}>
                  <div style={{ height: 4, backgroundColor: m.color, borderRadius: 4, width: `${(m.count / 246) * 100}%`, transition: "width 0.5s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pengumuman */}
        <div style={{ backgroundColor: "#eff6ff", borderRadius: 12, padding: "16px", border: "1px solid #bfdbfe" }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#1d4ed8", margin: "0 0 8px" }}>📢 Pengumuman</h4>
          <p style={{ fontSize: 11, color: "#1e40af", margin: 0, lineHeight: 1.6 }}>
            Soal yang belum digunakan lebih dari 6 bulan akan diarsipkan secara otomatis. Pastikan soal selalu diperbarui sesuai kurikulum terbaru.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function ABtn({ icon, border, bg, title }: { icon: React.ReactNode; border: string; bg: string; title: string }) {
  return (
    <button title={title} style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${border}`, backgroundColor: bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {icon}
    </button>
  );
}

function PBtn({ label, onClick, disabled, active }: { label: string; onClick: () => void; disabled?: boolean; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ minWidth: 28, height: 28, padding: "0 5px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: active ? "none" : "1px solid #e5e7eb", backgroundColor: active ? "#3b82f6" : disabled ? "#f9fafb" : "#fff", color: active ? "#fff" : disabled ? "#d1d5db" : "#374151", cursor: disabled ? "default" : "pointer" }}
    >
      {label}
    </button>
  );
}

const btnPrimary: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 6,
  padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
  border: "none", backgroundColor: "#3b82f6", color: "#fff", cursor: "pointer",
};
const btnOutline: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 6,
  padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
  border: "1.5px solid #d1d5db", backgroundColor: "#fff", color: "#374151", cursor: "pointer",
};
const selectStyle: React.CSSProperties = {
  flex: 1, minWidth: 110, padding: "8px 10px", borderRadius: 8,
  border: "1px solid #e5e7eb", fontSize: 13, color: "#374151",
  backgroundColor: "#fff", outline: "none", cursor: "pointer",
};
const sideCard: React.CSSProperties = {
  backgroundColor: "#fff", borderRadius: 12, padding: "18px",
  border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};
const sideTitle: React.CSSProperties = {
  fontSize: 13, fontWeight: 700, color: "#1a2035", margin: "0 0 12px",
};
