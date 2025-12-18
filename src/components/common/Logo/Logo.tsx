import { motion } from 'framer-motion'

interface LogoProps {
  size?: number
  className?: string
  animated?: boolean
}

export function Logo({
  size = 120,
  className = '',
  animated = true,
}: LogoProps) {
  // Open heart shape: two arcs at top (open), V-shape at bottom
  // Left arc: from top-left, curves down and in
  // Right arc: from top-right, curves down and in
  // Bottom: sharp V pointing up
  const heartPath =
    'M60,20 C50,20 42,25 38,32 C35,28 30,25 25,28 C20,25 15,30 15,38 C15,45 22,52 35,60 L60,75 L85,60 C98,52 105,45 105,38 C105,30 100,25 95,28 C90,25 85,28 82,32 C78,25 70,20 60,20 Z'

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      initial={animated ? { scale: 0.9, opacity: 0 } : {}}
      animate={animated ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <defs>
        {/* Metallic gradient for heart */}
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#ec4899" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#f472b6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.85" />
        </linearGradient>

        {/* Text gradient */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff2d8a" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#8b3dff" />
        </linearGradient>

        {/* Shadow filter */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Glossy highlight */}
        <linearGradient id="highlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Heart shape with shadow */}
      <motion.path
        d={heartPath}
        fill="url(#heartGradient)"
        filter="url(#shadow)"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="0.5"
        initial={animated ? { pathLength: 0 } : {}}
        animate={animated ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* Glossy highlight overlay */}
      <path d={heartPath} fill="url(#highlight)" opacity="0.6" />

      {/* Text: romanti.X */}
      <text
        x="60"
        y="50"
        textAnchor="middle"
        fontSize="16"
        fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
        fontStyle="italic"
        fontWeight="300"
        fill="url(#textGradient)"
        style={{
          letterSpacing: '0.05em',
        }}
      >
        <tspan x="60" dy="0">
          romanti
        </tspan>
        <tspan fill="#ef4444">.</tspan>
        <tspan fill="url(#textGradient)">X</tspan>
      </text>
    </motion.svg>
  )
}
