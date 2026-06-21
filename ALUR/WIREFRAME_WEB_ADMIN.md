# 📐 WIREFRAME WEB ADMIN PANEL — APLIKASI UAS FEB UNSAP

> **Dokumen**: Teks Wireframe (Web Layout Architecture)
> **Format**: ASCII / Markdown Box
> **Acuan**: `BLUEPRINT_ARSITEKTUR_SISTEM.md` — Seksi 1.2
> **Platform**: Web Admin (Responsive Desktop Browser Layout)
> **Resolusi Acuan**: Desktop Widescreen Layout (Layout 90-110 kolom)

---

## LEGENDA SIMBOL

```
┌──────────────────────────────────────┐   Batas area halaman utama / panel / card
│                                      │
└──────────────────────────────────────┘

|                                          Pemisah kolom / grid vertical

[  Tombol Utama  ]                         Tombol aksi primer (Primary Button)
< Tombol Sekunder >                        Tombol aksi sekunder / text button

⟨ Input Teks ⟩                             Text Input Field / Area
⟨ Dropdown Pilihan [v] ⟩                   Select / Dropdown Menu

◉ Pilihan (Selected)                       Radio Button aktif
○ Pilihan (Unselected)                     Radio Button tidak aktif
☑ Opsi (Checked)                           Checkbox terpilih
☐ Opsi (Unchecked)                         Checkbox tidak terpilih

🟢 / 🟡 / 🟠 / 🔴                           Indikator status & tingkat kerawanan / pelanggaran
🔒                                         Indikator fitur keamanan atau data terenkripsi
```

---

# 🚪 FASE GERBANG MASUK & DASHBOARD UTAMA

---

## SCR-W01 — Login Page

Halaman masuk terpusat untuk Dosen, Pengawas, dan Super Admin FEB UNSAP dengan enkripsi SSL/TLS.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                      │
│                              FEB UNSAP EXAM WEB PORTAL                               │
│                      Fakultas Ekonomi & Bisnis - Univ. UNSAP                         │
│                                                                                      │
│                             ┌──────────────────────────┐                             │
│                             │     MASUK PORTAL ADMIN   │                             │
│                             │     Dosen & Pengawas     │                             │
│                             ├──────────────────────────┤                             │
│                             │                          │                             │
│                             │ Email Institusi          │                             │
│                             │ ┌──────────────────────┐ │                             │
│                             │ │ ⟨ dosen@unsap.ac.id ⟩│ │                             │
│                             │ └──────────────────────┘ │                             │
│                             │                          │                             │
│                             │ Kata Sandi               │                             │
│                             │ ┌──────────────────────┐ │                             │
│                             │ │ ⟨ ****************  ⟩│ │                             │
│                             │ └──────────────────────┘ │                             │
│                             │                          │                             │
│                             │ ☐ Ingat Akun Saya        │                             │
│                             │                          │                             │
│                             │      [    MASUK    ]     │                             │
│                             │                          │                             │
│                             │  < Lupa Kata Sandi? >    │                             │
│                             └──────────────────────────┘                             │
│                                                                                      │
│                🔒 Secure SSL | Hak Cipta © 2026 FEB UNSAP. v1.0.0                    │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Card kontainer login yang berada tepat di tengah halaman.
- Input Email Institusi (validasi domain `@unsap.ac.id` / `@feb.unsap.ac.id`).
- Input Password dengan fitur mask.
- Checkbox "Ingat Akun Saya" (untuk persistent session cookie).
- Link bantuan "Lupa Kata Sandi?" yang mengarah ke sistem pemulihan email institusi.
- Footer keamanan dengan label SSL aktif.

---

## SCR-W02 — Dashboard Utama

Laman ringkasan (Overview) setelah login sukses. Berisi metrik real-time ringkas (KPI) dan grafik tren pelanggaran ujian yang sedang aktif saat itu.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:30 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ DASHBOARD UTAMA                                             │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [▶] Dashboard          │ Selamat Datang Kembali, Dr. Siti Aminah                     │
│ [ ] Mata Kuliah        │ Semester Genap 2025/2026 — FEB UNSAP                        │
│ [ ] Mahasiswa          │                                                             │
│ [ ] Bank Soal          │ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│ [ ] Buat Ujian         │ │UJIAN AKTIF │ │MHS ONLINE  │ │PELANGGARAN │ │AVG INTEG.  │ │
│ [ ] Jadwal Ujian       │ │     3      │ │    185     │ │    24 🟡   │ │    94.2%   │ │
│ [🔴] Live Monitor      │ └────────────┘ └────────────┘ └────────────┘ └────────────┘ │
│ [ ] Koreksi Nilai      │                                                             │
│ [ ] Rekap Nilai        │ Grafik Tren Pelanggaran Terdeteksi Hari Ini (Per Jam)       │
│ [ ] Laporan Integritas │  20 +                                                       │
│ [ ] Pengaturan Sistem  │  15 |            *                                          │
│ [ ] Profil & Keamanan  │  10 |        *  / \                                         │
│                        │   5 |   *───/ \    *                                        │
│ ────────────────────── │   0 +───────────────*───                                    │
│ [ Keluar ]             │     07:00  08:00  09:00                                     │
│                        │                                                             │
│                        │ Akses Cepat:                                                │
│                        │ [ Buat Ujian Baru ]  [ Lihat Live Monitor ]  [ Cetak Rekap ]│
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Sidebar navigasi tetap di sebelah kiri (digunakan secara konsisten pada seluruh screen web).
- Top Header: menampilkan nama portal, tanggal/jam server terpusat, dan profil dosen aktif.
- 4 Kartu KPI:
  1. *Ujian Aktif*: Jumlah mata kuliah yang sedang melaksanakan ujian saat ini.
  2. *Mhs Online*: Jumlah total mahasiswa yang device-nya aktif terhubung ke server.
  3. *Pelanggaran*: Total akumulasi deteksi pelanggaran hari ini (dengan indikator status warna).
  4. *Avg Integ*: Rata-rata tingkat kejujuran mahasiswa berdasarkan hitungan algoritma deteksi.
