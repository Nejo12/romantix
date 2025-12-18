export interface Product {
  id: string
  name: string
  brand: string
  price: number
  compareAtPrice?: number
  image: string
  hoverImage: string
  badges?: string[]
  specs: {
    height: string
    weight: string
    cup: string
    material: string
  }
  collection: string
  color: string
}
