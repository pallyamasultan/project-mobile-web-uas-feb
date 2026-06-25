import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:math';
import '../widget/diagonal_pill.dart';

class LoginScreen extends StatefulWidget {
  final VoidCallback onNext;

  const LoginScreen({super.key, required this.onNext});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with TickerProviderStateMixin {
  final TextEditingController _nimController = TextEditingController();
  final TextEditingController _dobController = TextEditingController();

  final FocusNode _nimFocusNode = FocusNode();
  final FocusNode _dobFocusNode = FocusNode();

  bool _nimFocused = false;
  bool _dobFocused = false;
  bool _loading = false;

  String? _nimError;
  String? _dobError;

  late AnimationController _headerAnimController;
  late Animation<double> _headerOpacity;
  late Animation<double> _headerScale;

  late AnimationController _formAnimController;
  late Animation<double> _formOpacity;
  late Animation<Offset> _formOffset;

  late AnimationController _shimmerController;

  @override
  void initState() {
    super.initState();

    _nimFocusNode.addListener(() {
      setState(() => _nimFocused = _nimFocusNode.hasFocus);
    });
    _dobFocusNode.addListener(() {
      setState(() => _dobFocused = _dobFocusNode.hasFocus);
    });

    _headerAnimController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _headerOpacity = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _headerAnimController, curve: Curves.easeOut),
    );
    _headerScale = Tween<double>(begin: 0.85, end: 1.0).animate(
      CurvedAnimation(parent: _headerAnimController, curve: Curves.easeOut),
    );
    _headerAnimController.forward();