- Line Chart ASCII: Menampilkan fluktuasi waktu puncak terjadinya pelanggaran.
- Quick Actions (Akses Cepat): Tombol shortcut menuju alur penting ujian.

---

# 📚 KELOLA AKADEMIK & SOAL

---

## SCR-W03 — Manajemen Mata Kuliah

Panel CRUD untuk mengelola data mata kuliah di lingkungan FEB UNSAP. Dosen hanya dapat mengedit mata kuliah miliknya, sedangkan Super Admin memiliki hak akses penuh.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:31 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ DATA MATA KULIAH                                            │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ Cari: ⟨ AKT3             ⟩  Prodi: ⟨ Akuntansi [v] ⟩        │
│ [▶] Mata Kuliah        │                                      [+ Tambah Mata Kuliah] │
│ [ ] Mahasiswa          │ ┌─────────────────────────────────────────────────────────┐ │
│ [ ] Bank Soal          │ │ Kode   │ Nama Mata Kuliah     │ SKS │ Sem │ Pengampu      │ │
│ [ ] Buat Ujian         │ ├────────┼──────────────────────┼─────┼─────┼───────────────┤ │
│ [ ] Jadwal Ujian       │ │ AKT301 │ Akuntansi Manajemen  │ 3   │ 5   │ Dr. Siti A.   │ │
│ [🔴] Live Monitor      │ │ AKT302 │ Akuntansi Keuangan   │ 3   │ 5   │ Dr. H. Mulyono│ │
│ [ ] Koreksi Nilai      │ │ AKT305 │ Auditing Lanjutan    │ 3   │ 6   │ Dra. Rita M.  │ │
│ [ ] Rekap Nilai        │ └────────┴──────────────────────┴─────┴─────┴───────────────┘ │
│ [ ] Laporan Integritas │                                                             │
│ [ ] Pengaturan Sistem  │ Menampilkan 1 - 3 dari 12 Item      Halaman: < Sebelum > 1 <│
│ [ ] Profil & Keamanan  │                                                             │
│                        │ Aksi Baris Terpilih (AKT301):                               │
│ ────────────────────── │ [ Edit Detail ]   [ Lihat Mahasiswa Enrolled ]  [ Hapus ]   │
│ [ Keluar ]             │                                                             │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Search Input & Filter Dropdown: Melakukan filter data mata kuliah berdasarkan kode, nama, atau prodi.
- Tombol "+ Tambah Mata Kuliah" (Trigger Form Modal).
- Tabel Data: Kolom Kode, Nama MK, SKS, Semester, Dosen Pengampu.
- Pagination Control: Navigasi perpindahan halaman tabel.
- Row Action Control: Menjalankan edit/view/delete pada baris mata kuliah yang diklik.

---

## SCR-W04 — Manajemen Mahasiswa

