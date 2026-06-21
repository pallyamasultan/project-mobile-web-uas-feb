import { useState, useEffect } from "react";
import {
  Search, RotateCcw, RefreshCw, Settings, StopCircle,
  Eye, MessageSquare, AlertTriangle, CheckCircle2, Clock, LogOut,
} from "lucide-react";

// ── Types & Data ──────────────────────────────────────────────────────────────

type StudentStatus = "Mengerjakan" | "Selesai" | "Keluar" | "Belum Mulai";

interface Student {
  no: number; nama: string; nim: string; mk: string;
  status: StudentStatus; nilai: number | null; waktu: string;
  ruang: string; x: number; y: number;
}

const statusStyle: Record<StudentStatus, { bg: string; text: string; dot: string }> = {
  "Mengerjakan": { bg: "#fef9c3", text: "#b45309", dot: "#f59e0b" },
  "Selesai":     { bg: "#dcfce7", text: "#16a34a", dot: "#22c55e" },
  "Keluar":      { bg: "#fee2e2", text: "#dc2626", dot: "#ef4444" },
  "Belum Mulai": { bg: "#f3f4f6", text: "#6b7280", dot: "#9ca3af" },
};

const students: Student[] = [
  { no:1,  nama:"Ahmad Fauzi",     nim:"2022010001", mk:"Manajemen Akuntansi", status:"Selesai",     nilai:88,  waktu:"08:42", ruang:"A", x:20, y:25 },
  { no:2,  nama:"Citra Lestari",   nim:"2022010002", mk:"Manajemen Akuntansi", status:"Selesai",     nilai:76,  waktu:"08:55", ruang:"A", x:35, y:40 },
  { no:3,  nama:"Dani Rahmat",     nim:"2022010003", mk:"Audit 1",             status:"Mengerjakan", nilai:null,waktu:"09:10", ruang:"B", x:55, y:20 },
  { no:4,  nama:"Dewi Anggraeni",  nim:"2022010004", mk:"Manajemen Akuntansi", status:"Keluar",      nilai:null,waktu:"08:30", ruang:"A", x:70, y:55 },
  { no:5,  nama:"Eko Prasetyo",    nim:"2022010005", mk:"Audit 1",             status:"Mengerjakan", nilai:null,waktu:"09:05", ruang:"B", x:42, y:65 },
  { no:6,  nama:"Fajar Nugroho",   nim:"2022010006", mk:"Audit 1",             status:"Mengerjakan", nilai:null,waktu:"09:08", ruang:"B", x:80, y:30 },
  { no:7,  nama:"Gita Purnama",    nim:"2022010007", mk:"Manajemen Akuntansi", status:"Selesai",     nilai:92,  waktu:"08:50", ruang:"A", x:15, y:70 },
  { no:8,  nama:"Hadi Kusuma",     nim:"2022010008", mk:"Audit 1",             status:"Mengerjakan", nilai:null,waktu:"09:02", ruang:"B", x:60, y:75 },
  { no:9,  nama:"Ika Mahmudah",    nim:"2022010009", mk:"Manajemen Akuntansi", status:"Belum Mulai", nilai:null,waktu:"—",     ruang:"A", x:28, y:48 },
  { no:10, nama:"Joko Widodo",     nim:"2022010010", mk:"Audit 1",             status:"Mengerjakan", nilai:null,waktu:"09:00", ruang:"B", x:75, y:45 },
  { no:11, nama:"Kartika Sari",    nim:"2021010011", mk:"Manajemen Akuntansi", status:"Selesai",     nilai:81,  waktu:"08:58", ruang:"A", x:50, y:85 },
  { no:12, nama:"Lukman Hakim",    nim:"2021010012", mk:"Audit 1",             status:"Mengerjakan", nilai:null,waktu:"09:07", ruang:"B", x:88, y:18 },
];

interface Activity {
  id: number; time: string; nama: string;
  event: string; type: "warning" | "success" | "info" | "danger";
}