    _formAnimController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _formOpacity = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _formAnimController, curve: Curves.easeOut),
    );
    _formOffset = Tween<Offset>(begin: const Offset(0, 0.1), end: Offset.zero)
        .animate(
          CurvedAnimation(parent: _formAnimController, curve: Curves.easeOut),
        );
    Future.delayed(const Duration(milliseconds: 150), () {
      if (mounted) _formAnimController.forward();
    });

    _shimmerController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2500),
    );
    _shimmerController.repeat();
  }

  @override
  void dispose() {
    _nimController.dispose();
    _dobController.dispose();
    _nimFocusNode.dispose();
    _dobFocusNode.dispose();
    _headerAnimController.dispose();
    _formAnimController.dispose();
    _shimmerController.dispose();
    super.dispose();
  }

  void _handleSubmit() {
    bool valid = true;
    final nimText = _nimController.text.trim();
    final dobText = _dobController.text.trim();

    setState(() {
      if (nimText.isEmpty) {
        _nimError = "NIM tidak boleh kosong";
        valid = false;
      } else {
        _nimError = null;
      }

      if (dobText.isEmpty) {
        _dobError = "Tanggal lahir tidak boleh kosong";
        valid = false;
      } else {
        _dobError = null;
      }
    });

    if (!valid) return;

    setState(() {
      _loading = true;
    });

    Timer(const Duration(milliseconds: 1500), () {
      if (mounted) {
        setState(() {
          _loading = false;
        });
        widget.onNext();
      }
    });
  }

  void _onNimChanged(String value) {
    setState(() {
      _nimError = null;
    });
  }

  void _onDobChanged(String value) {
    setState(() {
      _dobError = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090722),
      body: SingleChildScrollView(
        child: ConstrainedBox(
          constraints: BoxConstraints(
            minHeight: MediaQuery.of(context).size.height,
          ),
              child: IntrinsicHeight(
                child: Stack(
                  children: [
                    // Background Pills for Header
                    const DiagonalPill(width: 250, height: 50, top: -20, left: -50),
                    const DiagonalPill(width: 300, height: 60, top: 120, left: 200),
                    const DiagonalPill(width: 150, height: 40, top: 220, left: -20),
                    Column(
                      children: [
                    // Top Header
                    Container(
                      padding: EdgeInsets.only(
                        top: MediaQuery.of(context).padding.top + 28,
                        bottom: 36,
                        left: 24,
                        right: 24,
                      ),
                      constraints: const BoxConstraints(minHeight: 230),
                      child: Center(
                        child: AnimatedBuilder(
                          animation: _headerAnimController,
                          builder: (context, child) {
                            return Opacity(
                              opacity: _headerOpacity.value,
                              child: Transform.scale(
                                scale: _headerScale.value,
                                child: child,
                              ),
                            );
                          },
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              // Logo
                              SizedBox(
                                width: 240,
                                child: Image.asset(
                                  'assets/images/logo_final.png',
                                  fit: BoxFit.contain,
                                  errorBuilder: (context, error, stackTrace) {
                                    return const Icon(
                                      Icons.school,
                                      size: 80,
                                      color: Colors.white,
                                    );
                                  },
                                ),
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'Masuk dengan akun mahasiswa',
                                style: TextStyle(
                                  color: Colors.white.withOpacity(0.5),
                                  fontSize: 12,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),

                    // White Form Panel
                    Expanded(
                      child: AnimatedBuilder(
                        animation: _formAnimController,
                        builder: (context, child) {
                          return Opacity(
                            opacity: _formOpacity.value,
                            child: FractionalTranslation(
                              translation: _formOffset.value,
                              child: child,
                            ),
                          );
                        },
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.only(
                            left: 24,
                            right: 24,
                            top: 28,
                            bottom: 24,
                          ),
                          decoration: const BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(50),
                              topRight: Radius.circular(50),
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black26,
                                blurRadius: 32,
                                offset: Offset(0, -4),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Masuk',
                                style: TextStyle(
                                  color: Color(0xFF090722),
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              const SizedBox(height: 20),

                              // NIM Field
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  RichText(
                                    text: const TextSpan(
                                      text: 'NIM ',
                                      style: TextStyle(
                                        color: Color(0xFF374151),
                                        fontSize: 13,
                                        fontWeight: FontWeight.w600,
                                      ),
                                      children: [
                                        TextSpan(
                                          text: '(Nomor Induk Mahasiswa)',
                                          style: TextStyle(
                                            color: Color(0xFF9CA3AF),
                                            fontWeight: FontWeight.w400,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  AnimatedContainer(
                                    duration: const Duration(milliseconds: 150),
                                    decoration: BoxDecoration(
                                      color: _nimFocused
                                          ? const Color(0xFFF8FAFF)
                                          : const Color(0xFFF9FAFB),
                                      borderRadius: BorderRadius.circular(12),
                                      border: Border.all(
                                        color: _nimFocused
                                            ? const Color(0xFF090722).withOpacity(0.5)
                                            : Colors.black.withOpacity(0.1),
                                        width: _nimFocused ? 1.5 : 1,
                                      ),
                                    ),
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: TextField(
                                            controller: _nimController,
                                            focusNode: _nimFocusNode,
                                            keyboardType: TextInputType.number,
                                            inputFormatters: [
                                              FilteringTextInputFormatter.digitsOnly,
                                              LengthLimitingTextInputFormatter(12),
                                            ],
                                            onChanged: _onNimChanged,
                                            style: const TextStyle(
                                              color: Color(0xFF111827),
                                              fontSize: 15,
                                              letterSpacing: 0.5,
                                            ),
                                            decoration: const InputDecoration(
                                              hintText: 'Contoh: 2024010001',
                                              hintStyle: TextStyle(
                                                color: Color(0xFF9CA3AF),
                                              ),
                                              contentPadding: EdgeInsets.symmetric(
                                                horizontal: 16,
                                                vertical: 14,
                                              ),
                                              border: InputBorder.none,
                                              isDense: true,
                                            ),
                                          ),
                                        ),
                                        if (_nimController.text.isNotEmpty)
                                          TweenAnimationBuilder<double>(
                                            tween: Tween(begin: 0.0, end: 1.0),
                                            duration: const Duration(milliseconds: 200),
                                            builder: (context, value, child) {
                                              return Opacity(
                                                opacity: value,
                                                child: Transform.scale(
                                                  scale: 0.6 + (0.4 * value),
                                                  child: child,
                                                ),
                                              );
                                            },
                                            child: Container(
                                              margin: const EdgeInsets.only(right: 12),
                                              width: 18,
                                              height: 18,
                                              decoration: const BoxDecoration(
                                                color: Color(0xFF22C55E),
                                                shape: BoxShape.circle,
                                              ),
                                              child: const Icon(
                                                Icons.check,
                                                size: 12,
                                                color: Colors.white,
                                              ),
                                            ),
                                          ),
                                      ],
                                    ),
                                  ),
                                  if (_nimError != null)
                                    Padding(
                                      padding: const EdgeInsets.only(top: 4, left: 4),
                                      child: Text(
                                        _nimError!,
                                        style: const TextStyle(
                                          color: Color(0xFFEF4444),
                                          fontSize: 11,
                                        ),
                                      ),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 16),

                              // DOB Field
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  RichText(
                                    text: const TextSpan(
                                      text: 'Tanggal Lahir ',
                                      style: TextStyle(
                                        color: Color(0xFF374151),
                                        fontSize: 13,
                                        fontWeight: FontWeight.w600,
                                      ),
                                      children: [
                                        TextSpan(
                                          text: '(Password)',
                                          style: TextStyle(
                                            color: Color(0xFF9CA3AF),
                                            fontWeight: FontWeight.w400,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  AnimatedContainer(
                                    duration: const Duration(milliseconds: 150),
                                    decoration: BoxDecoration(
                                      color: _dobFocused
                                          ? const Color(0xFFF8FAFF)
                                          : const Color(0xFFF9FAFB),
                                      borderRadius: BorderRadius.circular(12),
                                      border: Border.all(
                                        color: _dobFocused
                                            ? const Color(0xFF090722).withOpacity(0.5)
                                            : Colors.black.withOpacity(0.1),
                                        width: _dobFocused ? 1.5 : 1,
                                      ),
                                    ),
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: TextField(
                                            controller: _dobController,
                                            focusNode: _dobFocusNode,
                                            keyboardType: TextInputType.number,
                                            onChanged: (val) {
                                              final digits = val.replaceAll(
                                                RegExp(r'\D'),
                                                '',
                                              );
                                              String formatted = digits;
                                              if (digits.length > 2) {
                                                formatted =
                                                    '${digits.substring(0, 2)}/${digits.substring(2)}';
                                              }
                                              if (digits.length > 4) {
                                                formatted =
                                                    '${digits.substring(0, 2)}/${digits.substring(2, 4)}/${digits.substring(4)}';
                                              }
                                              if (formatted.length > 10) {
                                                formatted = formatted.substring(0, 10);
                                              }
                                              _dobController.value = TextEditingValue(
                                                text: formatted,
                                                selection: TextSelection.collapsed(
                                                  offset: formatted.length,
                                                ),
                                              );
                                              _onDobChanged(formatted);
                                            },
                                            style: const TextStyle(
                                              color: Color(0xFF111827),
                                              fontSize: 15,
                                              letterSpacing: 1,
                                            ),
                                            decoration: const InputDecoration(
                                              hintText: 'DD / MM / YYYY',
                                              hintStyle: TextStyle(
                                                color: Color(0xFF9CA3AF),
                                              ),
                                              contentPadding: EdgeInsets.symmetric(
                                                horizontal: 16,
                                                vertical: 14,
                                              ),
                                              border: InputBorder.none,
                                              isDense: true,
                                            ),
                                          ),
                                        ),
                                        const Padding(
                                          padding: EdgeInsets.only(right: 16.0),
                                          child: Icon(
                                            Icons.calendar_today_outlined,
                                            color: Color(0xFF94A3B8),
                                            size: 18,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  if (_dobError != null)
                                    Padding(
                                      padding: const EdgeInsets.only(top: 4, left: 4),
                                      child: Text(
                                        _dobError!,
                                        style: const TextStyle(
                                          color: Color(0xFFEF4444),
                                          fontSize: 11,
                                        ),
                                      ),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 24),

                              // Submit Button
                              GestureDetector(
                                onTap: _loading ? null : _handleSubmit,
                                child: Container(
                                  height: 52,
                                  width: double.infinity,
                                  clipBehavior: Clip.hardEdge,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(100),
                                    gradient: _loading
                                        ? null
                                        : const LinearGradient(
                                            begin: Alignment.topLeft,
                                            end: Alignment.bottomRight,
                                            colors: [
                                              Color(0xFF090722),
                                              Color(0xFFEE9108),
                                            ],
                                          ),
                                    color: _loading ? const Color(0xFFF5B553) : null,
                                    boxShadow: _loading
                                        ? null
                                        : [
                                            BoxShadow(
                                              color: const Color(
                                                0xFF090722,
                                              ).withOpacity(0.35),
                                              blurRadius: 16,
                                              offset: const Offset(0, 4),
                                            ),
                                          ],
                                  ),
                                  child: Stack(
                                    children: [
                                      if (!_loading)
                                        AnimatedBuilder(
                                          animation: _shimmerController,
                                          builder: (context, child) {
                                            return FractionalTranslation(
                                              translation: Offset(
                                                -1.5 + (_shimmerController.value * 3.5),
                                                0,
                                              ),
                                              child: Container(
                                                width: 60,
                                                height: double.infinity,
                                                decoration: BoxDecoration(
                                                  gradient: LinearGradient(
                                                    colors: [
                                                      Colors.white.withOpacity(0.0),
                                                      Colors.white.withOpacity(0.07),
                                                      Colors.white.withOpacity(0.0),
                                                    ],
                                                  ),
                                                ),
                                              ),
                                            );
                                          },
                                        ),
                                      Center(
                                        child: _loading
                                            ? Container(
                                                width: 22,
                                                height: 22,
                                                decoration: BoxDecoration(
                                                  shape: BoxShape.circle,
                                                  border: Border.all(
                                                  color: Colors.white.withOpacity(0.5),
                                                    width: 2.5,
                                                  ),
                                                ),
                                                child: const CircularProgressIndicator(
                                                  strokeWidth: 2.5,
                                                  valueColor:
                                                      AlwaysStoppedAnimation<Color>(
                                                        Colors.white,
                                                      ),
                                                  backgroundColor: Colors.transparent,
                                                ),
                                              )
                                            : const Text(
                                                'MASUK',
                                                style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 15,
                                                  fontWeight: FontWeight.w700,
                                                  letterSpacing: 2,
                                                ),
                                              ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),

                              const SizedBox(height: 16),

                              // Lupa akun
                              Center(
                                child: GestureDetector(
                                  onTap: () {},
                                  child: const Text(
                                    'Lupa akun? Hubungi Admin',
                                    style: TextStyle(
                                      color: Color(0xFF6B7280),
                                      fontSize: 13,
                                      decoration: TextDecoration.underline,
                                      decorationColor: Color(0x666B7280),
                                    ),
                                  ),
                                ),
                              ),

                              const SizedBox(height: 40),

                              // Security Badges
                              TweenAnimationBuilder<double>(
                                tween: Tween(begin: 0.0, end: 1.0),
                                duration: const Duration(milliseconds: 400),
                                curve: Curves.easeOut,
                                builder: (context, value, child) {
                                  return Opacity(
                                    opacity: value,
                                    child: FractionalTranslation(
                                      translation: Offset(0, 0.2 * (1 - value)),
                                      child: child,
                                    ),
                                  );
                                },
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 12,
                                        vertical: 6,
                                      ),
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF22C55E).withOpacity(0.08),
                                        border: Border.all(
                                          color: const Color(
                                            0xFF22C55E,
                                          ).withOpacity(0.25),
                                        ),
                                        borderRadius: BorderRadius.circular(16),
                                      ),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          const Icon(
                                            Icons.lock_outline,
                                            size: 12,
                                            color: Color(0xFF16A34A),
                                          ),
                                          const SizedBox(width: 6),
                                          const Text(
                                            'Koneksi terenkripsi',
                                            style: TextStyle(
                                              color: Color(0xFF16A34A),
                                              fontSize: 11,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 12,
                                        vertical: 6,
                                      ),
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF22C55E).withOpacity(0.08),
                                        border: Border.all(
                                          color: const Color(
                                            0xFF22C55E,
                                          ).withOpacity(0.25),
                                        ),
                                        borderRadius: BorderRadius.circular(16),
                                      ),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          Container(
                                            width: 10,
                                            height: 10,
                                            decoration: const BoxDecoration(
                                              color: Color(0xFF22C55E),
                                              shape: BoxShape.circle,
                                            ),
                                            child: const Icon(
                                              Icons.check,
                                              size: 8,
                                              color: Colors.white,
                                            ),
                                          ),
                                          const SizedBox(width: 6),
                                          const Text(
                                            'Perangkat terverifikasi',
                                            style: TextStyle(
                                              color: Color(0xFF16A34A),
                                              fontSize: 11,
                                              fontWeight: FontWeight.w500,
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
                        ),
                      ),
                    ),
                  ],
                    ), // end Column
                  ], // end Stack children
                ), // end Stack
              ), // end IntrinsicHeight
            ), // end ConstrainedBox
          ), // end SingleChildScrollView
    ); // end Scaffold
  }
}