Panel administrasi untuk mendaftarkan mahasiswa, melakukan import data masal, serta mereset kunci biometrik atau password mahasiswa jika mengalami kendala login di perangkat mobile.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:32 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ DATA MAHASISWA (STUDENT REGISTRY)                           │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ Cari NIM/Nama: ⟨ 202401           ⟩  Prodi: ⟨ Semua [v] ⟩   │
│ [ ] Mata Kuliah        │ [📥 Import CSV/Excel]  [+ Registrasi Baru]                  │
│ [▶] Mahasiswa          │ ┌─────────────────────────────────────────────────────────┐ │
│ [ ] Bank Soal          │ │ NIM        │ Nama Mahasiswa   │ Prodi     │ Sem │ Status    │ │
│ [ ] Buat Ujian         │ ├──────────┼──────────────────┼───────────┼─────┼───────────┤ │
│ [ ] Jadwal Ujian       │ │2024010001│ Ahmad Fauzi      │ Akuntansi │ 4   │ Aktif 🟢  │ │
│ [🔴] Live Monitor      │ │2024010002│ Budi Hartono     │ Akuntansi │ 4   │ Aktif 🟢  │ │
│ [ ] Koreksi Nilai      │ │2024010003│ Citra Lestari    │ Manajemen │ 4   │ Terblokir🔴│ │
│ [ ] Rekap Nilai        │ └──────────┴──────────────────┴───────────┴─────┴───────────┘ │
│ [ ] Laporan Integritas │                                                             │
│ [ ] Pengaturan Sistem  │ Menampilkan 1-3 dari 320 Mahasiswa  Halaman: < 1 [2] 3 >    │
│ [ ] Profil & Keamanan  │                                                             │
│                        │ Detail Mahasiswa Terpilih: Ahmad Fauzi (2024010001)         │
│ ────────────────────── │ Perangkat Terdaftar: Samsung A54 (dev_xyz789)               │
│ [ Keluar ]             │ [ Reset Sidik Jari/Face ID ]  [ Reset Sandi ]  [ Blokir ]   │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Filter & Pencarian Mahasiswa secara real-time.
- Tombol "Import CSV/Excel" untuk import mahasiswa masal secara cepat per semester.
- Tombol "+ Registrasi Baru" untuk menambahkan mahasiswa satu per satu secara manual.
- Kolom Tabel: NIM, Nama, Program Studi, Semester, dan Status (Aktif 🟢 / Terblokir 🔴).
- Panel Detail & Resolusi: Dosen/Admin dapat mereset kunci sidik jari terdaftar (biometric reset) atau mereset password (tanggal lahir) bila perangkat mahasiswa berganti.

---

## SCR-W05 — Bank Soal

Tempat dosen membuat dan mengarsipkan soal ujian. Dilengkapi editor rich text, pengatur poin bobot soal, kategori analisis, serta opsi upload gambar pendukung soal.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:33 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ BANK SOAL MAHASISWA                                         │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ Pilih Mata Kuliah: ⟨ Akuntansi Manajemen (AKT301)       [v] ⟩│
│ [ ] Mata Kuliah        │                                           [+ Buat Soal Baru]│
│ [ ] Mahasiswa          │ ┌─────────────────────────────────────────────────────────┐ │
│ [▶] Bank Soal          │ │ ID Soal│ Ringkasan Pertanyaan         │ Tipe  │Bobot│Aksi │ │
│ [ ] Buat Ujian         │ ├────────┼──────────────────────────────┼───────┼─────┼─────┤ │
│ [ ] Jadwal Ujian       │ │ QB-001 │ Jelaskan konsep ABC costing  │ Esai  │ 20  │[Ed] │ │
│ [🔴] Live Monitor      │ │ QB-002 │ Hitunglah margin kontribusi  │ Analis│ 30  │[Ed] │ │
│ [ ] Koreksi Nilai      │ │ QB-003 │ Studi Kasus PT. Sinar Jaya   │ Perhit│ 50  │[Ed] │ │
│ [ ] Rekap Nilai        │ └────────┴──────────────────────────────┴───────┴─────┴─────┘ │
│ [ ] Laporan Integritas │                                                             │
│ [ ] Pengaturan Sistem  │ Preview Soal Terpilih (QB-001):                             │
│ [ ] Profil & Keamanan  │ ┌─────────────────────────────────────────────────────────┐ │
│                        │ │ Jelaskan bagaimana Activity-Based Costing (ABC) dapat   │ │
│ ────────────────────── │ │ membantu manajemen mengurangi pemborosan biaya produksi!│ │
│ [ Keluar ]             │ └─────────────────────────────────────────────────────────┘ │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Dropdown Pemilihan Mata Kuliah untuk menampilkan daftar soal yang relevan.
- Tombol "+ Buat Soal Baru" untuk membuka form editor input soal.
- Tabel Soal: Menampilkan ringkasan soal, jenis soal (Esai, Uraian, Analisis, Perhitungan), bobot skor, dan tombol edit.
- Card Preview Box: Menampilkan konten visual/teks lengkap dari soal yang sedang dipilih di tabel tanpa harus masuk ke layar edit.

---

# 📅 PERENCANAAN & PENJADWALAN UJIAN

---

## SCR-W06 — Buat/Edit Ujian

