import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingOrb } from '@/components/common/FloatingOrb'
import { GlassmorphicProductCard } from '@/components/product/GlassmorphicProductCard'
import {
  FilterSection,
  FilterCheckbox,
  PriceRangeSlider,
} from '@/components/product/Filters'
import { useProducts } from '@/hooks/useProducts'
import { useCart, useAddToCart } from '@/hooks/useCart'

interface FiltersContentProps {
  priceRange: [number, number]
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
  selectedMaterials: string[]
  selectedHeights: string[]
  selectedCups: string[]
  toggleFilter: (
    arr: string[],
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => void
  setSelectedMaterials: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedHeights: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedCups: React.Dispatch<React.SetStateAction<string[]>>
  activeFiltersCount: number
  clearFilters: () => void
}

const FiltersContent = ({
  priceRange,
  setPriceRange,
  selectedMaterials,
  selectedHeights,
  selectedCups,
  toggleFilter,
  setSelectedMaterials,
  setSelectedHeights,
  setSelectedCups,
  activeFiltersCount,
  clearFilters,
}: FiltersContentProps) => (
  <>
    <FilterSection title="Price Range">
      <PriceRangeSlider
        min={500}
        max={3000}
        value={priceRange}
        onChange={setPriceRange}
      />
    </FilterSection>

    <FilterSection title="Material">
      <FilterCheckbox
        label="Silicone"
        checked={selectedMaterials.includes('silicone')}
        onChange={() =>
          toggleFilter(selectedMaterials, 'silicone', setSelectedMaterials)
        }
      />
      <FilterCheckbox
        label="TPE"
        checked={selectedMaterials.includes('tpe')}
        onChange={() =>
          toggleFilter(selectedMaterials, 'tpe', setSelectedMaterials)
        }
      />
    </FilterSection>

    <FilterSection title="Height">
      <FilterCheckbox
        label="Under 150cm"
        checked={selectedHeights.includes('< 150')}
        onChange={() =>
          toggleFilter(selectedHeights, '< 150', setSelectedHeights)
        }
      />
      <FilterCheckbox
        label="150-160cm"
        checked={selectedHeights.includes('150-160')}
        onChange={() =>
          toggleFilter(selectedHeights, '150-160', setSelectedHeights)
        }
      />
      <FilterCheckbox
        label="160-170cm"
        checked={selectedHeights.includes('160-170')}
        onChange={() =>
          toggleFilter(selectedHeights, '160-170', setSelectedHeights)
        }
      />
      <FilterCheckbox
        label="170cm+"
        checked={selectedHeights.includes('170+')}
        onChange={() =>
          toggleFilter(selectedHeights, '170+', setSelectedHeights)
        }
      />
    </FilterSection>

    <FilterSection title="Cup Size">
      {['A', 'B', 'C', 'D', 'E', 'F'].map(cup => (
        <FilterCheckbox
          key={cup}
          label={`${cup} Cup`}
          checked={selectedCups.includes(cup)}
          onChange={() => toggleFilter(selectedCups, cup, setSelectedCups)}
        />
      ))}
    </FilterSection>

    {activeFiltersCount > 0 && (
      <button
        onClick={clearFilters}
        className="w-full py-2 text-sm text-pink-400 hover:text-pink-300 transition-colors"
      >
        Clear all filters ({activeFiltersCount})
      </button>
    )}
  </>
)

export default function ProductsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-asc' | 'price-desc' | 'newest'
  >('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 3000])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedHeights, setSelectedHeights] = useState<string[]>([])
  const [selectedCups, setSelectedCups] = useState<string[]>([])

  // TanStack Query hooks
  const { data: cart } = useCart()
  const { mutate: addToCart } = useAddToCart()

  // Fetch products with filters
  const { data, isLoading, error } = useProducts({
    priceRange,
    materials: selectedMaterials,
    heights: selectedHeights,
    cups: selectedCups,
    sortBy,
  })

  const toggleFilter = (
    arr: string[],
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item])
  }

  const filteredProducts = data?.products || []
  const cartCount = cart?.itemCount || 0

  const activeFiltersCount =
    selectedMaterials.length +
    selectedHeights.length +
    selectedCups.length +
    (priceRange[0] > 500 || priceRange[1] < 3000 ? 1 : 0)

  const clearFilters = () => {
    setPriceRange([500, 3000])
    setSelectedMaterials([])
    setSelectedHeights([])
    setSelectedCups([])
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          'linear-gradient(180deg, #0d0812 0%, #150d1e 50%, #0d0812 100%)',
      }}
    >
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingOrb
          color="rgba(255, 45, 138, 0.08)"
          size={500}
          x="5%"
          y="20%"
          duration={9}
        />
        <FloatingOrb
          color="rgba(139, 61, 255, 0.08)"
          size={450}
          x="75%"
          y="60%"
          duration={11}
        />
      </div>

      {/* Header */}
      <Header cartCount={cartCount} />

      {/* Hero Banner */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.p
            className="text-pink-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore Our Collection
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{
              fontFamily:
                "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              background:
                'linear-gradient(135deg, #ff2d8a 0%, #fff 50%, #8b3dff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            All Products
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover our complete collection of premium companions
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-300"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
            <p className="text-sm text-gray-400">
              {filteredProducts.length} products
            </p>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e =>
              setSortBy(
                e.target.value as
                  | 'featured'
                  | 'price-asc'
                  | 'price-desc'
                  | 'newest'
              )
            }
            className="px-4 py-2 rounded-lg text-sm text-gray-300 outline-none cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div
              className="sticky top-24 p-5 rounded-2xl"
              style={{
                background: 'rgba(20, 15, 30, 0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <h3
                className="text-lg font-semibold text-white mb-4"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                }}
              >
                Filters
              </h3>
              <FiltersContent
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedMaterials={selectedMaterials}
                selectedHeights={selectedHeights}
                selectedCups={selectedCups}
                toggleFilter={toggleFilter}
                setSelectedMaterials={setSelectedMaterials}
                setSelectedHeights={setSelectedHeights}
                setSelectedCups={setSelectedCups}
                activeFiltersCount={activeFiltersCount}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-400 mb-4">Error loading products</p>
                <p className="text-gray-500 text-sm">
                  {(error as Error).message}
                </p>
              </div>
            ) : (
              <>
                <motion.div
                  className="grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-3"
                  layout
                >
                  <AnimatePresence>
                    {filteredProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <GlassmorphicProductCard
                          product={product}
                          index={i}
                          onAddToCart={() => addToCart(product.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && !isLoading && (
                  <div className="text-center py-20">
                    <p className="text-gray-400 mb-4">
                      No products match your filters
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 rounded-full text-sm font-medium text-pink-400"
                      style={{ border: '1px solid rgba(255, 45, 138, 0.4)' }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-80 max-w-full z-50 lg:hidden overflow-y-auto"
              style={{
                background: 'linear-gradient(180deg, #150d1e 0%, #0d0812 100%)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-lg font-semibold text-white"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                    }}
                  >
                    Filters
                  </h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
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
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <FiltersContent
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedMaterials={selectedMaterials}
                  selectedHeights={selectedHeights}
                  selectedCups={selectedCups}
                  toggleFilter={toggleFilter}
                  setSelectedMaterials={setSelectedMaterials}
                  setSelectedHeights={setSelectedHeights}
                  setSelectedCups={setSelectedCups}
                  activeFiltersCount={activeFiltersCount}
                  clearFilters={clearFilters}
                />
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-6 py-3 rounded-xl text-white font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #ff2d8a, #8b3dff)',
                  }}
                >
                  Show {filteredProducts.length} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  )
}
