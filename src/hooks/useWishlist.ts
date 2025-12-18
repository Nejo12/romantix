import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
} from '@/services/api'

// Get wishlist
export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Add to wishlist
export function useAddToWishlist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => addToWishlist(productId),
    onSuccess: data => {
      queryClient.setQueryData(['wishlist'], data)
    },
  })
}

// Remove from wishlist
export function useRemoveFromWishlist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onSuccess: data => {
      queryClient.setQueryData(['wishlist'], data)
    },
  })
}

// Toggle wishlist (add if not present, remove if present)
export function useToggleWishlist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => toggleWishlist(productId),
    onSuccess: data => {
      queryClient.setQueryData(['wishlist'], data)
    },
  })
}
