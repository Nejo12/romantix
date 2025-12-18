import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/services/api'
import type { ProductsQueryParams } from '@/types/api'

export function useProducts(params: ProductsQueryParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
