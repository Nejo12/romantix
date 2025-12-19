import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

interface HeaderProps {
  cartCount: number
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(13, 8, 18, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/">
          <motion.h1
            className="text-6xl font-light flex items-center cursor-pointer"
            style={{
              fontFamily:
                "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              letterSpacing: '0.08em',
            }}
          >
            <span
              style={{
                background:
                  'linear-gradient(135deg, #ff2d8a 0%, #8b3dff 50%, #ff2d8a 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              romanti
            </span>
            <motion.span
              style={{
                color: '#ef4444',
                display: 'inline-block',
                fontSize: '1.4em',
                lineHeight: 0.7,
                marginRight: '-0.05em',
              }}
              animate={{
                x: [0, 0, 0, 0, 0, 0, 0, 0, 2, -2, 1, -1, 0],
                y: [0, 0, 0, 0, 0, 0, 0, 0, -5, -3, -6, -2, 0],
                rotate: [0, 0, 0, 0, 0, 0, 0, 0, -3, 2, -1, 1, 0],
                scale: [1, 1, 1, 1, 1.15, 1, 1.15, 1, 1.2, 1.1, 1.15, 1.1, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [
                  0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.67, 0.75, 0.83, 0.92, 0.96,
                  1,
                ],
              }}
            >
              .
            </motion.span>
            <span
              style={{
                background:
                  'linear-gradient(135deg, #ff2d8a 0%, #8b3dff 50%, #ff2d8a 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              X
            </span>
          </motion.h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: 'Shop', path: '/products' },
            { label: 'Fantasy', path: '/products?collection=fantasy' },
            { label: 'Configure', path: '/products' },
            { label: 'About', path: '/' },
          ].map(item => (
            <Link key={item.label} to={item.path}>
              <motion.span
                className="text-sm text-gray-400 hover:text-pink-400 transition-colors cursor-pointer"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Login/Account Button */}
          <Link to="/login">
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-400"
              style={{ background: 'rgba(255,255,255,0.03)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </motion.button>
          </Link>

          {/* Cart Button */}
          <motion.button
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-400"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            whileHover={{ scale: 1.1 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #ff2d8a, #8b3dff)',
                    boxShadow: '0 0 10px rgba(255, 45, 138, 0.5)',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </header>
  )
}
