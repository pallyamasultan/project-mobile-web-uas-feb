# 📐 WIREFRAME MOBILE APP — APLIKASI UAS FEB UNSAP

> **Dokumen**: Teks Wireframe (Layout Architecture)
> **Format**: ASCII / Markdown Box
> **Acuan**: `BLUEPRINT_ARSITEKTUR_SISTEM.md` — Seksi 1.1
> **Platform**: Flutter (Android & iOS)
> **Resolusi Acuan**: 390 × 844 pt (iPhone 14 / setara Android)

---

## LEGENDA SIMBOL

```
╔══════════╗   Batas layar perangkat (device frame)
║          ║
╚══════════╝

┌──────────┐   Komponen / Container / Card
│          │
└──────────┘

[  Tombol  ]   Tombol (Button) — tappable
< Tombol  >    Tombol sekunder / text button

⟨ Input ⟩     Text Field / Input Area

◉              Radio button (selected)
○              Radio button (unselected)
☑              Checkbox (checked)
☐              Checkbox (unchecked)

●              Indikator aktif / dot
○              Indikator nonaktif

🔒             Indikator keamanan aktif
⚠️              Warning indicator
🔴             Status kritis / blokir
🟢             Status aman / lolos
🟡             Status peringatan
```

---

# FASE 1: GERBANG MASUK (Skrining Pra-Ujian)

---

## SCR-M01 — Splash Screen

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║                                      ║
║                                      ║
║                                      ║
║         ┌──────────────────┐         ║
║         │                  │         ║
║         │    ┌────────┐    │         ║
║         │    │  LOGO  │    │         ║
║         │    │  FEB   │    │         ║
║         │    │ UNSAP  │    │         ║
║         │    └────────┘    │         ║
║         │                  │         ║
║         └──────────────────┘         ║
║                                      ║
║       UJIAN AKHIR SEMESTER           ║
║     Fakultas Ekonomi & Bisnis        ║
║                                      ║
║                                      ║
║          ┌──────────────┐            ║
║          │ ████░░░░░░░░ │  35%       ║
║          └──────────────┘            ║
║      Menginisialisasi sistem...      ║
║                                      ║
║                                      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ ✓ Firebase SDK           │      ║
║    │ ○ Koneksi Internet       │      ║
║    │ ○ Memeriksa Integritas   │      ║
║    └──────────────────────────┘      ║
║                                      ║
║          v1.0.0 · FEB UNSAP         ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Logo FEB UNSAP (gambar, centered)
- Progress bar animasi (inisialisasi SDK Firebase)
- Checklist inisialisasi (Firebase SDK, Koneksi, Integritas)
- Versi aplikasi di footer

---

## SCR-M02 — OS Integrity Gate (Skrining OS)

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║         🔒 PEMERIKSAAN KEAMANAN      ║
║    ─────────────────────────────     ║
║    Sistem sedang memverifikasi       ║
║    integritas perangkat Anda...      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │                          │      ║
║    │     ╭──────────────╮     │      ║
║    │     │   ANIMASI    │     │      ║
║    │     │   SHIELD     │     │      ║
║    │     │   SCANNING   │     │      ║
║    │     ╰──────────────╯     │      ║
║    │                          │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    Checklist Keamanan:               ║
║    ┌──────────────────────────┐      ║
║    │ 🟢 Root / Jailbreak      │      ║
║    │     → Tidak Terdeteksi   │      ║
║    ├──────────────────────────┤      ║
║    │ ●  Custom ROM            │      ║
║    │     → Memeriksa...       │      ║
║    ├──────────────────────────┤      ║
║    │ ○  Developer Options     │      ║
║    │     → Menunggu           │      ║
║    ├──────────────────────────┤      ║
║    │ ○  USB Debugging         │      ║
║    │     → Menunggu           │      ║
║    ├──────────────────────────┤      ║
║    │ ○  Aplikasi Kloningan    │      ║
║    │     → Menunggu           │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ ████████░░░░░░░░░░ │ 40%      ║
║    └──────────────────────────┘      ║
║                                      ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Judul "Pemeriksaan Keamanan" + deskripsi
- Animasi shield/scanning (Lottie)
- Checklist real-time (5 item) dengan status: 🟢 Lolos / 🔴 Gagal / ● Memeriksa / ○ Menunggu
- Progress bar keseluruhan

---

## SCR-M02a — Device Blocked Screen (DEAD END)

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║
║  ▓▓▓▓▓▓▓  BACKGROUND MERAH  ▓▓▓▓▓  ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║
║  ▓                               ▓  ║
║  ▓       ┌─────────────┐        ▓  ║
║  ▓       │     🚫      │        ▓  ║
║  ▓       │   (ikon     │        ▓  ║
║  ▓       │   besar)    │        ▓  ║
║  ▓       └─────────────┘        ▓  ║
║  ▓                               ▓  ║
║  ▓    PERANGKAT TIDAK AMAN       ▓  ║
║  ▓    ════════════════════       ▓  ║
║  ▓                               ▓  ║
║  ▓  Perangkat Anda terdeteksi    ▓  ║
║  ▓  memiliki kondisi berikut:    ▓  ║
║  ▓                               ▓  ║
║  ▓  ┌─────────────────────┐     ▓  ║
║  ▓  │ 🔴 Root Terdeteksi   │     ▓  ║
║  ▓  │ 🔴 Dev Options Aktif │     ▓  ║
║  ▓  └─────────────────────┘     ▓  ║
║  ▓                               ▓  ║
║  ▓  Anda tidak dapat mengikuti   ▓  ║
║  ▓  ujian dengan perangkat ini.  ▓  ║
║  ▓                               ▓  ║
║  ▓  Silakan hubungi pengawas     ▓  ║
║  ▓  ujian untuk bantuan.         ▓  ║
║  ▓                               ▓  ║
║  ▓  ┌─────────────────────┐     ▓  ║
║  ▓  │ Kode Error: E-INT02 │     ▓  ║
║  ▓  └─────────────────────┘     ▓  ║
║  ▓                               ▓  ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║
╚══════════════════════════════════════╝

