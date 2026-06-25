import 'package:flutter/material.dart';

class ExamScreen extends StatefulWidget {
  final VoidCallback onBack;

  const ExamScreen({super.key, required this.onBack});

  @override
  State<ExamScreen> createState() => _ExamScreenState();
}

class _ExamScreenState extends State<ExamScreen> {
  int _currentId = 1;
  final int _totalQuestions = 5;

  final Map<int, String> _answers = {
    1: 'Akuntansi keuangan berfokus pada pelaporan eksternal kepada investor dan kreditur, sedangkan akuntansi manajemen ditujukan untuk pengambilan keputusan internal.',
    2: 'Nilai waktu uang adalah konsep bahwa uang yang dimiliki saat ini lebih bernilai dibandingkan jumlah yang sama di masa depan karena potensi penghasilannya.',
  };
  final Set<int> _flagged = {};

  void _toggleFlag() {
    setState(() {
      if (_flagged.contains(_currentId)) {
        _flagged.remove(_currentId);
      } else {
        _flagged.add(_currentId);
      }
    });
  }

  void _submit() {
    // Show submit dialog
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.white,
        title: const Text(
          'Kumpulkan Jawaban?',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        content: const Text(
          'Apakah Anda yakin ingin mengumpulkan ujian ini? Jawaban tidak dapat diubah setelah dikumpulkan.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Batal'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              widget.onBack(); // Go back to dashboard
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFEE9108),
            ),
            child: const Text(
              'Ya, Kumpulkan',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: const Color(0xFF090722),
        leading: IconButton(
          icon: const Icon(Icons.exit_to_app, color: Colors.red),
          onPressed: () {
            // Show exit confirm
            showDialog(
              context: context,
              builder: (context) => AlertDialog(
                title: const Text('Keluar dari Ujian?'),
                content: const Text(
                  'Progress Anda tersimpan. Sesi akan ditandai sebagai belum selesai.',
                ),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('Batal'),
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.pop(context);
                      widget.onBack();
                    },
                    child: const Text(
                      'Keluar',
                      style: TextStyle(color: Colors.red),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFFF5C518).withOpacity(0.12),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                  color: const Color(0xFFF5C518).withOpacity(0.25),
                ),
              ),
              child: const Text(
                'AKT301',
                style: TextStyle(
                  color: Color(0xFFF5C518),
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: Center(
              child: Text(
                '$_currentId / $_totalQuestions',
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    // Question Card
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: const BoxDecoration(
                              color: Color(0xFF090722),
                              borderRadius: BorderRadius.vertical(
                                top: Radius.circular(16),
                              ),
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'SOAL $_currentId',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const Text(
                                  '20 poin',
                                  style: TextStyle(
                                    color: Colors.white70,
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: SelectableText(
                              _getQuestionText(_currentId),
                              style: const TextStyle(
                                fontSize: 14,
                                height: 1.5,
                                color: Color(0xFF1E293B),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    // Answer Card
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: const BoxDecoration(
                              color: Color(0xFFF8FAFC),
                              borderRadius: BorderRadius.vertical(
                                top: Radius.circular(16),
                              ),
                            ),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'JAWABAN ANDA',
                                  style: TextStyle(
                                    color: Color(0xFF475569),
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                  ),
                                ),
                                Text(
                                  'Auto-save aktif',
                                  style: TextStyle(
                                    color: Colors.green,
                                    fontSize: 10,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: TextFormField(
                              initialValue: _answers[_currentId] ?? '',
                              maxLines: 8,
                              decoration: const InputDecoration.collapsed(
                                hintText: 'Tuliskan jawaban Anda di sini...',
                              ),
                              onChanged: (val) {
                                _answers[_currentId] = val;
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Bottom Bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: const BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black12,
                    blurRadius: 4,
                    offset: Offset(0, -2),
                  ),
                ],
              ),
              child: Row(
                children: [
                  IconButton(
                    onPressed: _currentId > 1
                        ? () => setState(() => _currentId--)
                        : null,
                    icon: const Icon(Icons.arrow_back_ios, size: 16),
                    color: _currentId > 1
                        ? const Color(0xFFEE9108)
                        : Colors.grey,
                  ),
                  IconButton(
                    onPressed: _currentId < _totalQuestions
                        ? () => setState(() => _currentId++)
                        : null,
                    icon: const Icon(Icons.arrow_forward_ios, size: 16),
                    color: _currentId < _totalQuestions
                        ? const Color(0xFFEE9108)
                        : Colors.grey,
                  ),
                  IconButton(
                    onPressed: _toggleFlag,
                    icon: Icon(
                      Icons.flag,
                      color: _flagged.contains(_currentId)
                          ? Colors.orange
                          : Colors.grey,
                    ),
                  ),
                  const Spacer(),
                  ElevatedButton(
                    onPressed: _submit,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFEE9108),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                    ),
                    child: const Text(
                      'KUMPULKAN',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _getQuestionText(int id) {
    switch (id) {
      case 1:
        return 'Jelaskan perbedaan antara akuntansi keuangan dan akuntansi manajemen, serta berikan contoh penggunaan masing-masing dalam konteks perusahaan manufaktur.';
      case 2:
        return 'Uraikan konsep nilai waktu dari uang (time value of money) dan bagaimana konsep tersebut diterapkan dalam keputusan investasi jangka panjang perusahaan.';
      case 3:
        return 'Berdasarkan data laporan keuangan PT ABC tahun 2025, analisislah rasio likuiditas perusahaan dan berikan rekomendasi strategis untuk meningkatkan posisi keuangan perusahaan di tahun 2026.';
      case 4:
        return 'Evaluasi dampak kebijakan dividen terhadap nilai perusahaan berdasarkan teori Modigliani-Miller dan relevansinya dalam kondisi pasar tidak sempurna.';
      case 5:
        return 'Susun analisis SWOT keuangan dari data yang disediakan dan rekomendasikan strategi keuangan terbaik untuk periode 2026–2028.';
      default:
        return '';
    }
  }
}
