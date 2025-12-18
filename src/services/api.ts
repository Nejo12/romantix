import type {
  ProductsQueryParams,
  ProductsResponse,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  Cart,
  Wishlist,
  User,
} from '@/types/api'
import type { Product } from '@/types/product'

// Mock delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Aurora Premium Silicone',
    brand: 'romanti.X Elite',
    price: 1899,
    compareAtPrice: 2299,
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
    badges: ['bestseller'],
    specs: { height: '165', weight: '32', cup: 'D', material: 'silicone' },
    collection: 'premium',
    color: '#ff2d8a',
  },
  {
    id: '2',
    name: 'Bella Fantasy Collection',
    brand: 'romanti.X',
    price: 2499,
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=800&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&h=800&fit=crop',
    badges: ['new', 'limited'],
    specs: { height: '168', weight: '35', cup: 'E', material: 'silicone' },
    collection: 'fantasy',
    color: '#8b3dff',
  },
  {
    id: '3',
    name: 'Luna Sensual Series',
    brand: 'romanti.X',
    price: 1299,
    compareAtPrice: 1699,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&h=800&fit=crop',
    badges: ['sale'],
    specs: { height: '158', weight: '28', cup: 'C', material: 'tpe' },
    collection: 'sensual',
    color: '#ff3347',
  },
  {
    id: '4',
    name: 'Sakura Anime Edition',
    brand: 'romanti.X Fantasy',
    price: 1599,
    image:
      'https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=600&h=800&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&h=800&fit=crop',
    badges: ['new'],
    specs: { height: '155', weight: '26', cup: 'B', material: 'silicone' },
    collection: 'anime',
    color: '#ff69b4',
  },
  {
    id: '5',
    name: 'Venus Goddess Curves',
    brand: 'romanti.X Curves',
    price: 1799,
    image:
      'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=600&h=800&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=800&fit=crop',
    badges: ['bestseller'],
    specs: { height: '162', weight: '38', cup: 'F', material: 'tpe' },
    collection: 'curvy',
    color: '#ffd700',
  },
  {
    id: '6',
    name: 'Aria Petite Dream',
    brand: 'romanti.X',
    price: 999,
    compareAtPrice: 1299,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1475669698648-2f144fcaaeb1?w=600&h=800&fit=crop',
    badges: ['sale'],
    specs: { height: '148', weight: '22', cup: 'A', material: 'tpe' },
    collection: 'petite',
    color: '#00d9ff',
  },
  {
    id: '7',
    name: 'Scarlett Premium Plus',
    brand: 'romanti.X Elite',
    price: 2899,
    image:
      'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600&h=800&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
    badges: ['exclusive'],
    specs: { height: '170', weight: '36', cup: 'D', material: 'silicone' },
    collection: 'premium',
    color: '#ff2d8a',
  },
  {
    id: '8',
    name: 'Mika Anime Star',
    brand: 'romanti.X Fantasy',
    price: 1449,
    image:
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&h=800&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop',
    badges: ['new'],
    specs: { height: '152', weight: '24', cup: 'B', material: 'silicone' },
    collection: 'anime',
    color: '#a855f7',
  },
]

// ============================================================================
// PRODUCTS API
// ============================================================================

export async function fetchProducts(
  params: ProductsQueryParams
): Promise<ProductsResponse> {
  await delay(500) // Simulate network delay

  let filtered = [...mockProducts]

  // Apply filters
  if (params.priceRange) {
    const [min, max] = params.priceRange
    filtered = filtered.filter(p => p.price >= min && p.price <= max)
  }

  if (params.materials && params.materials.length > 0) {
    filtered = filtered.filter(p =>
      params.materials!.includes(p.specs.material)
    )
  }

  if (params.heights && params.heights.length > 0) {
    filtered = filtered.filter(p => {
      const h = parseInt(p.specs.height)
      return params.heights!.some(range => {
        if (range === '< 150') return h < 150
        if (range === '150-160') return h >= 150 && h < 160
        if (range === '160-170') return h >= 160 && h < 170
        if (range === '170+') return h >= 170
        return false
      })
    })
  }

  if (params.cups && params.cups.length > 0) {
    filtered = filtered.filter(p => params.cups!.includes(p.specs.cup))
  }

  if (params.collection) {
    filtered = filtered.filter(p => p.collection === params.collection)
  }

  if (params.search) {
    const query = params.search.toLowerCase()
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
    )
  }

  // Apply sorting
  switch (params.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filtered.sort(
        (a, b) =>
          (b.badges?.includes('new') ? 1 : 0) -
          (a.badges?.includes('new') ? 1 : 0)
      )
      break
    default:
      break
  }

  return {
    products: filtered,
    total: filtered.length,
    page: 1,
    pageSize: filtered.length,
  }
}