const activities: Activity[] = [
  { id:1,  time:"09:10", nama:"Dani Rahmat",    event:"Mulai mengerjakan soal",      type:"info"    },
  { id:2,  time:"09:08", nama:"Fajar Nugroho",  event:"Buka tab baru terdeteksi",    type:"warning" },
  { id:3,  time:"09:05", nama:"Eko Prasetyo",   event:"Mulai mengerjakan soal",      type:"info"    },
  { id:4,  time:"09:02", nama:"Hadi Kusuma",    event:"Mulai mengerjakan soal",      type:"info"    },
  { id:5,  time:"09:00", nama:"Joko Widodo",    event:"Mulai mengerjakan soal",      type:"info"    },
  { id:6,  time:"08:58", nama:"Kartika Sari",   event:"Selesai – Nilai: 81",         type:"success" },
  { id:7,  time:"08:55", nama:"Citra Lestari",  event:"Selesai – Nilai: 76",         type:"success" },
  { id:8,  time:"08:50", nama:"Gita Purnama",   event:"Selesai – Nilai: 92",         type:"success" },
  { id:9,  time:"08:42", nama:"Ahmad Fauzi",    event:"Selesai – Nilai: 88",         type:"success" },
  { id:10, time:"08:30", nama:"Dewi Anggraeni", event:"Keluar dari sesi ujian",      type:"danger"  },
];

const actColor = { warning:"#f59e0b", success:"#22c55e", info:"#3b82f6", danger:"#ef4444" };
const actBg    = { warning:"#fef9c3", success:"#dcfce7", info:"#dbeafe",  danger:"#fee2e2" };

const PAGE_SIZE = 8;

// ── Ring indicator ─────────────────────────────────────────────────────────────