❌ TIDAK ADA TOMBOL NAVIGASI — DEAD END
```

**Komponen:**
- Background merah penuh (full-screen)
- Ikon larangan besar (🚫)
- Judul "PERANGKAT TIDAK AMAN"
- Daftar alasan spesifik yang terdeteksi
- Instruksi hubungi pengawas
- Kode error untuk referensi pengawas
- **Tidak ada tombol** — aplikasi harus di-force close

---

## SCR-M03 — Login Screen

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║                                      ║
║         ┌────────────┐               ║
║         │   LOGO     │               ║
║         │ FEB UNSAP  │               ║
║         └────────────┘               ║
║                                      ║
║       Ujian Akhir Semester           ║
║      ────────────────────            ║
║     Masuk dengan akun mahasiswa      ║
║                                      ║
║                                      ║
║    NIM (Nomor Induk Mahasiswa)       ║
║    ┌──────────────────────────┐      ║
║    │ ⟨ 2024010001           ⟩ │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    Tanggal Lahir (Password)          ║
║    ┌──────────────────────────┐      ║
║    │ ⟨ DD / MM / YYYY    📅 ⟩ │      ║
║    └──────────────────────────┘      ║
║                                      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │                          │      ║
║    │     [    MASUK    ]      │      ║
║    │                          │      ║
║    └──────────────────────────┘      ║
║                                      ║
║                                      ║
║    < Lupa akun? Hubungi Admin >      ║
║                                      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ 🔒 Koneksi terenkripsi   │      ║
║    │ 🟢 Perangkat terverifikasi│      ║
║    └──────────────────────────┘      ║
║                                      ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Logo FEB UNSAP (lebih kecil dari splash)
- Judul & sub-judul
- Input NIM (text field, keyboard numerik)
- Input Tanggal Lahir (date picker, ikon kalender)
- Tombol "MASUK" (primary, full-width)
- Link bantuan teks
- Badge keamanan (koneksi terenkripsi + perangkat terverifikasi)

---

## SCR-M04 — Biometric Verification

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║    ← Kembali                         ║
║                                      ║
║                                      ║
║       VERIFIKASI IDENTITAS           ║
║    ─────────────────────────         ║
║    Pastikan Anda adalah pemilik      ║
║    sah akun ini.                     ║
║                                      ║
║                                      ║
║                                      ║
║         ┌──────────────┐             ║
║         │              │             ║
║         │  ╭────────╮  │             ║
║         │  │        │  │             ║
║         │  │  👆    │  │  Android:   ║
║         │  │ Sidik  │  │  Fingerprint║
║         │  │ Jari   │  │             ║
║         │  │        │  │  iOS:       ║
║         │  ╰────────╯  │  Face ID / ║
║         │              │  Touch ID   ║
║         │  (animasi    │             ║
║         │   pulse)     │             ║
║         └──────────────┘             ║
║                                      ║
║    Tempelkan jari Anda pada          ║
║    sensor biometrik perangkat.       ║
║                                      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │  Percobaan: 1 / 3        │      ║
║    │  ● ○ ○                   │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    Mahasiswa: Ahmad Fauzi            ║
║    NIM: 2024010001                   ║
║                                      ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Tombol kembali (←) ke SCR-M03
- Judul + instruksi
- Ikon biometrik besar dengan animasi pulse (sidik jari / Face ID)
- Label platform-specific (Fingerprint / Face ID / Touch ID)
- Instruksi teks
- Counter percobaan (1/3) dengan dot indicator
- Info mahasiswa yang sedang login (nama + NIM)

---

## SCR-M05 — Geofence & Network Check

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║    ← Kembali                         ║
║                                      ║
║       VALIDASI LOKASI & JARINGAN     ║
║    ──────────────────────────────    ║
║    Memastikan Anda berada di area    ║
║    kampus FEB UNSAP.                 ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │         ANIMASI          │      ║
║    │     ╭╌╌╌╌╌╌╌╌╌╌╌╮       │      ║
║    │    ╎   ·  ·  ·    ╎      │      ║
║    │   ╎  ·  RADAR  ·  ╎     │      ║
║    │    ╎   ·  📍 ·    ╎      │      ║
║    │     ╰╌╌╌╌╌╌╌╌╌╌╌╯       │      ║
║    │     (radar scanning)     │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    Status Pemeriksaan:               ║
║    ┌──────────────────────────┐      ║
║    │                          │      ║
║    │  📍 Lokasi GPS           │      ║
║    │  ┌────────────────────┐  │      ║
║    │  │ 🟢 Dalam Radius     │  │      ║
║    │  │ FEB UNSAP (125m)    │  │      ║
║    │  └────────────────────┘  │      ║
║    │                          │      ║
║    │  📶 Jaringan Internet   │      ║
║    │  ┌────────────────────┐  │      ║
║    │  │ 🟢 Terhubung        │  │      ║
║    │  │ SSID: FEB-UNSAP     │  │      ║
║    │  └────────────────────┘  │      ║
║    │                          │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │    [ LANJUTKAN  ✓ ]      │      ║
║    └──────────────────────────┘      ║
║    * Tombol aktif jika kedua         ║
║      validasi lolos ✅               ║
║                                      ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Tombol kembali (←)
- Judul + deskripsi
- Animasi radar scanning (Lottie)
- Card status GPS: status + jarak dari pusat kampus
- Card status Jaringan: status + SSID yang terdeteksi
- Tombol "LANJUTKAN" — **disabled** jika salah satu ❌, **enabled** jika keduanya 🟢

---

## SCR-M05a — Geofence Failure

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║    ← Kembali                         ║
║                                      ║
║    ⚠️  LOKASI TIDAK VALID            ║
║    ──────────────────────────────    ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ ╔════════════════════╗   │      ║
║    │ ║                    ║   │      ║
║    │ ║    PETA MINI       ║   │      ║
║    │ ║   (Google Maps)    ║   │      ║
║    │ ║                    ║   │      ║
║    │ ║  📍 Posisi Anda    ║   │      ║
║    │ ║                    ║   │      ║
║    │ ║  ◯ Radius FEB     ║   │      ║
║    │ ║    UNSAP (200m)   ║   │      ║
║    │ ║                    ║   │      ║
║    │ ╚════════════════════╝   │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ 🔴 Anda berada 1.2 km    │      ║
║    │    dari kampus FEB UNSAP │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    Silakan pindah ke area kampus     ║
║    FEB UNSAP untuk melanjutkan.      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │  🔄 Memeriksa ulang...    │      ║
║    │  Auto-retry dalam: 7 dtk │      ║
║    │  ██████████░░░░░░░░░░░░░ │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    < Hubungi Pengawas >              ║
║                                      ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Peta mini (embedded map) dengan pin posisi mahasiswa + lingkaran radius kampus
- Informasi jarak dari kampus (warna merah)
- Instruksi untuk berpindah lokasi
- Auto-retry countdown (10 detik) dengan progress bar
- Link hubungi pengawas

---

## SCR-M06 — Guided Access Setup (iOS Only)

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║    ← Kembali                         ║
║                                      ║
║     🍎 PENGATURAN GUIDED ACCESS      ║
║    ──────────────────────────────    ║
║    (Khusus Pengguna iPhone)          ║
║                                      ║
║    Ikuti langkah berikut untuk       ║
║    mengaktifkan mode ujian:          ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ LANGKAH 1                │      ║
║    │ ┌────────────────────┐   │      ║
║    │ │ [Screenshot/Animasi]│   │      ║
║    │ │ Settings → Access- │   │      ║
║    │ │ ibility → Guided   │   │      ║
║    │ │ Access              │   │      ║
║    │ └────────────────────┘   │      ║
║    │ Buka Settings > Access-  │      ║
║    │ ibility > Guided Access  │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ LANGKAH 2                │      ║
║    │ ┌────────────────────┐   │      ║
║    │ │ [Screenshot/Animasi]│   │      ║
║    │ │ Toggle ON           │   │      ║
║    │ └────────────────────┘   │      ║
║    │ Aktifkan toggle Guided   │      ║
║    │ Access menjadi ON        │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ LANGKAH 3                │      ║
║    │ Kembali ke aplikasi ini, │      ║
║    │ lalu tekan tombol di     │      ║
║    │ bawah.                   │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ [SAYA SUDAH MENGAKTIFKAN]│      ║
║    └──────────────────────────┘      ║
║                                      ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Label platform "Khusus iPhone"
- Step-by-step instruksi (scrollable) dengan gambar/animasi per langkah
- Langkah 1: Navigasi ke Settings
- Langkah 2: Toggle ON
- Langkah 3: Kembali ke app
- Tombol "SAYA SUDAH MENGAKTIFKAN" → verifikasi oleh sistem

---

# FASE TRANSISI: DASHBOARD & PRA-UJIAN

---

## SCR-M07 — Dashboard Ujian

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║    ┌──────────────────────────┐      ║
║    │  👤 Ahmad Fauzi           │      ║
║    │  NIM: 2024010001          │      ║
║    │  Prodi: Akuntansi · Sem 4 │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    📋 Ujian Hari Ini                 ║
║    Sabtu, 14 Juni 2026               ║
║    ─────────────────────────         ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ 📘 Akuntansi Manajemen   │      ║
║    │ AKT301 · 3 SKS           │      ║
║    │                          │      ║
║    │ 🕐 08:00 - 10:00 WIB     │      ║
║    │ ⏱️  Durasi: 120 menit     │      ║
║    │ 📝 5 Soal Esai           │      ║
║    │                          │      ║
║    │ Status: 🟢 BERLANGSUNG    │      ║
║    │                          │      ║
║    │ [ 🔓 MULAI UJIAN ]       │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ 📗 Ekonomi Mikro          │      ║
║    │ EKM201 · 3 SKS           │      ║
║    │                          │      ║
║    │ 🕐 13:00 - 14:30 WIB     │      ║
║    │ ⏱️  Durasi: 90 menit      │      ║
║    │ 📝 4 Soal Esai           │      ║
║    │                          │      ║
║    │ Status: ⏳ BELUM DIMULAI  │      ║
║    │                          │      ║
║    │ [ MULAI UJIAN ]  (disabled)     ║
║    └──────────────────────────┘      ║
║                                      ║
║ ┌────┐  ┌────┐  ┌────┐  ┌────┐     ║
║ │ 🏠 │  │ 📋 │  │ 📊 │  │ ⚙️ │     ║
║ │Home │  │Ujian│  │Riwy│  │Prof│     ║
║ └────┘  └────┘  └────┘  └────┘     ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Header profil mahasiswa (nama, NIM, prodi, semester)
- Tanggal hari ini
- Card ujian (scrollable list):
  - Nama MK + kode MK + SKS
  - Jam mulai – selesai
  - Durasi
  - Jumlah soal
  - Status badge (🟢 Berlangsung / ⏳ Belum Dimulai / ✅ Selesai)
  - Tombol "MULAI UJIAN" — **aktif** hanya jika status `BERLANGSUNG` & Fase 1 lolos
- Bottom navigation bar (Home, Ujian, Riwayat, Profil)

---

## SCR-M08 — Pre-Exam Confirmation (Modal)

```
╔══════════════════════════════════════╗
║                                      ║
║  ┌──── BACKDROP (semi-transparan) ──┐║
║  │                                   │║
║  │  ┌─────────────────────────────┐ │║
║  │  │                             │ │║
║  │  │   🔒 MODE UJIAN TERKUNCI    │ │║
║  │  │   ═══════════════════════   │ │║
║  │  │                             │ │║
║  │  │   Anda akan memasuki mode   │ │║
║  │  │   ujian terkunci. Setelah   │ │║
║  │  │   masuk, Anda TIDAK BISA    │ │║
║  │  │   keluar hingga ujian       │ │║
║  │  │   selesai.                  │ │║
║  │  │                             │ │║
║  │  │   ┌───────────────────┐     │ │║
║  │  │   │ ⚠️  PERHATIAN:     │     │ │║
║  │  │   │ • Pastikan baterai │     │ │║
║  │  │   │   cukup (>30%)     │     │ │║
║  │  │   │ • Tombol Home,Back │     │ │║
║  │  │   │   akan dinonaktif  │     │ │║
║  │  │   │ • Screenshot akan  │     │ │║
║  │  │   │   diblokir         │     │ │║
║  │  │   │ • Pelanggaran akan │     │ │║
║  │  │   │   dicatat otomatis │     │ │║
║  │  │   └───────────────────┘     │ │║
║  │  │                             │ │║
║  │  │   🔋 Baterai: 78% ✅        │ │║
║  │  │                             │ │║
║  │  │   ☐ Saya memahami dan      │ │║
║  │  │     menyetujui aturan      │ │║
║  │  │     ujian di atas.         │ │║
║  │  │                             │ │║
║  │  │   ┌───────────────────┐     │ │║
║  │  │   │ [  MASUK UJIAN  ] │     │ │║
║  │  │   └───────────────────┘     │ │║
║  │  │   * Aktif jika checkbox ☑   │ │║
║  │  │                             │ │║
║  │  │   < Kembali ke Dashboard >  │ │║
║  │  │                             │ │║
║  │  └─────────────────────────────┘ │║
║  │                                   │║
║  └───────────────────────────────────┘║
╚══════════════════════════════════════╝
```

**Komponen:**
- Backdrop semi-transparan (dismiss-proof, tidak bisa tap di luar)
- Modal card:
  - Ikon gembok + judul "MODE UJIAN TERKUNCI"
  - Deskripsi peringatan
  - Box peringatan kuning (list aturan)
  - Indikator baterai dengan status ✅/❌
  - Checkbox persetujuan (wajib dicentang)
  - Tombol "MASUK UJIAN" — **disabled** sampai checkbox ☑
  - Link "Kembali ke Dashboard"

---

# FASE 2, 3, 4: LINGKUNGAN UJIAN TERKUNCI

---

## SCR-M09 — Exam Screen (Layar Ujian Utama) 🔒

```
╔══════════════════════════════════════╗
║ 🔒 KIOSK MODE AKTIF · FLAG_SECURE   ║
╠══════════════════════════════════════╣
║ ┌──────────────────────────────────┐ ║
║ │ ⏱️ 01:23:45    AKT301    3 / 5  │ ║
║ │ Timer          MK Code   Soal   │ ║
║ │ (sinkron                        │ ║
║ │  server)    [🔢 Kalkulator]     │ ║
║ └──────────────────────────────────┘ ║
║╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌║
║                                      ║
║ ·  ·  ·  WATERMARK TRANSPARAN ·  ·  ║
║ ·  Ahmad Fauzi · 2024010001  ·  ·   ║
║ ·  14/06/2026  ·  ·  ·  ·  ·  ·  ·  ║
║                                      ║
║ SOAL 3 (Analisis · 25 poin)         ║
║ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║ ┌──────────────────────────────────┐ ║
║ │                                  │ ║
║ │  Berdasarkan data laporan       │ ║
║ │  keuangan PT ABC tahun 2025,    │ ║
║ │  analisislah rasio likuiditas   │ ║
║ │  perusahaan dan berikan         │ ║
║ │  rekomendasi strategis untuk    │ ║
║ │  meningkatkan posisi keuangan   │ ║
║ │  perusahaan di tahun 2026.      │ ║
║ │                                  │ ║
║ │  [Gambar: tabel_keuangan.png]   │ ║
║ │  ┌────────────────────────┐     │ ║
║ │  │   📊 Tabel Keuangan    │     │ ║
║ │  │   PT ABC 2025          │     │ ║
║ │  └────────────────────────┘     │ ║
║ │                                  │ ║
║ │  ⚠️ Teks tidak bisa diseleksi   │ ║
║ │  🔒 Clipboard diblokir          │ ║
║ └──────────────────────────────────┘ ║
║                                      ║
║ JAWABAN ANDA:                        ║
║ ┌──────────────────────────────────┐ ║
║ │ ⟨                                │ ║
║ │  Menurut analisis rasio         │ ║
║ │  likuiditas pada laporan        │ ║
║ │  keuangan PT ABC tahun 2025,   │ ║
║ │  current ratio menunjukkan...   │ ║
║ │                                  │ ║
║ │                                  │ ║
║ │                                  │ ║
║ │                                  │ ║
║ │                              ⟩  │ ║
║ └──────────────────────────────────┘ ║
║  210 kata · Terakhir diedit 09:14    ║
║                                      ║
║╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌║
║ ┌──────────────────────────────────┐ ║
║ │ [◀ Prev]  [🚩Tandai]  [Next ▶] │ ║
║ │                                  │ ║
║ │ [ ⊞ Nav. Soal]  [📤 KUMPULKAN] │ ║
║ └──────────────────────────────────┘ ║
║                          💾 Tersimpan║
╚══════════════════════════════════════╝
```

**Komponen Detail:**

### Header (Fixed)
- Timer countdown `HH:MM:SS` — sinkron server (putih normal, MERAH jika < 5 menit)
- Kode MK
- Nomor soal saat ini / total soal
- Tombol Kalkulator (ikon)

### Watermark Layer (Overlay Permanen)
- Teks transparan diagonal berulang: `Nama · NIM · Tanggal`
- Menutupi seluruh area scrollable
- opacity ~15%, tidak menghalangi interaksi

### Body (Scrollable)
- **Area Soal** (read-only container):
  - Label: "SOAL X (Tipe · Bobot)"
  - Teks soal (non-selectable, user interaction disabled)
  - Gambar pendukung soal (jika ada)
  - Badge keamanan: "Teks tidak bisa diseleksi", "Clipboard diblokir"
- **Area Jawaban** (editable):
  - TextArea multiline (auto-expand)
  - Clipboard diblokir (paste = pelanggaran)
  - Deteksi kecepatan input aktif
  - Counter kata + timestamp edit terakhir

### Footer (Fixed)
- Tombol navigasi: `◀ Prev` / `Next ▶`
- Tombol `🚩 Tandai` (toggle bookmark soal)
- Tombol `⊞ Nav. Soal` → buka SCR-M09b
- Tombol `📤 KUMPULKAN` → buka SCR-M10
- Indikator autosave kecil (pojok kanan bawah)

---

## SCR-M09a — Built-in Calculator (Floating Overlay)

```
         ┌──── Draggable Handle ────┐
         │ ━━━━━━━━━━━━  × (close)  │
         ├──────────────────────────┤
         │                          │
         │  ┌──────────────────┐    │
         │  │        127.5     │    │
         │  │   (display area) │    │
         │  └──────────────────┘    │
         │                          │
         │  ┌────┬────┬────┬────┐  │
         │  │ sin│ cos│ tan│  √ │  │
         │  ├────┼────┼────┼────┤  │
         │  │ x² │ xⁿ │  ( │  ) │  │
         │  ├────┼────┼────┼────┤  │
         │  │ AC │  ⌫ │  % │  ÷ │  │
         │  ├────┼────┼────┼────┤  │
         │  │  7 │  8 │  9 │  × │  │
         │  ├────┼────┼────┼────┤  │
         │  │  4 │  5 │  6 │  − │  │
         │  ├────┼────┼────┼────┤  │
         │  │  1 │  2 │  3 │  + │  │
         │  ├────┼────┼────┼────┤  │
         │  │  0 │  . │  ± │  = │  │
         │  └────┴────┴────┴────┘  │
         │                          │
         └──────────────────────────┘

         Minimized state:
         ┌──────┐
         │ 🔢   │  (floating bubble, tap to expand)
         └──────┘
