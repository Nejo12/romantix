import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/types/product'

interface GlassmorphicProductCardProps {
  product: Product
  index: number
  onAddToCart: () => void
}

const badgeStyles: Record<string, { bg: string; shadow: string }> = {
  new: {
    bg: 'from-emerald-400 to-teal-500',
    shadow: 'rgba(16, 185, 129, 0.5)',
  },
  sale: { bg: 'from-rose-500 to-pink-600', shadow: 'rgba(244, 63, 94, 0.5)' },
  bestseller: {
    bg: 'from-amber-400 to-orange-500',
    shadow: 'rgba(251, 191, 36, 0.5)',
  },
  limited: {
    bg: 'from-violet-500 to-purple-600',
    shadow: 'rgba(139, 92, 246, 0.5)',
  },
  exclusive: {
    bg: 'from-pink-500 to-rose-600',
    shadow: 'rgba(236, 72, 153, 0.5)',
  },
}

export function GlassmorphicProductCard({
  product,
  index,
  onAddToCart,
}: GlassmorphicProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAdding(true)
    onAddToCart()
    await new Promise(r => setTimeout(r, 800))
    setIsAdding(false)
  }

  return (
    <motion.article
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow on hover */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${product.color}40, transparent, ${product.color}20)`,
        }}
      />

      {/* Main card container */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow:
            '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${product.color}20, inset 0 1px 0 rgba(255,255,255,0.15)`,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${product.color}60, transparent 50%, rgba(139, 61, 255, 0.3))`,
            opacity: 0,
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: isHovered ? '200% 0' : '-200% 0' }}
          transition={{ duration: 0.8 }}
        />

        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Background blur layer */}
          <div
            className="absolute inset-0 scale-110 blur-2xl opacity-50"
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Main image */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.08 : 1,
              filter: isHovered
                ? 'brightness(1.1) contrast(1.05)'
                : 'brightness(0.95)',
            }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={isHovered ? 'hover' : 'default'}
                src={isHovered ? product.hoverImage : product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              background: `linear-gradient(135deg, ${product.color}40 0%, transparent 50%)`,
            }}
          />

          {/* Top glass bar with badges */}
          <div className="absolute top-0 left-0 right-0 p-3">
            <div
              className="flex items-start justify-between"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
                margin: '-12px',
                padding: '12px',
                paddingBottom: '24px',
              }}
            >
              {/* Badges */}
              <div className="flex flex-col gap-1.5">
                {product.badges?.map((badge, i) => (
                  <motion.span
                    key={badge}
                    className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full text-white bg-gradient-to-r ${badgeStyles[badge]?.bg}`}
                    style={{
                      boxShadow: `0 2px 10px ${badgeStyles[badge]?.shadow}`,
                      backdropFilter: 'blur(8px)',
                    }}
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      type: 'spring',
                      stiffness: 400,
                    }}
                  >
                    {badge}
                  </motion.span>
                ))}
                {discount > 0 && (
                  <motion.span
                    className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full text-white bg-gradient-to-r from-red-500 to-rose-600"
                    style={{ boxShadow: '0 2px 10px rgba(239, 68, 68, 0.5)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    -{discount}%
                  </motion.span>
                )}
              </div>

              {/* Wishlist button */}
              <motion.button
                className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                whileHover={{
                  scale: 1.1,
                  background: 'rgba(255, 45, 138, 0.3)',
                }}
                whileTap={{ scale: 0.9 }}
                onClick={e => {
                  e.stopPropagation()
                  setIsWishlisted(!isWishlisted)
                }}
              >
                <motion.svg
                  className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-pink-500' : 'text-white'}`}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </motion.svg>
              </motion.button>
            </div>
          </div>

          {/* Quick view button */}
          <motion.button
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-xs font-semibold text-white"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            whileHover={{
              background: `linear-gradient(135deg, ${product.color}, #8b3dff)`,
              border: '1px solid transparent',
              boxShadow: `0 4px 25px ${product.color}50`,
            }}
          >
            Quick View
          </motion.button>
        </div>

        {/* Content area - glass effect */}
        <div
          className="relative p-4"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at bottom, ${product.color}10 0%, transparent 70%)`,
            }}
          />

          <div className="relative space-y-2">
            {/* Brand */}
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{
                background: `linear-gradient(90deg, ${product.color}, #8b3dff)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {product.brand}
            </p>

            {/* Name */}
            <h3
              className="text-base font-semibold text-white leading-tight line-clamp-2"
              style={{
                fontFamily:
                  "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              }}
            >
              {product.name}
            </h3>

            {/* Specs with glass pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                `${product.specs.height}cm`,
                `${product.specs.weight}kg`,
                `${product.specs.cup}-Cup`,
                product.specs.material,
              ].map((spec, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] text-gray-300 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-xl font-bold"
                  style={{
                    background:
                      'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  €{product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    €{product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Add to cart button */}
              <motion.button
                className="relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)`,
                  boxShadow: `0 4px 20px ${product.color}50`,
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 6px 30px ${product.color}70`,
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
              >
                {/* Button shine */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                  }}
                />

                <AnimatePresence mode="wait">
                  {isAdding ? (
                    <motion.svg
                      key="check"
                      className="w-5 h-5 text-white relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="cart"
                      className="w-5 h-5 text-white relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}
