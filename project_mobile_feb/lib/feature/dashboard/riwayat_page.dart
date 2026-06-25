import 'package:flutter/material.dart';
import '../widget/diagonal_pill.dart';

class RiwayatPage extends StatefulWidget {
  const RiwayatPage({super.key});

  @override
  State<RiwayatPage> createState() => _RiwayatPageState();
}

class _RiwayatPageState extends State<RiwayatPage> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Background Header
        Container(
          height: 240,
          width: double.infinity,
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
          decoration: const BoxDecoration(
            borderRadius: BorderRadius.vertical(bottom: Radius.circular(30)),
            gradient: LinearGradient(
              colors: [Color(0xFF090722), Color(0xFFEE9108)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Stack(
            children: [
              const DiagonalPill(width: 150, height: 30, top: -10, left: -20),
              const DiagonalPill(width: 250, height: 50, top: 80, left: 200),
              SafeArea(
                bottom: false,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Pallyama Sultan · 2024010001',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.5),
                        fontSize: 11,
                      ),
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      '📊 Riwayat Ujian',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 17,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),

        // Main Content
        SafeArea(
          child: Column(
            children: [
              const SizedBox(height: 90), // Spacer below header content
              
              // Summary Bar (Floating Card style)
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 20),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 10,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    _buildSummaryStat(
                      'Rata-rata',
                      '78',
                      'nilai',
                      const Color(0xFF16A34A),
                    ),
                    const SizedBox(width: 8),
                    _buildSummaryStat(
                      'Terkumpul',
                      '4',
                      'ujian',
                      const Color(0xFFEE9108),
                    ),
                    const SizedBox(width: 8),
                    _buildSummaryStat(
                      'Bersih',
                      '2',
                      'tanpa pelanggaran',
                      const Color(0xFF3B82F6),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // List (Simplified for now)
        Expanded(
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _buildRiwayatCard(
                'Akuntansi Manajemen',
                'AKT301',
                '14 Juni 2026',
                'TERKUMPUL',
                0,
                78,
              ),
              _buildRiwayatCard(
                'Statistika Bisnis',
                'STB202',
                '12 Juni 2026',
                'TERKUMPUL',
                0,
                85,
              ),
            ],
          ),
        ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSummaryStat(String label, String val, String sub, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFFF1F5F9)),
        ),
        child: Column(
          children: [
            Text(
              val,
              style: TextStyle(
                color: color,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 9),
            ),
            Text(
              sub,
              style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 9),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRiwayatCard(
    String subject,
    String code,
    String date,
    String status,
    int violations,
    int score,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFF1F5F9)),
        boxShadow: const [
          BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 1)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 3,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF22C55E), Color(0xFF4ADE80)],
              ),
              borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Score Ring Placeholder
                Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(
                    color: const Color(0xFF22C55E).withOpacity(0.1),
                    shape: BoxShape.circle,
                    border: Border.all(color: const Color(0xFF22C55E)),
                  ),
                  child: Center(
                    child: Text(
                      '$score',
                      style: const TextStyle(
                        color: Color(0xFF16A34A),
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        subject,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                      Text(
                        '$code · Semester 4',
                        style: const TextStyle(
                          color: Color(0xFF94A3B8),
                          fontSize: 10,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          const Icon(
                            Icons.calendar_today,
                            size: 10,
                            color: Color(0xFF94A3B8),
                          ),
                          const SizedBox(width: 4),
                          Text(
                            date,
                            style: const TextStyle(
                              fontSize: 10,
                              color: Color(0xFF475569),
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
    );
  }
}
