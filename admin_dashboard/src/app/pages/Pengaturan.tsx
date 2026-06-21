import { useState } from "react";
import {
  Settings, Shield, Bell, Palette, Database, Link2,
  Upload, Save, RefreshCw, Trash2, Plus, User,
  Server, Clock, HardDrive, Activity,
} from "lucide-react";

// ── Toggle switch ─────────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!on)}
      style={{
        width: 40, height: 22, borderRadius: 11, cursor: "pointer",
        backgroundColor: on ? "#3b82f6" : "#d1d5db",
        position: "relative", transition: "background 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: 3,
        left: on ? 21 : 3,
        width: 16, height: 16, borderRadius: "50%",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "left 0.2s",
      }} />
    </div>
  );
}

// ── Section card wrapper ──────────────────────────────────────────────────────
function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0f2f5" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2035" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>{subtitle}</div>}
      </div>
      <div style={{ padding: "16px 18px" }}>{children}</div>
    </div>
  );
}

// ── Form row ──────────────────────────────────────────────────────────────────
function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "8px 10px", borderRadius: 7, border: "1px solid #e5e7eb",
  fontSize: 12, color: "#374151", outline: "none", width: "100%", boxSizing: "border-box",
};
const selectStyle: React.CSSProperties = {
  ...{ padding: "8px 10px", borderRadius: 7, border: "1px solid #e5e7eb", fontSize: 12, color: "#374151", backgroundColor: "#fff", outline: "none", width: "100%", cursor: "pointer", boxSizing: "border-box" },
};

// ── Tabs ──────────────────────────────────────────────────────────────────────
const tabs = [
  { key: "umum",    label: "Pengaturan Umum", icon: Settings  },
  { key: "keamanan",label: "Keamanan",         icon: Shield    },
  { key: "notif",   label: "Notifikasi",        icon: Bell      },
  { key: "tampilan",label: "Tampilan",          icon: Palette   },
  { key: "backup",  label: "Backup & Restore",  icon: Database  },
  { key: "integrasi",label:"Integrasi",         icon: Link2     },
];

