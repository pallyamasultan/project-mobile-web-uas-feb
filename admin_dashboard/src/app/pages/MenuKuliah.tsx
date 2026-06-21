import { useState } from "react";
import { Search, RotateCcw, Download, Plus, Eye, Edit2, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

const prodiData = [
  { name: "S1 Akuntansi", value: 58, color: "#3b82f6" },
  { name: "S1 Manajemen", value: 27, color: "#a855f7" },
  { name: "D3 Akuntansi", value: 8, color: "#f97316" },
  { name: "S1 Ekonomi", value: 7, color: "#22c55e" },
];

const top5Courses = [
  { name: "Audit Keuangan", prodi: "S1 Akuntansi", color: "#3b82f6" },
  { name: "Manajemen Strategik", prodi: "S1 Manajemen", color: "#a855f7" },
  { name: "Perilaku Organisasi", prodi: "S1 Manajemen", color: "#a855f7" },
  { name: "Manajemen Keuangan", prodi: "S1 Manajemen", color: "#f97316" },
  { name: "Ekonomi Pembangunan", prodi: "S1 Ekonomi", color: "#22c55e" },
];

const allCourses = [
  { no: 1,  kode: "MK001",  nama: "Pengantar Akuntansi",       sks: 3, semester: 1, prodi: "S1 Akuntansi",         dosen: "Dr. Nurhayati, SE, M.Si",       status: "Aktif" },
  { no: 2,  kode: "MK0012", nama: "Manajemen Menengah",        sks: 3, semester: 1, prodi: "S1 Manajemen",         dosen: "Dr. Rahmat Hidayat, SE, M.Si",  status: "Aktif" },
  { no: 3,  kode: "AK0003", nama: "Pengantar Manajemen TBR",   sks: 3, semester: 2, prodi: "S1 Manajemen",         dosen: "Dr. Yunianto, SE, M.Si",        status: "Aktif" },
  { no: 4,  kode: "AK0004", nama: "Manajemen Keuangan",        sks: 3, semester: 2, prodi: "S1 Manajemen",         dosen: "Dr. Fitriyana, SE, M.Si",       status: "Tidak Aktif" },
  { no: 5,  kode: "AK0005", nama: "Pengantar Ekonomi Mikro",   sks: 3, semester: 3, prodi: "S1 Ekonomi",           dosen: "Dr. Herdian, SE, M.Si",         status: "Aktif" },
  { no: 6,  kode: "BK0001", nama: "Pengantar Ekonomi Makro",   sks: 3, semester: 3, prodi: "S1 Ekonomi Pemb.",     dosen: "Dr. Bambang Susanto, SE, M.Si", status: "Aktif" },
  { no: 7,  kode: "MK0023", nama: "Audit Keuangan",            sks: 3, semester: 4, prodi: "S1 Akuntansi",         dosen: "Dr. Rina Wulandari, SE, M.Si",  status: "Aktif" },
  { no: 8,  kode: "MK0024", nama: "Manajemen Strategik",       sks: 3, semester: 5, prodi: "S1 Manajemen",         dosen: "Dr. Suharto, SE, M.Si",         status: "Aktif" },
  { no: 9,  kode: "EK0010", nama: "Ekonomi Pembangunan",       sks: 3, semester: 5, prodi: "S1 Ekonomi Pemb.",     dosen: "Dr. Agustina, SE, M.Si",        status: "Aktif" },
  { no: 10, kode: "AK0031", nama: "Perpajakan Lanjutan",       sks: 2, semester: 6, prodi: "S1 Akuntansi",         dosen: "Dr. Kurniawan, SE, M.Si",       status: "Aktif" },
];

const PAGE_SIZE = 5;

export function MenuKuliah() {
  const [search, setSearch] = useState("");
  const [tahun, setTahun] = useState("");
  const [semester, setSemester] = useState("");
  const [prodi, setProdi] = useState("");
  const [page, setPage] = useState(1);

  const filtered = allCourses.filter((c) => {
    const matchSearch =
      !search ||
      c.nama.toLowerCase().includes(search.toLowerCase()) ||
      c.kode.toLowerCase().includes(search.toLowerCase());
    const matchSemester = !semester || String(c.semester) === semester;
    const matchProdi = !prodi || c.prodi.includes(prodi);
    return matchSearch && matchSemester && matchProdi;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => {
    setSearch("");
    setTahun("");
    setSemester("");
    setProdi("");
    setPage(1);
  };

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      {/* ── Left: main content ─────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a2035", margin: 0 }}>
              Daftar Mata Kuliah
            </h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>
              Kelola mata kuliah yang ada, dan digunakan dalam ujian.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: "1.5px solid #d1d5db", backgroundColor: "#fff", color: "#374151",
                cursor: "pointer",
              }}
            >
              <Download size={14} /> Export
            </button>
            <button
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: "none", backgroundColor: "#3b82f6", color: "#fff",
                cursor: "pointer",
              }}
            >
              <Plus size={14} /> Tambah Mata Kuliah
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
          {[
            { label: "Total Mata Kuliah", value: "48", sub: "Dari Hari Ini",      color: "#3b82f6", bg: "#eff6ff" },
            { label: "Mata Kuliah Aktif", value: "38", sub: "Mata Kuliah Aktif",  color: "#22c55e", bg: "#f0fdf4" },
            { label: "Prodi Aktif",        value: "6",  sub: "Dari 30 Hari",       color: "#a855f7", bg: "#faf5ff" },
            { label: "Rata-rata Kelas",    value: "4",  sub: "Per Mata Kuliah",    color: "#f97316", bg: "#fff7ed" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1, backgroundColor: "#fff", borderRadius: 12, padding: "16px 18px",
                border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#1a2035", lineHeight: 1 }}>{s.value}</div>
                <div
                  style={{
                    width: 38, height: 38, borderRadius: 10, backgroundColor: s.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, color: s.color,
                  }}
                >
                  {s.label === "Total Mata Kuliah" ? "📚" :
                   s.label === "Mata Kuliah Aktif" ? "✅" :
                   s.label === "Prodi Aktif" ? "🏫" : "📊"}
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div
          style={{
            backgroundColor: "#fff", borderRadius: 12, padding: "16px",
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            marginBottom: 2,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ position: "relative", flex: 2, minWidth: 180 }}>
              <Search
                size={14}
                style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}
              />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Cari mata kuliah..."
                style={{
                  width: "100%", padding: "8px 10px 8px 32px", borderRadius: 8,
                  border: "1px solid #e5e7eb", fontSize: 13, color: "#374151",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            {/* Tahun */}
            <select
              value={tahun}
              onChange={(e) => { setTahun(e.target.value); setPage(1); }}
              style={{
                flex: 1, minWidth: 120, padding: "8px 10px", borderRadius: 8,
                border: "1px solid #e5e7eb", fontSize: 13, color: "#374151",
                backgroundColor: "#fff", outline: "none", cursor: "pointer",
              }}
            >
              <option value="">Tahun</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>

            {/* Semester */}
            <select
              value={semester}
              onChange={(e) => { setSemester(e.target.value); setPage(1); }}
              style={{
                flex: 1, minWidth: 130, padding: "8px 10px", borderRadius: 8,
                border: "1px solid #e5e7eb", fontSize: 13, color: "#374151",
                backgroundColor: "#fff", outline: "none", cursor: "pointer",
              }}
            >
              <option value="">Semester</option>
              {[1,2,3,4,5,6,7,8].map((s) => (
                <option key={s} value={String(s)}>Semester {s}</option>
              ))}
            </select>

            {/* Program Studi */}
            <select
              value={prodi}
              onChange={(e) => { setProdi(e.target.value); setPage(1); }}
              style={{
                flex: 1, minWidth: 150, padding: "8px 10px", borderRadius: 8,
                border: "1px solid #e5e7eb", fontSize: 13, color: "#374151",
                backgroundColor: "#fff", outline: "none", cursor: "pointer",
              }}
            >
              <option value="">Program Studi</option>
              <option value="S1 Akuntansi">S1 Akuntansi</option>
              <option value="S1 Manajemen">S1 Manajemen</option>
              <option value="D3 Akuntansi">D3 Akuntansi</option>
              <option value="S1 Ekonomi">S1 Ekonomi</option>
            </select>

            {/* Reset */}
            <button
              onClick={reset}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                border: "1px solid #e5e7eb", backgroundColor: "#f9fafb",
                color: "#6b7280", cursor: "pointer",
              }}
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: "#fff", borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #f0f2f5" }}>
                {["No", "Kode MK", "Nama Mata Kuliah", "SKS", "Semester", "Program Studi", "Dosen Pengampu", "Status", "Aksi"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 12px", textAlign: "left", fontSize: 11,
                      fontWeight: 600, color: "#6b7280", letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: 32, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              ) : (
                paginated.map((c, i) => (
                  <tr
                    key={c.kode}
                    style={{
                      borderBottom: "1px solid #f0f2f5",
                      backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa",
                    }}
                  >
                    <td style={{ padding: "10px 12px", color: "#9ca3af" }}>{c.no}</td>
                    <td style={{ padding: "10px 12px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{c.kode}</td>
                    <td style={{ padding: "10px 12px", color: "#1a2035", fontWeight: 500 }}>{c.nama}</td>
                    <td style={{ padding: "10px 12px", color: "#374151", textAlign: "center" }}>{c.sks}</td>
                    <td style={{ padding: "10px 12px", color: "#374151", textAlign: "center" }}>{c.semester}</td>
                    <td style={{ padding: "10px 12px", color: "#374151", whiteSpace: "nowrap" }}>{c.prodi}</td>
                    <td style={{ padding: "10px 12px", color: "#374151", whiteSpace: "nowrap" }}>{c.dosen}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                          backgroundColor: c.status === "Aktif" ? "#dcfce7" : "#fee2e2",
                          color: c.status === "Aktif" ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          style={{
                            width: 28, height: 28, borderRadius: 6, border: "1px solid #e5e7eb",
                            backgroundColor: "#f9fafb", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          title="Detail"
                        >
                          <Eye size={13} color="#6b7280" />
                        </button>
                        <button
                          style={{
                            width: 28, height: 28, borderRadius: 6, border: "1px solid #bfdbfe",
                            backgroundColor: "#eff6ff", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          title="Edit"
                        >
                          <Edit2 size={13} color="#3b82f6" />
                        </button>
                        <button
                          style={{
                            width: 28, height: 28, borderRadius: 6, border: "1px solid #fecaca",
                            backgroundColor: "#fef2f2", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                          title="Hapus"
                        >
                          <Trash2 size={13} color="#ef4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", borderTop: "1px solid #f0f2f5",
            }}
          >
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Menampilkan {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} data
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: "5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                  border: "1px solid #e5e7eb",
                  backgroundColor: page === 1 ? "#f9fafb" : "#fff",
                  color: page === 1 ? "#d1d5db" : "#374151", cursor: page === 1 ? "default" : "pointer",
                }}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 30, height: 30, borderRadius: 6, fontSize: 12, fontWeight: 600,
                    border: p === page ? "none" : "1px solid #e5e7eb",
                    backgroundColor: p === page ? "#3b82f6" : "#fff",
                    color: p === page ? "#fff" : "#374151",
                    cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  padding: "5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                  border: "1px solid #e5e7eb",
                  backgroundColor: page === totalPages ? "#f9fafb" : "#fff",
                  color: page === totalPages ? "#d1d5db" : "#374151",
                  cursor: page === totalPages ? "default" : "pointer",
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right sidebar ───────────────────────────────────────────── */}
      <div style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Statistik per Tahun */}
        <div
          style={{
            backgroundColor: "#fff", borderRadius: 12, padding: "18px",
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1a2035", margin: "0 0 14px" }}>
            Statistik per Tahun
          </h4>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <PieChart width={120} height={120}>
                <Pie
                  data={prodiData}
                  cx={55}
                  cy={55}
                  innerRadius={36}
                  outerRadius={52}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {prodiData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2035" }}>48</div>
                <div style={{ fontSize: 9, color: "#9ca3af" }}>Total MK</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {prodiData.map((d) => (
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

        {/* Top 5 Mata Kuliah Aktif */}
        <div
          style={{
            backgroundColor: "#fff", borderRadius: 12, padding: "18px",
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1a2035", margin: 0 }}>
              Top 5 Mata Kuliah Aktif
            </h4>
            <button style={{ fontSize: 11, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 }}>
              Lihat Semua
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {top5Courses.map((c, i) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    backgroundColor: `${c.color}20`, color: c.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1a2035", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>{c.prodi}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informasi */}
        <div
          style={{
            backgroundColor: "#eff6ff", borderRadius: 12, padding: "16px",
            border: "1px solid #bfdbfe",
          }}
        >
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#1d4ed8", margin: "0 0 8px" }}>
            ℹ️ Informasi
          </h4>
          <p style={{ fontSize: 11, color: "#1e40af", margin: 0, lineHeight: 1.6 }}>
            Data mata kuliah digunakan sebagai referensi dalam pembuatan ujian. Pastikan setiap mata kuliah memiliki dosen pengampu yang aktif sebelum digunakan.
          </p>
        </div>
      </div>
    </div>
  );
}
