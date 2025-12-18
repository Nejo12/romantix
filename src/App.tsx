import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppRouter } from '@/router'
import { queryClient } from '@/lib/queryClient'

// ═══════════════════════════════════════════════════════════════════════════
// ROMANTIX — Main Application
// Luxury E-Commerce Platform
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