```

**Komponen:**
- Handle bar (draggable ke seluruh layar)
- Tombol close (×) — minimize, bukan tutup
- Display area (menampilkan input + hasil)
- Keypad kalkulator ilmiah:
  - Baris 1: sin, cos, tan, √
  - Baris 2: x², xⁿ, (, )
  - Baris 3: AC, ⌫ (backspace), %, ÷
  - Baris 4-6: Angka 0-9
  - Baris 7: 0, titik desimal, ±, =
  - Operator: +, −, ×, ÷
- State minimized: floating bubble (ikon 🔢)

---

## SCR-M09b — Soal Navigation Panel (Overlay)

```
╔══════════════════════════════════════╗
║                                      ║
║  ┌── BACKDROP (semi-transparan) ──┐  ║
║  │                                 │  ║
║  │  ┌───────────────────────────┐  │  ║
║  │  │                           │  │  ║
║  │  │  📋 NAVIGASI SOAL    ×   │  │  ║
║  │  │  ════════════════════     │  │  ║
║  │  │                           │  │  ║
║  │  │  Tap nomor untuk lompat   │  │  ║
║  │  │  ke soal tertentu.        │  │  ║
║  │  │                           │  │  ║
║  │  │  ┌────┬────┬────┬────┐   │  │  ║
║  │  │  │ 🟢 │ 🟢 │ 🟡 │ ⬜ │   │  │  ║
║  │  │  │  1 │  2 │  3 │  4 │   │  │  ║
║  │  │  ├────┼────┼────┼────┤   │  │  ║
║  │  │  │ ⬜ │    │    │    │   │  │  ║
║  │  │  │  5 │    │    │    │   │  │  ║
║  │  │  └────┴────┴────┴────┘   │  │  ║
║  │  │                           │  │  ║
║  │  │  LEGENDA:                 │  │  ║
║  │  │  🟢 Terjawab (2)          │  │  ║
║  │  │  🟡 Ditandai (1)          │  │  ║
║  │  │  ⬜ Belum Dijawab (2)     │  │  ║
║  │  │                           │  │  ║
║  │  │  ──────────────────────   │  │  ║
║  │  │  Progress: 2 / 5 soal     │  │  ║
║  │  │  ██████████░░░░░░░░░░░░   │  │  ║
║  │  │                           │  │  ║
║  │  └───────────────────────────┘  │  ║
║  │                                 │  ║
║  └─────────────────────────────────┘  ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Backdrop semi-transparan (tap luar = dismiss)
- Judul "NAVIGASI SOAL" + tombol close (×)
- Grid nomor soal (4 kolom × N baris):
  - 🟢 Hijau = sudah dijawab
  - 🟡 Kuning = ditandai (flagged)
  - ⬜ Abu-abu = belum dijawab
  - Border tebal pada soal yang sedang aktif
