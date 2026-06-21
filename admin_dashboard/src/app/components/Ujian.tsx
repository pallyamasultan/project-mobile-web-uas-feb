import { useState } from "react";
import {
  Search, RotateCcw, Download, CalendarDays, Plus,
  Eye, Edit2, Trash2, PlayCircle,
} from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

// ── Data ─────────────────────────────────────────────────────────────────────

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Berlangsung": { bg: "#dcfce7", text: "#16a34a", dot: "#22c55e" },
  "Akan Datang": { bg: "#fef9c3", text: "#b45309", dot: "#f59e0b" },
  "Selesai":     { bg: "#dbeafe", text: "#1d4ed8", dot: "#3b82f6" },
  "Dibatalkan":  { bg: "#fee2e2", text: "#dc2626", dot: "#ef4444" },
};

const donutData = [
  { name: "Berlangsung", value: 3,  color: "#22c55e" },
  { name: "Akan Datang", value: 8,  color: "#f59e0b" },
  { name: "Selesai",     value: 4,  color: "#3b82f6" },
  { name: "Dibatalkan",  value: 0,  color: "#ef4444" },
];

const todayExams = [
  { nama: "UAS Manajemen Keuangan",  jam: "09:00", status: "Berlangsung" },
  { nama: "UAS Audit Keuangan",      jam: "10:00", status: "Akan Datang" },
  { nama: "UAS Perpajakan Lanjutan", jam: "13:00", status: "Selesai"     },
];

const allUjian = [
  { no: 1,  nama: "UAS Akuntansi Manajemen",          mk: "Manajemen Akuntansi",    tanggal: "14 Nov 2024", jam: "09:00", durasi: 120, peserta: 52, status: "Berlangsung" },
  { no: 2,  nama: "UAS Manajemen Keuangan",           mk: "Manajemen Keuangan",     tanggal: "14 Nov 2024", jam: "09:00", durasi: 120, peserta: 48, status: "Berlangsung" },
  { no: 3,  nama: "UAS Akuntansi Biaya",              mk: "Akuntansi",              tanggal: "14 Nov 2024", jam: "10:00", durasi: 90,  peserta: 35, status: "Berlangsung" },
  { no: 4,  nama: "UAS Manajemen Pemasaran",          mk: "S1 Manajemen",           tanggal: "14 Nov 2024", jam: "10:30", durasi: 90,  peserta: 42, status: "Akan Datang" },
  { no: 5,  nama: "UAS Pengantar Akuntansi",          mk: "Pengantar Akuntansi",    tanggal: "14 Nov 2024", jam: "11:00", durasi: 60,  peserta: 60, status: "Akan Datang" },
  { no: 6,  nama: "UAS Perpajakan Lanjutan",          mk: "Perpajakan",             tanggal: "14 Nov 2024", jam: "13:00", durasi: 60,  peserta: 38, status: "Akan Datang" },
  { no: 7,  nama: "UAS Audit Keuangan",               mk: "Audit Keuangan",         tanggal: "14 Nov 2024", jam: "13:00", durasi: 90,  peserta: 31, status: "Akan Datang" },
  { no: 8,  nama: "UTS Manajemen Strategik",          mk: "Manajemen Strategik",    tanggal: "14 Nov 2024", jam: "14:00", durasi: 100, peserta: 45, status: "Akan Datang" },
  { no: 9,  nama: "UTS Ekonomi Pembangunan",          mk: "Ekonomi Pembangunan",    tanggal: "15 Nov 2024", jam: "09:00", durasi: 90,  peserta: 30, status: "Akan Datang" },
  { no: 10, nama: "UAS Perilaku Organisasi",          mk: "Perilaku Organisasi",    tanggal: "15 Nov 2024", jam: "11:00", durasi: 75,  peserta: 55, status: "Akan Datang" },
  { no: 11, nama: "UAS Pengantar Ekonomi Mikro",      mk: "Ekonomi Mikro",          tanggal: "12 Nov 2024", jam: "08:00", durasi: 60,  peserta: 70, status: "Selesai" },
  { no: 12, nama: "UTS Akuntansi Manajemen Lanjutan", mk: "Manajemen Akuntansi",    tanggal: "12 Nov 2024", jam: "10:00", durasi: 120, peserta: 28, status: "Selesai" },
  { no: 13, nama: "UAS Ekonomi Makro",                mk: "Ekonomi Makro",          tanggal: "11 Nov 2024", jam: "09:00", durasi: 90,  peserta: 40, status: "Selesai" },
  { no: 14, nama: "UAS Statistik Bisnis",             mk: "Statistik Bisnis",       tanggal: "11 Nov 2024", jam: "13:00", durasi: 75,  peserta: 33, status: "Selesai" },
  { no: 15, nama: "UAS Sistem Informasi Akuntansi",   mk: "S1 Akuntansi",           tanggal: "10 Nov 2024", jam: "10:00", durasi: 90,  peserta: 0,  status: "Dibatalkan" },
];

