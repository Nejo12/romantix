import { useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingOrb } from '@/components/common/FloatingOrb';
import { Hero } from '@/components/common/Hero';
import { Features } from '@/components/common/Features';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/types';

// Demo products
const products: Product[] = [
  {
    id: '1',
    name: 'Aurora Premium Silicone',
    brand: 'ROMANTIX Elite',
    price: 1899,
    compareAtPrice: 2299,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop',
    badges: ['bestseller'],
    specs: '165cm • 32kg • D-Cup'
  },
  {
    id: '2',
    name: 'Bella Fantasy Collection',
    brand: 'ROMANTIX',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop',
    badges: ['new', 'limited'],
    specs: '168cm • 35kg • E-Cup'
  },
  {
    id: '3',
    name: 'Luna Sensual Series',
    brand: 'ROMANTIX',
    price: 1299,
    compareAtPrice: 1699,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop',
    badges: ['sale'],
    specs: '158cm • 28kg • C-Cup'
  },
  {
    id: '4',
    name: 'Sakura Anime Edition',
    brand: 'ROMANTIX Fantasy',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
    badges: ['new'],
    specs: '155cm • 26kg • B-Cup'
  },
];

export default function LandingPage() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(180deg, #0d0812 0%, #150d1e 50%, #0d0812 100%)' }}>

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingOrb color="rgba(255, 45, 138, 0.12)" size={500} x="5%" y="15%" duration={9} />
        <FloatingOrb color="rgba(139, 61, 255, 0.12)" size={450} x="65%" y="55%" duration={11} />
        <FloatingOrb color="rgba(255, 51, 71, 0.08)" size={400} x="75%" y="5%" duration={13} />
      </div>

      {/* Header */}
      <Header cartCount={cartCount} />

      {/* Hero */}
      <Hero />

      {/* Products */}
      <section className="py-12 md:py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="text-center mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              Featured <span className="text-pink-400">Companions</span>
            </h3>
            <p className="text-gray-500 text-sm">Discover our most desired models</p>
          </motion.div>

          <div className="grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <ProductCard product={product} onAdd={() => setCartCount(c => c + 1)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  );
}
