# UNSAP Mobile Exam (Android)

Aplikasi Android khusus untuk mahasiswa Universitas Sebelas April (UNSAP) dalam melaksanakan ujian secara *mobile*. Aplikasi ini dikembangkan menggunakan **Flutter** dengan tampilan UI yang premium, bersih, dan modern.

---

## 🚀 Cara Menjalankan Proyek (Untuk Developer)

1. Pastikan Anda telah menginstal **Flutter SDK** dan **Android Studio** (beserta Android SDK).
2. Buka folder proyek ini di terminal:
   ```bash
   cd project_mobile_feb
   ```
3. Ambil seluruh dependensi:
   ```bash
   flutter pub get
   ```
4. Jalankan aplikasi di Emulator atau Perangkat Asli (via kabel USB/Debugging):
   ```bash
   flutter run
   ```

---

## 🛠️ Panduan Untuk Tim Backend (Integrasi API)

Aplikasi saat ini telah memiliki *flow* halaman yang lengkap (Mulai dari Login, Dashboard, Riwayat, hingga Layar Ujian interaktif), namun masih menggunakan **Data Dummy** yang berada di dalam folder `lib/model/exam_model.dart`.

Berikut area utama untuk integrasi API:

### 1. Sistem Autentikasi (Login)
- **Lokasi File:** `lib/feature/auth/login_screen.dart`
- **Tugas Backend:** Ubah fungsi aksi pada tombol "Masuk" untuk melakukan HTTP POST ke _endpoint_ `/login`. Berikan *response* berupa token (misal: JWT) dan simpan menggunakan `shared_preferences` atau *secure storage*.

### 2. Pengambilan Data Jadwal Ujian
- **Lokasi File:** `lib/feature/dashboard/ujian_page.dart` & `lib/feature/dashboard/dashboard_screen.dart`
- **Tugas Backend:** Buat fungsi *fetch* ke _endpoint_ jadwal ujian mahasiswa berdasarkan parameter (Prodi, Semester, Kelas). Gantikan `dummyExams` yang saat ini dipakai dengan data JSON dari server.

### 3. Eksekusi Ujian (Ambil Soal & Kumpulkan)
- **Lokasi File:** `lib/feature/exam/exam_screen.dart`
- **Tugas Backend:** 
  1. *Fetch* daftar soal (Pilihan Ganda / Esai) saat halaman Ujian dimuat.
  2. Implementasikan *Auto-Save* (Simpan Otomatis) setiap beberapa detik agar jawaban mahasiswa yang sedang diketik aman di server.
  3. Hubungkan *Action* tombol **Kumpulkan** (di `_showSubmitModal`) agar melakukan HTTP POST hasil ujian ke server dan kembali ke Dashboard.

### 4. Riwayat & Nilai
- **Lokasi File:** `lib/feature/dashboard/riwayat_page.dart`
- **Tugas Backend:** Hubungkan data list riwayat ujian dan angka rata-rata dengan API penilaian server.

---

## 📁 Struktur Folder Utama
- `lib/feature/auth/` : Berisi halaman Splash Screen, Login, dan Keamanan.
- `lib/feature/dashboard/` : Navigasi utama mahasiswa (Home, Ujian Terfilter, Riwayat, Profil).
- `lib/feature/exam/` : Layar eksekusi ujian (termasuk fitur mode aman / kiosk-like).
- `lib/model/` : Berisi model data (sementara menampung *dummy data*).