const PAGE_SIZE = 8;

// ── Ring indicator (matches dashboard StatCard style) ─────────────────────────

function RingIndicator({ pct, color, size = 48 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f2f5" strokeWidth={5} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color }}>
        {pct > 0 ? `${pct}%` : "—"}
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Ujian() {
  const [search, setSearch]   = useState("");
  const [mk, setMk]           = useState("");
  const [tanggal, setTanggal] = useState("");
  const [prodi, setProdi]     = useState("");
  const [status, setStatus]   = useState("");
  const [page, setPage]       = useState(1);

  const filtered = allUjian.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !search || u.nama.toLowerCase().includes(q) || u.mk.toLowerCase().includes(q);
    const matchMk     = !mk     || u.mk === mk;
    const matchTgl    = !tanggal|| u.tanggal === tanggal;
    const matchStatus = !status || u.status === status;
    return matchSearch && matchMk && matchTgl && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const reset = () => { setSearch(""); setMk(""); setTanggal(""); setProdi(""); setStatus(""); setPage(1); };

  const total       = allUjian.length;
  const berlangsung = allUjian.filter((u) => u.status === "Berlangsung").length;
  const akanDatang  = allUjian.filter((u) => u.status === "Akan Datang").length;
  const selesai     = allUjian.filter((u) => u.status === "Selesai").length;
  const dibatalkan  = allUjian.filter((u) => u.status === "Dibatalkan").length;
  const hariIni     = allUjian.filter((u) => u.tanggal === "14 Nov 2024").length;

  const statCards = [
    { label: "Ujian Hari Ini",   value: hariIni,    sub: `Dari ${total} Jadwal`, color: "#3b82f6", pct: Math.round((hariIni / total) * 100) },
    { label: "Ujian Berlangsung",value: berlangsung, sub: `${Math.round((berlangsung / total) * 100)}% dari total`, color: "#22c55e", pct: Math.round((berlangsung / total) * 100) },
    { label: "Akan Datang",      value: akanDatang,  sub: `${Math.round((akanDatang / total) * 100)}% dari total`,  color: "#f59e0b", pct: Math.round((akanDatang / total) * 100) },
    { label: "Selesai",          value: selesai,     sub: `${Math.round((selesai / total) * 100)}% dari total`,     color: "#3b82f6", pct: Math.round((selesai / total) * 100) },
    { label: "Dibatalkan",       value: dibatalkan,  sub: `${Math.round((dibatalkan / total) * 100)}% dari total`,  color: "#ef4444", pct: Math.round((dibatalkan / total) * 100) },
  ];

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

      {/* ── Left ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a2035", margin: 0 }}>Daftar Ujian</h2>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>
              Kelola dan pantau semua ujian yang ada pada Mata Kuliah.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={btnOutline}><Download size={14} /> Export</button>
            <button style={btnOutline}><CalendarDays size={14} /> Kalender Ujian</button>
            <button style={btnPrimary}><Plus size={14} /> Buat Ujian Baru</button>
          </div>
        </div>

        {/* Stat cards with SVG rings */}
        <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
          {statCards.map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1, backgroundColor: "#fff", borderRadius: 12, padding: "16px 16px",
                border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 500, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {s.label}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#1a2035", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 6 }}>{s.sub}</div>
                </div>
                <RingIndicator pct={s.pct} color={s.color} size={48} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: 2 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 2, minWidth: 200 }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Cari ujian, mata kuliah..."
                style={{ width: "100%", padding: "8px 10px 8px 32px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#374151", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <select value={mk} onChange={(e) => { setMk(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Mata Kuliah</option>
              {[...new Set(allUjian.map((u) => u.mk))].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={tanggal} onChange={(e) => { setTanggal(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Tanggal</option>
              {[...new Set(allUjian.map((u) => u.tanggal))].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={prodi} onChange={(e) => { setProdi(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Program Studi</option>
              <option value="S1 Akuntansi">S1 Akuntansi</option>
              <option value="S1 Manajemen">S1 Manajemen</option>
              <option value="S1 Ekonomi">S1 Ekonomi</option>
            </select>
            <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="">Status</option>
              <option value="Berlangsung">Berlangsung</option>
              <option value="Akan Datang">Akan Datang</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
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
                {["No", "Nama Ujian", "Mata Kuliah", "Tanggal", "Jam Mulai", "Durasi", "Peserta", "Status", "Aksi"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} style={{ padding: 32, textAlign: "center", color: "#9ca3af" }}>Tidak ada ujian ditemukan.</td></tr>
              ) : (
                paginated.map((u, i) => {
                  const sc = statusColors[u.status];
                  return (
                    <tr key={u.no} style={{ borderBottom: "1px solid #f0f2f5", backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={{ padding: "10px 12px", color: "#9ca3af" }}>{u.no}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1a2035", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.nama}</td>
                      <td style={{ padding: "10px 12px", color: "#374151", whiteSpace: "nowrap" }}>{u.mk}</td>
                      <td style={{ padding: "10px 12px", color: "#374151", whiteSpace: "nowrap" }}>{u.tanggal}</td>
                      <td style={{ padding: "10px 12px", color: "#374151", fontWeight: 500 }}>{u.jam}</td>
                      <td style={{ padding: "10px 12px", color: "#374151", textAlign: "center" }}>{u.durasi} mnt</td>
                      <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: 600, color: u.peserta > 0 ? "#1a2035" : "#d1d5db" }}>{u.peserta}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, backgroundColor: sc.bg, color: sc.text }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: sc.dot, display: "inline-block" }} />
                          {u.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <ABtn icon={<Eye size={12} color="#6b7280" />}        border="#e5e7eb" bg="#f9fafb" title="Detail" />
                          {u.status === "Berlangsung" && (
                            <ABtn icon={<PlayCircle size={12} color="#16a34a" />} border="#bbf7d0" bg="#f0fdf4" title="Monitor" />
                          )}
                          <ABtn icon={<Edit2 size={12} color="#3b82f6" />}      border="#bfdbfe" bg="#eff6ff" title="Edit" />
                          <ABtn icon={<Trash2 size={12} color="#ef4444" />}     border="#fecaca" bg="#fef2f2" title="Hapus" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: "1px solid #f0f2f5" }}>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Menampilkan {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} data
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

        {/* Ringkasan Status */}
        <div style={sideCard}>
          <h4 style={{ ...sideTitle, marginBottom: 14 }}>Ringkasan Status Ujian</h4>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <PieChart width={120} height={120}>
                <Pie
                  data={donutData.filter((d) => d.value > 0)}
                  cx={55} cy={55} innerRadius={36} outerRadius={52}
                  paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}
                >
                  {donutData.filter((d) => d.value > 0).map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#1a2035" }}>{total}</div>
                <div style={{ fontSize: 9, color: "#9ca3af" }}>Total</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {donutData.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "#4b5563" }}>{d.name}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1a2035" }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ujian Hari Ini */}
        <div style={sideCard}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h4 style={sideTitle}>Ujian Hari Ini</h4>
            <button style={{ fontSize: 11, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 }}>
              Lihat Semua
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {todayExams.map((e) => {
              const sc = statusColors[e.status];
              return (
                <div key={e.nama} style={{ padding: "10px 12px", borderRadius: 8, backgroundColor: "#f9fafb", borderLeft: `3px solid ${sc.dot}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1a2035", marginBottom: 4, lineHeight: 1.3 }}>{e.nama}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#6b7280" }}>{e.jam}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, backgroundColor: sc.bg, color: sc.text }}>
                      {e.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Informasi */}
        <div style={{ backgroundColor: "#eff6ff", borderRadius: 12, padding: "16px", border: "1px solid #bfdbfe" }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#1d4ed8", margin: "0 0 8px" }}>ℹ️ Informasi</h4>
          <p style={{ fontSize: 11, color: "#1e40af", margin: 0, lineHeight: 1.6 }}>
            Ujian yang berstatus <strong>Berlangsung</strong> dapat dipantau secara real-time melalui fitur Live Monitoring. Pastikan peserta telah login sebelum ujian dimulai.
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
    <button onClick={onClick} disabled={disabled} style={{ minWidth: 28, height: 28, padding: "0 5px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: active ? "none" : "1px solid #e5e7eb", backgroundColor: active ? "#3b82f6" : disabled ? "#f9fafb" : "#fff", color: active ? "#fff" : disabled ? "#d1d5db" : "#374151", cursor: disabled ? "default" : "pointer" }}>
      {label}
    </button>
  );
}

const btnPrimary: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", backgroundColor: "#3b82f6", color: "#fff", cursor: "pointer" };
const btnOutline: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "1.5px solid #d1d5db", backgroundColor: "#fff", color: "#374151", cursor: "pointer" };
const selectStyle: React.CSSProperties = { flex: 1, minWidth: 110, padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#374151", backgroundColor: "#fff", outline: "none", cursor: "pointer" };
const sideCard: React.CSSProperties = { backgroundColor: "#fff", borderRadius: 12, padding: "18px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };
const sideTitle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#1a2035", margin: 0 };
