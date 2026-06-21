import { useState } from "react";
import { Search, RotateCcw, Download, Upload, Plus, Eye, Edit2, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

// ── Data ─────────────────────────────────────────────────────────────────────

const prodiStats = [
  { name: "S1 Akuntansi",      value: 45, color: "#3b82f6" },
  { name: "S1 Manajemen",      value: 30, color: "#a855f7" },
  { name: "D3 Akuntansi",      value: 15, color: "#f97316" },
  { name: "S1 Ekonomi Pemb.",  value: 10, color: "#22c55e" },
];

const allStudents = [
  { no: 1,  nim: "2022010001", nama: "Ahmad Fauzi",          prodi: "S1 Akuntansi",      angkatan: 2022, status: "Aktif",       tgl: "14 Mar 2022" },
  { no: 2,  nim: "2022010002", nama: "Citra Lestari",        prodi: "S1 Manajemen",      angkatan: 2022, status: "Aktif",       tgl: "14 Mar 2022" },
  { no: 3,  nim: "2022010003", nama: "Dani Rahmat",          prodi: "S1 Manajemen",      angkatan: 2022, status: "Aktif",       tgl: "14 Mar 2022" },
  { no: 4,  nim: "2022010004", nama: "Dewi Anggraeni",       prodi: "S1 Akuntansi",      angkatan: 2022, status: "Tidak Aktif", tgl: "14 Mar 2022" },
  { no: 5,  nim: "2022010005", nama: "Eko Prasetyo",         prodi: "S1 Akuntansi",      angkatan: 2022, status: "Aktif",       tgl: "14 Mar 2022" },
  { no: 6,  nim: "2022010006", nama: "Fajar Nugroho",        prodi: "S1 Manajemen",      angkatan: 2022, status: "Aktif",       tgl: "15 Mar 2022" },
  { no: 7,  nim: "2022010007", nama: "Gita Purnama",         prodi: "S1 Ekonomi Pemb.",  angkatan: 2022, status: "Aktif",       tgl: "15 Mar 2022" },
  { no: 8,  nim: "2022010008", nama: "Hadi Kusuma",          prodi: "S1 Manajemen",      angkatan: 2022, status: "Aktif",       tgl: "15 Mar 2022" },
  { no: 9,  nim: "2022010009", nama: "Ika Mahmudah",         prodi: "S1 Akuntansi",      angkatan: 2022, status: "Tidak Aktif", tgl: "16 Mar 2022" },
  { no: 10, nim: "2022010010", nama: "Joko Widodo",          prodi: "S1 Akuntansi",      angkatan: 2022, status: "Aktif",       tgl: "16 Mar 2022" },
  { no: 11, nim: "2021010011", nama: "Kartika Sari",         prodi: "D3 Akuntansi",      angkatan: 2021, status: "Aktif",       tgl: "10 Feb 2021" },
  { no: 12, nim: "2021010012", nama: "Lukman Hakim",         prodi: "S1 Manajemen",      angkatan: 2021, status: "Aktif",       tgl: "10 Feb 2021" },
  { no: 13, nim: "2021010013", nama: "Maya Indah",           prodi: "S1 Akuntansi",      angkatan: 2021, status: "Tidak Aktif", tgl: "10 Feb 2021" },
  { no: 14, nim: "2021010014", nama: "Naufal Rizky",         prodi: "S1 Ekonomi Pemb.",  angkatan: 2021, status: "Aktif",       tgl: "11 Feb 2021" },
  { no: 15, nim: "2021010015", nama: "Olivia Permata",       prodi: "S1 Manajemen",      angkatan: 2021, status: "Aktif",       tgl: "11 Feb 2021" },
  { no: 16, nim: "2023010016", nama: "Putri Rahayu",         prodi: "S1 Akuntansi",      angkatan: 2023, status: "Aktif",       tgl: "20 Aug 2023" },
  { no: 17, nim: "2023010017", nama: "Qodir Mahmud",         prodi: "D3 Akuntansi",      angkatan: 2023, status: "Aktif",       tgl: "20 Aug 2023" },
  { no: 18, nim: "2023010018", nama: "Rina Wulandari",       prodi: "S1 Manajemen",      angkatan: 2023, status: "Aktif",       tgl: "21 Aug 2023" },
  { no: 19, nim: "2023010019", nama: "Sandi Pratama",        prodi: "S1 Ekonomi Pemb.",  angkatan: 2023, status: "Tidak Aktif", tgl: "21 Aug 2023" },
  { no: 20, nim: "2023010020", nama: "Tika Andriani",        prodi: "S1 Akuntansi",      angkatan: 2023, status: "Aktif",       tgl: "22 Aug 2023" },
];

const PAGE_SIZE = 10;

// ── Component ─────────────────────────────────────────────────────────────────

export function Mahasiswa() {
  const [search, setSearch]       = useState("");
  const [angkatan, setAngkatan]   = useState("");
  const [semester, setSemester]   = useState("");
  const [status, setStatus]       = useState("");
  const [page, setPage]           = useState(1);

  const filtered = allStudents.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch  = !search  || s.nama.toLowerCase().includes(q) || s.nim.includes(q);
    const matchAngkatan = !angkatan || String(s.angkatan) === angkatan;
    const matchStatus  = !status  || s.status === status;
    return matchSearch && matchAngkatan && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => {
    setSearch(""); setAngkatan(""); setSemester(""); setStatus(""); setPage(1);
  };

  const totalAktif     = allStudents.filter((s) => s.status === "Aktif").length;
  const totalTidakAktif = allStudents.filter((s) => s.status === "Tidak Aktif").length;

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

      {/* ── Left: main content ─────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a2035", margin: 0 }}>Daftar Mahasiswa</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>
              Kelola dan pantau data mahasiswa yang terdaftar dalam sistem ujian.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={btnOutline}><Download size={14} /> Export</button>
            <button style={btnOutline}><Upload size={14} /> Import</button>
            <button style={btnPrimary}><Plus size={14} /> Tambah Mahasiswa</button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
          {[
            { label: "Total Mahasiswa",  value: "1.250", sub: "Terdaftar aktif",    icon: "🎓", color: "#3b82f6", bg: "#eff6ff" },
            { label: "Aktif",            value: String(totalAktif),  sub: "Mahasiswa aktif",     icon: "✅", color: "#22c55e", bg: "#f0fdf4" },
            { label: "Total Prodi",      value: "4",     sub: "Program studi",      icon: "🏫", color: "#a855f7", bg: "#faf5ff" },
            { label: "Tidak Aktif",      value: String(totalTidakAktif), sub: "Perlu perhatian", icon: "⚠️", color: "#f97316", bg: "#fff7ed" },
            { label: "Baru Hari Ini",    value: "0",     sub: "Pendaftar baru",     icon: "🆕", color: "#6b7280", bg: "#f9fafb" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1, backgroundColor: "#fff", borderRadius: 12, padding: "16px 14px",
                border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#1a2035", lineHeight: 1 }}>{s.value}</div>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  {s.icon}
                </div>
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: 2 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 2, minWidth: 180 }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Cari mahasiswa..."
                style={{ width: "100%", padding: "8px 10px 8px 32px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#374151", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <select value={angkatan} onChange={(e) => { setAngkatan(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Angkatan</option>
              {[2021, 2022, 2023, 2024].map((y) => <option key={y} value={String(y)}>{y}</option>)}
            </select>
            <select value={semester} onChange={(e) => { setSemester(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Semester</option>
              {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={String(s)}>Semester {s}</option>)}
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
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #f0f2f5" }}>
                {["No", "NIM", "Nama Mahasiswa", "Program Studi", "Angkatan", "Status", "Tanggal Daftar", "Aksi"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} style={{ padding: 32, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>Tidak ada data ditemukan.</td></tr>
              ) : (
                paginated.map((s, i) => (
                  <tr key={s.nim} style={{ borderBottom: "1px solid #f0f2f5", backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "10px 12px", color: "#9ca3af", fontSize: 12 }}>{s.no}</td>
                    <td style={{ padding: "10px 12px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap", fontSize: 12 }}>{s.nim}</td>
                    <td style={{ padding: "10px 12px", color: "#1a2035", fontWeight: 500 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                          background: `linear-gradient(135deg, ${avatarColor(s.nama)})`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontSize: 10, fontWeight: 700,
                        }}>
                          {initials(s.nama)}
                        </div>
                        {s.nama}
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px", color: "#374151", whiteSpace: "nowrap", fontSize: 12 }}>{s.prodi}</td>
                    <td style={{ padding: "10px 12px", color: "#374151", textAlign: "center", fontSize: 12 }}>{s.angkatan}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{
                        display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                        backgroundColor: s.status === "Aktif" ? "#dcfce7" : "#fee2e2",
                        color: s.status === "Aktif" ? "#16a34a" : "#dc2626",
                      }}>
                        {s.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px", color: "#6b7280", fontSize: 12, whiteSpace: "nowrap" }}>{s.tgl}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", gap: 5 }}>
                        <ActionBtn icon={<Eye size={13} color="#6b7280" />}    border="#e5e7eb"  bg="#f9fafb"  title="Detail" />
                        <ActionBtn icon={<Edit2 size={13} color="#3b82f6" />}  border="#bfdbfe"  bg="#eff6ff"  title="Edit" />
                        <ActionBtn icon={<Trash2 size={13} color="#ef4444" />} border="#fecaca"  bg="#fef2f2"  title="Hapus" />
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
              Menampilkan {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} data
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              <PageBtn label="‹" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                <PageBtn key={p} label={String(p)} onClick={() => setPage(p)} active={p === page} />
              ))}
              {totalPages > 5 && <span style={{ padding: "0 4px", color: "#9ca3af", lineHeight: "30px" }}>…</span>}
              {totalPages > 5 && <PageBtn label={String(totalPages)} onClick={() => setPage(totalPages)} active={page === totalPages} />}
              <PageBtn label="›" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right sidebar ───────────────────────────────────────────── */}
      <div style={{ width: 230, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Statistik Mahasiswa donut */}
        <div style={sideCard}>
          <h4 style={sideTitle}>Statistik Mahasiswa</h4>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ position: "relative", width: 130, height: 130 }}>
              <PieChart width={130} height={130}>
                <Pie data={prodiStats} cx={60} cy={60} innerRadius={40} outerRadius={58} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {prodiStats.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#1a2035" }}>1.250</div>
                <div style={{ fontSize: 9, color: "#9ca3af" }}>Total</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {prodiStats.map((d) => (
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

        {/* Mahasiswa per Program Studi */}
        <div style={sideCard}>
          <h4 style={sideTitle}>Mahasiswa per Program Studi</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { prodi: "S1 Akuntansi",     count: 562, color: "#3b82f6" },
              { prodi: "S1 Manajemen",     count: 376, color: "#a855f7" },
              { prodi: "D3 Akuntansi",     count: 188, color: "#f97316" },
              { prodi: "S1 Ekonomi Pemb.", count: 124, color: "#22c55e" },
            ].map((p) => (
              <div key={p.prodi}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{p.prodi}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#1a2035" }}>{p.count}</span>
                </div>
                <div style={{ height: 5, backgroundColor: "#f0f2f5", borderRadius: 4 }}>
                  <div style={{ height: 5, backgroundColor: p.color, borderRadius: 4, width: `${(p.count / 1250) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aksi Cepat */}
        <div style={sideCard}>
          <h4 style={sideTitle}>Aksi Cepat</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button style={{ ...btnPrimary, justifyContent: "center", width: "100%", fontSize: 12 }}>
              <Plus size={13} /> Tambah Mahasiswa
            </button>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "1.5px solid #d1d5db", backgroundColor: "#fff", color: "#374151", cursor: "pointer", width: "100%", boxSizing: "border-box" }}>
              <Download size={13} /> Export Data Mahasiswa
            </button>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "1.5px solid #d1d5db", backgroundColor: "#fff", color: "#374151", cursor: "pointer", width: "100%", boxSizing: "border-box" }}>
              <Upload size={13} /> Import Data Mahasiswa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const avatarPalette = ["#3b82f6, #1d4ed8", "#a855f7, #7c3aed", "#22c55e, #16a34a", "#f97316, #ea580c", "#ef4444, #dc2626"];
function avatarColor(name: string) {
  return avatarPalette[name.charCodeAt(0) % avatarPalette.length];
}

function ActionBtn({ icon, border, bg, title }: { icon: React.ReactNode; border: string; bg: string; title: string }) {
  return (
    <button title={title} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${border}`, backgroundColor: bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {icon}
    </button>
  );
}

function PageBtn({ label, onClick, disabled, active }: { label: string; onClick: () => void; disabled?: boolean; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: 30, height: 30, padding: "0 6px", borderRadius: 6, fontSize: 12, fontWeight: 600,
        border: active ? "none" : "1px solid #e5e7eb",
        backgroundColor: active ? "#3b82f6" : disabled ? "#f9fafb" : "#fff",
        color: active ? "#fff" : disabled ? "#d1d5db" : "#374151",
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {label}
    </button>
  );
}

// ── Shared style objects ──────────────────────────────────────────────────────

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
  flex: 1, minWidth: 120, padding: "8px 10px", borderRadius: 8,
  border: "1px solid #e5e7eb", fontSize: 13, color: "#374151",
  backgroundColor: "#fff", outline: "none", cursor: "pointer",
};

const sideCard: React.CSSProperties = {
  backgroundColor: "#fff", borderRadius: 12, padding: "18px",
  border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const sideTitle: React.CSSProperties = {
  fontSize: 13, fontWeight: 700, color: "#1a2035", margin: "0 0 14px",
};