- Legenda warna dengan counter
- Progress bar (X / Total terjawab)
- Tap nomor → langsung lompat ke soal tersebut, overlay auto-dismiss

---

## SCR-M10 — Submit Confirmation (Modal)

```
╔══════════════════════════════════════╗
║                                      ║
║  ┌── BACKDROP (semi-transparan) ──┐  ║
║  │                                 │  ║
║  │  ┌───────────────────────────┐  │  ║
║  │  │                           │  │  ║
║  │  │   📤 KONFIRMASI SUBMIT    │  │  ║
║  │  │   ═════════════════════   │  │  ║
║  │  │                           │  │  ║
║  │  │   Apakah Anda yakin       │  │  ║
║  │  │   ingin mengumpulkan      │  │  ║
║  │  │   jawaban ujian?          │  │  ║
║  │  │                           │  │  ║
║  │  │   ┌─────────────────┐     │  │  ║
║  │  │   │ RINGKASAN       │     │  │  ║
║  │  │   │                 │     │  │  ║
║  │  │   │ Terjawab  : 3/5 │     │  │  ║
║  │  │   │ Ditandai  : 1   │     │  │  ║
║  │  │   │ Kosong    : 2   │     │  │  ║
║  │  │   │                 │     │  │  ║
║  │  │   │ Waktu Sisa:     │     │  │  ║
║  │  │   │ 00:45:12        │     │  │  ║
║  │  │   └─────────────────┘     │  │  ║
║  │  │                           │  │  ║
║  │  │   ┌─────────────────┐     │  │  ║
║  │  │   │ ⚠️  2 soal belum │     │  │  ║
║  │  │   │ dijawab!         │     │  │  ║
║  │  │   └─────────────────┘     │  │  ║
║  │  │                           │  │  ║
║  │  │ ┌───────────────────────┐ │  │  ║
║  │  │ │ [  KUMPULKAN SEKARANG]│ │  │  ║
║  │  │ └───────────────────────┘ │  │  ║
║  │  │                           │  │  ║
║  │  │ < Kembali ke Soal >       │  │  ║
║  │  │                           │  │  ║
║  │  └───────────────────────────┘  │  ║
║  │                                 │  ║
║  └─────────────────────────────────┘  ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Modal card:
  - Judul "KONFIRMASI SUBMIT"
  - Pertanyaan konfirmasi
  - Box ringkasan: Terjawab, Ditandai, Kosong, Waktu Sisa
  - Warning box kuning jika ada soal kosong
  - Tombol "KUMPULKAN SEKARANG" (primary, merah/oranye untuk kejelasan)
  - Link "Kembali ke Soal"

---

## SCR-M11 — Post-Exam Screen

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║                                      ║
║                                      ║
║          ┌──────────────┐            ║
║          │      ✅       │            ║
║          │   (animasi    │            ║
║          │  checkmark    │            ║
║          │   besar)      │            ║
║          └──────────────┘            ║
║                                      ║
║     UJIAN BERHASIL DIKUMPULKAN       ║
║     ══════════════════════════       ║
║                                      ║
║     ┌──────────────────────────┐     ║
║     │                          │     ║
║     │  📘 Akuntansi Manajemen  │     ║
║     │  AKT301                  │     ║
║     │                          │     ║
║     │  ────────────────────    │     ║
║     │                          │     ║
║     │  📅 Tanggal:             │     ║
║     │     14 Juni 2026         │     ║
║     │                          │     ║
║     │  🕐 Waktu Pengumpulan:   │     ║
║     │     09:58:32 WIB         │     ║
║     │                          │     ║
║     │  📝 Soal Terjawab:       │     ║
║     │     4 dari 5 soal        │     ║
║     │                          │     ║
║     │  ⚠️  Pelanggaran:         │     ║
║     │     1 kali (Peringatan)  │     ║
║     │                          │     ║
║     │  📊 Status:              │     ║
║     │     Menunggu Penilaian   │     ║
║     │                          │     ║
║     └──────────────────────────┘     ║
║                                      ║
║                                      ║
║     ┌──────────────────────────┐     ║
║     │   [  🔓 KELUAR UJIAN  ]  │     ║
║     └──────────────────────────┘     ║
║     Menonaktifkan Kiosk Mode /       ║
║     Guided Access                    ║
║                                      ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Animasi checkmark sukses (Lottie)
- Judul "UJIAN BERHASIL DIKUMPULKAN"
- Card ringkasan:
  - Nama MK + Kode MK
  - Tanggal ujian
  - Timestamp pengumpulan (precision: detik)
  - Soal terjawab / total
  - Jumlah pelanggaran + level hukuman tertinggi
  - Status penilaian
- Tombol "KELUAR UJIAN" → menonaktifkan Kiosk Mode (Android) / Guided Access (iOS)
- Keterangan teks di bawah tombol

---

## SCR-M12 — Riwayat Ujian

```
╔══════════════════════════════════════╗
║          STATUS BAR (system)         ║
╠══════════════════════════════════════╣
║                                      ║
║    📊 RIWAYAT UJIAN                  ║
║    ──────────────────────────────    ║
║                                      ║
║    Filter: [ Semua Semester  ▼ ]     ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ 📘 Akuntansi Manajemen   │      ║
║    │ AKT301 · Semester 4      │      ║
║    │                          │      ║
║    │ 📅 14 Juni 2026          │      ║
║    │ 🕐 Submit: 09:58 WIB     │      ║
║    │                          │      ║
║    │ Status: ✅ TERKUMPUL      │      ║
║    │ Pelanggaran: 1x (Ringan) │      ║
║    │                          │      ║
║    │ Nilai: ⏳ Belum Dinilai   │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ 📕 Statistika Bisnis     │      ║
║    │ STB202 · Semester 4      │      ║
║    │                          │      ║
║    │ 📅 12 Juni 2026          │      ║
║    │ 🕐 Submit: 10:02 WIB     │      ║
║    │                          │      ║
║    │ Status: ✅ TERKUMPUL      │      ║
║    │ Pelanggaran: 0x (Bersih) │      ║
║    │                          │      ║
║    │ Nilai: 📊 78 / 100       │      ║
║    └──────────────────────────┘      ║
║                                      ║
║    ┌──────────────────────────┐      ║
║    │ 📙 Manajemen Keuangan    │      ║
║    │ MNK303 · Semester 4      │      ║
║    │                          │      ║
║    │ 📅 10 Juni 2026          │      ║
║    │ 🕐 Force Kill: 08:45 WIB │      ║
║    │                          │      ║
║    │ Status: 🔴 DIBATALKAN     │      ║
║    │ Pelanggaran: 3x (Berat)  │      ║
║    │                          │      ║
║    │ Nilai: — (Dibatalkan)    │      ║
║    └──────────────────────────┘      ║
║                                      ║
║ ┌────┐  ┌────┐  ┌────┐  ┌────┐     ║
║ │ 🏠 │  │ 📋 │  │ 📊 │  │ ⚙️ │     ║
║ │Home │  │Ujian│  │Riwy│  │Prof│     ║
║ └────┘  └────┘  └────┘  └────┘     ║
╚══════════════════════════════════════╝
```

**Komponen:**
- Judul "RIWAYAT UJIAN"
- Dropdown filter semester
- Card riwayat per ujian (scrollable list):
  - Nama MK + Kode + Semester
  - Tanggal ujian
  - Waktu submit (atau force kill)
  - Status badge: ✅ Terkumpul / 🔴 Dibatalkan Sistem
  - Jumlah pelanggaran + severity (Bersih / Ringan / Berat)
  - Nilai (angka jika sudah dinilai, "Belum Dinilai" jika pending, "—" jika dibatalkan)
- Bottom navigation bar

---

# OVERLAY & STATE PENALTI

> Overlay berikut muncul **di atas** SCR-M09 (Layar Ujian Utama).
> Layar ujian tetap ada di belakang, hanya tertutup oleh overlay.

---

## OVR-P1 — Warning Popup (Hukuman 1)

```
╔══════════════════════════════════════╗
║  ┌─ SCR-M09 (Exam Screen) ────────┐ ║
║  │ ⏱️ 01:23:45  AKT301     3 / 5  │ ║
║  │ ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ │ ║
║  │ (konten ujian di belakang,      │ ║
║  │  masih terlihat samar)          │ ║
║  │                                  │ ║
║  │  ┌───── OVERLAY MERAH ──────┐   │ ║
║  │  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   │ ║
║  │  │▓                        ▓│   │ ║
║  │  │▓   ⚠️  PERINGATAN!       ▓│   │ ║
║  │  │▓   ══════════════════   ▓│   │ ║
║  │  │▓                        ▓│   │ ║
║  │  │▓  Aktivitas mencurigakan▓│   │ ║
║  │  │▓  terdeteksi pada       ▓│   │ ║
║  │  │▓  perangkat Anda!       ▓│   │ ║
║  │  │▓                        ▓│   │ ║
║  │  │▓  Jenis: Screenshot     ▓│   │ ║
║  │  │▓  Waktu: 09:10:15 WIB  ▓│   │ ║
║  │  │▓                        ▓│   │ ║
║  │  │▓  Pelanggaran ini telah ▓│   │ ║
║  │  │▓  dicatat dan dilaporkan▓│   │ ║
║  │  │▓  ke pengawas ujian.    ▓│   │ ║
║  │  │▓                        ▓│   │ ║
║  │  │▓  Pelanggaran: 1 / 3    ▓│   │ ║
║  │  │▓  ██████░░░░░░░░░░░░░░  ▓│   │ ║
║  │  │▓                        ▓│   │ ║
║  │  │▓ ┌────────────────────┐ ▓│   │ ║
║  │  │▓ │ [ SAYA MENGERTI  ] │ ▓│   │ ║
║  │  │▓ └────────────────────┘ ▓│   │ ║
║  │  │▓                        ▓│   │ ║
║  │  │▓  Auto-dismiss: 8 dtk  ▓│   │ ║
║  │  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   │ ║
║  │  └──────────────────────────┘   │ ║
║  │                                  │ ║
║  └──────────────────────────────────┘ ║
╚══════════════════════════════════════╝

