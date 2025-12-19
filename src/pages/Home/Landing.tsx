import { useState } from 'react'
import { motion } from 'framer-motion'
import { FloatingOrb } from '@/components/common/FloatingOrb'
import { Hero } from '@/components/common/Hero'
import { Features } from '@/components/common/Features'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types'
import redHeadImage from '@/assets/red-head.jpg'
import slimImage from '@/assets/slim.jpg'
import blackWhiteImage from '@/assets/black-white.png'
import farmImage from '@/assets/farm.png'

// Demo products
const products: Product[] = [
  {
    id: '1',
    name: 'Aurora Premium Silicone',
    brand: 'ROMANTIX Elite',
    price: 1899,
    compareAtPrice: 2299,
    image: redHeadImage,
    hoverImage: redHeadImage,
    badges: ['bestseller'],
    specs: { height: '165', weight: '32', cup: 'D', material: 'silicone' },
    collection: 'premium',
    color: '#ff2d8a',
  },
  {
    id: '2',
    name: 'Bella Fantasy Collection',
    brand: 'ROMANTIX',
    price: 2499,
    image: slimImage,
    hoverImage: slimImage,
    badges: ['new', 'limited'],
    specs: { height: '168', weight: '35', cup: 'E', material: 'silicone' },
    collection: 'fantasy',
    color: '#8b3dff',
  },
  {
    id: '3',
    name: 'Luna Sensual Series',
    brand: 'ROMANTIX',
    price: 1299,
    compareAtPrice: 1699,
    image: blackWhiteImage,
    hoverImage: blackWhiteImage,
    badges: ['sale'],
    specs: { height: '158', weight: '28', cup: 'C', material: 'tpe' },
    collection: 'sensual',
    color: '#ff3347',
  },
  {
    id: '4',
    name: 'Sakura Anime Edition',
    brand: 'ROMANTIX Fantasy',
    price: 1599,
    image: farmImage,
    hoverImage: farmImage,
    badges: ['new'],
    specs: { height: '155', weight: '26', cup: 'B', material: 'silicone' },
    collection: 'anime',
    color: '#ff69b4',
  },
]

export default function LandingPage() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0d0812 0%, #150d1e 50%, #0d0812 100%)',
      }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingOrb
          color="rgba(255, 45, 138, 0.12)"
          size={500}
          x="5%"
          y="15%"
          duration={9}
        />
        <FloatingOrb
          color="rgba(139, 61, 255, 0.12)"
          size={450}
          x="65%"
          y="55%"
          duration={11}
        />
        <FloatingOrb
          color="rgba(255, 51, 71, 0.08)"
          size={400}
          x="75%"
          y="5%"
          duration={13}
        />
      </div>

      {/* Header */}
      <Header cartCount={cartCount} />

      {/* Hero */}
      <Hero />

      {/* Products */}
      <section className="py-12 md:py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-2xl md:text-3xl font-semibold text-white mb-2"
              style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
            >
              Featured <span className="text-pink-400">Companions</span>
            </h3>
            <p className="text-gray-500 text-sm">
              Discover our most desired models
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAdd={() => setCartCount(c => c + 1)}
                />
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
  )
}
