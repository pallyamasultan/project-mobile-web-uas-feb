# UNSAP Mobile Exam System (Master Repository)

Selamat datang di *repository* utama Sistem Ujian Mahasiswa Universitas Sebelas April (UNSAP). *Repository* ini bersifat *monorepo* (berisi beberapa proyek yang saling berkaitan dalam satu wadah). 

Sistem ini dirancang untuk menangani ujian berskala besar secara *mobile* maupun *web*, dengan tingkat keamanan tinggi untuk meminimalisasi kecurangan, serta dikelola langsung secara terpusat oleh pihak akademik/dosen.

---

## 🏗️ Arsitektur Proyek

Di dalam folder ini, terdapat **3 sub-proyek utama** yang menangani *platform* berbeda:

### 1. 📱 `project_mobile_feb` (Aplikasi Android)
Ini adalah aplikasi utama (Klien) bagi para mahasiswa pengguna perangkat Android.
- **Teknologi:** Flutter / Dart
- **Fungsi Utama:** Melakukan proses ujian (Menjawab soal ganda/esai), melihat jadwal ujian, dan mengecek riwayat nilai.
- **Status Integrasi:** Perlu disambungkan ke API Backend. Silakan baca panduan lengkapnya di [project_mobile_feb/README.md](./project_mobile_feb/README.md).

### 2. 🌐 `web_exam_ios` (Web App iOS / Safe Exam Browser)
Ini adalah *Single Page Application* khusus bagi mahasiswa yang tidak menggunakan Android (seperti pengguna iPhone/iOS atau yang menggunakan komputer dengan *Safe Exam Browser*).
- **Teknologi:** HTML, CSS, Vanilla JS (dikompilasi dengan Vite)
- **Fungsi Utama:** Tampilan dan fitur logikanya dijamin **100% sama dengan aplikasi Android**, khusus disesuaikan agar super ringan dan stabil di browser.
- **Status Integrasi:** Perlu disambungkan ke API Backend. Silakan baca panduan lengkapnya di [web_exam_ios/README.md](./web_exam_ios/README.md).

### 3. 💻 `admin_dashboard` (Web Admin Panel)
Portal kendali utama bagi pihak kampus (Dosen & Admin).
- **Teknologi:** Vite / React Modern Frontend
- **Fungsi Utama:** Digunakan oleh dosen untuk mengunggah soal ujian, mengatur jadwal (Prodi, Semester, Ruang), memberikan kode pengawas, dan menilai hasil ujian secara _real-time_.
- **Status Integrasi:** Menjadi portal utama pengolahan CRUD data ujian. Silakan baca panduan lengkapnya di [admin_dashboard/README.md](./admin_dashboard/README.md).

---

## 🤝 Panduan Kolaborasi Tim (Workflow)

Jika Anda baru bergabung ke proyek ini (khususnya **Tim Backend**), silakan ikuti *workflow* berikut:
1. Pahami arsitektur masing-masing klien melalui file `README.md` yang ada di dalam masing-masing folder proyek di atas.
2. Semua antarmuka (UI) dan alur (Flow) saat ini sudah selesai dibuat oleh *Tim Frontend* dan sementara berjalan menggunakan **Data Dummy (simulasi)** di sisi klien.
3. **Tugas Anda:** 
   - Rancang struktur Database dan API RESTful/GraphQL Anda.
   - Masuk ke setiap proyek (`project_mobile_feb`, `web_exam_ios`, dan `admin_dashboard`), temukan fungsi di mana *Dummy Data* tersebut dipanggil, dan gantilah dengan Request HTTP ke API Anda.
4. Pastikan Anda melakukan `git pull` setiap akan mulai bekerja dan buat *branch* terpisah jika perlu untuk menghindari konflik.

Selamat bekerja sama untuk menyempurnakan Sistem Ujian UNSAP!