Dashboard Pengawas: Nama mahasiswa → 🟡 KUNING BERKEDIP
```

**Komponen:**
- Overlay pop-up merah (full-width, centered vertically)
- Background: SCR-M09 masih terlihat samar di belakang
- Ikon peringatan besar (⚠️)
- Judul "PERINGATAN!"
- Detail pelanggaran: jenis + waktu
- Info pelanggaran telah dilaporkan ke pengawas
- Counter pelanggaran: `X / max_violations` dengan progress bar visual
- Tombol "SAYA MENGERTI" (dismiss manual)
- Auto-dismiss countdown: 10 detik
- **Dashboard:** nama di tabel pengawas berkedip KUNING

---

## OVR-P2 — Blur Punishment Screen (Hukuman 2)

```
╔══════════════════════════════════════╗
║  ┌─ SCR-M09 (DI-BLUR TOTAL) ──────┐ ║
║  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ║
║  │░░░░░ GAUSSIAN BLUR 50px ░░░░░░░│ ║
║  │░░░░░ Seluruh layar ujian ░░░░░░│ ║
║  │░░░░░ tidak bisa dibaca   ░░░░░░│ ║
║  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ║
║  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ║
║  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ║
║  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ║
║  │                                  │ ║
║  │  ┌───── OVERLAY TENGAH ──────┐   │ ║
║  │  │                           │   │ ║
║  │  │   🔒 LAYAR DIKUNCI        │   │ ║
║  │  │   ═══════════════════     │   │ ║
║  │  │                           │   │ ║
║  │  │   Anda melakukan          │   │ ║
║  │  │   pelanggaran ke-2.       │   │ ║
║  │  │                           │   │ ║
║  │  │   Layar ujian dikunci     │   │ ║
║  │  │   selama 60 detik         │   │ ║
║  │  │   sebagai sanksi.         │   │ ║
║  │  │                           │   │ ║
║  │  │       ┌──────────┐        │   │ ║
║  │  │       │          │        │   │ ║
║  │  │       │  00:47   │        │   │ ║
║  │  │       │          │        │   │ ║
║  │  │       └──────────┘        │   │ ║
║  │  │     (countdown besar,     │   │ ║
║  │  │      font 48pt, tebal)    │   │ ║
║  │  │                           │   │ ║
║  │  │   ⚠️  Timer ujian Anda     │   │ ║
║  │  │   TETAP BERJALAN selama   │   │ ║
║  │  │   layar terkunci.         │   │ ║
║  │  │                           │   │ ║
║  │  │   Pelanggaran: 2 / 3      │   │ ║
║  │  │   ████████████░░░░░░░░░░  │   │ ║
║  │  │                           │   │ ║
║  │  └───────────────────────────┘   │ ║
║  │                                  │ ║
║  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ║
║  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ║
║  └──────────────────────────────────┘ ║
╚══════════════════════════════════════╝

