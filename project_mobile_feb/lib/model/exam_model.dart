class ExamModel {
  final String id;
  final String subject;
  final String code;
  final String date;
  final String time;
  final String room;
  final String status; // BERLANGSUNG, TERLAMBAT, BELUM DIMULAI, SELESAI
  final String prodi; // Akuntansi, Manajemen
  final String semester;
  final String kelas;

  ExamModel({
    required this.id,
    required this.subject,
    required this.code,
    required this.date,
    required this.time,
    required this.room,
    required this.status,
    required this.prodi,
    required this.semester,
    required this.kelas,
  });
}

final List<ExamModel> dummyExams = [
  // AKUNTANSI SEMESTER 4 REGULER A
  ExamModel(
    id: 'A1',
    subject: 'Akuntansi Manajemen',
    code: 'AKT301',
    date: 'Hari Ini',
    time: '08:00 – 10:00 WIB',
    room: 'Ruang A101',
    status: 'TERLAMBAT',
    prodi: 'Akuntansi',
    semester: 'Semester 4',
    kelas: 'Reguler A',
  ),
  ExamModel(
    id: 'A2',
    subject: 'Statistika Bisnis',
    code: 'STB202',
    date: 'Hari Ini',
    time: '10:00 – 12:00 WIB',
    room: 'Ruang A101',
    status: 'BERLANGSUNG',
    prodi: 'Akuntansi',
    semester: 'Semester 4',
    kelas: 'Reguler A',
  ),
  ExamModel(
    id: 'A3',
    subject: 'Ekonomi Mikro',
    code: 'EKM201',
    date: 'Hari Ini',
    time: '13:00 – 14:30 WIB',
    room: 'Ruang A102',
    status: 'BELUM DIMULAI',
    prodi: 'Akuntansi',
    semester: 'Semester 4',
    kelas: 'Reguler A',
  ),
  ExamModel(
    id: 'A4',
    subject: 'Akuntansi Keuangan Menengah',
    code: 'AKT303',
    date: 'Besok',
    time: '08:00 – 10:00 WIB',
    room: 'Ruang A101',
    status: 'BELUM DIMULAI',
    prodi: 'Akuntansi',
    semester: 'Semester 4',
    kelas: 'Reguler A',
  ),

  // AKUNTANSI SEMESTER 4 REGULER B
  ExamModel(
    id: 'A5',
    subject: 'Akuntansi Manajemen',
    code: 'AKT301',
    date: 'Hari Ini',
    time: '10:00 – 12:00 WIB',
    room: 'Ruang B201',
    status: 'BERLANGSUNG',
    prodi: 'Akuntansi',
    semester: 'Semester 4',
    kelas: 'Reguler B',
  ),
  ExamModel(
    id: 'A6',
    subject: 'Statistika Bisnis',
    code: 'STB202',
    date: 'Hari Ini',
    time: '13:00 – 15:00 WIB',
    room: 'Ruang B201',
    status: 'BELUM DIMULAI',
    prodi: 'Akuntansi',
    semester: 'Semester 4',
    kelas: 'Reguler B',
  ),

  // MANAJEMEN SEMESTER 2 KARYAWAN
  ExamModel(
    id: 'M1',
    subject: 'Pengantar Manajemen',
    code: 'MNJ101',
    date: 'Hari Ini',
    time: '18:00 – 20:00 WIB',
    room: 'Ruang K301',
    status: 'BELUM DIMULAI',
    prodi: 'Manajemen',
    semester: 'Semester 2',
    kelas: 'Karyawan',
  ),
  ExamModel(
    id: 'M2',
    subject: 'Matematika Ekonomi',
    code: 'MTE101',
    date: 'Hari Ini',
    time: '20:00 – 21:30 WIB',
    room: 'Ruang K301',
    status: 'BELUM DIMULAI',
    prodi: 'Manajemen',
    semester: 'Semester 2',
    kelas: 'Karyawan',
  ),

  // MANAJEMEN SEMESTER 6 REGULER A
  ExamModel(
    id: 'M3',
    subject: 'Manajemen Strategi',
    code: 'MNJ501',
    date: 'Hari Ini',
    time: '08:00 – 10:00 WIB',
    room: 'Ruang C105',
    status: 'TERLAMBAT',
    prodi: 'Manajemen',
    semester: 'Semester 6',
    kelas: 'Reguler A',
  ),
  ExamModel(
    id: 'M4',
    subject: 'Metode Penelitian Bisnis',
    code: 'MPB502',
    date: 'Hari Ini',
    time: '10:30 – 12:30 WIB',
    room: 'Ruang C105',
    status: 'BERLANGSUNG',
    prodi: 'Manajemen',
    semester: 'Semester 6',
    kelas: 'Reguler A',
  ),
];
