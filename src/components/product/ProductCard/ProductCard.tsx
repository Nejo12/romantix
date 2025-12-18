import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    onAdd();
    await new Promise(r => setTimeout(r, 600));
    setAdding(false);
  };

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: 'linear-gradient(145deg, rgba(30, 20, 40, 0.9), rgba(15, 10, 25, 0.95))',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(255, 45, 138, 0.15)'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 45, 138, 0.4), rgba(139, 61, 255, 0.4))',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      />
      <div className="relative rounded-2xl overflow-hidden m-[1px]" style={{ background: 'linear-gradient(145deg, rgba(30, 20, 40, 0.98), rgba(15, 10, 25, 1))' }}>

        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-black/50">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
            animate={{
              scale: hovered ? 1.1 : 1,
              filter: hovered ? 'grayscale(0%) brightness(1)' : 'grayscale(30%) brightness(0.85)'
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(15, 10, 25, 0.95) 100%)' }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badges?.map((badge, i) => (
              <motion.span
                key={badge}
                className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-white"
                style={{
                  background: badge === 'new'
                    ? 'linear-gradient(135deg, #10b981, #14b8a6)'
                    : badge === 'sale'
                    ? 'linear-gradient(135deg, #ef4444, #ec4899)'
                    : 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
                }}
                initial={{ scale: 0, x: -10 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
              >
                {badge}
              </motion.span>
            ))}
            {discount > 0 && (
              <span
                className="px-2 py-1 text-[10px] font-bold rounded-full text-white"
                style={{ background: 'linear-gradient(135deg, #ff3347, #ff2d8a)', boxShadow: '0 0 15px rgba(255, 51, 71, 0.4)' }}
              >
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <motion.button
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(15, 10, 25, 0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
            whileHover={{ scale: 1.1, background: 'rgba(255, 45, 138, 0.3)' }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>

          {/* Quick View */}
          <motion.button
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-xs font-semibold text-white"
            style={{ background: 'rgba(15, 10, 25, 0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 45, 138, 0.3)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 15 }}
            whileHover={{ background: 'linear-gradient(135deg, #ff2d8a, #8b3dff)' }}
          >
            Quick View
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: 'linear-gradient(90deg, #ff2d8a, #8b3dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {product.brand}
          </p>

          <h3 className="text-base font-semibold text-white leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            {product.name}
          </h3>

          {product.specs && (
            <p className="text-[11px] text-gray-500">{product.specs}</p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white">€{product.price}</span>
              {product.compareAtPrice && (
                <span className="text-xs text-gray-500 line-through">€{product.compareAtPrice}</span>
              )}
            </div>

            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ff2d8a, #e6006f)', boxShadow: '0 0 20px rgba(255, 45, 138, 0.4)' }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(255, 45, 138, 0.6)' }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
            >
              <AnimatePresence mode="wait">
                {adding ? (
                  <motion.svg key="check" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  <motion.svg key="plus" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