❌ TIDAK ADA TOMBOL — Tidak bisa dismiss
❌ TIDAK BISA INTERAKSI — Touch disabled
⏱️  Timer ujian TETAP BERJALAN di background!

Dashboard Pengawas: Nama mahasiswa → 🟠 ORANYE
```

**Komponen:**
- SCR-M09 di-blur total (Gaussian blur radius 50px) — soal tidak bisa dibaca
- Overlay tengah (jelas di atas blur):
  - Ikon gembok
  - Judul "LAYAR DIKUNCI"
  - Pesan sanksi
  - **Countdown besar** (`MM:SS`) — font 48pt, bold, animasi per detik
  - Peringatan: timer ujian tetap berjalan
  - Counter pelanggaran: `2 / 3`
- **TIDAK ADA TOMBOL** — mahasiswa harus menunggu countdown selesai
- **Touch disabled** — seluruh interaksi ditolak
- **Dashboard:** status berubah ORANYE

---

## OVR-P3 — Kill Switch / Red Screen (Hukuman 3)

```
╔══════════════════════════════════════╗
║                                      ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║
║  ▓▓▓▓▓▓ FULL RED BACKGROUND ▓▓▓▓▓▓  ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║
║  ▓                               ▓  ║
║  ▓                               ▓  ║
║  ▓                               ▓  ║
║  ▓       ┌─────────────┐        ▓  ║
║  ▓       │             │        ▓  ║
║  ▓       │     ✋       │        ▓  ║
║  ▓       │  (ikon stop │        ▓  ║
║  ▓       │   besar)    │        ▓  ║
║  ▓       │             │        ▓  ║
║  ▓       └─────────────┘        ▓  ║
║  ▓                               ▓  ║
║  ▓   SESI UJIAN DIAKHIRI         ▓  ║
║  ▓   ════════════════════         ▓  ║
║  ▓                               ▓  ║
║  ▓   Sesi ujian Anda telah       ▓  ║
║  ▓   diakhiri karena:            ▓  ║
║  ▓                               ▓  ║
║  ▓   ┌─────────────────────┐    ▓  ║
║  ▓   │ ● Pelanggaran       │    ▓  ║
║  ▓   │   berulang (3/3)    │    ▓  ║
║  ▓   │                     │    ▓  ║
║  ▓   │   ATAU              │    ▓  ║
║  ▓   │                     │    ▓  ║
║  ▓   │ ● Dikeluarkan oleh  │    ▓  ║
║  ▓   │   pengawas ujian    │    ▓  ║
║  ▓   └─────────────────────┘    ▓  ║
║  ▓                               ▓  ║
║  ▓   Jawaban yang sudah Anda     ▓  ║
║  ▓   tulis tersimpan otomatis.   ▓  ║
║  ▓                               ▓  ║
║  ▓   Silakan hubungi pengawas    ▓  ║
║  ▓   untuk informasi lebih       ▓  ║
║  ▓   lanjut.                     ▓  ║
║  ▓                               ▓  ║
║  ▓   ┌─────────────────────┐    ▓  ║
║  ▓   │  Kode Sesi:         │    ▓  ║
║  ▓   │  SES-ABC123-2026    │    ▓  ║
║  ▓   └─────────────────────┘    ▓  ║
║  ▓                               ▓  ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║
╚══════════════════════════════════════╝

