import type { Product } from './product'

// Product Filters
export interface ProductFilters {
  priceRange?: [number, number]
  materials?: string[]
  heights?: string[]
  cups?: string[]
  collection?: string
  search?: string
}

export interface ProductSortOptions {
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest'
}

export interface ProductsQueryParams
  extends ProductFilters, ProductSortOptions {}

// API Response Types
export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'guest' | 'customer' | 'admin'
}

// Cart Types
export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// Wishlist Types
export interface WishlistItem {
  productId: string
  addedAt: string
  product: Product
}

export interface Wishlist {
  items: WishlistItem[]
  count: number
}
