import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  final VoidCallback onNext;

  const SplashScreen({super.key, required this.onNext});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _ChecklistItem {
  final String id;
  final String label;

  _ChecklistItem({required this.id, required this.label});
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  int _progress = 0;
  final List<String> _visibleChecklist = [];
  final List<String> _checkedItems = [];
  Timer? _progressTimer;
  final List<Timer> _timers = [];
  final Random _random = Random();
  late List<Offset> _stars;

  final List<_ChecklistItem> _checklist = [
    _ChecklistItem(id: 'firebase', label: 'Firebase SDK'),
    _ChecklistItem(id: 'internet', label: 'Koneksi Internet'),
    _ChecklistItem(id: 'integrity', label: 'Memeriksa Integritas'),
  ];

  late AnimationController _logoAnimController;
  late Animation<double> _logoOpacity;
  late Animation<Offset> _logoOffset;

  late AnimationController _contentAnimController;
  late Animation<double> _contentOpacity;
  late Animation<Offset> _contentOffset;

  @override
  void initState() {
    super.initState();
    _stars = List.generate(
      30,
      (index) => Offset(_random.nextDouble(), _random.nextDouble()),
    );

    _logoAnimController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 700),
    );
    _logoOpacity = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _logoAnimController, curve: Curves.easeOut),
    );
    _logoOffset = Tween<Offset>(begin: const Offset(0, 0.2), end: Offset.zero)
        .animate(
          CurvedAnimation(parent: _logoAnimController, curve: Curves.easeOut),
        );
    _logoAnimController.forward();

    _contentAnimController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );
    _contentOpacity = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _contentAnimController, curve: Curves.easeOut),
    );
    _contentOffset =
        Tween<Offset>(begin: const Offset(0, 0.1), end: Offset.zero).animate(
          CurvedAnimation(
            parent: _contentAnimController,
            curve: Curves.easeOut,
          ),
        );
    Future.delayed(const Duration(milliseconds: 400), () {
      if (mounted) _contentAnimController.forward();
    });

    _startSequence();
  }

  void _startSequence() {
    _timers.add(
      Timer(const Duration(milliseconds: 800), () {
        _progressTimer = Timer.periodic(const Duration(milliseconds: 30), (
          timer,
        ) {
          if (mounted) {
            setState(() {
              if (_progress >= 35) {
                _progressTimer?.cancel();
              } else {
                _progress++;
              }
            });
          }
        });
      }),
    );

    _timers.add(
      Timer(const Duration(milliseconds: 600), () => _setVisible('firebase')),
    );
    _timers.add(
      Timer(const Duration(milliseconds: 900), () => _setVisible('internet')),
    );
    _timers.add(
      Timer(const Duration(milliseconds: 1200), () => _setVisible('integrity')),
    );
    _timers.add(
      Timer(const Duration(milliseconds: 1800), () => _setChecked('firebase')),
    );
    _timers.add(
      Timer(const Duration(milliseconds: 4000), () => widget.onNext()),
    );
  }

  void _setVisible(String id) {
    if (mounted) setState(() => _visibleChecklist.add(id));
  }

  void _setChecked(String id) {
    if (mounted) setState(() => _checkedItems.add(id));
  }

  @override
  void dispose() {
    _progressTimer?.cancel();
    for (var t in _timers) {
      t.cancel();
    }
    _logoAnimController.dispose();
    _contentAnimController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            stops: [0.0, 0.6, 1.0],
            colors: [Color(0xFF0B1E3D), Color(0xFF091629), Color(0xFF060F1E)],
          ),
        ),
        child: Stack(
          children: [
            // Stars
            ..._stars.map(
              (star) => Positioned(
                left: MediaQuery.of(context).size.width * star.dx,
                top: MediaQuery.of(context).size.height * star.dy,
                child: Container(
                  width: _random.nextDouble() * 2 + 1,
                  height: _random.nextDouble() * 2 + 1,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(
                      _random.nextDouble() * 0.4 + 0.1,
                    ),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ),

            SafeArea(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 24.0,
                  vertical: 48.0,
                ),
                child: Column(
                  children: [
                    const Spacer(),
                    // Logo + Title
                    AnimatedBuilder(
                      animation: _logoAnimController,
                      builder: (context, child) {
                        return Opacity(
                          opacity: _logoOpacity.value,
                          child: FractionalTranslation(
                            translation: _logoOffset.value,
                            child: child,
                          ),
                        );
                      },
                      child: Column(
                        children: [
                          // Logo
                          SizedBox(
                            width: 140,
                            height: 140,
                            child: Stack(
                              alignment: Alignment.center,
                              children: [
                                // Outer glow
                                Container(
                                  width: 140,
                                  height: 140,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    gradient: RadialGradient(
                                      colors: [
                                        const Color(0xFFEAB308).withOpacity(0.2),
                                        Colors.transparent,
                                      ],
                                      stops: const [0.0, 0.7],
                                    ),
                                  ),
                                ),
                                // Logo card (now a circular card with UNSAP logo)
                                Container(
                                  width: 110,
                                  height: 110,
                                  padding: const EdgeInsets.all(8),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    shape: BoxShape.circle,
                                    border: Border.all(
                                      color: const Color(0xFFEAB308).withOpacity(0.6),
                                      width: 2,
                                    ),
                                    boxShadow: [
                                      BoxShadow(
                                        color: const Color(0xFFEAB308).withOpacity(0.25),
                                        blurRadius: 24,
                                      ),
                                    ],
                                  ),
                                  child: Image.asset(
                                    'assets/images/unsap_logo.png',
                                    fit: BoxFit.contain,
                                    errorBuilder: (context, error, stackTrace) {
                                      return const Icon(
                                        Icons.school,
                                        size: 50,
                                        color: Color(0xFF0B1E3D),
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 24),
                          const Text(
                            'UJIAN AKHIR SEMESTER',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 1.5,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Fakultas Ekonomi & Bisnis',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white.withOpacity(0.6),
                              fontSize: 13,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Spacer(),

                    // Progress and Checklist
                    AnimatedBuilder(
                      animation: _contentAnimController,
                      builder: (context, child) {
                        return Opacity(
                          opacity: _contentOpacity.value,
                          child: FractionalTranslation(
                            translation: _contentOffset.value,
                            child: child,
                          ),
                        );
                      },
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Menginisialisasi sistem...',
                                style: TextStyle(
                                  color: Colors.white.withOpacity(0.55),
                                  fontSize: 12,
                                  letterSpacing: 0.3,
                                ),
                              ),
                              Text(
                                '$_progress%',
                                style: const TextStyle(
                                  color: Color(0xFFF5C518),
                                  fontSize: 12,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          // Progress Bar
                          Container(
                            height: 6,
                            width: double.infinity,
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(3),
                            ),
                            child: Stack(
                              children: [
                                AnimatedContainer(
                                  duration: const Duration(milliseconds: 100),
                                  width:
                                      MediaQuery.of(context).size.width *
                                      (_progress / 100),
                                  height: 6,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(3),
                                    gradient: const LinearGradient(
                                      colors: [
                                        Color(0xFFB8860B),
                                        Color(0xFFF5C518),
                                        Color(0xFFFFE066),
                                      ],
                                    ),
                                    boxShadow: [
                                      BoxShadow(
                                        color: const Color(
                                          0xFFF5C518,
                                        ).withOpacity(0.6),
                                        blurRadius: 8,
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 16),

                          // Checklist Card
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.06),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: Colors.white.withOpacity(0.1),
                              ),
                            ),
                            child: Column(
                              children: _checklist.map((item) {
                                final isVisible = _visibleChecklist.contains(
                                  item.id,
                                );
                                final isChecked = _checkedItems.contains(
                                  item.id,
                                );

                                if (!isVisible) return const SizedBox.shrink();

                                return AnimatedContainer(
                                  duration: const Duration(milliseconds: 300),
                                  margin: const EdgeInsets.only(bottom: 10),
                                  child: Row(
                                    children: [
                                      // Status icon
                                      SizedBox(
                                        width: 20,
                                        height: 20,
                                        child: isChecked
                                            ? TweenAnimationBuilder<double>(
                                                tween: Tween(
                                                  begin: 0.0,
                                                  end: 1.0,
                                                ),
                                                duration: const Duration(
                                                  milliseconds: 400,
                                                ),
                                                curve: Curves.elasticOut,
                                                builder: (context, value, child) {
                                                  return Transform.scale(
                                                    scale: value,
                                                    child: Container(
                                                      decoration: BoxDecoration(
                                                        color: const Color(
                                                          0xFF22C55E,
                                                        ).withOpacity(0.2),
                                                        shape: BoxShape.circle,
                                                        border: Border.all(
                                                          color: const Color(
                                                            0xFF22C55E,
                                                          ),
                                                          width: 1.5,
                                                        ),
                                                      ),
                                                      child: const Icon(
                                                        Icons.check,
                                                        size: 12,
                                                        color: Color(
                                                          0xFF22C55E,
                                                        ),
                                                      ),
                                                    ),
                                                  );
                                                },
                                              )
                                            : Container(
                                                decoration: BoxDecoration(
                                                  shape: BoxShape.circle,
                                                  border: Border.all(
                                                    color: Colors.white
                                                        .withOpacity(0.3),
                                                    width: 1.5,
                                                  ),
                                                ),
                                              ),
                                      ),
                                      const SizedBox(width: 12),
                                      Text(
                                        item.label,
                                        style: TextStyle(
                                          color: isChecked
                                              ? Colors.white.withOpacity(0.9)
                                              : Colors.white.withOpacity(0.5),
                                          fontSize: 13,
                                          fontWeight: isChecked
                                              ? FontWeight.w500
                                              : FontWeight.w400,
                                        ),
                                      ),
                                      const Spacer(),
                                      if (!isChecked)
                                        SizedBox(
                                          width: 12,
                                          height: 12,
                                          child: CircularProgressIndicator(
                                            strokeWidth: 1.5,
                                            valueColor:
                                                AlwaysStoppedAnimation<Color>(
                                                  const Color(
                                                    0xFFF5C518,
                                                  ).withOpacity(0.8),
                                                ),
                                          ),
                                        ),
                                    ],
                                  ),
                                );
                              }).toList(),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    AnimatedBuilder(
                      animation: _contentAnimController,
                      builder: (context, child) {
                        return Opacity(
                          opacity: _contentOpacity.value,
                          child: child,
                        );
                      },
                      child: Text(
                        'v1.0.0',
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.25),
                          fontSize: 11,
                          letterSpacing: 0.5,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
