import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { login, register, logout, getCurrentUser } from '@/services/api'
import type { LoginCredentials, RegisterData } from '@/types/api'

// Get current user
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
  })
}

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: data => {
      // Store token
      localStorage.setItem('auth-token', data.token)
      // Update user cache
      queryClient.setQueryData(['user'], data.user)
    },
  })
}

// Register mutation
export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: data => {
      // Store token
      localStorage.setItem('auth-token', data.token)
      // Update user cache
      queryClient.setQueryData(['user'], data.user)
    },
  })
}

// Logout mutation
export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear token
      localStorage.removeItem('auth-token')
      // Clear user cache
      queryClient.setQueryData(['user'], null)
      // Clear all caches
      queryClient.clear()
    },
  })
}
