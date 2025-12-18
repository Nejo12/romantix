import { motion } from 'framer-motion';

export interface FloatingOrbProps {
  color: string;
  size: number;
  x: string;
  y: string;
  duration: number;
}

export const FloatingOrb = ({ color, size, x, y, duration }: FloatingOrbProps) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      left: x,
      top: y,
      filter: 'blur(60px)',
    }}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -30, 20, 0],
      scale: [1, 1.1, 0.95, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);