❌ KOLOM ESAI DIKUNCI PERMANEN
❌ TIDAK ADA TOMBOL NAVIGASI
❌ TIDAK ADA TOMBOL KELUAR
🔴 Kiosk Mode tetap aktif hingga admin reset
   atau aplikasi di-force close.

Dashboard Pengawas: Nama mahasiswa → 🔴 MERAH
```

**Komponen:**
- **Full-screen background MERAH** — menggantikan seluruh SCR-M09
- Ikon stop/tangan besar (✋)
- Judul "SESI UJIAN DIAKHIRI"
- Alasan spesifik:
  - "Pelanggaran berulang (3/3)" — jika auto-kill
  - "Dikeluarkan oleh pengawas ujian" — jika remote kill
- Info: jawaban tersimpan otomatis
- Instruksi hubungi pengawas
- Kode sesi (untuk referensi pengawas)
- **TIDAK ADA TOMBOL** — dead end total
- Kolom esai dikunci permanen
- Kiosk Mode tetap aktif
- **Dashboard:** status MERAH

---

# OVERLAY STATUS JARINGAN & AUTOSAVE

---

## OVR-N1 — Network Loss Banner

```
╔══════════════════════════════════════╗
║ ┌──────────────────────────────────┐ ║
║ │ ⚠️ Koneksi terputus · Jawaban    │ ║
║ │ disimpan offline · Auto-sync ☁️❌ │ ║
║ └──────────────────────────────────┘ ║
║                                      ║
║  (SCR-M09: Layar Ujian Utama        ║
║   berjalan NORMAL di bawah banner)  ║
║                                      ║
╚══════════════════════════════════════╝