function Ring({ pct, color, size = 50 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0f2f5" strokeWidth={5} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${(pct/100)*circ} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color }}>
        {pct}%
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Monitoring() {
  const [search, setSearch]     = useState("");
  const [filterMk, setFilterMk] = useState("");
  const [filterSt, setFilterSt] = useState("");
  const [filterRu, setFilterRu] = useState("");
  const [page, setPage]         = useState(1);
  const [tick, setTick]         = useState(true);

  // pulsing live dot
  useEffect(() => {
    const t = setInterval(() => setTick((v) => !v), 900);
    return () => clearInterval(t);
  }, []);

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      (!search   || s.nama.toLowerCase().includes(q) || s.nim.includes(q)) &&
      (!filterMk || s.mk === filterMk) &&
      (!filterSt || s.status === filterSt) &&
      (!filterRu || s.ruang === filterRu)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  const reset = () => { setSearch(""); setFilterMk(""); setFilterSt(""); setFilterRu(""); setPage(1); };

  const total       = students.length;
  const mengerjakan = students.filter(s => s.status === "Mengerjakan").length;
  const selesai     = students.filter(s => s.status === "Selesai").length;
  const keluar      = students.filter(s => s.status === "Keluar").length;
  const avgNilai    = Math.round(students.filter(s => s.nilai).reduce((a,s) => a+(s.nilai??0), 0) / selesai);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
            {/* pulsing live dot */}
            <span style={{ display:"inline-flex", alignItems:"center", gap:5, backgroundColor:"#dcfce7", padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, color:"#16a34a", border:"1px solid #bbf7d0" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", backgroundColor:"#22c55e", display:"inline-block", opacity: tick ? 1 : 0.3, transition:"opacity 0.4s" }} />
              LIVE
            </span>
            <h2 style={{ fontSize:18, fontWeight:700, color:"#1a2035", margin:0 }}>Live Monitoring Ujian</h2>
          </div>
          <p style={{ fontSize:12, color:"#6b7280", margin:0 }}>
            Pantau aktivitas mahasiswa secara real-time selama ujian berlangsung.
          </p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button style={btnOutline}><RefreshCw size={14} /> Refresh Database</button>
          <button style={btnOutline}><Settings size={14} /> Pengaturan Tampilan</button>
          <button style={{ ...btnOutline, borderColor:"#fecaca", color:"#dc2626", backgroundColor:"#fef2f2" }}>
            <StopCircle size={14} /> Henti Ujian
          </button>
        </div>
      </div>

      {/* ── Stat cards ─────────────────────────────────────────────── */}
      <div style={{ display:"flex", gap:14 }}>
        {[
          { label:"Total Peserta",       value:total,       sub:`${total} terdaftar`,             color:"#3b82f6", pct:100 },
          { label:"Sedang Mengerjakan",  value:mengerjakan, sub:`${Math.round(mengerjakan/total*100)}% dari total`, color:"#f59e0b", pct:Math.round(mengerjakan/total*100) },
          { label:"Telah Selesai",       value:selesai,     sub:`${Math.round(selesai/total*100)}% dari total`,    color:"#22c55e", pct:Math.round(selesai/total*100) },
          { label:"Keluar / Disconnect", value:keluar,      sub:`${Math.round(keluar/total*100)}% dari total`,     color:"#ef4444", pct:Math.round(keluar/total*100) },
          { label:"Rata-rata Nilai",     value:avgNilai,    sub:"Dari peserta selesai",            color:"#a855f7", pct:avgNilai },
        ].map((s) => (
          <div key={s.label} style={{ flex:1, backgroundColor:"#fff", borderRadius:12, padding:"16px 16px", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:10, color:"#6b7280", fontWeight:500, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.04em" }}>{s.label}</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:28, fontWeight:800, color:"#1a2035", lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:10, color:"#9ca3af", marginTop:6 }}>{s.sub}</div>
              </div>
              <Ring pct={s.pct} color={s.color} size={50} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Main split area ─────────────────────────────────────────── */}
      <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>

        {/* Left: student table */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ backgroundColor:"#fff", borderRadius:12, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", overflow:"hidden" }}>
            {/* Table header */}
            <div style={{ padding:"14px 16px", borderBottom:"1px solid #f0f2f5" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:0 }}>Daftar Mahasiswa</h4>
                <div style={{ display:"flex", gap:6 }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11, color:"#16a34a", fontWeight:600 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", backgroundColor:"#22c55e", display:"inline-block" }} />
                    {mengerjakan} Aktif
                  </span>
                </div>
              </div>
              {/* Filters */}
              <div style={{ display:"flex", gap:8 }}>
                <div style={{ position:"relative", flex:2 }}>
                  <Search size={13} style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", color:"#9ca3af" }} />
                  <input value={search} onChange={(e)=>{ setSearch(e.target.value); setPage(1); }} placeholder="Cari mahasiswa, NIM..."
                    style={{ width:"100%", padding:"7px 8px 7px 28px", borderRadius:7, border:"1px solid #e5e7eb", fontSize:12, color:"#374151", outline:"none", boxSizing:"border-box" }} />
                </div>
                <select value={filterSt} onChange={(e)=>{ setFilterSt(e.target.value); setPage(1); }} style={sel}>
                  <option value="">Semua Status</option>
                  <option value="Mengerjakan">Mengerjakan</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Keluar">Keluar</option>
                  <option value="Belum Mulai">Belum Mulai</option>
                </select>
                <select value={filterMk} onChange={(e)=>{ setFilterMk(e.target.value); setPage(1); }} style={sel}>
                  <option value="">Semua Mata Kuliah</option>
                  {[...new Set(students.map(s=>s.mk))].map(m=><option key={m} value={m}>{m}</option>)}
                </select>
                <select value={filterRu} onChange={(e)=>{ setFilterRu(e.target.value); setPage(1); }} style={sel}>
                  <option value="">Semua Ruang</option>
                  <option value="A">Ruang A</option>
                  <option value="B">Ruang B</option>
                </select>
                <button onClick={reset} style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 10px", borderRadius:7, fontSize:12, border:"1px solid #e5e7eb", backgroundColor:"#f9fafb", color:"#6b7280", cursor:"pointer" }}>
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>

            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ backgroundColor:"#f9fafb", borderBottom:"1px solid #f0f2f5" }}>
                  {["No","Mahasiswa","NIM","Mata Kuliah","Status","Nilai","Waktu","Aksi"].map(h=>(
                    <th key={h} style={{ padding:"9px 12px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((s, i) => {
                  const sc = statusStyle[s.status];
                  return (
                    <tr key={s.nim} style={{ borderBottom:"1px solid #f0f2f5", backgroundColor: i%2===0?"#fff":"#fafafa" }}>
                      <td style={{ padding:"9px 12px", color:"#9ca3af" }}>{s.no}</td>
                      <td style={{ padding:"9px 12px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${avatarGrad(s.nama)})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:10, fontWeight:700, flexShrink:0 }}>
                            {initials(s.nama)}
                          </div>
                          <span style={{ fontWeight:600, color:"#1a2035", whiteSpace:"nowrap" }}>{s.nama}</span>
                        </div>
                      </td>
                      <td style={{ padding:"9px 12px", color:"#6b7280", fontSize:11 }}>{s.nim}</td>
                      <td style={{ padding:"9px 12px", color:"#374151", whiteSpace:"nowrap" }}>{s.mk}</td>
                      <td style={{ padding:"9px 12px" }}>
                        <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:600, backgroundColor:sc.bg, color:sc.text }}>
                          <span style={{ width:5, height:5, borderRadius:"50%", backgroundColor:sc.dot }} />
                          {s.status}
                        </span>
                      </td>
                      <td style={{ padding:"9px 12px", textAlign:"center" }}>
                        {s.nilai !== null
                          ? <span style={{ fontWeight:700, color: s.nilai>=75?"#16a34a":"#dc2626" }}>{s.nilai}</span>
                          : <span style={{ color:"#d1d5db" }}>—</span>}
                      </td>
                      <td style={{ padding:"9px 12px", color:"#6b7280", whiteSpace:"nowrap" }}>{s.waktu}</td>
                      <td style={{ padding:"9px 12px" }}>
                        <div style={{ display:"flex", gap:4 }}>
                          <ABtn icon={<Eye size={12} color="#6b7280" />}            border="#e5e7eb" bg="#f9fafb" title="Detail" />
                          <ABtn icon={<MessageSquare size={12} color="#3b82f6" />}  border="#bfdbfe" bg="#eff6ff" title="Pesan" />
                          {s.status==="Keluar" && (
                            <ABtn icon={<AlertTriangle size={12} color="#f59e0b" />} border="#fde68a" bg="#fefce8" title="Peringatan" />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* pagination */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", borderTop:"1px solid #f0f2f5" }}>
              <span style={{ fontSize:11, color:"#6b7280" }}>
                Menampilkan {filtered.length===0?0:(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE,filtered.length)} dari {filtered.length} data
              </span>
              <div style={{ display:"flex", gap:4 }}>
                <PBtn label="‹" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} />
                {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
                  <PBtn key={p} label={String(p)} onClick={()=>setPage(p)} active={p===page} />
                ))}
                <PBtn label="›" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: activity log */}
        <div style={{ width:240, flexShrink:0 }}>
          <div style={{ backgroundColor:"#fff", borderRadius:12, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", padding:"16px", maxHeight:460, overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:0 }}>Aktivitas Pengawasan</h4>
              <button style={{ fontSize:11, color:"#3b82f6", background:"none", border:"none", cursor:"pointer", fontWeight:600, padding:0 }}>Lihat Semua</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, overflowY:"auto" }}>
              {activities.map((a) => (
                <div key={a.id} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", backgroundColor:actBg[a.type], display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                    {a.type==="success" && <CheckCircle2 size={13} color={actColor[a.type]} />}
                    {a.type==="warning" && <AlertTriangle size={13} color={actColor[a.type]} />}
                    {a.type==="info"    && <Clock size={13} color={actColor[a.type]} />}
                    {a.type==="danger"  && <LogOut size={13} color={actColor[a.type]} />}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:11, fontWeight:600, color:"#1a2035", lineHeight:1.3 }}>{a.nama}</div>
                    <div style={{ fontSize:10, color:"#6b7280", marginTop:1, lineHeight:1.4 }}>{a.event}</div>
                  </div>
                  <div style={{ fontSize:9, color:"#9ca3af", flexShrink:0, marginTop:2 }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Peta Sebaran Mahasiswa ─────────────────────────────────── */}
      <div style={{ backgroundColor:"#fff", borderRadius:12, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", padding:"18px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:0 }}>Peta Sebaran Mahasiswa</h4>
          <div style={{ display:"flex", gap:12 }}>
            {(["Mengerjakan","Selesai","Keluar","Belum Mulai"] as StudentStatus[]).map(st=>(
              <div key={st} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"#6b7280" }}>
                <div style={{ width:8, height:8, borderRadius:"50%", backgroundColor:statusStyle[st].dot }} />
                {st}
              </div>
            ))}
          </div>
        </div>
        {/* scatter grid */}
        <div style={{ position:"relative", height:160, backgroundColor:"#f8fafc", borderRadius:10, border:"1px solid #e5e7eb", overflow:"hidden" }}>
          {/* grid lines */}
          {[25,50,75].map(p=>(
            <div key={p} style={{ position:"absolute", left:`${p}%`, top:0, bottom:0, borderLeft:"1px dashed #e5e7eb" }} />
          ))}
          {[33,66].map(p=>(
            <div key={p} style={{ position:"absolute", top:`${p}%`, left:0, right:0, borderTop:"1px dashed #e5e7eb" }} />
          ))}
          {/* room labels */}
          <div style={{ position:"absolute", left:8, top:6, fontSize:10, fontWeight:600, color:"#9ca3af" }}>Ruang A</div>
          <div style={{ position:"absolute", left:"52%", top:6, fontSize:10, fontWeight:600, color:"#9ca3af" }}>Ruang B</div>
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, borderLeft:"2px solid #d1d5db" }} />
          {/* student dots */}
          {students.map((s) => (
            <div
              key={s.nim}
              title={`${s.nama} — ${s.status}`}
              style={{
                position:"absolute",
                left:`${s.x}%`, top:`${s.y}%`,
                width:20, height:20,
                borderRadius:"50%",
                backgroundColor: statusStyle[s.status].dot,
                border:"2px solid #fff",
                boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
                transform:"translate(-50%,-50%)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:7, fontWeight:700, color:"#fff",
                cursor:"pointer",
                transition:"transform 0.15s",
              }}
            >
              {initials(s.nama)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Aksi Cepat bar ────────────────────────────────────────── */}
      <div style={{ backgroundColor:"#fff", borderRadius:12, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", padding:"14px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <span style={{ fontSize:12, fontWeight:700, color:"#1a2035", marginRight:6 }}>Aksi Cepat:</span>
          <button style={{ ...btnOutline, fontSize:12, padding:"7px 14px" }}><MessageSquare size={13} /> Kirim Notifikasi</button>
          <button style={{ ...btnOutline, fontSize:12, padding:"7px 14px" }}><CheckCircle2 size={13} color="#22c55e" /> Bagi Soal Di</button>
          <button style={{ ...btnOutline, fontSize:12, padding:"7px 14px" }}><AlertTriangle size={13} color="#f59e0b" /> Kirim ke Mahasiswa</button>
          <button style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, fontSize:12, fontWeight:600, border:"none", backgroundColor:"#ef4444", color:"#fff", cursor:"pointer" }}>
            <StopCircle size={13} /> Hentikan Semua Ujian
          </button>
        </div>
      </div>

    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
}
const palette = ["#3b82f6,#1d4ed8","#a855f7,#7c3aed","#22c55e,#16a34a","#f97316,#ea580c","#ef4444,#dc2626"];
function avatarGrad(name: string) { return palette[name.charCodeAt(0) % palette.length]; }

function ABtn({ icon, border, bg, title }: { icon: React.ReactNode; border: string; bg: string; title: string }) {
  return (
    <button title={title} style={{ width:26, height:26, borderRadius:6, border:`1px solid ${border}`, backgroundColor:bg, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {icon}
    </button>
  );
}
function PBtn({ label, onClick, disabled, active }: { label:string; onClick:()=>void; disabled?:boolean; active?:boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ minWidth:26, height:26, padding:"0 5px", borderRadius:6, fontSize:12, fontWeight:600, border:active?"none":"1px solid #e5e7eb", backgroundColor:active?"#3b82f6":disabled?"#f9fafb":"#fff", color:active?"#fff":disabled?"#d1d5db":"#374151", cursor:disabled?"default":"pointer" }}>
      {label}
    </button>
  );
}

const btnOutline: React.CSSProperties = { display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8, fontSize:13, fontWeight:600, border:"1.5px solid #d1d5db", backgroundColor:"#fff", color:"#374151", cursor:"pointer" };
const sel: React.CSSProperties = { flex:1, minWidth:110, padding:"7px 8px", borderRadius:7, border:"1px solid #e5e7eb", fontSize:12, color:"#374151", backgroundColor:"#fff", outline:"none", cursor:"pointer" };
