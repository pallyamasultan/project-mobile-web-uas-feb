# UNSAP Admin Dashboard

Dashboard ini dibuat khusus untuk admin kampus dan dosen untuk memantau, mengelola, dan menilai hasil ujian mahasiswa secara *real-time*. Proyek ini dibangun menggunakan **Vite** dan ekosistem modern web frontend.

---

## 🚀 Cara Menjalankan Proyek (Untuk Developer)

1. Buka folder proyek ini di terminal:
   ```bash
   cd admin_dashboard
   ```
2. Pastikan `pnpm` atau `npm` sudah terinstal. Install seluruh dependensinya:
   ```bash
   npm install
   # Atau jika menggunakan pnpm: pnpm install
   ```
3. Jalankan *development server*:
   ```bash
   npm run dev
   # Atau: pnpm dev
   ```
4. Buka URL yang diberikan di browser Anda (biasanya `http://localhost:5173` atau port lain).

---

## 🛠️ Panduan Untuk Tim Backend (Integrasi API)

Sistem administrasi ini adalah pusat kendali dari kedua aplikasi mahasiswa (Android & iOS). Pastikan _Endpoint_ yang digunakan di sini selaras dengan database pusat.

Berikut area utama integrasi untuk Admin:

### 1. Manajemen Soal & Jadwal Ujian
- Dashboard ini memiliki fitur untuk membuat dan mengatur jadwal ujian baru.
- **Tugas Backend:** Sediakan *Endpoint* CRUD (*Create, Read, Update, Delete*) untuk Jadwal Ujian, lengkap dengan relasinya ke Program Studi, Semester, Kelas, dan Ruangan.

### 2. Monitoring Status Ujian (Real-time)
- Admin perlu melihat status ujian yang sedang berlangsung (jumlah mahasiswa yang mengerjakan, selesai, atau telat).
- **Tugas Backend:** Disarankan menggunakan **WebSockets** (seperti Socket.io) atau *polling API* agar data jumlah peserta yang ikut ujian bisa *update* secara *real-time* tanpa perlu _refresh_ halaman.

### 3. Penilaian & Riwayat Mahasiswa
- Fitur bagi dosen untuk mengecek esai dan memasukkan nilai, atau sistem otomatis untuk pilihan ganda.
- **Tugas Backend:** Sediakan *Endpoint* untuk memanipulasi *Score/Grades* yang kemudian datanya dikonsumsi oleh aplikasi mahasiswa (di Tab Riwayat).

---

## 📁 Struktur Konfigurasi
Proyek ini menggunakan beberapa file konfigurasi bawaan ekosistem modern seperti `vite.config.ts`, `postcss.config.mjs`, dan lainnya yang mengatur jalur *build* untuk produksi. Jika ingin di-*deploy* ke server *cloud* (seperti Vercel / Nginx), jalankan:
```bash
npm run build
```
Lalu arahkan server ke folder hasil _build_ (biasanya bernama `dist`).