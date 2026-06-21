# UNSAP Web Exam (iOS / Safe Exam Browser)

Proyek ini adalah antarmuka web khusus untuk pelaksanaan ujian mahasiswa (khususnya bagi pengguna iOS atau yang menggunakan *Safe Exam Browser*). Aplikasi ini dibangun sebagai **Single Page Application (SPA)** menggunakan murni **Vite, Vanilla HTML, CSS, dan JavaScript** tanpa framework berat, agar meminimalkan beban di browser ujian yang biasanya memiliki limitasi fitur (kiosk mode).

Tampilan dan alur logikanya dibuat 100% selaras dengan versi aplikasi *mobile* Android.

---

## 🚀 Cara Menjalankan Proyek (Untuk Developer Frontend/Backend)

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

1. Buka terminal di dalam folder `web_exam_ios`.
2. Install dependensi (hanya Vite):
   ```bash
   npm install
   ```
3. Jalankan server *development*:
   ```bash
   npm run dev
   ```
4. Buka URL yang tertera di terminal pada browser Anda (biasanya `http://localhost:5173`).

---

## 🛠️ Panduan Untuk Tim Backend

Halo Tim Backend! 👋  
Proyek ini sengaja dibuat semudah mungkin agar integrasi API berjalan cepat. Saat ini, semua data dan aksi pengumpulan tugas hanya menggunakan **data dummy (simulasi)** di dalam file `src/main.js`. 

Berikut adalah area yang perlu Anda hubungkan dengan API / Database Anda:

### 1. Sistem Autentikasi (Login)
Di dalam `src/main.js`, cari fungsi `handleLogin()`. Saat ini fungsi tersebut hanya membaca NIM dan Tanggal Lahir tanpa validasi dari server.
**Tugas Backend:**
- Cegat fungsi tersebut dan lakukan *HTTP POST Request* ke *endpoint* Login Anda.
- Jika berhasil, simpan Token (misal di `localStorage`) lalu jalankan `switchTab('home')` untuk masuk ke Dashboard.

### 2. Pencarian Jadwal (Filter Ujian)
Di dalam `src/main.js`, cari fungsi `window.cariJadwal = (sourceTab) => { ... }`.
Saat ini fungsi hanya memiliki jeda (timeout) selama 500ms lalu menampilkan elemen HTML *hardcoded* (`#home-search-results`).
**Tugas Backend:**
- Buat *endpoint* pencarian yang menerima *parameter* Prodi, Semester, Kelas, dan Ruangan.
- Render *response* JSON tersebut menjadi elemen HTML (DOM) ke dalam area list ujian.

### 3. Simulasi & Pengumpulan Ujian
Di dalam `src/main.js`:
- Fungsi `initExam()` saat ini memuat soal *dummy*. Ganti ini dengan *Request GET* ke soal spesifik.
- Fungsi `window.submitExam = () => { ... }` memunculkan modal dan jika disetujui akan menampilkan _alert()_ "Berhasil".
**Tugas Backend:**
- Ubah fungsi `submitExam()` agar mengirim isi dari `document.getElementById('answer-input').value` (untuk essay) atau status jawaban pilihan ganda ke API Submit Ujian Anda.

---

## 📁 Struktur Folder Utama
- `/index.html` : Struktur utama dari SPA. Memuat semua antarmuka (Login, Dashboard, Modal, Ujian).
- `/src/style.css` : Seluruh rancangan visual, diatur agar identik dengan versi *Mobile App*.
- `/src/main.js` : Mengatur interaksi pengguna, simulasi backend, dan navigasi (Tab SPA).