State saat koneksi pulih:
╔══════════════════════════════════════╗
║ ┌──────────────────────────────────┐ ║
║ │ ✅ Koneksi pulih · Menyinkronkan │ ║
║ │ jawaban... ☁️🔄 (3 item)         │ ║
║ └──────────────────────────────────┘ ║
╚══════════════════════════════════════╝

State setelah sync selesai:
╔══════════════════════════════════════╗
║ ┌──────────────────────────────────┐ ║
║ │ ✅ Semua jawaban tersinkronkan ☁️✅│ ║
║ └──────────────────────────────────┘ ║  ← auto-dismiss 3 detik
╚══════════════════════════════════════╝
```

**Komponen:**
- Banner tipis di atas layar (height: ~48px)
- 3 state:
  1. **Offline** (kuning): ikon ⚠️ + pesan + ikon cloud ❌
  2. **Syncing** (biru): ikon ✅ + pesan sinkronisasi + ikon cloud 🔄 + counter item
  3. **Synced** (hijau): ikon ✅ + pesan sukses + ikon cloud ✅ → auto-dismiss 3 detik
- Layar ujian tetap berjalan normal di bawah banner

---

## OVR-N2 — Autosave Indicator (Toast)

```
                              ┌────────────────┐
                              │  💾 Tersimpan   │
                              │  09:14:55 WIB  │
                              └────────────────┘
                                ↑
                        Pojok kanan bawah
                        layar ujian (SCR-M09)

                        Fade in → 2 detik → Fade out
```

**Komponen:**
- Toast kecil di pojok kanan bawah (bottom-right)
- Ikon save (💾) + teks "Tersimpan"
- Timestamp waktu save
- Animasi: fade in → tampil 2 detik → fade out
- Tidak menghalangi interaksi (non-blocking)
- Muncul setiap autosave berhasil (setiap ~30 detik)

---

# RINGKASAN NAVIGASI ANTAR LAYAR

```
┌─────────┐    ┌─────────┐    ┌─────────┐
│ SCR-M01 │───▶│ SCR-M02 │──┬▶│ SCR-M03 │
│ Splash  │    │ OS Gate │  │ │ Login   │
└─────────┘    └─────────┘  │ └────┬────┘
                            │      │
               ┌─────────┐ │      │
               │ SCR-M02a│◀┘      │
               │ Blocked │        │
               │ (DEAD   │        ▼
               │  END)   │  ┌─────────┐    ┌─────────┐
               └─────────┘  │ SCR-M04 │───▶│ SCR-M05 │
                            │ Biometri│    │Geofence │
                            └─────────┘    └──┬──┬───┘
                                              │  │
                              ┌─────────┐     │  │
                              │ SCR-M05a│◀────┘  │
                              │Geo Fail │        │
                              └─────────┘        │
                                                 ▼
                     ┌─────────┐  iOS   ┌─────────┐
                     │ SCR-M06 │◀───────│ Platform│
                     │ Guided  │        │  Check  │
                     │ Access  │        └────┬────┘
                     └────┬────┘     Android │
                          │                  │
                          ▼                  ▼
                         ┌──────────────────────┐
                         │      SCR-M07         │
                         │   Dashboard Ujian    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      SCR-M08         │
                         │  Pre-Exam Confirm    │
                         └──────────┬───────────┘
                                    │ 🔒 KIOSK MODE ON
                                    ▼
                    ╔═══════════════════════════════╗
                    ║        SCR-M09               ║
                    ║   LAYAR UJIAN UTAMA           ║
                    ║                               ║
                    ║  ┌─────────┐ ┌─────────┐     ║
                    ║  │SCR-M09a │ │SCR-M09b │     ║
                    ║  │Kalkulat.│ │Nav. Soal│     ║
                    ║  └─────────┘ └─────────┘     ║
                    ║                               ║
                    ║  ┌───────┐┌───────┐┌───────┐ ║
                    ║  │OVR-P1 ││OVR-P2 ││OVR-P3 │ ║
                    ║  │Warning││ Blur  ││ Kill  │ ║
                    ║  └───────┘└───────┘└───────┘ ║
                    ║                               ║
                    ║  ┌───────┐ ┌───────┐         ║
                    ║  │OVR-N1 │ │OVR-N2 │         ║
                    ║  │Network│ │Autosav│         ║
                    ║  └───────┘ └───────┘         ║
                    ╚═══════════╤═══════════════════╝
                                │
                     ┌──────────▼───────────┐
                     │      SCR-M10         │
                     │  Submit Confirmation │
                     └──────────┬───────────┘
                                │
                     ┌──────────▼───────────┐
                     │      SCR-M11         │
                     │    Post-Exam         │
                     └──────────┬───────────┘
                                │ 🔓 KIOSK MODE OFF
                     ┌──────────▼───────────┐
                     │      SCR-M12         │
                     │   Riwayat Ujian      │
                     └──────────────────────┘
```

---

> **Catatan Desain:**
> - Semua wireframe di atas menggunakan proporsi ~390×844pt (rasio layar smartphone modern).
> - Warna dan styling final akan ditentukan pada tahap UI Design (Figma/Flutter).
> - Setiap komponen `[Tombol]` memiliki state: default, pressed, disabled, loading.
> - Animasi transisi antar layar: slide-in horizontal (forward) / slide-out (back).
> - Overlay (OVR-*) menggunakan transisi fade-in / scale-up.
