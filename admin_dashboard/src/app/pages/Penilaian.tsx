import { useState } from "react";
import {
  Download, Upload, FileText, Send, Filter, RotateCcw,
  Edit2, Eye, CheckCircle2,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getGrade(nilai: number | null): string {
  if (nilai === null) return "—";
  if (nilai >= 85) return "A";
  if (nilai >= 70) return "B";
  if (nilai >= 55) return "C";
  if (nilai >= 40) return "D";
  return "E";
}

const gradeColor: Record<string, { bg: string; text: string }> = {
  A: { bg: "#dcfce7", text: "#16a34a" },
  B: { bg: "#dbeafe", text: "#1d4ed8" },
  C: { bg: "#fef9c3", text: "#b45309" },
  D: { bg: "#ffedd5", text: "#c2410c" },
  E: { bg: "#fee2e2", text: "#dc2626" },
  "—": { bg: "#f3f4f6", text: "#9ca3af" },
};

// ── Data ─────────────────────────────────────────────────────────────────────

interface Peserta {
  no: number; nim: string; nama: string; mk: string;
  nilai: number | null; nameColor: string;
}

const allPeserta: Peserta[] = [
  { no:1,  nim:"2022010001", nama:"Ahmad Fauzi",      mk:"Manajemen Akuntansi", nilai:88.5,  nameColor:"#3b82f6" },
  { no:2,  nim:"2022010002", nama:"Citra Lestari",    mk:"Manajemen Akuntansi", nilai:75.0,  nameColor:"#a855f7" },
  { no:3,  nim:"2022010003", nama:"Dani Rahmat",      mk:"Audit 1",             nilai:82.0,  nameColor:"#22c55e" },
  { no:4,  nim:"2022010004", nama:"Dewi Anggraeni",   mk:"Manajemen Akuntansi", nilai:null,  nameColor:"#f97316" },
  { no:5,  nim:"2022010005", nama:"Eko Prasetyo",     mk:"Audit 1",             nilai:91.0,  nameColor:"#3b82f6" },
  { no:6,  nim:"2022010006", nama:"Fajar Nugroho",    mk:"Manajemen Akuntansi", nilai:68.5,  nameColor:"#a855f7" },
  { no:7,  nim:"2022010007", nama:"Gita Purnama",     mk:"Audit 1",             nilai:77.0,  nameColor:"#22c55e" },
  { no:8,  nim:"2022010008", nama:"Hadi Kusuma",      mk:"Manajemen Akuntansi", nilai:null,  nameColor:"#ef4444" },
  { no:9,  nim:"2022010009", nama:"Ika Mahmudah",     mk:"Audit 1",             nilai:55.5,  nameColor:"#f97316" },
  { no:10, nim:"2022010010", nama:"Joko Widodo",      mk:"Manajemen Akuntansi", nilai:83.0,  nameColor:"#3b82f6" },
  { no:11, nim:"2021010011", nama:"Kartika Sari",     mk:"Audit 1",             nilai:null,  nameColor:"#a855f7" },
  { no:12, nim:"2021010012", nama:"Lukman Hakim",     mk:"Manajemen Akuntansi", nilai:72.5,  nameColor:"#22c55e" },
  { no:13, nim:"2021010013", nama:"Maya Indah",       mk:"Audit 1",             nilai:46.0,  nameColor:"#f97316" },
  { no:14, nim:"2021010014", nama:"Naufal Rizky",     mk:"Manajemen Akuntansi", nilai:89.0,  nameColor:"#3b82f6" },
  { no:15, nim:"2021010015", nama:"Olivia Permata",   mk:"Audit 1",             nilai:null,  nameColor:"#a855f7" },
];

const avgBarData = [
  { ujian: "UAS Man. Akuntansi", avg: 78.4 },
  { ujian: "UAS Audit 1",        avg: 72.6 },
  { ujian: "UTS Perpajakan",     avg: 81.2 },
  { ujian: "UAS Man. Keuangan",  avg: 69.8 },
  { ujian: "UTS Ekonomi Mikro",  avg: 75.5 },
];

const PAGE_SIZE = 8;

const mataKuliahOptions = ["Akuntansi Manajemen", "Audit 1", "Perpajakan", "Manajemen Keuangan"];
const ujianOptions: Record<string, string[]> = {
  "Akuntansi Manajemen": ["UAS – Akuntansi Manajemen", "UTS – Akuntansi Manajemen"],
  "Audit 1":             ["UAS – Audit 1", "UTS – Audit 1"],
  "Perpajakan":          ["UAS – Perpajakan"],
  "Manajemen Keuangan":  ["UAS – Manajemen Keuangan"],
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Penilaian() {
  const [selectedMK, setSelectedMK]       = useState("Akuntansi Manajemen");
  const [selectedUjian, setSelectedUjian] = useState("UAS – Akuntansi Manajemen");
  const [selectedProdi, setSelectedProdi] = useState("");
  const [page, setPage]                   = useState(1);
  const [editingNilai, setEditingNilai]   = useState<Record<number, string>>({});

  const nilaiMap: Record<number, number | null> = {};
  allPeserta.forEach((p) => {
    nilaiMap[p.no] = editingNilai[p.no] !== undefined
      ? (editingNilai[p.no] === "" ? null : parseFloat(editingNilai[p.no]))
      : p.nilai;
  });

  const sudahDinilai = allPeserta.filter((p) => nilaiMap[p.no] !== null).length;
  const belumDinilai = allPeserta.length - sudahDinilai;
  const nilaiList    = allPeserta.map((p) => nilaiMap[p.no]).filter((v): v is number => v !== null);
  const avgNilai     = nilaiList.length ? (nilaiList.reduce((a, b) => a + b, 0) / nilaiList.length).toFixed(2) : "—";

  // grade distribution
  const gradeCounts = { A:0, B:0, C:0, D:0, E:0 };
  nilaiList.forEach((n) => { const g = getGrade(n) as keyof typeof gradeCounts; if (g !== "—") gradeCounts[g]++; });
  const donutData = [
    { name:"A (≥85)", value: gradeCounts.A, color:"#22c55e" },
    { name:"B (70–84)",value: gradeCounts.B, color:"#3b82f6" },
    { name:"C (55–69)",value: gradeCounts.C, color:"#f59e0b" },
    { name:"D (40–54)",value: gradeCounts.D, color:"#f97316" },
    { name:"E (<40)",  value: gradeCounts.E, color:"#ef4444" },
  ];

  const totalPages = Math.max(1, Math.ceil(allPeserta.length / PAGE_SIZE));
  const paginated  = allPeserta.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

      {/* ── Top filter bar ─────────────────────────────────────────── */}
      <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
        <select
          value={selectedMK}
          onChange={(e) => { setSelectedMK(e.target.value); setSelectedUjian(ujianOptions[e.target.value]?.[0] ?? ""); }}
          style={topSel}
        >
          {mataKuliahOptions.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={selectedUjian} onChange={(e) => setSelectedUjian(e.target.value)} style={{ ...topSel, minWidth:220 }}>
          {(ujianOptions[selectedMK] ?? []).map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
        <select value={selectedProdi} onChange={(e) => setSelectedProdi(e.target.value)} style={topSel}>
          <option value="">Semua Prodi/Kelas</option>
          <option value="S1 Akuntansi">S1 Akuntansi</option>
          <option value="S1 Manajemen">S1 Manajemen</option>
        </select>
        <button style={btnPrimary}><Filter size={13} /> Filter</button>
        <button style={btnOutline}><RotateCcw size={13} /> Reset</button>
      </div>

      {/* ── Dark gradient stat cards ───────────────────────────────── */}
      <div style={{ display:"flex", gap:14 }}>
        {[
          { label:"Total Ujian Selesai", value:"8",           sub:"Ujian selesai",        grad:"linear-gradient(135deg,#1e3a8a,#2563eb)", icon:"📋" },
          { label:"Total Mahasiswa",     value:"327",          sub:"Peserta terdaftar",    grad:"linear-gradient(135deg,#4c1d95,#7c3aed)", icon:"🎓" },
          { label:"Sudah Dinilai",       value:String(sudahDinilai), sub:"Nilai masuk",   grad:"linear-gradient(135deg,#14532d,#16a34a)", icon:"✅" },
          { label:"Belum Dinilai",       value:String(belumDinilai), sub:"Perlu input",   grad:"linear-gradient(135deg,#7c2d12,#ea580c)", icon:"⏳" },
          { label:"Rata-rata Nilai",     value:String(avgNilai),     sub:"Semua peserta", grad:"linear-gradient(135deg,#134e4a,#0d9488)", icon:"📊" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              flex:1, borderRadius:14, padding:"18px 20px",
              background:s.grad, boxShadow:"0 4px 14px rgba(0,0,0,0.18)",
              position:"relative", overflow:"hidden",
            }}
          >
            <div style={{ position:"absolute", top:-18, right:-18, width:80, height:80, borderRadius:"50%", backgroundColor:"rgba(255,255,255,0.08)" }} />
            <div style={{ position:"absolute", bottom:-20, right:14, width:55, height:55, borderRadius:"50%", backgroundColor:"rgba(255,255,255,0.05)" }} />
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.7)", fontWeight:500, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:8 }}>{s.label}</div>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:28, fontWeight:800, color:"#fff", lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", marginTop:6 }}>{s.sub}</div>
              </div>
              <div style={{ fontSize:24, opacity:0.85 }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main content: table + donut ────────────────────────────── */}
      <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>

        {/* Grading table */}
        <div style={{ flex:1, minWidth:0, backgroundColor:"#fff", borderRadius:12, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", overflow:"hidden" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f0f2f5" }}>
            <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:0 }}>Daftar Peserta &amp; Penilaian</h4>
            <div style={{ display:"flex", gap:8 }}>
              <button style={{ ...btnOutline, fontSize:12, padding:"6px 12px" }}><Download size={13} /> Export Nilai</button>
              <button style={{ ...btnPrimary, fontSize:12, padding:"6px 12px" }}><Edit2 size={13} /> Input Nilai</button>
            </div>
          </div>

          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ backgroundColor:"#f9fafb", borderBottom:"1px solid #f0f2f5" }}>
                {["No","NIM","Nama Peserta","Mata Kuliah","Nilai","Grade","Status","Aksi"].map(h=>(
                  <th key={h} style={{ padding:"9px 12px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, i) => {
                const currentNilai = nilaiMap[p.no];
                const grade        = getGrade(currentNilai);
                const gc           = gradeColor[grade];
                const sudah        = currentNilai !== null;
                return (
                  <tr key={p.nim} style={{ borderBottom:"1px solid #f0f2f5", backgroundColor:i%2===0?"#fff":"#fafafa" }}>
                    <td style={{ padding:"9px 12px", color:"#9ca3af" }}>{p.no}</td>
                    <td style={{ padding:"9px 12px", color:"#6b7280", fontSize:11, whiteSpace:"nowrap" }}>{p.nim}</td>
                    <td style={{ padding:"9px 12px", fontWeight:600, color:p.nameColor, whiteSpace:"nowrap" }}>{p.nama}</td>
                    <td style={{ padding:"9px 12px", color:"#374151", whiteSpace:"nowrap" }}>{p.mk}</td>
                    <td style={{ padding:"9px 12px", width:90 }}>
                      <input
                        type="number"
                        min={0} max={100}
                        value={editingNilai[p.no] ?? (p.nilai !== null ? String(p.nilai) : "")}
                        onChange={(e) => setEditingNilai((prev) => ({ ...prev, [p.no]: e.target.value }))}
                        placeholder="—"
                        style={{
                          width:"100%", padding:"5px 8px", borderRadius:6,
                          border:"1px solid #e5e7eb", fontSize:12, color:"#1a2035",
                          fontWeight:600, outline:"none", textAlign:"center",
                          boxSizing:"border-box",
                          backgroundColor: sudah ? "#f0fdf4" : "#fff",
                        }}
                      />
                    </td>
                    <td style={{ padding:"9px 12px" }}>
                      <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, backgroundColor:gc.bg, color:gc.text }}>
                        {grade}
                      </span>
                    </td>
                    <td style={{ padding:"9px 12px" }}>
                      <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:600,
                        backgroundColor: sudah ? "#dcfce7" : "#fef9c3",
                        color:           sudah ? "#16a34a" : "#b45309",
                      }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", backgroundColor: sudah?"#22c55e":"#f59e0b" }} />
                        {sudah ? "Sudah Dinilai" : "Belum Dinilai"}
                      </span>
                    </td>
                    <td style={{ padding:"9px 12px" }}>
                      <div style={{ display:"flex", gap:4 }}>
                        <ABtn icon={<Eye size={12} color="#6b7280" />}          border="#e5e7eb" bg="#f9fafb" title="Detail" />
                        <ABtn icon={<CheckCircle2 size={12} color="#16a34a" />} border="#bbf7d0" bg="#f0fdf4" title="Konfirmasi" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", borderTop:"1px solid #f0f2f5" }}>
            <span style={{ fontSize:11, color:"#6b7280" }}>
              Menampilkan {(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE, allPeserta.length)} dari {allPeserta.length} data
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

        {/* Distribusi Nilai donut */}
        <div style={{ width:230, flexShrink:0, backgroundColor:"#fff", borderRadius:12, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", padding:"18px" }}>
          <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:"0 0 14px" }}>Distribusi Nilai</h4>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
            <div style={{ position:"relative", width:130, height:130 }}>
              <PieChart width={130} height={130}>
                <Pie data={donutData.filter(d=>d.value>0)} cx={60} cy={60} innerRadius={38} outerRadius={56} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {donutData.filter(d=>d.value>0).map((e,i)=><Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontSize:18, fontWeight:800, color:"#1a2035" }}>327</div>
                <div style={{ fontSize:9, color:"#9ca3af" }}>Total</div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {donutData.map((d) => (
              <div key={d.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:2, backgroundColor:d.color, flexShrink:0 }} />
                  <span style={{ fontSize:11, color:"#4b5563" }}>{d.name}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"#1a2035" }}>{d.value}</span>
                  <span style={{ fontSize:10, color:"#9ca3af", width:32, textAlign:"right" }}>
                    {nilaiList.length ? Math.round(d.value/nilaiList.length*100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* mini summary */}
          <div style={{ marginTop:16, padding:"12px", borderRadius:8, backgroundColor:"#f8fafc", border:"1px solid #e5e7eb" }}>
            <div style={{ fontSize:11, color:"#6b7280", marginBottom:6, fontWeight:600 }}>Ringkasan</div>
            {[
              { label:"Tertinggi", value: nilaiList.length ? Math.max(...nilaiList).toFixed(1) : "—", color:"#16a34a" },
              { label:"Terendah",  value: nilaiList.length ? Math.min(...nilaiList).toFixed(1) : "—", color:"#dc2626" },
              { label:"Rata-rata", value: String(avgNilai),                                           color:"#2563eb" },
            ].map(r=>(
              <div key={r.label} style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:11, color:"#6b7280" }}>{r.label}</span>
                <span style={{ fontSize:12, fontWeight:700, color:r.color }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bar chart: avg nilai per ujian ────────────────────────── */}
      <div style={{ backgroundColor:"#fff", borderRadius:12, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", padding:"18px" }}>
        <h4 style={{ fontSize:13, fontWeight:700, color:"#1a2035", margin:"0 0 16px" }}>
          Perolehan Nilai per Ujian <span style={{ fontWeight:400, color:"#9ca3af" }}>(Rata-rata)</span>
        </h4>
        <ResponsiveContainer width="100%" height={170}>
          <BarChart data={avgBarData} margin={{ top:5, right:10, left:-15, bottom:0 }} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false} />
            <XAxis dataKey="ujian" tick={{ fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0,100]} tick={{ fontSize:11, fill:"#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(v: number) => [`${v}`, "Rata-rata Nilai"]}
              contentStyle={{ fontSize:12, borderRadius:8, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 4px 12px rgba(0,0,0,0.08)" }}
            />
            <Bar dataKey="avg" fill="#3b82f6" radius={[6,6,0,0]}>
              {avgBarData.map((_, i) => (
                <Cell key={i} fill={["#3b82f6","#a855f7","#22c55e","#f59e0b","#ef4444"][i % 5]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Aksi Cepat ────────────────────────────────────────────── */}
      <div style={{ backgroundColor:"#fff", borderRadius:12, border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", padding:"14px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <span style={{ fontSize:12, fontWeight:700, color:"#1a2035", marginRight:6 }}>Aksi Cepat:</span>
          <button style={{ ...btnOutline, fontSize:12, padding:"7px 14px" }}><Upload size={13} /> Import Nilai</button>
          <button style={{ ...btnOutline, fontSize:12, padding:"7px 14px" }}><Download size={13} /> Export Nilai</button>
          <button style={{ ...btnOutline, fontSize:12, padding:"7px 14px" }}><FileText size={13} /> Export PDF</button>
          <button style={{ ...btnPrimary, fontSize:12, padding:"7px 14px" }}><Send size={13} /> Publish Nilai</button>
        </div>
      </div>

    </div>
  );
}

// ── Micro helpers ─────────────────────────────────────────────────────────────

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

const btnPrimary: React.CSSProperties = { display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8, fontSize:13, fontWeight:600, border:"none", backgroundColor:"#3b82f6", color:"#fff", cursor:"pointer" };
const btnOutline: React.CSSProperties = { display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8, fontSize:13, fontWeight:600, border:"1.5px solid #d1d5db", backgroundColor:"#fff", color:"#374151", cursor:"pointer" };
const topSel: React.CSSProperties = { padding:"8px 12px", borderRadius:8, border:"1px solid #e5e7eb", fontSize:13, color:"#374151", backgroundColor:"#fff", outline:"none", cursor:"pointer", minWidth:160 };
