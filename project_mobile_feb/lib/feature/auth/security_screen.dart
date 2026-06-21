import 'dart:async';
import 'package:flutter/material.dart';

enum CheckStatus { waiting, checking, pass, fail }

class SecurityItem {
  final String id;
  final String label;
  CheckStatus status;

  SecurityItem({
    required this.id,
    required this.label,
    this.status = CheckStatus.waiting,
  });
}

class SecurityScreen extends StatefulWidget {
  final VoidCallback onNext;

  const SecurityScreen({super.key, required this.onNext});

  @override
  State<SecurityScreen> createState() => _SecurityScreenState();
}

class _SecurityScreenState extends State<SecurityScreen>
    with TickerProviderStateMixin {
  int _progress = 0;
  final List<SecurityItem> _items = [
    SecurityItem(id: 'root', label: 'Root / Jailbreak'),
    SecurityItem(id: 'rom', label: 'Custom ROM'),
    SecurityItem(id: 'devopt', label: 'Developer Options'),
    SecurityItem(id: 'usb', label: 'USB Debugging'),
    SecurityItem(id: 'clone', label: 'Aplikasi Kloningan'),
  ];

  Timer? _progressTimer;
  final List<Timer> _timers = [];

  late AnimationController _headerAnimController;
  late Animation<double> _headerOpacity;
  late Animation<Offset> _headerOffset;

  @override
  void initState() {
    super.initState();

    _headerAnimController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _headerOpacity = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(_headerAnimController);
    _headerOffset = Tween<Offset>(
      begin: const Offset(0, -0.2),
      end: Offset.zero,
    ).animate(_headerAnimController);
    _headerAnimController.forward();

    _startSequence();
  }

  void _startSequence() {
    final sequence = [
      {'delay': 300, 'id': 'root', 'status': CheckStatus.checking},
      {'delay': 1000, 'id': 'root', 'status': CheckStatus.pass},
      {'delay': 1200, 'id': 'rom', 'status': CheckStatus.checking},
      {'delay': 1900, 'id': 'rom', 'status': CheckStatus.pass},
      {'delay': 2100, 'id': 'devopt', 'status': CheckStatus.checking},
      {'delay': 2800, 'id': 'devopt', 'status': CheckStatus.pass},
      {'delay': 3000, 'id': 'usb', 'status': CheckStatus.checking},
      {'delay': 3700, 'id': 'usb', 'status': CheckStatus.pass},
      {'delay': 3900, 'id': 'clone', 'status': CheckStatus.checking},
      {'delay': 4600, 'id': 'clone', 'status': CheckStatus.pass},
    ];

    for (var step in sequence) {
      _timers.add(
        Timer(Duration(milliseconds: step['delay'] as int), () {
          if (mounted) {
            setState(() {
              final itemIndex = _items.indexWhere(
                (item) => item.id == step['id'],
              );
              if (itemIndex != -1) {
                _items[itemIndex].status = step['status'] as CheckStatus;
              }
            });
          }
        }),
      );
    }

    _progressTimer = Timer.periodic(const Duration(milliseconds: 50), (timer) {
      if (mounted) {
        setState(() {
          if (_progress >= 100) {
            _progressTimer?.cancel();
          } else {
            _progress++;
          }
        });
      }
    });

    _timers.add(
      Timer(const Duration(milliseconds: 5400), () => widget.onNext()),
    );
  }

  @override
  void dispose() {
    _progressTimer?.cancel();
    for (var t in _timers) {
      t.cancel();
    }
    _headerAnimController.dispose();
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
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 20.0,
              vertical: 40.0,
            ),
            child: Column(
              children: [
                // Header
                AnimatedBuilder(
                  animation: _headerAnimController,
                  builder: (context, child) {
                    return Opacity(
                      opacity: _headerOpacity.value,
                      child: FractionalTranslation(
                        translation: _headerOffset.value,
                        child: child,
                      ),
                    );
                  },
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text('🔒', style: TextStyle(fontSize: 20)),
                          const SizedBox(width: 8),
                          const Text(
                            'PEMERIKSAAN KEAMANAN',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 1,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Container(
                        height: 1,
                        width: double.infinity,
                        color: Colors.white.withOpacity(0.1),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Sistem sedang memverifikasi integritas perangkat Anda...',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.5),
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),

                const Spacer(),

                // Shield Animation
                TweenAnimationBuilder<double>(
                  tween: Tween(begin: 0.0, end: 1.0),
                  duration: const Duration(milliseconds: 500),
                  curve: Curves.easeOut,
                  builder: (context, value, child) {
                    return Opacity(
                      opacity: value,
                      child: Transform.scale(
                        scale: 0.8 + (0.2 * value),
                        child: child,
                      ),
                    );
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.04),
                      border: Border.all(color: Colors.white.withOpacity(0.08)),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: _ShieldAnimationWidget(isComplete: _progress >= 100),
                  ),
                ),

                const Spacer(),

                // Checklist
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Checklist Keamanan:',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.5),
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.05),
                        border: Border.all(
                          color: Colors.white.withOpacity(0.08),
                        ),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        children: _items.asMap().entries.map((entry) {
                          final idx = entry.key;
                          final item = entry.value;
                          return Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                  vertical: 12,
                                ),
                                child: Row(
                                  children: [
                                    _StatusIcon(status: item.status),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            item.label,
                                            style: TextStyle(
                                              color: Colors.white.withOpacity(
                                                0.85,
                                              ),
                                              fontSize: 13,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          ),
                                          _StatusText(status: item.status),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              if (idx < _items.length - 1)
                                Padding(
                                  padding: const EdgeInsets.only(left: 16),
                                  child: Container(
                                    height: 1,
                                    color: Colors.white.withOpacity(0.06),
                                  ),
                                ),
                            ],
                          );
                        }).toList(),
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 16),

                // Progress bar
                Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Pemeriksaan keamanan...',
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.4),
                            fontSize: 11,
                          ),
                        ),
                        Text(
                          '$_progress%',
                          style: const TextStyle(
                            color: Color(0xFFF5C518),
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Container(
                      height: 5,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.08),
                        borderRadius: BorderRadius.circular(2.5),
                      ),
                      child: Stack(
                        children: [
                          AnimatedContainer(
                            duration: const Duration(milliseconds: 100),
                            width:
                                MediaQuery.of(context).size.width *
                                (_progress / 100),
                            height: 5,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(2.5),
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
                                  ).withOpacity(0.5),
                                  blurRadius: 8,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _StatusIcon extends StatelessWidget {
  final CheckStatus status;

  const _StatusIcon({required this.status});

  @override
  Widget build(BuildContext context) {
    if (status == CheckStatus.pass) {
      return TweenAnimationBuilder<double>(
        tween: Tween(begin: 0.0, end: 1.0),
        duration: const Duration(milliseconds: 400),
        curve: Curves.elasticOut,
        builder: (context, value, child) {
          return Transform.scale(scale: value, child: child);
        },
        child: Container(
          width: 22,
          height: 22,
          decoration: BoxDecoration(
            color: const Color(0xFF22C55E).withOpacity(0.15),
            shape: BoxShape.circle,
            border: Border.all(color: const Color(0xFF22C55E), width: 1.5),
          ),
          child: const Icon(Icons.check, size: 12, color: Color(0xFF22C55E)),
        ),
      );
    }
    if (status == CheckStatus.fail) {
      return TweenAnimationBuilder<double>(
        tween: Tween(begin: 0.0, end: 1.0),
        duration: const Duration(milliseconds: 400),
        curve: Curves.elasticOut,
        builder: (context, value, child) {
          return Transform.scale(scale: value, child: child);
        },
        child: Container(
          width: 22,
          height: 22,
          decoration: BoxDecoration(
            color: const Color(0xFFEF4444).withOpacity(0.15),
            shape: BoxShape.circle,
            border: Border.all(color: const Color(0xFFEF4444), width: 1.5),
          ),
          child: const Icon(Icons.close, size: 12, color: Color(0xFFEF4444)),
        ),
      );
    }
    if (status == CheckStatus.checking) {
      return Container(
        width: 22,
        height: 22,
        padding: const EdgeInsets.all(2),
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: Colors.white.withOpacity(0.1), width: 1.5),
        ),
        child: const CircularProgressIndicator(
          strokeWidth: 1.5,
          valueColor: AlwaysStoppedAnimation<Color>(Color(0xFFF5C518)),
        ),
      );
    }
    // waiting
    return Container(
      width: 22,
      height: 22,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: Colors.white.withOpacity(0.2), width: 1.5),
      ),
    );
  }
}

