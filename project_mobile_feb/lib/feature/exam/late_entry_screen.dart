import 'package:flutter/material.dart';

enum LateEntryStep { warning, code, scan, privacy, blocked }

class LateEntryScreen extends StatefulWidget {
  final VoidCallback onEnter;
  final VoidCallback onBack;

  const LateEntryScreen({
    super.key,
    required this.onEnter,
    required this.onBack,
  });

  @override
  State<LateEntryScreen> createState() => _LateEntryScreenState();
}

class _LateEntryScreenState extends State<LateEntryScreen> {
  LateEntryStep _step = LateEntryStep.warning;
  bool _agreed = false;
  String _pinError = '';

  // Timer for demonstration
  String _lateTime = '14m 23s';

  final String _validCode = '482951';

  void _handlePin(String pin) {
    if (pin == _validCode) {
      setState(() {
        _step = LateEntryStep.scan;
      });
      // Mock scan delay
      Future.delayed(const Duration(seconds: 3), () {
        if (mounted) {
          setState(() {
            _step = LateEntryStep.privacy;
          });
        }
      });
    } else {
      setState(() {
        _pinError = 'Kode tidak valid. Hubungi pengawas ujian.';
      });
    }
  }

  void _handleAgree() {
    if (_agreed) {
      widget.onEnter();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A0A00),
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                    onTap: widget.onBack,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.06),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: Colors.white.withOpacity(0.1),
                        ),
                      ),
                      child: const Row(
                        children: [
                          Icon(
                            Icons.arrow_back_ios,
                            color: Colors.white54,
                            size: 12,
                          ),
                          SizedBox(width: 4),
                          Text(
                            'Kembali',
                            style: TextStyle(
                              color: Colors.white54,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.red.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.red.withOpacity(0.3)),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 6,
                          height: 6,
                          decoration: const BoxDecoration(
                            color: Colors.red,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 6),
                        Text(
                          'Terlambat $_lateTime',
                          style: const TextStyle(
                            color: Colors.red,
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: _buildCurrentStep(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCurrentStep() {
    switch (_step) {
      case LateEntryStep.warning:
        return _buildWarningStep();
      case LateEntryStep.code:
        return _buildCodeStep();
      case LateEntryStep.scan:
        return _buildScanStep();
      case LateEntryStep.privacy:
        return _buildPrivacyStep();
      default:
        return const SizedBox();
    }
  }

  Widget _buildWarningStep() {
    return Column(
      children: [
        const SizedBox(height: 24),
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: Colors.red.withOpacity(0.15),
            shape: BoxShape.circle,
            border: Border.all(color: Colors.red.withOpacity(0.4), width: 2),
          ),
          child: const Icon(
            Icons.warning_amber_rounded,
            color: Colors.red,
            size: 40,
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'Akses Terlambat',
          style: TextStyle(
            color: Colors.red,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Anda mencoba memasuki sesi ujian setelah waktu mulai yang ditentukan.',
          style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 12),
          textAlign: TextAlign.center,
        ),

        const SizedBox(height: 24),
        ElevatedButton(
          onPressed: () => setState(() => _step = LateEntryStep.code),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red[800],
            minimumSize: const Size(double.infinity, 52),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          child: const Text(
            'Masukkan Kode Akses Pengawas',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
        ),
      ],
    );
  }

  Widget _buildCodeStep() {
    return Column(
      children: [
        const SizedBox(height: 24),
        const Text(
          'Kode Akses Pengawas',
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Minta kode 6-digit kepada pengawas ujian di ruangan untuk melanjutkan masuk.',
          style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 12),
          textAlign: TextAlign.center,
        ),

        const SizedBox(height: 24),
        _buildPinInput(),
        if (_pinError.isNotEmpty) ...[
          const SizedBox(height: 16),
          Text(
            _pinError,
            style: const TextStyle(color: Colors.red, fontSize: 12),
          ),
        ],
        const SizedBox(height: 16),
        Text(
          'Kode demo: 482951',
          style: TextStyle(color: Colors.white.withOpacity(0.3), fontSize: 10),
        ),
      ],
    );
  }

  Widget _buildPinInput() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: TextField(
        textAlign: TextAlign.center,
        style: const TextStyle(
          color: Colors.yellow,
          fontSize: 24,
          letterSpacing: 16,
        ),
        keyboardType: TextInputType.number,
        maxLength: 6,
        decoration: InputDecoration(
          counterText: '',
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.white24),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.yellow),
          ),
        ),
        onChanged: (val) {
          if (val.length == 6) {
            _handlePin(val);
          }
        },
      ),
    );
  }

  Widget _buildScanStep() {
    return Column(
      children: [
        const SizedBox(height: 40),
        const CircularProgressIndicator(color: Colors.amber),
        const SizedBox(height: 24),
        const Text(
          'Pemindaian Ulang Perangkat',
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Sistem memverifikasi ulang keamanan perangkat sebelum memberikan akses terlambat.',
          style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 12),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildPrivacyStep() {
    return Column(
      children: [
        const SizedBox(height: 24),
        const Text(
          'Persetujuan Privasi',
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 24),
        CheckboxListTile(
          value: _agreed,
          onChanged: (val) => setState(() => _agreed = val ?? false),
          title: const Text(
            'Saya telah membaca, memahami, dan menyetujui seluruh pernyataan.',
            style: TextStyle(color: Colors.white, fontSize: 12),
          ),
          controlAffinity: ListTileControlAffinity.leading,
          activeColor: Colors.green,
          checkColor: Colors.white,
        ),
        const SizedBox(height: 24),
        ElevatedButton(
          onPressed: _agreed ? _handleAgree : null,
          style: ElevatedButton.styleFrom(
            backgroundColor: _agreed ? Colors.green[700] : Colors.white12,
            minimumSize: const Size(double.infinity, 52),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          child: const Text(
            'Masuk Ujian Sekarang',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
        ),
      ],
    );
  }
}
