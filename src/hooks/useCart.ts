import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from '@/services/api'

// Get cart
export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

// Add to cart
export function useAddToCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: data => {
      queryClient.setQueryData(['cart'], data)
    },
  })
}

// Remove from cart
export function useRemoveFromCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => removeFromCart(productId),
    onSuccess: data => {
      queryClient.setQueryData(['cart'], data)
    },
  })
}

// Update quantity
export function useUpdateCartQuantity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => updateCartItemQuantity(productId, quantity),
    onSuccess: data => {
      queryClient.setQueryData(['cart'], data)
    },
  })
}