class _StatusText extends StatelessWidget {
  final CheckStatus status;

  const _StatusText({required this.status});

  @override
  Widget build(BuildContext context) {
    String text;
    Color color;

    switch (status) {
      case CheckStatus.waiting:
        text = 'Menunggu';
        color = Colors.white.withOpacity(0.3);
        break;
      case CheckStatus.checking:
        text = 'Memeriksa...';
        color = const Color(0xFFF5C518);
        break;
      case CheckStatus.pass:
        text = 'Tidak Terdeteksi';
        color = const Color(0xFF22C55E);
        break;
      case CheckStatus.fail:
        text = 'Terdeteksi!';
        color = const Color(0xFFEF4444);
        break;
    }

    return Text(text, style: TextStyle(color: color, fontSize: 11));
  }
}

class _ShieldAnimationWidget extends StatefulWidget {
  final bool isComplete;

  const _ShieldAnimationWidget({required this.isComplete});

  @override
  State<_ShieldAnimationWidget> createState() => _ShieldAnimationWidgetState();
}

class _ShieldAnimationWidgetState extends State<_ShieldAnimationWidget>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    );
    _pulseController.repeat();
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 140,
      height: 140,
      child: Center(
        child: SizedBox(
          width: 120,
          height: 120,
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Outer pulse rings
              for (int i = 1; i <= 3; i++)
                AnimatedBuilder(
                  animation: _pulseController,
                  builder: (context, child) {
                    double t = (_pulseController.value + (i * 0.3)) % 1.0;
                    double easeOut = 1.0 - (1.0 - t) * (1.0 - t);
                    double size = 60 + (easeOut * 60);
                    double opacity = 0.8 * (1.0 - easeOut);

                    return Container(
                      width: size,
                      height: size,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: const Color(
                            0xFFF5C518,
                          ).withOpacity(opacity * 0.3),
                        ),
                      ),
                    );
                  },
                ),

              // Shield Body
              AnimatedScale(
                scale: widget.isComplete ? 1.08 : 1.0,
                duration: const Duration(milliseconds: 400),
                curve: Curves.elasticOut,
                child: Container(
                  width: 72,
                  height: 80,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [Color(0xFF1A3A6E), Color(0xFF0E2550)],
                    ),
                    border: Border.all(
                      color: const Color(0xFFF5C518),
                      width: 2,
                    ),
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(8),
                      topRight: Radius.circular(8),
                      bottomLeft: Radius.circular(36),
                      bottomRight: Radius.circular(36),
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFFF5C518).withOpacity(0.2),
                        blurRadius: 16,
                      ),
                    ],
                  ),
                  child: Center(
                    child: AnimatedBuilder(
                      animation: _pulseController,
                      builder: (context, child) {
                        double t = _pulseController.value;
                        double opacity =
                            0.7 + (0.3 * (0.5 - (0.5 - t).abs()) * 2);
                        return Opacity(
                          opacity: opacity,
                          child: const Icon(
                            Icons.security,
                            color: Color(0xFFF5C518),
                            size: 36,
                          ),
                        );
                      },
                    ),
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