Formulir lengkap bagi Dosen untuk merakit ujian, mengatur durasi, memilih soal dari Bank Soal, serta menentukan radius geofence keamanan lokasi ujian.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:34 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ BUAT UJIAN BARU                                             │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ Nama/Judul Ujian: ⟨ UAS Akuntansi Manajemen Ganjil 2026   ⟩ │
│ [ ] Mata Kuliah        │ Mata Kuliah:      ⟨ Akuntansi Manajemen (AKT301)       [v] ⟩│
│ [ ] Mahasiswa          │ Waktu & Jam Mulai:⟨ 15/06/2026 📅 ⟩ Jam: ⟨ 08:00 🕒 ⟩       │
│ [ ] Bank Soal          │ Durasi Ujian:     ⟨ 120   ⟩ menit                           │
│ [▶] Buat Ujian         │                                                             │
│ [ ] Jadwal Ujian       │ PARAMETER FASE KEAMANAN:                                    │
│ [🔴] Live Monitor      │ Batas Toleransi Pelanggaran: ⟨ 3 ⟩ kali                     │
│ [ ] Koreksi Nilai      │ Durasi Sanksi Layar Blur:    ⟨ 60 ⟩ detik                   │
│ [ ] Rekap Nilai        │ Radius Geofence Kampus:      ⟨ 200⟩ meter                   │
│ [ ] Laporan Integritas │ ☑ Acak Urutan Soal (Shuffle)                                │
│ [ ] Pengaturan Sistem  │                                                             │
│ [ ] Profil & Keamanan  │ PILIH SOAL UJIAN (Drag & Reorder):                          │
│                        │ [::] Soal 1: QB-001 - Konsep ABC Costing (Bobot: 20)    <X> │
│ ────────────────────── │ [::] Soal 2: QB-002 - Margin Kontribusi  (Bobot: 30)    <X> │
│ [ Keluar ]             │ [+ Tambah Soal dari Bank Soal]    Total Poin: 50 / 100      │
│                        │                                                             │
│                        │             [ Simpan Draft ]    [ PUBLIKASIKAN UJIAN ]      │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Input Judul Ujian, Dropdown Mata Kuliah, Input Kalender Tanggal Mulai dan Jam Mulai.
- Parameter Keamanan Terintegrasi:
  - *Toleransi Pelanggaran*: Jumlah pelanggaran maksimal sebelum terpicu Hukuman 3 (Remote Kill).
  - *Durasi Blur*: Jeda waktu pembekuan layar mahasiswa saat terkena Hukuman 2.
  - *Geofence Radius*: Radius batas pengerjaan dari titik koordinat FEB UNSAP.
- Drag & Drop List (`[::]` indicator): Memudahkan pengubahan urutan soal secara visual.
- Tombol Aksi: "Simpan Draft" untuk diedit lagi nanti, atau "Publikasikan Ujian" untuk merilis jadwal ke aplikasi mobile mahasiswa.

---

## SCR-W07 — Jadwal Ujian

Layar kalender interaktif untuk memonitor jadwal pelaksanaan ujian di FEB UNSAP agar tidak terjadi bentrok ruang/waktu.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:35 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ JADWAL KALENDER UJIAN                                       │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ Tampilan: [ Bulanan ]  < Mingguan >    Juni 2026   < Pindah >│
│ [ ] Mata Kuliah        │ ┌─────────────────────────────────────────────────────────┐ │
│ [ ] Mahasiswa          │ │ Sen      │ Sel      │ Rab      │ Kam      │ Jum      │ Sab   │ │
│ [ ] Bank Soal          │ ├──────────┼──────────┼──────────┼──────────┼──────────┼───────┤ │
│ [ ] Buat Ujian         │ │ 1        │ 2        │ 3        │ 4        │ 5        │ 6     │ │
│ [▶] Jadwal Ujian       │ │          │          │          │          │          │       │ │
│ [🔴] Live Monitor      │ ├──────────┼──────────┼──────────┼──────────┼──────────┼───────┤ │
│ [ ] Koreksi Nilai      │ │ 15       │ 16       │ 17       │ 18       │ 19       │ 20    │ │
│ [ ] Rekap Nilai        │ │*AKT301-UAS│          │          │          │          │       │ │
│ [ ] Laporan Integritas │ └──────────┴──────────┴──────────┴──────────┴──────────┴───────┘ │
│ [ ] Pengaturan Sistem  │                                                             │
│ [ ] Profil & Keamanan  │ Detail Jadwal Hari Ini (15 Juni 2026):                      │
│                        │ ┌─────────────────────────────────────────────────────────┐ │
│ ────────────────────── │ │ * Ujian: UAS Akuntansi Manajemen (AKT301) - 08:00 WIB    │ │
│ [ Keluar ]             │ │   Status: Berlangsung 🟢 | Total Peserta: 120 Mhs       │ │
│                        │ └─────────────────────────────────────────────────────────┘ │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Navigasi Tampilan Kalender (Bulanan/Mingguan) dan tombol pindah bulan.
- Grid Kalender: Hari dengan penanda marker bintang (`*`) jika terdapat jadwal ujian.
- Panel Detail Hari Terpilih: Menampilkan ringkasan jam mulai, mata kuliah, status (Draft, Terjadwal, Berlangsung, Selesai), dan kuota mahasiswa.

---

# 🔴 MONITORING REAL-TIME & PENILAIAN

---

## SCR-W08 — Live Monitoring Dashboard (LAYAR PALING KRITIS)

