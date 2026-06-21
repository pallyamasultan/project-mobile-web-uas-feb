import { useState } from "react";
import {
  Download, FileText, FileSpreadsheet, TrendingUp,
  Eye, ChevronRight, Info, AlertCircle, CheckCircle2,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

// ── Data ─────────────────────────────────────────────────────────────────────

const trendData = [
  { tgl: "12 Okt", selesai: 2, peserta: 45, avgNilai: 74 },
  { tgl: "19 Okt", selesai: 4, peserta: 98, avgNilai: 78 },
  { tgl: "26 Okt", selesai: 6, peserta: 132, avgNilai: 76 },
  { tgl: "2 Nov",  selesai: 5, peserta: 115, avgNilai: 80 },
  { tgl: "9 Nov",  selesai: 7, peserta: 210, avgNilai: 82 },
  { tgl: "14 Nov", selesai: 8, peserta: 267, avgNilai: 87 },
];

const jenisData = [
  { name: "Pilihan Ganda", value: 67, color: "#3b82f6" },
  { name: "Essay",         value: 24, color: "#a855f7" },
  { name: "True/False",    value: 9,  color: "#f97316" },
];

const statusMhsData = [
  { name: "Lulus",       value: 228, pct: 65, color: "#22c55e" },
  { name: "Belum Ujian", value: 83,  pct: 24, color: "#f97316" },
  { name: "Tidak Lulus", value: 28,  pct: 8,  color: "#ef4444" },
  { name: "Absen",       value: 11,  pct: 3,  color: "#9ca3af" },
];

const rekapUjian = [
  { no:1, nama:"UAS Akuntansi Manajemen", tanggal:"14 Nov 2024", waktu:"09:00–11:00", peserta:52, avg:82.5, lulus:45, tidakLulus:7  },
  { no:2, nama:"UAS Audit Keuangan",       tanggal:"14 Nov 2024", waktu:"09:00–11:00", peserta:48, avg:76.3, lulus:38, tidakLulus:10 },
  { no:3, nama:"UAS Manajemen Keuangan",   tanggal:"14 Nov 2024", waktu:"10:00–12:00", peserta:60, avg:79.1, lulus:52, tidakLulus:8  },
  { no:4, nama:"UTS Manajemen Strategik",  tanggal:"13 Nov 2024", waktu:"09:00–11:00", peserta:45, avg:71.8, lulus:37, tidakLulus:8  },
  { no:5, nama:"UAS Perpajakan Lanjutan",  tanggal:"13 Nov 2024", waktu:"13:00–15:00", peserta:38, avg:83.2, lulus:35, tidakLulus:3  },
  { no:6, nama:"UAS Ekonomi Pembangunan",  tanggal:"12 Nov 2024", waktu:"09:00–11:00", peserta:42, avg:68.4, lulus:30, tidakLulus:12 },
];

const popularReports = [
  { label: "Rekap Pelaksanaan Ujian",  type: "PDF",   icon: "pdf"   },
  { label: "Rekap Nilai Mahasiswa",    type: "Excel", icon: "excel" },
  { label: "Tingkat Kelulusan",        type: "PDF",   icon: "pdf"   },
  { label: "Distribusi Soal",          type: "Excel", icon: "excel" },
];

const systemNotes = [
  { type: "info",    text: "Laporan periode 2023/2024 telah diarsipkan otomatis oleh sistem." },
  { type: "success", text: "Semua data ujian bulan November telah tersinkronisasi." },
  { type: "warning", text: "Terdapat 3 mahasiswa dengan nilai belum dikonfirmasi dosen." },
];

const noteStyle = {
  info:    { bg:"#eff6ff", border:"#bfdbfe", icon:<Info size={13} color="#3b82f6" />,         text:"#1e40af" },
  success: { bg:"#f0fdf4", border:"#bbf7d0", icon:<CheckCircle2 size={13} color="#16a34a" />,  text:"#14532d" },
  warning: { bg:"#fefce8", border:"#fde68a", icon:<AlertCircle size={13} color="#b45309" />,   text:"#78350f" },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Laporan() {
  const [dateFrom] = useState("11 Nov 2024");
  const [dateTo]   = useState("14 Nov 2024");
  const [showAll, setShowAll] = useState(false);

  const displayedRekap = showAll ? rekapUjian : rekapUjian.slice(0, 5);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
        <div>
          <h2 style={{ fontSize:18, fontWeight:700, color:"#1a2035", margin:0 }}>Laporan Ujian</h2>
          <p style={{ fontSize:12, color:"#6b7280", margin:"4px 0 0" }}>
            Ringkasan dan analisis ujian yang terdaftar dalam sistem periode 2023/2024.
          </p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {/* Date range display */}
          <div style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, border:"1px solid #e5e7eb", backgroundColor:"#fff", fontSize:12, color:"#374151" }}>
            <span style={{ color:"#9ca3af", fontSize:11 }}>Semester Range</span>
            <span style={{ fontWeight:600 }}>{dateFrom}</span>
            <span style={{ color:"#9ca3af" }}>—</span>
            <span style={{ fontWeight:600 }}>{dateTo}</span>
          </div>
          <button style={btnPrimary}><Download size={14} /> Export Laporan</button>
        </div>
      </div>

      {/* ── Stat cards ─────────────────────────────────────────────── */}
      <div style={{ display:"flex", gap:14 }}>
        {[
          { label:"Total Ujian",       value:"8",   sub:"Selesai Ujian",      icon:"📋", color:"#3b82f6", bg:"#eff6ff",  ring:false },
          { label:"Total Mahasiswa",   value:"350", sub:"Terdaftar",           icon:"🎓", color:"#22c55e", bg:"#f0fdf4",  ring:false },
          { label:"Peserta Ujian",     value:"267", sub:"Ikut Ujian",          icon:"👥", color:"#a855f7", bg:"#faf5ff",  ring:false },
          { label:"Total Soal",        value:"24",  sub:"Digunakan",           icon:"📝", color:"#f97316", bg:"#fff7ed",  ring:false },
          { label:"Tingkat Kelulusan", value:"87%", sub:"Dari total peserta",  icon:null, color:"#22c55e", bg:"",         ring:true, ringVal:87 },
        ].map((s) => (
          <div key={s.label} style={{ flex:1, backgroundColor:"#fff", borderRadius:12, padding:"16px 16px", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:10, color:"#6b7280", fontWeight:500, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.04em" }}>{s.label}</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:28, fontWeight:800, color:"#1a2035", lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:10, color:"#9ca3af", marginTop:6 }}>{s.sub}</div>
              </div>
              {s.ring ? (
                <RingIndicator pct={s.ringVal!} color={s.color} />
              ) : (
                <div style={{ width:40, height:40, borderRadius:10, backgroundColor:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                  {s.icon}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── 3-column chart row ─────────────────────────────────────── */}
      <div style={{ display:"flex", gap:16 }}>

        {/* Tren Pelaksanaan Ujian — line chart */}
        <div style={{ flex:2, backgroundColor:"#fff", borderRadius:12, padding:"18px", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:0 }}>Tren Pelaksanaan Ujian</h4>
            <select style={{ fontSize:11, padding:"4px 8px", borderRadius:6, border:"1px solid #e5e7eb", color:"#374151", backgroundColor:"#fff", outline:"none" }}>
              <option>1 Bulan Terakhir</option>
              <option>3 Bulan Terakhir</option>
              <option>6 Bulan Terakhir</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <LineChart data={trendData} margin={{ top:5, right:5, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false} />
              <XAxis dataKey="tgl" tick={{ fontSize:10, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize:11, borderRadius:8, border:"1px solid rgba(0,0,0,0.06)" }} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:11, paddingTop:8 }} />
              <Line type="monotone" dataKey="selesai"  stroke="#3b82f6" strokeWidth={2} dot={false} name="Ujian Selesai" />
              <Line type="monotone" dataKey="peserta"  stroke="#22c55e" strokeWidth={2} dot={false} name="Peserta Aktif" />
              <Line type="monotone" dataKey="avgNilai" stroke="#f97316" strokeWidth={2} dot={false} name="Nilai Rata-rata" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pengguna Berdasarkan Jenis — donut */}
        <div style={{ flex:1, backgroundColor:"#fff", borderRadius:12, padding:"18px", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", minWidth:0 }}>
          <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:"0 0 14px" }}>Pengguna Berdasarkan Jenis</h4>
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", width:120, height:120 }}>
              <PieChart width={120} height={120}>
                <Pie data={jenisData} cx={55} cy={55} innerRadius={36} outerRadius={52} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {jenisData.map((e,i)=><Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontSize:17, fontWeight:800, color:"#1a2035" }}>24</div>
                <div style={{ fontSize:9, color:"#9ca3af" }}>Tipe Soal</div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:7, marginTop:12 }}>
            {jenisData.map((d)=>(
              <div key={d.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:2, backgroundColor:d.color }} />
                  <span style={{ fontSize:11, color:"#4b5563" }}>{d.name}</span>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:"#1a2035" }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan Status Mahasiswa — donut */}
        <div style={{ flex:1, backgroundColor:"#fff", borderRadius:12, padding:"18px", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", minWidth:0 }}>
          <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:"0 0 14px" }}>Ringkasan Status Mahasiswa</h4>
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", width:120, height:120 }}>
              <PieChart width={120} height={120}>
                <Pie data={statusMhsData} cx={55} cy={55} innerRadius={36} outerRadius={52} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {statusMhsData.map((e,i)=><Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontSize:17, fontWeight:800, color:"#1a2035" }}>350</div>
                <div style={{ fontSize:9, color:"#9ca3af" }}>Mahasiswa</div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:7, marginTop:12 }}>
            {statusMhsData.map((d)=>(
              <div key={d.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:2, backgroundColor:d.color }} />
                  <span style={{ fontSize:11, color:"#4b5563" }}>{d.name}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"#1a2035" }}>{d.value}</span>
                  <span style={{ fontSize:10, color:"#9ca3af" }}>{d.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom: recap table + right sidebar ────────────────────── */}
      <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>

        {/* Rekap Ujian per Mata Kuliah table */}
        <div style={{ flex:1, minWidth:0, backgroundColor:"#fff", borderRadius:12, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", overflow:"hidden" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f0f2f5" }}>
            <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:0 }}>Rekap Ujian per Mata Kuliah</h4>
            <button style={{ ...btnOutline, fontSize:12, padding:"6px 12px" }}><Download size={13} /> Export</button>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ backgroundColor:"#f9fafb", borderBottom:"1px solid #f0f2f5" }}>
                {["No","Mata Kuliah","Tanggal","Waktu","Peserta","Nilai Rata-rata","Lulus","Tidak Lulus","Aksi"].map(h=>(
                  <th key={h} style={{ padding:"9px 12px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedRekap.map((r, i)=>{
                const lulusRate = Math.round(r.lulus/r.peserta*100);
                return (
                  <tr key={r.no} style={{ borderBottom:"1px solid #f0f2f5", backgroundColor:i%2===0?"#fff":"#fafafa" }}>
                    <td style={{ padding:"9px 12px", color:"#9ca3af" }}>{r.no}</td>
                    <td style={{ padding:"9px 12px", fontWeight:600, color:"#1a2035", whiteSpace:"nowrap" }}>{r.nama}</td>
                    <td style={{ padding:"9px 12px", color:"#374151", whiteSpace:"nowrap" }}>{r.tanggal}</td>
                    <td style={{ padding:"9px 12px", color:"#374151", whiteSpace:"nowrap" }}>{r.waktu}</td>
                    <td style={{ padding:"9px 12px", textAlign:"center", fontWeight:600, color:"#1a2035" }}>{r.peserta}</td>
                    <td style={{ padding:"9px 12px", textAlign:"center" }}>
                      <span style={{ fontWeight:700, color: r.avg>=80?"#16a34a":r.avg>=70?"#2563eb":"#dc2626" }}>{r.avg}</span>
                    </td>
                    <td style={{ padding:"9px 12px", textAlign:"center" }}>
                      <span style={{ fontWeight:600, color:"#16a34a" }}>{r.lulus}</span>
                      <span style={{ fontSize:10, color:"#9ca3af", marginLeft:4 }}>({lulusRate}%)</span>
                    </td>
                    <td style={{ padding:"9px 12px", textAlign:"center" }}>
                      <span style={{ fontWeight:600, color:"#dc2626" }}>{r.tidakLulus}</span>
                    </td>
                    <td style={{ padding:"9px 12px" }}>
                      <div style={{ display:"flex", gap:4 }}>
                        <ABtn icon={<Eye size={12} color="#6b7280" />}           border="#e5e7eb" bg="#f9fafb" title="Detail" />
                        <ABtn icon={<TrendingUp size={12} color="#3b82f6" />}    border="#bfdbfe" bg="#eff6ff" title="Analisis" />
                        <ABtn icon={<Download size={12} color="#a855f7" />}      border="#e9d5ff" bg="#faf5ff" title="Export" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding:"10px 16px", borderTop:"1px solid #f0f2f5", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:11, color:"#6b7280" }}>Menampilkan {displayedRekap.length} dari {rekapUjian.length} ujian</span>
            <button
              onClick={()=>setShowAll(v=>!v)}
              style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"#3b82f6", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}
            >
              {showAll ? "Sembunyikan" : "Lihat Semua"} <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width:240, flexShrink:0, display:"flex", flexDirection:"column", gap:14 }}>

          {/* Laporan Populer */}
          <div style={{ backgroundColor:"#fff", borderRadius:12, padding:"18px", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:"0 0 14px" }}>Laporan Populer</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {popularReports.map((r)=>(
                <div key={r.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:8, backgroundColor:"#f9fafb", border:"1px solid #f0f2f5", cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                    <div style={{ width:30, height:30, borderRadius:7, backgroundColor: r.icon==="pdf"?"#fee2e2":"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {r.icon==="pdf"
                        ? <FileText size={14} color="#dc2626" />
                        : <FileSpreadsheet size={14} color="#16a34a" />}
                    </div>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:"#1a2035", lineHeight:1.3 }}>{r.label}</div>
                      <div style={{ fontSize:10, color:"#9ca3af", marginTop:1 }}>{r.type}</div>
                    </div>
                  </div>
                  <button style={{ width:26, height:26, borderRadius:6, border:"1px solid #e5e7eb", backgroundColor:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Download size={12} color="#6b7280" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan Sistem */}
          <div style={{ backgroundColor:"#fff", borderRadius:12, padding:"18px", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:"0 0 12px" }}>Catatan Sistem</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {systemNotes.map((n, i)=>{
                const s = noteStyle[n.type as keyof typeof noteStyle];
                return (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 11px", borderRadius:8, backgroundColor:s.bg, border:`1px solid ${s.border}` }}>
                    <div style={{ flexShrink:0, marginTop:1 }}>{s.icon}</div>
                    <p style={{ fontSize:11, color:s.text, margin:0, lineHeight:1.5 }}>{n.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick export */}
          <div style={{ backgroundColor:"#1a2035", borderRadius:12, padding:"16px" }}>
            <h4 style={{ fontSize:12, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>Export Cepat</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <button style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 12px", borderRadius:7, fontSize:12, fontWeight:600, border:"1px solid rgba(255,255,255,0.15)", backgroundColor:"rgba(255,255,255,0.08)", color:"#e2e8f0", cursor:"pointer" }}>
                <FileText size={13} color="#f87171" /> Export PDF Lengkap
              </button>
              <button style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 12px", borderRadius:7, fontSize:12, fontWeight:600, border:"1px solid rgba(255,255,255,0.15)", backgroundColor:"rgba(255,255,255,0.08)", color:"#e2e8f0", cursor:"pointer" }}>
                <FileSpreadsheet size={13} color="#86efac" /> Export Excel Lengkap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function RingIndicator({ pct, color }: { pct: number; color: string }) {
  const size=50, r=21, circ=2*Math.PI*r;
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={25} cy={25} r={r} fill="none" stroke="#f0f2f5" strokeWidth={5} />
        <circle cx={25} cy={25} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${(pct/100)*circ} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 25 25)" />
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color }}>
        {pct}%
      </div>
    </div>
  );
}

function ABtn({ icon, border, bg, title }: { icon: React.ReactNode; border: string; bg: string; title: string }) {
  return (
    <button title={title} style={{ width:26, height:26, borderRadius:6, border:`1px solid ${border}`, backgroundColor:bg, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {icon}
    </button>
  );
}

const btnPrimary: React.CSSProperties = { display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:8, fontSize:13, fontWeight:600, border:"none", backgroundColor:"#3b82f6", color:"#fff", cursor:"pointer" };
const btnOutline: React.CSSProperties = { display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8, fontSize:13, fontWeight:600, border:"1.5px solid #d1d5db", backgroundColor:"#fff", color:"#374151", cursor:"pointer" };
