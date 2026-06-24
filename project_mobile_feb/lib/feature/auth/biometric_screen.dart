import 'dart:async';
import 'package:flutter/material.dart';

class BiometricScreen extends StatefulWidget {
  final VoidCallback onNext;
  final VoidCallback onBack;

  const BiometricScreen({
    super.key,
    required this.onNext,
    required this.onBack,
  });

  @override
  State<BiometricScreen> createState() => _BiometricScreenState();
}

class _BiometricScreenState extends State<BiometricScreen>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  int _attempts = 1;
  bool _isScanning = false;
  bool _isSuccess = false;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  void _simulateScan() {
    if (_isScanning || _isSuccess) return;

    setState(() {
      _isScanning = true;
      // Speed up animation during scan
      _pulseController.duration = const Duration(milliseconds: 500);
      _pulseController.repeat(reverse: true);
    });

    // Simulate delay
    Timer(const Duration(seconds: 2), () {
      if (!mounted) return;

      setState(() {
        _isScanning = false;
        _pulseController.stop();
        _isSuccess = true;
      });

      // Proceed to next screen after success indication
      Timer(const Duration(milliseconds: 1000), () {
        if (mounted) {
          widget.onNext();
        }
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios,
            color: Color(0xFF090722),
            size: 20,
          ),
          onPressed: widget.onBack,
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                'VERIFIKASI IDENTITAS',
                style: TextStyle(
                  color: Color(0xFF090722),
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 1.2,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'Pastikan Anda adalah pemilik\nsah akun ini.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.grey.shade600,
                  fontSize: 14,
                  height: 1.5,
                ),
              ),

              const Spacer(),

              // Fingerprint Animation Area
              GestureDetector(
                onTap: _simulateScan,
                child: SizedBox(
                  height: 200,
                  width: 200,
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // Pulse effect
                      AnimatedBuilder(
                        animation: _pulseController,
                        builder: (context, child) {
                          return Container(
                            width: 100 + (_pulseController.value * 80),
                            height: 100 + (_pulseController.value * 80),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: _isSuccess
                                  ? Colors.green.withOpacity(0.2)
                                  : const Color(0xFF090722).withOpacity(
                                      0.2 - (_pulseController.value * 0.1),
                                    ),
                            ),
                          );
                        },
                      ),
                      // Inner pulse
                      AnimatedBuilder(
                        animation: _pulseController,
                        builder: (context, child) {
                          return Container(
                            width: 100 + (_pulseController.value * 40),
                            height: 100 + (_pulseController.value * 40),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: _isSuccess
                                  ? Colors.green.withOpacity(0.3)
                                  : const Color(0xFF090722).withOpacity(
                                      0.4 - (_pulseController.value * 0.2),
                                    ),
                            ),
                          );
                        },
                      ),
                      // Fingerprint icon
                      Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: _isSuccess
                              ? Colors.green
                              : const Color(0xFF090722),
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: _isSuccess
                                  ? Colors.green.withOpacity(0.4)
                                  : const Color(0xFF090722).withOpacity(0.3),
                              blurRadius: 15,
                              offset: const Offset(0, 5),
                            ),
                          ],
                        ),
                        child: Icon(
                          _isSuccess
                              ? Icons.check_circle_outline
                              : Icons.fingerprint,
                          size: 60,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 32),

              Text(
                _isSuccess
                    ? 'Verifikasi Berhasil'
                    : (_isScanning
                          ? 'Memindai biometrik...'
                          : 'Sentuh ikon sidik jari di atas\nuntuk simulasi verifikasi.'),
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: _isSuccess
                      ? Colors.green
                      : (_isScanning
                            ? const Color(0xFF090722)
                            : Colors.grey.shade700),
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),

              const Spacer(),

              // Attempt counter
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 12,
                ),
                decoration: BoxDecoration(
                  color: Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: Column(
                  children: [
                    Text(
                      'Percobaan: $_attempts / 3',
                      style: TextStyle(
                        color: Colors.grey.shade800,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        _buildDot(true),
                        const SizedBox(width: 8),
                        _buildDot(false),
                        const SizedBox(width: 8),
                        _buildDot(false),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Student Info Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFF8FAFC),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        image: const DecorationImage(
                          image: AssetImage('assets/images/profile.jpg'),
                          fit: BoxFit.cover,
                        ),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: const Color(0xFF090722).withOpacity(0.1),
                          width: 1,
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Pallyama Sultan',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                            color: Color(0xFF0F172A),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'NIM: 2024010001',
                          style: TextStyle(
                            fontSize: 13,
                            color: Colors.grey.shade600,
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
      ),
    );
  }

  Widget _buildDot(bool isActive) {
    return Container(
      width: 10,
      height: 10,
      decoration: BoxDecoration(
        color: isActive ? const Color(0xFF090722) : Colors.grey.shade300,
        shape: BoxShape.circle,
      ),
    );
  }
}
