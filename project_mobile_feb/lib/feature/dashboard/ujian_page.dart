import 'package:flutter/material.dart';
import '../exam/late_entry_screen.dart';
import '../exam/exam_screen.dart';
import '../../model/exam_model.dart';
import '../exam/exam_screen.dart';

class UjianPage extends StatefulWidget {
  final String? prodi;
  final String? semester;
  final String? kelas;

  const UjianPage({super.key, this.prodi, this.semester, this.kelas});

  @override
  State<UjianPage> createState() => _UjianPageState();
}

class _UjianPageState extends State<UjianPage> {
  String _filter = 'Semua';

  @override
  Widget build(BuildContext context) {
    List<ExamModel> filteredExams = dummyExams.where((e) {
      if (widget.prodi != null && e.prodi != widget.prodi) return false;
      if (widget.semester != null && e.semester != widget.semester)
        return false;
      if (widget.kelas != null && e.kelas != widget.kelas) return false;
      return true;
    }).toList();

    int berlangsung = filteredExams
        .where((e) => e.status == 'BERLANGSUNG' || e.status == 'TERLAMBAT')
        .length;
    int belum = filteredExams.where((e) => e.status == 'BELUM DIMULAI').length;
    int selesai = filteredExams.where((e) => e.status == 'SELESAI').length;

    return Column(
      children: [
        // Header
        Container(
          padding: const EdgeInsets.all(16),
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [Color(0xFF0B1E3D), Color(0xFF162D52)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (widget.prodi != null ||
                  widget.semester != null ||
                  widget.kelas != null)
                Text(
                  '${widget.prodi ?? ''} ${widget.prodi != null ? '·' : ''} ${widget.semester ?? ''} ${widget.semester != null ? '·' : ''} ${widget.kelas ?? ''}',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.5),
                    fontSize: 11,
                  ),
                )
              else
                Text(
                  'Semua Jadwal Ujian',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.5),
                    fontSize: 11,
                  ),
                ),
              const SizedBox(height: 2),
              const Text(
                '📋 Daftar Ujian',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  _buildStatChip(
                    'Berlangsung',
                    '$berlangsung',
                    const Color(0xFF22C55E),
                  ),
                  const SizedBox(width: 8),
                  _buildStatChip('Menunggu', '$belum', const Color(0xFFF59E0B)),
                  const SizedBox(width: 8),
                  _buildStatChip(
                    'Selesai',
                    '$selesai',
                    const Color(0xFF60A5FA),
                  ),
                ],
              ),
            ],
          ),
        ),

        // Filters
        Container(
          height: 50,
          color: Colors.white,
          child: ListView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            children: [
              _buildFilterChip('Semua'),
              _buildFilterChip('Hari Ini'),
              _buildFilterChip('Mendatang'),
              _buildFilterChip('Selesai'),
            ],
          ),
        ),

        // List
        Expanded(
          child: filteredExams.isEmpty
              ? const Center(
                  child: Text(
                    'Tidak ada ujian untuk jadwal ini.',
                    style: TextStyle(color: Colors.grey),
                  ),
                )
              : ListView(
                  padding: const EdgeInsets.all(16),
                  children: filteredExams.map((e) {
                    Color statusColor = e.status == 'TERLAMBAT'
                        ? const Color(0xFFEF4444)
                        : e.status == 'BERLANGSUNG'
                        ? const Color(0xFF22C55E)
                        : const Color(0xFFF59E0B);
                    return _buildUjianCard(
                      context,
                      e,
                      statusColor,
                      isLate: e.status == 'TERLAMBAT',
                    );
                  }).toList(),
                ),
        ),
      ],
    );
  }

  Widget _buildStatChip(String label, String val, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.08),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
      ),
      child: Row(
        children: [
          Container(
            width: 6,
            height: 6,
            decoration: BoxDecoration(color: color, shape: BoxShape.circle),
          ),
          const SizedBox(width: 6),
          Text(
            '$val ',
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 11,
            ),
          ),
          Text(
            label,
            style: TextStyle(
              color: Colors.white.withOpacity(0.7),
              fontSize: 11,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label) {
    bool active = _filter == label;
    return GestureDetector(
      onTap: () => setState(() => _filter = label),
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        decoration: BoxDecoration(
          color: active ? const Color(0xFF0B1E3D) : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Center(
          child: Text(
            label,
            style: TextStyle(
              color: active ? const Color(0xFFF5C518) : const Color(0xFF94A3B8),
              fontWeight: active ? FontWeight.bold : FontWeight.normal,
              fontSize: 12,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildUjianCard(
    BuildContext context,
    ExamModel exam,
    Color statusColor, {
    bool isLate = false,
  }) {
    bool isBerlangsung =
        exam.status == 'BERLANGSUNG' || exam.status == 'TERLAMBAT';
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: const [
          BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2)),
        ],
        border: Border.all(color: const Color(0xFFF1F5F9)),
      ),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: statusColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Center(
                    child: Text(
                      exam.date == 'Hari Ini' ? 'H-0' : 'H-1',
                      style: TextStyle(
                        color: statusColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              exam.subject,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 14,
                              ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: statusColor.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              exam.status,
                              style: TextStyle(
                                color: statusColor,
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${exam.code} · 3 SKS',
                        style: const TextStyle(
                          color: Color(0xFF94A3B8),
                          fontSize: 11,
                        ),
                      ),
                      const SizedBox(height: 8),

                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF8FAFC),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: const Color(0xFFE2E8F0)),
                        ),
                        child: Row(
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      const Icon(
                                        Icons.business_center,
                                        size: 10,
                                        color: Color(0xFF475569),
                                      ),
                                      const SizedBox(width: 4),
                                      Expanded(
                                        child: Text(
                                          '${exam.prodi} · ${exam.semester}',
                                          style: const TextStyle(
                                            fontSize: 10,
                                            color: Color(0xFF334155),
                                          ),
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 4),
                                  Row(
                                    children: [
                                      const Icon(
                                        Icons.meeting_room,
                                        size: 10,
                                        color: Color(0xFF475569),
                                      ),
                                      const SizedBox(width: 4),
                                      Expanded(
                                        child: Text(
                                          '${exam.kelas} | Ruang: ${exam.room}',
                                          style: const TextStyle(
                                            fontSize: 10,
                                            color: Color(0xFF334155),
                                            fontWeight: FontWeight.w600,
                                          ),
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            Container(
                              width: 1,
                              height: 24,
                              color: const Color(0xFFCBD5E1),
                              margin: const EdgeInsets.symmetric(horizontal: 8),
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Row(
                                  children: [
                                    Icon(
                                      Icons.access_time,
                                      size: 10,
                                      color: Color(0xFF475569),
                                    ),
                                    SizedBox(width: 4),
                                    Text(
                                      'Jam Ujian',
                                      style: TextStyle(
                                        fontSize: 9,
                                        color: Color(0xFF64748B),
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  exam.time,
                                  style: const TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFF0F172A),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          if (isBerlangsung) ...[
            if (isLate) ...[
              const SizedBox(height: 16),
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.red.withOpacity(0.08),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.red.withOpacity(0.2)),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.lock_outline, color: Colors.red, size: 16),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Akses Dikunci — Terlambat 18 menit',
                            style: TextStyle(
                              color: Colors.red,
                              fontWeight: FontWeight.bold,
                              fontSize: 11,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            'Diperlukan kode dari pengawas untuk masuk.',
                            style: TextStyle(color: Colors.red, fontSize: 11),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
              child: ElevatedButton(
                onPressed: () {
                  if (isLate) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => LateEntryScreen(
                          onBack: () => Navigator.pop(context),
                          onEnter: () {
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                builder: (context) => ExamScreen(
                                  onBack: () {
                                    Navigator.of(
                                      context,
                                    ).popUntil((route) => route.isFirst);
                                  },
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                    );
                  } else {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ExamScreen(
                          onBack: () {
                            Navigator.of(
                              context,
                            ).popUntil((route) => route.isFirst);
                          },
                        ),
                      ),
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: isLate
                      ? const Color(0xFF991B1B)
                      : const Color(0xFF0B1E3D),
                  minimumSize: const Size(double.infinity, 44),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  padding: EdgeInsets.zero,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      isLate ? Icons.lock_outline : Icons.lock_open,
                      color: isLate ? Colors.white : const Color(0xFFF5C518),
                      size: 16,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      isLate ? 'Gunakan Kode Pengawas' : 'MULAI UJIAN',
                      style: TextStyle(
                        color: isLate ? Colors.white : const Color(0xFFF5C518),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