Dashboard pengawasan langsung real-time dengan latensi rendah (< 200ms) menggunakan listener Firebase Realtime DB. Layar ini didesain terbagi menjadi 3 bagian utama untuk menampilkan: Statistik Utama, Tabel Live Mahasiswa lengkap dengan indikator kode warna pelanggaran, tombol aksi intervensi pengawas, dan Sidebar Stream Log Pelanggaran Berjalan.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP PORTAL PENGASAWAN LIVE            UAS AKT301 | Akuntansi Manajemen | Dosen: Dr. Siti Aminah | 09:36:15 WIB │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [▶ Dashboard] [Mata Kuliah] [Mahasiswa] [Bank Soal] [Jadwal] [🔴 Live Monitor] [Nilai] [Integritas] [Setting] [Profil] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ STATISTIK LIVE:   Total Peserta: 120   |   Online: 112 🟢   |   Offline: 5 🟡   |   Pelanggaran: 14 🟠   |   Submit: 45    │
├───────────────────────────────────────────────────────────────────────┬────────────────────────────────────────────────┤
│ TABEL LIVE AKTIVITAS MAHASISWA                                         │ STREAM LOG PELANGGARAN REAL-TIME (SIDEBAR)     │
│ Pencarian NIM/Nama: ⟨ 202401           ⟩  Filter: ⟨ Semua Status [v] ⟩│ ────────────────────────────────────────────── │
│ ┌───────────────────────────────────────────────────────────────────┐ │ [09:35:10] NIM 2024010002 — Budi Hartono       │
│ │ NIM        │ Nama Mahasiswa   │ Status  │ Progress │ Vio │ Sanksi │ Aksi  │ │  ⚠️ SCREENSHOT_ATTEMPT (Medium)               │
│ ├──────────┼──────────────────┼─────────┼──────────┼─────┼────────┼───────┤ │  Pemicu: Hukuman 1 (Warning Popup Sent)        │
│ │2024010001│ Ahmad Fauzi      │ Online🟢│ 3/5 Soal │  0  │ Normal │[W][B] │ │ ────────────────────────────────────────────── │
│ ├──────────┼──────────────────┼─────────┼──────────┼─────┼────────┼───────┤ │ [09:35:42] NIM 2024010005 — Citra Lestari      │
│ │2024010002│ Budi Hartono     │ Online🟡│ 2/5 Soal │  1  │ Warn-1 │[W][B] │ │  🚫 APP_SWITCH_EXTENDED (High)                │
│ ├──────────┼──────────────────┼─────────┼──────────┼─────┼────────┼───────┤ │  Pemicu: Hukuman 2 (Screen Blurred 60s)        │
│ │2024010005│ Citra Lestari    │ Blur  🟠│ 4/5 Soal │  2  │ Blur42s│[W][B] │ │ ────────────────────────────────────────────── │
│ ├──────────┼──────────────────┼─────────┼──────────┼─────┼────────┼───────┤ │ [09:36:01] NIM 2024010012 — Dian Pratama       │
│ │2024010012│ Dian Pratama     │ Keluar🔴│ 1/5 Soal │  3  │ Killed │[ - ]  │ │  🚨 SCREEN_RECORD_ATTEMPT (Critical)           │
│ ├──────────┼──────────────────┼─────────┼──────────┼─────┼────────┼───────┤ │  Pemicu: Hukuman 3 (Remote Killed)             │
│ │2024010020│ Eka Saputra      │ Off   🟡│ 3/5 Soal │  0  │ R-Lost │[W][B] │ │ ────────────────────────────────────────────── │
│ └──────────┴──────────────────┴─────────┴──────────┴─────┴────────┴───────┘ │ [09:36:12] NIM 2024010020 — Eka Saputra        │
│                                                                       │  📡 CONNECTION_LOST (Low)                      │
│ Tombol Aksi Row Terpilih:                                             │  Sesi tersimpan offline di SQLite lokal.       │
│ < Kirim Pesan Peringatan [W] >  < Force Blur Layar 60s [B] >          │ ────────────────────────────────────────────── │
│ [🔴 REMOTE KILL SWITCH: KELUARKAN MAHASISWA DARI UJIAN ]              │ [ Log Lainnya v ]                              │
└───────────────────────────────────────────────────────────────────────┴────────────────────────────────────────────────┘
```

**Perhatian Khusus / Penjelasan Layout:**
1. **Statistik Live (Header Atas)**: Indikator ringkasan jumlah online, offline (koneksi terputus), terdeteksi melanggar, dan sudah submit secara langsung.
2. **Tabel Live Aktivitas Mahasiswa (Bagian Tengah Kiri)**:
   - **Budi Hartono (Kuning 🟡)**: Memiliki 1 pelanggaran, baris berkedip kuning, sanksi `Warn-1` aktif di hpnya.
   - **Citra Lestari (Oranye 🟠)**: Terdeteksi 2 kali melanggar. Status layar `Blur 🟠`, sanksi blur berjalan tinggal 42 detik lagi.
   - **Dian Pratama (Merah 🔴)**: Mengalami 3 pelanggaran (batas maksimal), baris berwarna merah penuh. Akun di-kill sistem secara otomatis atau manual. Aksi dinonaktifkan.
   - **Eka Saputra (Kuning 🟡)**: Status `Off 🟡` karena terputus jaringan WiFi kampus. Sanksi: `R-Lost` (Koneksi putus, autosave offline berjalan).
3. **Aksi Pengawas Terpadu**:
   - `[W]`: Push notifikasi peringatan manual ke layar hp mahasiswa.
   - `[B]`: Mengaktifkan blur layar 60 detik secara paksa dari jauh (Remote Blur).
   - **`[🔴 REMOTE KILL SWITCH]`**: Tombol merah besar untuk mendepak paksa mahasiswa yang ketahuan curang langsung di tempat.
4. **Log Pelanggaran Real-time (Sidebar Kanan)**: Menampilkan timeline terperinci dengan timestamp persis kapan event pelanggaran terpicu beserta detail level hukumannya.

---

## SCR-W09 — Detail Pelanggaran Mahasiswa

Layar audit trail untuk membedah riwayat pelanggaran spesifik seorang mahasiswa selama mengikuti sesi ujian aktif maupun riwayat ujian sebelumnya.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:37 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ AUDIT LOG PELANGGARAN MAHASISWA                             │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ Nama: Ahmad Fauzi (NIM: 2024010001)    | Ujian: AKT301-UAS  │
│ [ ] Mata Kuliah        │ Device ID: dev_xyz789 (Android 14)     | Severity: HIGH 🟠  │
│ [ ] Mahasiswa          │ ┌─────────────────────────────────────────────────────────┐ │
│ [ ] Bank Soal          │ │ Waktu    │ Jenis Pelanggaran   │ Severity │ Respon / Sanksi     │ │
│ [ ] Buat Ujian         │ ├──────────┼─────────────────────┼──────────┼─────────────────────┤ │
│ [ ] Jadwal Ujian       │ │ 08:15:20 │ SCREENSHOT_ATTEMPT  │ Medium   │ Warning Popup (P1)  │ │
│ [▶] Live Monitor       │ │ 08:42:15 │ APP_SWITCH_EXTENDED │ High     │ Layar Blur 60s (P2) │ │
│ [ ] Koreksi Nilai      │ │ 08:43:20 │ Text Copy Attempt   │ Low      │ Intersepted & Block │ │
│ [ ] Rekap Nilai        │ └──────────┴─────────────────────┴──────────┴─────────────────────┘ │
│ [ ] Laporan Integritas │                                                             │
│ [ ] Pengaturan Sistem  │ Bukti Gambar Tambahan:                                      │
│ [ ] Profil & Keamanan  │ ┌──────────────────────┐  Catatan Pengawas:                 │
│                        │ │ SCREENSHOT BLOCKED   │  ⟨ Mahasiswa terdeteksi membuka  ⟩│
│ ────────────────────── │ │ (Protected by App)   │  ⟨ aplikasi catatan eksternal.   ⟩│
│ [ Keluar ]             │ └──────────────────────┘  [ Simpan Catatan Audit ]          │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Identitas Detail Profil Mahasiswa dan sidik perangkat (Device ID & OS Version).
- Tabel Kronologi Pelanggaran: Waktu deteksi, Jenis Pelanggaran, Severity Level, dan respon otomatis sistem.
- Bukti Gambar: Status screenshot yang ditangkap (biasanya ter-block hitam oleh FLAG_SECURE).
- Input Komentar Dosen/Pengawas sebagai bukti berkas sidang integritas akademik FEB.

---

## SCR-W10 — Penilaian & Koreksi

Layar bagi dosen untuk mengoreksi jawaban esai mahasiswa, memasukkan nilai per nomor soal, memberikan komentar feedback, dan memfinalisasi nilai UAS.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:38 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ PENILAIAN JAWABAN UJIAN                                     │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ Ujian: ⟨ UAS Akuntansi Manajemen (AKT301)               [v] ⟩│
│ [ ] Mata Kuliah        │ Pilih Mahasiswa: ⟨ Ahmad Fauzi (NIM: 2024010001)        [v] ⟩│
│ [ ] Mahasiswa          │ Status: BELUM DINILAI | Pelanggaran: 2 Kali                 │
│ [ ] Bank Soal          │ ┌─────────────────────────────────────────────────────────┐ │
│ [ ] Buat Ujian         │ │ PERTANYAAN 1: Jelaskan perbedaan ABC Costing vs Tradisional!│ │
│ [ ] Jadwal Ujian       │ ├─────────────────────────────────────────────────────────┤ │
│ [ ] Live Monitor       │ │ JAWABAN MAHASISWA:                                      │ │
│ [▶] Koreksi Nilai      │ │ ABC Costing melacak biaya overhead berdasarkan aktivitas│ │
│ [ ] Rekap Nilai        │ │ yang mengonsumsi sumber daya, sedangkan metode          │ │
│ [ ] Laporan Integritas │ │ tradisional membaginya berdasarkan jam kerja langsung...│ │
│ [ ] Pengaturan Sistem  │ └─────────────────────────────────────────────────────────┘ │
│ [ ] Profil & Keamanan  │                                                             │
│                        │ Input Nilai Soal 1 (Maks: 20):  ⟨ 18 ⟩                      │
│ ────────────────────── │ Feedback Soal 1: ⟨ Penjelasan sangat baik dan tepat. ⟩      │
│ [ Keluar ]             │                                                             │
│                        │       [ Lewati Soal ]       [ SIMPAN & LANJUTKAN NILAI ]    │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Dropdown Pemilihan Ujian dan Mahasiswa.
- Status penyelesaian koreksi & jumlah pelanggaran mahasiswa bersangkutan selama ujian sebagai pertimbangan subjektif dosen.
- Panel Jawaban: Menampilkan Soal Asli dan Jawaban Esai lengkap yang diketik mahasiswa (Keyboard native).
- Kontrol Nilai: Input Angka Nilai dan Teks Catatan Feedback dosen per butir soal.
- Tombol Navigasi: Beralih ke soal berikutnya atau langsung menyimpan nilai total.

---

# 📊 ANALISIS, REPORTING, & SETTING

---

## SCR-W11 — Rekapitulasi Nilai

Layar untuk mengekspor rekapitulasi nilai mahasiswa ke format Excel/PDF serta menampilkan analisis statistik dasar seperti mean, median, dan grafik sebaran nilai.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:39 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ REKAPITULASI NILAI MAHASISWA                                │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ Ujian: ⟨ UAS Akuntansi Manajemen (AKT301)               [v] ⟩│
│ [ ] Mata Kuliah        │ [📥 Ekspor Excel (.xlsx)]  [📥 Ekspor PDF]                  │
│ [ ] Mahasiswa          │ ┌─────────────────────────────────────────────────────────┐ │
│ [ ] Bank Soal          │ │ NIM        │ Nama Mahasiswa   │ Bobot Ujian │ Skor Akhir│ Status│ │
│ [ ] Buat Ujian         │ ├──────────┼──────────────────┼─────────────┼───────────┼───────┤ │
│ [ ] Jadwal Ujian       │ │2024010001│ Ahmad Fauzi      │ 100         │ 85        │ Lulus │ │
│ [ ] Live Monitor       │ │2024010002│ Budi Hartono     │ 100         │ 72        │ Lulus │ │
│ [ ] Koreksi Nilai      │ │2024010005│ Citra Lestari    │ 100         │ 45        │ Her   │ │
│ [▶] Rekap Nilai        │ └──────────┴──────────────────┴─────────────┴───────────┴───────┘ │
│ [ ] Laporan Integritas │                                                             │
│ [ ] Pengaturan Sistem  │ STATISTIK KELAS:                                            │
│ [ ] Profil & Keamanan  │ Rata-rata: 74.5   | Median: 76.0   | Tertinggi: 95 | Terendah: 40│
│                        │ Distribusi Nilai:                                           │
│ ────────────────────── │ [A: ████ 20%]  [B: ████████ 50%]  [C: ██ 15%]  [D/E: ██ 15%]│
│ [ Keluar ]             │                                                             │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Dropdown Filter Ujian Mata Kuliah.
- Tombol Ekspor Data ke Excel/PDF.
- Tabel Nilai Akhir: NIM, Nama, Bobot Ujian, Skor Akhir hasil koreksi dosen, dan Status Kelulusan.
- Statistik Ringkasan: Perhitungan otomatis Nilai Rata-rata, Nilai Tengah, Nilai Maksimal, dan Nilai Minimal.
- Bar Chart ASCII: Visualisasi persentase sebaran nilai A/B/C/D/E mahasiswa satu kelas.

---

## SCR-W12 — Laporan Integritas Ujian

Laporan analitik tingkat tinggi bagi Dekan/Kaprodi untuk meninjau efektivitas keamanan ujian dan daftar mahasiswa dengan indikasi kecurangan berulang.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:40 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ LAPORAN INTEGRITAS AKADEMIK                                 │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ Filter Semester: ⟨ Genap 2025/2026 [v] ⟩   [Cetak Dokumen]   │
│ [ ] Mata Kuliah        │                                                             │
│ [ ] Mahasiswa          │ STATISTIK PELANGGARAN SEMESTER INI:                         │
│ [ ] Bank Soal          │ Total Ujian Berlangsung: 42   | Total Pelanggaran: 84 Kali  │
│ [ ] Buat Ujian         │ Jenis Pelanggaran Terbanyak:                                │
│ [ ] Jadwal Ujian       │ 1. APP_SWITCH_EXTENDED (40%)  2. SCREENSHOT_ATTEMPT (35%)   │
│ [ ] Live Monitor       │                                                             │
│ [ ] Koreksi Nilai      │ DAFTAR MAHASISWA FLAGGED (Pelanggaran Berulang/Sanksi Merah) │
│ [ ] Rekap Nilai        │ ┌─────────────────────────────────────────────────────────┐ │
│ [▶] Laporan Integritas │ │ NIM        │ Nama Mahasiswa   │ Total Pelanggaran │ Sanksi│ │
│ [ ] Pengaturan Sistem  │ ├──────────┼──────────────────┼───────────────────┼───────┤ │
│ [ ] Profil & Keamanan  │ │2024010012│ Dian Pratama     │ 6 Pelanggaran     │ Merah │ │
│                        │ │2024010045│ Fajar Subakti    │ 4 Pelanggaran     │ Merah │ │
│ ────────────────────── │ └──────────┴──────────────────┴───────────────────┴───────┘ │
│ [ Keluar ]             │ Tindakan Lanjut: < Kirim Rekomendasi Sidang Kode Etik >     │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Filter periode akademik.
- Statistik Pelanggaran Semester: Menampilkan sebaran data jenis kecurangan mahasiswa terbanyak.
- Daftar Mahasiswa Flagged (Daftar Hitam): Mahasiswa yang sering memicu peringatan merah (Hukuman 3) lintas mata kuliah untuk ditindaklanjuti secara administratif.
- Action Link: Cetak dokumen fisik untuk sidang kode etik mahasiswa.

---

## SCR-W13 — Pengaturan Sistem

Konfigurasi parameter global yang akan diterapkan pada seluruh sistem ujian, mulai dari setup geofence kampus FEB, daftar SSID WiFi resmi, hingga manajemen akun admin.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:41 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ PENGATURAN KONTROL SISTEM GLOBAL                            │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ KONEKTIVITAS & GEOFENCE KAMPUS FEB UNSAP:                   │
│ [ ] Mata Kuliah        │ Koordinat Pusat Geofence: Lat: ⟨ -6.8735 ⟩ Lng: ⟨ 107.5425 ⟩│
│ [ ] Mahasiswa          │ Radius Wilayah Ujian:     ⟨ 200  ⟩ meter                    │
│ [ ] Bank Soal          │ SSID WiFi Kampus Resmi:   ⟨ FEB-UNSAP ⟩, ⟨ UNSAP-NET ⟩      │
│ [ ] Buat Ujian         │ IP Range Kampus Resmi:    ⟨ 192.168.1.0/24 ⟩                │
│ [ ] Jadwal Ujian       │                                                             │
│ [ ] Live Monitor       │ PARAMETER APP DEFAULT:                                      │
│ [ ] Koreksi Nilai      │ Batas Toleransi Pelanggaran Default: ⟨ 3 ⟩ kali             │
│ [ ] Rekap Nilai        │ Durasi Sanksi Blur Default:          ⟨ 60⟩ detik            │
│ [ ] Laporan Integritas │ Interval Heartbeat Perangkat Mobile: ⟨ 10⟩ detik            │
│ [▶] Pengaturan Sistem  │ Versi Minimum Aplikasi Android:      ⟨ 1.0.0 ⟩              │
│ [ ] Profil & Keamanan  │                                                             │
│                        │ [ SIMPAN PENGATURAN GLOBAL ]  < Reset ke Default Pabrik >   │
│ ────────────────────── │                                                             │
│ [ Keluar ]             │                                                             │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Input Konfigurasi Geofencing & Koordinat Pusat FEB UNSAP.
- Input Setup Jaringan WiFi Kampus Resmi (SSID & IP Address Range) untuk menyaring pengerjaan dari luar internet kampus.
- Konfigurasi parameter backend (Default timeouts, heartbeat interval, validasi minimum app version).
- Tombol Simpan Pengaturan Global.

---

## SCR-W14 — Profil & Keamanan

Halaman bagi Dosen/Pengawas/Admin untuk mengelola akun pribadi, mengubah kata sandi, mengaktifkan 2FA (Two-Factor Authentication), dan melihat riwayat log akses akun.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FEB UNSAP EXAM PORTAL                      Server: 15 Jun 2026, 09:42 WIB | Dr. Siti [v] │
├────────────────────────┬─────────────────────────────────────────────────────────────┤
│ MENU UTAMA             │ PENGATURAN PROFIL & KEAMANAN AKUN                           │
├────────────────────────┼─────────────────────────────────────────────────────────────┤
│ [ ] Dashboard          │ NIDN/NIP Dosen: 0415058701                                  │
│ [ ] Mata Kuliah        │ Nama Lengkap:   Dr. Siti Aminah                             │
│ [ ] Email Aktif:    siti.aminah@unsap.ac.id                     │
│ [ ] Hak Akses Role: Dosen, Pengawas                             │
│ [ ] Buat Ujian         │                                                             │
│ [ ] Jadwal Ujian       │ KEAMANAN AKUN:                                              │
│ [ ] Live Monitor       │ Kata Sandi Lama: ⟨ ************ ⟩                           │
│ [ ] Koreksi Nilai      │ Kata Sandi Baru: ⟨ ************ ⟩                           │
│ [ ] Rekap Nilai        │                                                             │
│ [ ] Laporan Integritas │ ☑ Aktifkan 2-Factor Authentication (2FA) via Google Authent.│
│ [ ] Pengaturan Sistem  │                                                             │
│ [▶] Profil & Keamanan  │ LOG AKTIVITAS LOGIN TERAKHIR:                               │
│                        │ - 15 Jun 2026 08:00 WIB | IP: 10.10.2.45 | Browser: Chrome  │
│ ────────────────────── │ - 14 Jun 2026 14:20 WIB | IP: 10.10.2.45 | Browser: Chrome  │
│ [ Keluar ]             │                                                             │
│                        │ [ PERBARUI PROFIL & SANDI ]                                 │
└────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Komponen Utama:**
- Tampilan detail read-only data dosen / admin aktif.
- Form ubah password lama dan password baru.
- Checkbox aktivasi Two-Factor Authentication (2FA) untuk mengamankan kebocoran password dosen.
- Tabel Log Aktivitas Login Terakhir untuk melacak bila ada pihak lain menyusup ke portal dosen.
