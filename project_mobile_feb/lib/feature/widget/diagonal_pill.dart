import 'package:flutter/material.dart';
import 'dart:math';

class DiagonalPill extends StatelessWidget {
  final double width;
  final double height;
  final double top;
  final double left;
  final double angle;

  const DiagonalPill({
    super.key,
    required this.width,
    required this.height,
    required this.top,
    required this.left,
    this.angle = -pi / 6,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: top,
      left: left,
      child: Transform.rotate(
        angle: angle,
        child: Container(
          width: width,
          height: height,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.1),
            borderRadius: BorderRadius.circular(height / 2),
          ),
        ),
      ),
    );
  }
}
