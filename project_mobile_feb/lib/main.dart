import 'package:flutter/material.dart';
import 'feature/auth/splash_screen.dart';
import 'feature/auth/security_screen.dart';
import 'feature/auth/login_screen.dart';
import 'feature/auth/biometric_screen.dart';
import 'feature/auth/geofence_screen.dart';
import 'feature/dashboard/dashboard_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aplikasi Ujian FEB UNSAP',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0B1E3D)),
        useMaterial3: true,
      ),
      home: const AuthFlow(),
    );
  }
}

class AuthFlow extends StatefulWidget {
  const AuthFlow({super.key});

  @override
  State<AuthFlow> createState() => _AuthFlowState();
}

class _AuthFlowState extends State<AuthFlow> {
  int _currentScreenIndex = 0;

  void _nextScreen() {
    setState(() {
      _currentScreenIndex++;
    });
  }

  @override
  Widget build(BuildContext context) {
    switch (_currentScreenIndex) {
      case 0:
        return SplashScreen(onNext: _nextScreen);
      case 1:
        return SecurityScreen(onNext: _nextScreen);
      case 2:
        return LoginScreen(
          onNext: () {
            setState(() {
              _currentScreenIndex = 3; // Go to Biometric
            });
          },
        );
      case 3:
        return BiometricScreen(
          onNext: () {
            setState(() {
              _currentScreenIndex = 4; // Go to Geofence
            });
          },
          onBack: () {
            setState(() {
              _currentScreenIndex = 2; // Back to Login
            });
          },
        );
      case 4:
        return GeofenceScreen(
          onNext: () {
            setState(() {
              _currentScreenIndex = 5; // Go to Dashboard
            });
          },
          onBack: () {
            setState(() {
              _currentScreenIndex = 3; // Back to Biometric
            });
          },
        );
      case 5:
        return DashboardScreen(
          onLogout: () {
            setState(() {
              _currentScreenIndex = 2; // Go back to login
            });
          },
        );
      default:
        return SplashScreen(onNext: _nextScreen);
    }
  }
}
