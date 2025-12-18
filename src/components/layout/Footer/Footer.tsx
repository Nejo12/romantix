import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="py-10 text-center relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <h3
        className="text-2xl font-light mb-3 inline-flex items-center justify-center"
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          letterSpacing: '0.08em'
        }}
      >
        <span style={{ background: 'linear-gradient(135deg, #ff2d8a, #8b3dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          romanti
        </span>
        <motion.span
          style={{
            color: '#ef4444',
            display: 'inline-block',
            fontSize: '1.4em',
            lineHeight: 0.7,
          }}
          animate={{
            x: [0, 2, -2, 1, -1, 0],
            y: [0, -5, -3, -6, -2, 0],
            rotate: [0, -3, 2, -1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
        >
          .
        </motion.span>
        <span style={{ background: 'linear-gradient(135deg, #ff2d8a, #8b3dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          X
        </span>
      </h3>
      <p className="text-gray-500 text-xs">Premium Quality • 100% Discreet • Secure Payment • romanti.X</p>
    </footer>
  );
}
