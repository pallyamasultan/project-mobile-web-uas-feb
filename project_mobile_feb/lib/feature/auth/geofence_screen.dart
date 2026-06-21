import 'dart:async';
import 'package:flutter/material.dart';

class GeofenceScreen extends StatefulWidget {
  final VoidCallback onNext;
  final VoidCallback onBack;

  const GeofenceScreen({super.key, required this.onNext, required this.onBack});

  @override
  State<GeofenceScreen> createState() => _GeofenceScreenState();
}

class _GeofenceScreenState extends State<GeofenceScreen>
    with TickerProviderStateMixin {
  late AnimationController _radarController;
  bool _isChecking = true;
  bool _isGpsValid = false;
  bool _isNetworkValid = false;
  bool _showFailure = false;

  @override
  void initState() {
    super.initState();
    _radarController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();

    _simulateChecks();
  }

  @override
  void dispose() {
    _radarController.dispose();
    super.dispose();
  }

  void _simulateChecks() {
    // Simulate GPS check taking 1.5 seconds
    Timer(const Duration(milliseconds: 1500), () {
      if (mounted) {
        setState(() {
          _isGpsValid = true;
        });
      }
    });

    // Simulate Network check taking 2.5 seconds
    Timer(const Duration(milliseconds: 2500), () {
      if (mounted) {
        setState(() {
          _isNetworkValid = true;
          _isChecking = false;
        });
      }
    });
  }

  void _toggleFailSimulation() {
    setState(() {
      _showFailure = !_showFailure;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_showFailure) {
      return _buildGeofenceFailureScreen();
    }
    return _buildGeofenceScreen();
  }

  Widget _buildGeofenceScreen() {
    final bool allValid = _isGpsValid && _isNetworkValid;

    return Scaffold(
      backgroundColor: const Color(0xFF060F1E),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white, size: 20),
          onPressed: widget.onBack,
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.bug_report, color: Colors.grey),
            tooltip: 'Simulasi Error (Debug)',
            onPressed: _toggleFailSimulation,
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 10.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                'VALIDASI LOKASI & JARINGAN',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 1.0,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Memastikan Anda berada di area\nkampus FEB UNSAP.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white.withOpacity(0.6),
                  fontSize: 14,
                  height: 1.5,
                ),
              ),

              const SizedBox(height: 40),

              // Radar Animation
              SizedBox(
                height: 160,
                width: 160,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    Container(
                      width: 140,
                      height: 140,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: const Color(0xFF22C55E).withOpacity(0.3),
                          width: 2,
                        ),
                      ),
                    ),
                    Container(
                      width: 70,
                      height: 70,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: const Color(0xFF22C55E).withOpacity(0.5),
                          width: 2,
                        ),
                      ),
                    ),
                    if (_isChecking)
                      RotationTransition(
                        turns: _radarController,
                        child: Container(
                          width: 140,
                          height: 140,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: SweepGradient(
                              colors: [
                                Colors.transparent,
                                const Color(0xFF22C55E).withOpacity(0.1),
                                const Color(0xFF22C55E).withOpacity(0.5),
                              ],
                              stops: const [0.5, 0.8, 1.0],
                            ),
                          ),
                        ),
                      ),
                    Icon(
                      Icons.location_on,
                      color: _isGpsValid
                          ? const Color(0xFF22C55E)
                          : Colors.white,
                      size: 40,
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 40),

              // Status Cards
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Status Pemeriksaan:',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.6),
                    fontSize: 13,
                  ),
                ),
              ),
              const SizedBox(height: 12),

              _buildStatusCard(
                icon: Icons.location_on_outlined,
                title: 'Lokasi GPS',
                isValid: _isGpsValid,
                validText: 'Dalam Radius\nFEB UNSAP (125m)',
              ),

              const SizedBox(height: 16),

              _buildStatusCard(
                icon: Icons.wifi,
                title: 'Jaringan Internet',
                isValid: _isNetworkValid,
                validText: 'Terhubung\nSSID: FEB-UNSAP',
              ),

              const Spacer(),

              // Continue Button
              SizedBox(
                width: double.infinity,
                height: 54,
                child: ElevatedButton(
                  onPressed: allValid ? widget.onNext : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFF5C518),
                    disabledBackgroundColor: Colors.white.withOpacity(0.1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'LANJUTKAN',
                        style: TextStyle(
                          color: allValid
                              ? const Color(0xFF0B1E3D)
                              : Colors.white.withOpacity(0.3),
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                          letterSpacing: 1.0,
                        ),
                      ),
                      if (allValid) ...[
                        const SizedBox(width: 8),
                        const Icon(
                          Icons.check_circle,
                          color: Color(0xFF0B1E3D),
                          size: 20,
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatusCard({
    required IconData icon,
    required String title,
    required bool isValid,
    required String validText,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: Colors.white.withOpacity(0.8), size: 24),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    color: isValid
                        ? const Color(0xFF22C55E).withOpacity(0.1)
                        : Colors.white.withOpacity(0.05),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: isValid
                          ? const Color(0xFF22C55E).withOpacity(0.5)
                          : Colors.transparent,
                    ),
                  ),
                  child: Row(
                    children: [
                      if (isValid)
                        const Icon(
                          Icons.check_circle,
                          color: Color(0xFF22C55E),
                          size: 16,
                        )
                      else
                        SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              Colors.white.withOpacity(0.5),
                            ),
                          ),
                        ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          isValid ? validText : 'Memeriksa...',
                          style: TextStyle(
                            color: isValid
                                ? const Color(0xFF22C55E)
                                : Colors.white.withOpacity(0.6),
                            fontSize: 13,
                            fontWeight: isValid
                                ? FontWeight.w500
                                : FontWeight.normal,
                          ),
                        ),
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

  Widget _buildGeofenceFailureScreen() {
    return Scaffold(
      backgroundColor: const Color(0xFF060F1E),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white, size: 20),
          onPressed: _toggleFailSimulation,
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 10.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.warning_amber_rounded,
                    color: Color(0xFFEF4444),
                    size: 28,
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'LOKASI TIDAK VALID',
                    style: TextStyle(
                      color: Color(0xFFEF4444),
                      fontSize: 18,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 1.0,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Container(height: 1, color: Colors.white.withOpacity(0.1)),
              const SizedBox(height: 24),

              // Map Placeholder
              Container(
                height: 200,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withOpacity(0.1)),
                ),
                child: Stack(
                  children: [
                    Center(
                      child: Icon(
                        Icons.map,
                        size: 80,
                        color: Colors.white.withOpacity(0.1),
                      ),
                    ),
                    Center(
                      child: Container(
                        width: 120,
                        height: 120,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: const Color(0xFFF5C518).withOpacity(0.5),
                            width: 2,
                          ),
                          color: const Color(0xFFF5C518).withOpacity(0.1),
                        ),
                      ),
                    ),
                    const Positioned(
                      bottom: 40,
                      left: 60,
                      child: Icon(
                        Icons.location_on,
                        color: Color(0xFFEF4444),
                        size: 36,
                      ),
                    ),
                    const Positioned(
                      top: 16,
                      left: 16,
                      child: Text(
                        'PETA MINI',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFEF4444).withOpacity(0.1),
                  border: Border.all(
                    color: const Color(0xFFEF4444).withOpacity(0.5),
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.error_outline, color: Color(0xFFEF4444)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: const Text(
                        'Anda berada 1.2 km dari kampus FEB UNSAP',
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),
              Text(
                'Silakan pindah ke area kampus\nFEB UNSAP untuk melanjutkan.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white.withOpacity(0.7),
                  fontSize: 14,
                  height: 1.5,
                ),
              ),

              const Spacer(),

              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          Color(0xFFF5C518),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Memeriksa ulang...',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        Text(
                          'Auto-retry dalam: 7 detik',
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.5),
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              TextButton(
                onPressed: () {},
                child: const Text(
                  'Hubungi Pengawas',
                  style: TextStyle(
                    color: Color(0xFFF5C518),
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