// ============================================================================
// AUTH API
// ============================================================================

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  await delay(1000)

  // Mock validation
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required')
  }

  // Mock success
  return {
    user: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: credentials.email,
      role: 'customer',
    },
    token: 'mock-jwt-token',
  }
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  await delay(1200)

  // Mock validation
  if (!data.email || !data.password || !data.firstName || !data.lastName) {
    throw new Error('All fields are required')
  }

  // Mock success
  return {
    user: {
      id: '2',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: 'customer',
    },
    token: 'mock-jwt-token',
  }
}

export async function logout(): Promise<void> {
  await delay(300)
  // Mock logout
}

export async function getCurrentUser(): Promise<User | null> {
  await delay(400)
  // Mock - check if token exists in localStorage
  const token = localStorage.getItem('auth-token')
  if (!token) return null

  return {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'customer',
  }
}

// ============================================================================
// CART API
// ============================================================================

const mockCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
}

export async function getCart(): Promise<Cart> {
  await delay(300)
  return mockCart
}

export async function addToCart(productId: string): Promise<Cart> {
  await delay(400)

  const product = mockProducts.find(p => p.id === productId)
  if (!product) throw new Error('Product not found')

  const existingItem = mockCart.items.find(item => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    mockCart.items.push({
      productId,
      quantity: 1,
      product,
    })
  }

  mockCart.itemCount = mockCart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
  mockCart.total = mockCart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return mockCart
}

export async function removeFromCart(productId: string): Promise<Cart> {
  await delay(300)

  mockCart.items = mockCart.items.filter(item => item.productId !== productId)
  mockCart.itemCount = mockCart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
  mockCart.total = mockCart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return mockCart
}

export async function updateCartItemQuantity(
  productId: string,
  quantity: number
): Promise<Cart> {
  await delay(300)

  const item = mockCart.items.find(item => item.productId === productId)
  if (!item) throw new Error('Item not found in cart')

  if (quantity <= 0) {
    return removeFromCart(productId)
  }

  item.quantity = quantity
  mockCart.itemCount = mockCart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
  mockCart.total = mockCart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return mockCart
}

// ============================================================================
// WISHLIST API
// ============================================================================

const mockWishlist: Wishlist = {
  items: [],
  count: 0,
}

export async function getWishlist(): Promise<Wishlist> {
  await delay(300)
  return mockWishlist
}

export async function addToWishlist(productId: string): Promise<Wishlist> {
  await delay(400)

  const product = mockProducts.find(p => p.id === productId)
  if (!product) throw new Error('Product not found')

  const exists = mockWishlist.items.find(item => item.productId === productId)
  if (exists) return mockWishlist

  mockWishlist.items.push({
    productId,
    addedAt: new Date().toISOString(),
    product,
  })
  mockWishlist.count = mockWishlist.items.length

  return mockWishlist
}

export async function removeFromWishlist(productId: string): Promise<Wishlist> {
  await delay(300)

  mockWishlist.items = mockWishlist.items.filter(
    item => item.productId !== productId
  )
  mockWishlist.count = mockWishlist.items.length

  return mockWishlist
}

export async function toggleWishlist(productId: string): Promise<Wishlist> {
  const exists = mockWishlist.items.find(item => item.productId === productId)
  if (exists) {
    return removeFromWishlist(productId)
  } else {
    return addToWishlist(productId)
  }
}
