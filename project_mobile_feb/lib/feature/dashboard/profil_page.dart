import 'package:flutter/material.dart';
import '../widget/diagonal_pill.dart';

class ProfilPage extends StatelessWidget {
  final VoidCallback onLogout;

  const ProfilPage({super.key, required this.onLogout});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.only(bottom: 80),
      children: [
        // Hero Header
        Container(
          padding: const EdgeInsets.only(
            top: 18,
            left: 16,
            right: 16,
            bottom: 28,
          ),
          decoration: const BoxDecoration(
            borderRadius: BorderRadius.vertical(bottom: Radius.circular(30)),
            gradient: LinearGradient(
              colors: [Color(0xFFF97316), Color(0xFFEA580C)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Stack(
            children: [
              const DiagonalPill(width: 200, height: 40, top: -20, left: -40),
              const DiagonalPill(width: 250, height: 50, top: 120, left: 150),
              SafeArea(
                bottom: false,
                child: Column(
                  children: [
                    Row(
                children: [
                  Container(
                    width: 66,
                    height: 66,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: Colors.white.withOpacity(0.55),
                        width: 2.5,
                      ),
                    ),
                    child: const Center(
                      child: Text(
                        'AF',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 26,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Ahmad Fauzi',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'NIM: 2024010001',
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.5),
                            fontSize: 12,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            _buildBadge('Aktif', const Color(0xFF22C55E)),
                            const SizedBox(width: 6),
                            _buildBadge(
                              'Akuntansi · Sem 4',
                              Colors.white,
                              isOutlined: true,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  _buildQuickStat('7', 'Ujian'),
                  const SizedBox(width: 8),
                  _buildQuickStat('5', 'Lulus'),
                  const SizedBox(width: 8),
                  _buildQuickStat('81', 'Rata-rata'),
                  const SizedBox(width: 8),
                  _buildQuickStat('48', 'SKS'),
                ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),

        // Informasi Akademik (Simplified for now)
        const SizedBox(height: 16),
        _buildSectionCard(
          title: 'Informasi Akademik',
          children: [
            _buildMenuRow(
              Icons.school,
              'Program Studi',
              'S1 Akuntansi',
              const Color(0xFF2563EB),
            ),
            _buildMenuRow(
              Icons.calendar_today,
              'Semester & Tahun',
              'Semester 4 · 2025/2026',
              const Color(0xFF7C3AED),
            ),
            _buildMenuRow(
              Icons.person,
              'Dosen Wali',
              'Dr. Hendra Kusuma, M.Ak',
              const Color(0xFF0891B2),
            ),
          ],
        ),

        const SizedBox(height: 16),
        _buildSectionCard(
          title: 'Informasi Akun',
          children: [
            _buildMenuRow(
              Icons.account_circle,
              'Nama Lengkap',
              'Ahmad Fauzi',
              const Color(0xFFF97316),
            ),
            _buildMenuRow(
              Icons.badge,
              'NIM',
              '2024010001',
              const Color(0xFF475569),
            ),
          ],
        ),

        const SizedBox(height: 24),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: ElevatedButton(
            onPressed: onLogout,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFFFF3F3),
              foregroundColor: const Color(0xFFDC2626),
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
                side: const BorderSide(color: Color(0xFFFECACA)),
              ),
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.logout),
                SizedBox(width: 8),
                Text('Keluar', style: TextStyle(fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBadge(String text, Color color, {bool isOutlined = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: isOutlined ? Colors.transparent : color.withOpacity(0.18),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isOutlined ? color.withOpacity(0.3) : color.withOpacity(0.3),
        ),
      ),
      child: Text(
        text,
        style: TextStyle(
          color: color,
          fontSize: 9,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildQuickStat(String val, String label) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.08),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white.withOpacity(0.09)),
        ),
        child: Column(
          children: [
            Text(
              val,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: TextStyle(
                color: Colors.white.withOpacity(0.4),
                fontSize: 8,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionCard({
    required String title,
    required List<Widget> children,
  }) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
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
          Padding(
            padding: const EdgeInsets.only(left: 16, top: 12, bottom: 8),
            child: Text(
              title.toUpperCase(),
              style: const TextStyle(
                color: Color(0xFF94A3B8),
                fontSize: 10,
                fontWeight: FontWeight.bold,
                letterSpacing: 1,
              ),
            ),
          ),
          const Divider(height: 1, color: Color(0xFFF8FAFC)),
          ...children,
        ],
      ),
    );
  }

  Widget _buildMenuRow(
    IconData icon,
    String label,
    String value,
    Color accent,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: accent.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: accent, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                    color: Color(0xFF0F172A),
                  ),
                ),
                Text(
                  value,
                  style: const TextStyle(
                    color: Color(0xFF64748B),
                    fontSize: 11,
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