// ── Main component ────────────────────────────────────────────────────────────
export function Pengaturan() {
  const [activeTab, setActiveTab] = useState("umum");

  // Umum state
  const [namaSistem, setNamaSistem]         = useState("Sistem Ujian FEB UNSAP");
  const [deskripsi, setDeskripsi]           = useState("Platform Sistem Ujian yang Transparan dan Akuntabilitas");
  const [zonaWaktu, setZonaWaktu]           = useState("Asia/Jakarta (WIB)");
  const [emailAdmin, setEmailAdmin]         = useState("admin@febunsap.ac.id");

  // Notifikasi state
  const [notifMhs, setNotifMhs]             = useState(true);
  const [notifEmail, setNotifEmail]         = useState(true);
  const [notifHarian, setNotifHarian]       = useState(false);

  // Keamanan state
  const [tfa, setTfa]                       = useState(true);
  const [batasLogin, setBatasLogin]         = useState("3");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [antiNyontek, setAntiNyontek]       = useState(true);
  const [backupOto, setBackupOto]           = useState(true);

  // Tampilan state
  const [tema, setTema]                     = useState("light");
  const [bahasa, setBahasa]                 = useState("id");
  const [sidebar, setSidebar]               = useState("mini");

  const [saved, setSaved] = useState<string | null>(null);
  const showSaved = (section: string) => { setSaved(section); setTimeout(() => setSaved(null), 2000); };

  const penyimpanan = 45;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── Tabs ──────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #f0f2f5", marginBottom: 20, overflowX: "auto" }}>
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "10px 18px", fontSize: 12, fontWeight: active ? 700 : 500,
                color: active ? "#3b82f6" : "#6b7280",
                border: "none", borderBottom: active ? "2px solid #3b82f6" : "2px solid transparent",
                backgroundColor: "transparent", cursor: "pointer", whiteSpace: "nowrap",
                marginBottom: -2, transition: "all 0.15s",
              }}
            >
              <Icon size={13} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab: Pengaturan Umum ─────────────────────────────────── */}
      {activeTab === "umum" && (
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

          {/* Left column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>

            <Card title="Pengaturan Umum" subtitle="Konfigurasi dasar dan identitas sistem ujian.">
              <FormRow label="Nama Sistem">
                <input value={namaSistem} onChange={e => setNamaSistem(e.target.value)} style={inputStyle} />
              </FormRow>
              <FormRow label="Logo Sistem">
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, padding: "7px 10px", borderRadius: 7, border: "1px solid #e5e7eb", fontSize: 12, color: "#9ca3af" }}>
                    Belum ada file dipilih
                  </div>
                  <button style={{ ...btnOutline, fontSize: 12, padding: "7px 12px" }}>
                    <Upload size={12} /> Pilih File
                  </button>
                </div>
              </FormRow>
              <FormRow label="Favicon Sistem">
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, padding: "7px 10px", borderRadius: 7, border: "1px solid #e5e7eb", fontSize: 12, color: "#9ca3af" }}>
                    Belum ada file dipilih
                  </div>
                  <button style={{ ...btnOutline, fontSize: 12, padding: "7px 12px" }}>
                    <Upload size={12} /> Pilih File
                  </button>
                </div>
              </FormRow>
              <FormRow label="Deskripsi Sistem">
                <textarea
                  value={deskripsi}
                  onChange={e => setDeskripsi(e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                />
              </FormRow>
              <FormRow label="Zona Waktu">
                <select value={zonaWaktu} onChange={e => setZonaWaktu(e.target.value)} style={selectStyle}>
                  <option value="Asia/Jakarta (WIB)">Asia/Jakarta (WIB)</option>
                  <option value="Asia/Makassar (WITA)">Asia/Makassar (WITA)</option>
                  <option value="Asia/Jayapura (WIT)">Asia/Jayapura (WIT)</option>
                </select>
              </FormRow>
              <FormRow label="Email Admin">
                <input value={emailAdmin} onChange={e => setEmailAdmin(e.target.value)} style={inputStyle} type="email" />
              </FormRow>
              <button onClick={() => showSaved("umum")} style={btnPrimary}>
                <Save size={13} /> {saved === "umum" ? "✓ Tersimpan!" : "Simpan Perubahan"}
              </button>
            </Card>

            <Card title="Pengaturan Notifikasi" subtitle="Pengaturan notifikasi sistem untuk pengguna.">
              {[
                { key: "mhs",    label: "Notifikasi Mahasiswa",  desc: "Kirim notifikasi ke mahasiswa saat ujian dimulai", val: notifMhs,    set: setNotifMhs    },
                { key: "email",  label: "Notifikasi Email",      desc: "Kirim email ke pengguna untuk pengingat ujian",    val: notifEmail,  set: setNotifEmail  },
                { key: "harian", label: "Laporan Harian",        desc: "Kirim ringkasan laporan harian ke administrator",  val: notifHarian, set: setNotifHarian },
              ].map((item) => (
                <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f9fafb" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#1a2035" }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <Toggle on={item.val} onChange={item.set} />
                </div>
              ))}
              <div style={{ marginTop: 14 }}>
                <button onClick={() => showSaved("notif")} style={btnPrimary}>
                  <Save size={13} /> {saved === "notif" ? "✓ Tersimpan!" : "Simpan Perubahan"}
                </button>
              </div>
            </Card>
          </div>

          {/* Middle column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>

            <Card title="Pengaturan Keamanan" subtitle="Konfigurasi keamanan login dan sesi sistem.">
              {[
                { key: "tfa",  label: "Aktifkan 2FA untuk Admin", desc: "Autentikasi dua faktor wajib untuk semua admin", val: tfa,         set: setTfa         },
                { key: "anti", label: "Mode Anti Nyontek",        desc: "Deteksi tab baru dan aktivitas mencurigakan",    val: antiNyontek, set: setAntiNyontek },
                { key: "bkp",  label: "Backup Otomatis",          desc: "Backup database otomatis setiap hari pukul 00:00",val: backupOto,  set: setBackupOto   },
              ].map((item) => (
                <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f9fafb" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#1a2035" }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <Toggle on={item.val} onChange={item.set} />
                </div>
              ))}
              <div style={{ marginTop: 10 }}>
                <FormRow label="Batas Login Gagal">
                  <select value={batasLogin} onChange={e => setBatasLogin(e.target.value)} style={selectStyle}>
                    {["3","5","10"].map(v => <option key={v} value={v}>{v} Kali</option>)}
                  </select>
                </FormRow>
                <FormRow label="Session Timeout (menit)">
                  <input value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)} type="number" style={inputStyle} />
                </FormRow>
              </div>
              <button onClick={() => showSaved("keamanan")} style={btnPrimary}>
                <Shield size={13} /> {saved === "keamanan" ? "✓ Tersimpan!" : "Simpan Pengaturan"}
              </button>
            </Card>

            <Card title="Pengaturan Tampilan" subtitle="Kustomisasi tampilan antarmuka sistem.">
              <FormRow label="Tema">
                <select value={tema} onChange={e => setTema(e.target.value)} style={selectStyle}>
                  <option value="light">Light (Default)</option>
                  <option value="dark">Dark Mode</option>
                  <option value="system">Ikuti Sistem</option>
                </select>
              </FormRow>
              <FormRow label="Bahasa">
                <select value={bahasa} onChange={e => setBahasa(e.target.value)} style={selectStyle}>
                  <option value="id">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </FormRow>
              <FormRow label="Sidebar">
                <select value={sidebar} onChange={e => setSidebar(e.target.value)} style={selectStyle}>
                  <option value="mini">Mini / Kompak</option>
                  <option value="full">Penuh</option>
                  <option value="auto">Otomatis</option>
                </select>
              </FormRow>
              <button onClick={() => showSaved("tampilan")} style={{ ...btnOutline, fontSize: 12 }}>
                <Palette size={13} /> {saved === "tampilan" ? "✓ Diterapkan!" : "Ubah Tampilan"}
              </button>
            </Card>
          </div>

          {/* Right column */}
          <div style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Informasi Sistem */}
            <Card title="Informasi Sistem">
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: <Activity size={13} color="#3b82f6" />,  label: "Versi Sistem",  value: "v2.5.3",               valColor: "#1a2035" },
                  { icon: <Server size={13} color="#22c55e" />,    label: "Status",        value: "LIVE",                 valColor: "#16a34a", badge: true },
                  { icon: <Clock size={13} color="#f59e0b" />,     label: "Server Time",   value: "14 Nov 2024, 09:41",   valColor: "#374151" },
                  { icon: <Database size={13} color="#a855f7" />,  label: "Database",      value: "3,105 entri",          valColor: "#374151" },
                  { icon: <Activity size={13} color="#22c55e" />,  label: "Uptime",        value: "99.9%",                valColor: "#16a34a" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      {row.icon}
                      <span style={{ fontSize: 11, color: "#6b7280" }}>{row.label}</span>
                    </div>
                    {row.badge ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, backgroundColor: "#dcfce7", color: "#16a34a" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#22c55e" }} />
                        {row.value}
                      </span>
                    ) : (
                      <span style={{ fontSize: 11, fontWeight: 600, color: row.valColor }}>{row.value}</span>
                    )}
                  </div>
                ))}

                {/* Storage bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <HardDrive size={13} color="#f97316" />
                      <span style={{ fontSize: 11, color: "#6b7280" }}>Penyimpanan</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#f97316" }}>{penyimpanan}%</span>
                  </div>
                  <div style={{ height: 6, backgroundColor: "#f0f2f5", borderRadius: 4 }}>
                    <div style={{ height: 6, borderRadius: 4, backgroundColor: penyimpanan > 80 ? "#ef4444" : "#f97316", width: `${penyimpanan}%`, transition: "width 0.5s" }} />
                  </div>
                  <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 3 }}>4.5 GB / 10 GB digunakan</div>
                </div>
              </div>
            </Card>

            {/* Kelola Administrator */}
            <Card title="Kelola Administrator">
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { nama: "FardrF",            role: "Super Admin",  status: "Admin Aktif", color: "#3b82f6", initials: "FF" },
                  { nama: "Sendi Fertianto",   role: "Supervisor",   status: null,          color: "#a855f7", initials: "SF" },
                ].map((a) => (
                  <div key={a.nama} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, backgroundColor: "#f9fafb", border: "1px solid #f0f2f5" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${a.color},${a.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {a.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#1a2035", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.nama}</div>
                      <div style={{ fontSize: 10, color: "#9ca3af" }}>{a.role}</div>
                    </div>
                    {a.status && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20, backgroundColor: "#dcfce7", color: "#16a34a", whiteSpace: "nowrap" }}>
                        {a.status}
                      </span>
                    )}
                  </div>
                ))}
                <button style={{ ...btnPrimary, justifyContent: "center", width: "100%", marginTop: 4, fontSize: 12 }}>
                  <Plus size={13} /> Tambah Admin
                </button>
              </div>
            </Card>

            {/* Aksi Sistem */}
            <Card title="Aksi Sistem">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button style={{ ...btnOutline, justifyContent: "center", fontSize: 12 }}>
                  <Trash2 size={13} /> Bersihkan Cache
                </button>
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "none", backgroundColor: "#ef4444", color: "#fff", cursor: "pointer" }}>
                  <RefreshCw size={13} /> Restart Sistem
                </button>
              </div>
              <div style={{ marginTop: 14, padding: "10px", borderRadius: 8, backgroundColor: "#fef9c3", border: "1px solid #fde68a" }}>
                <p style={{ fontSize: 10, color: "#78350f", margin: 0, lineHeight: 1.5 }}>
                  ⚠️ Restart sistem akan memutus semua sesi aktif. Pastikan tidak ada ujian yang sedang berlangsung.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── Tab: Keamanan ─────────────────────────────────────────── */}
      {activeTab === "keamanan" && (
        <div style={{ maxWidth: 560 }}>
          <Card title="Pengaturan Keamanan Lanjutan" subtitle="Konfigurasi mendalam untuk keamanan sistem.">
            <FormRow label="Kebijakan Password">
              <select style={selectStyle}>
                <option>Minimal 8 karakter + angka</option>
                <option>Minimal 12 karakter + simbol</option>
              </select>
            </FormRow>
            <FormRow label="IP Whitelist (pisahkan dengan koma)">
              <input placeholder="192.168.1.1, 10.0.0.1" style={inputStyle} />
            </FormRow>
            <FormRow label="Log Aktivitas">
              <select style={selectStyle}>
                <option>Simpan 30 hari</option>
                <option>Simpan 90 hari</option>
                <option>Simpan selamanya</option>
              </select>
            </FormRow>
            <button onClick={() => showSaved("keamanan-adv")} style={btnPrimary}>
              <Shield size={13} /> {saved === "keamanan-adv" ? "✓ Tersimpan!" : "Simpan Pengaturan"}
            </button>
          </Card>
        </div>
      )}

      {/* ── Tab: Notifikasi ───────────────────────────────────────── */}
      {activeTab === "notif" && (
        <div style={{ maxWidth: 560 }}>
          <Card title="Pengaturan Notifikasi" subtitle="Atur kapan dan bagaimana notifikasi dikirim.">
            <FormRow label="Email SMTP Host">
              <input placeholder="smtp.gmail.com" style={inputStyle} />
            </FormRow>
            <FormRow label="Email SMTP Port">
              <input placeholder="587" type="number" style={inputStyle} />
            </FormRow>
            <FormRow label="Email Pengirim">
              <input placeholder="noreply@febunsap.ac.id" style={inputStyle} />
            </FormRow>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1a2035" }}>Notifikasi Push Browser</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>Izinkan notifikasi browser untuk admin</div>
                </div>
                <Toggle on={true} onChange={() => {}} />
              </div>
            </div>
            <button onClick={() => showSaved("notif-adv")} style={btnPrimary}>
              <Bell size={13} /> {saved === "notif-adv" ? "✓ Tersimpan!" : "Simpan Pengaturan"}
            </button>
          </Card>
        </div>
      )}

      {/* ── Tab: Tampilan ─────────────────────────────────────────── */}
      {activeTab === "tampilan" && (
        <div style={{ maxWidth: 560 }}>
          <Card title="Pengaturan Tampilan" subtitle="Kustomisasi tema dan layout antarmuka.">
            <FormRow label="Tema Warna Utama">
              <div style={{ display: "flex", gap: 10 }}>
                {["#3b82f6","#a855f7","#22c55e","#f97316","#ef4444"].map(c=>(
                  <div key={c} style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: c, cursor: "pointer", border: c==="#3b82f6"?"3px solid #1d4ed8":"3px solid transparent" }} />
                ))}
              </div>
            </FormRow>
            <FormRow label="Ukuran Font">
              <select style={selectStyle}>
                <option>Kecil (12px)</option>
                <option>Normal (14px)</option>
                <option>Besar (16px)</option>
              </select>
            </FormRow>
            <FormRow label="Kepadatan Tampilan">
              <select style={selectStyle}>
                <option>Kompak</option>
                <option>Normal</option>
                <option>Longgar</option>
              </select>
            </FormRow>
            <button onClick={() => showSaved("tampilan-adv")} style={btnPrimary}>
              <Palette size={13} /> {saved === "tampilan-adv" ? "✓ Diterapkan!" : "Terapkan Tampilan"}
            </button>
          </Card>
        </div>
      )}

      {/* ── Tab: Backup & Restore ─────────────────────────────────── */}
      {activeTab === "backup" && (
        <div style={{ maxWidth: 700 }}>
          <Card title="Backup & Restore" subtitle="Kelola cadangan data sistem.">
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button style={btnPrimary}><Database size={13} /> Backup Sekarang</button>
              <button style={btnOutline}><Upload size={13} /> Restore dari File</button>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Riwayat Backup</div>
            {[
              { tgl:"14 Nov 2024 00:00", ukuran:"248 MB", status:"Sukses" },
              { tgl:"13 Nov 2024 00:00", ukuran:"245 MB", status:"Sukses" },
              { tgl:"12 Nov 2024 00:00", ukuran:"243 MB", status:"Sukses" },
            ].map((b, i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:8, backgroundColor:"#f9fafb", border:"1px solid #f0f2f5", marginBottom:8 }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"#1a2035" }}>{b.tgl}</div>
                  <div style={{ fontSize:11, color:"#9ca3af" }}>Ukuran: {b.ukuran}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20, backgroundColor:"#dcfce7", color:"#16a34a" }}>{b.status}</span>
                  <button style={{ ...btnOutline, fontSize:11, padding:"5px 10px" }}><Download size={11} /> Unduh</button>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── Tab: Integrasi ────────────────────────────────────────── */}
      {activeTab === "integrasi" && (
        <div style={{ maxWidth: 700 }}>
          <Card title="Integrasi Sistem" subtitle="Hubungkan dengan layanan dan API eksternal.">
            {[
              { nama:"Google Workspace",  desc:"Sinkronisasi akun dan kalender",  connected:true  },
              { nama:"Zoom / Meet",       desc:"Integrasi video conference ujian", connected:false },
              { nama:"Moodle LMS",        desc:"Sinkronisasi materi dan soal",     connected:false },
              { nama:"WhatsApp Gateway",  desc:"Notifikasi via WhatsApp",          connected:true  },
            ].map((item)=>(
              <div key={item.nama} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0", borderBottom:"1px solid #f0f2f5" }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#1a2035" }}>{item.nama}</div>
                  <div style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>{item.desc}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:10, fontWeight:700, padding:"2px 9px", borderRadius:20, backgroundColor:item.connected?"#dcfce7":"#f3f4f6", color:item.connected?"#16a34a":"#9ca3af" }}>
                    {item.connected?"Terhubung":"Tidak Aktif"}
                  </span>
                  <button style={{ ...btnOutline, fontSize:11, padding:"5px 12px" }}>
                    {item.connected ? "Putuskan" : "Hubungkan"}
                  </button>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #f0f2f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>© 2024 FEB UNSAP – Sistem Ujian. All rights reserved.</span>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>Versi 2.5.3 | <span style={{ color: "#3b82f6", cursor: "pointer" }}>Kebijakan Privasi</span></span>
      </div>
    </div>
  );
}

// ── Micro helpers ─────────────────────────────────────────────────────────────
import { Download } from "lucide-react";

const btnPrimary: React.CSSProperties = { display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8, fontSize:13, fontWeight:600, border:"none", backgroundColor:"#3b82f6", color:"#fff", cursor:"pointer" };
const btnOutline: React.CSSProperties = { display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8, fontSize:13, fontWeight:600, border:"1.5px solid #d1d5db", backgroundColor:"#fff", color:"#374151", cursor:"pointer" };
