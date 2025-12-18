# TanStack Query Setup - romanti.X

**Date:** December 18, 2025
**Status:** ✅ Complete

---

## Overview

Integrated **TanStack Query v5** (React Query) for powerful data fetching, caching, and state management across the application.

## Configuration

### QueryClient Setup
**Location:** `src/lib/queryClient.ts`

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,        // 5 minutes
      gcTime: 1000 * 60 * 10,          // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### Provider Integration
**Location:** `src/App.tsx`

```typescript
<QueryClientProvider client={queryClient}>
  <AppRouter />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

## API Services

### Mock API Layer
**Location:** `src/services/api.ts`

All API calls are mocked with realistic delays to simulate network requests:

#### Products API
- `fetchProducts(params)` - Fetch products with filters/sorting
- Supports: price range, materials, heights, cups, search, sorting

#### Auth API
- `login(credentials)` - User login
- `register(data)` - User registration
- `logout()` - User logout
- `getCurrentUser()` - Get authenticated user

#### Cart API
- `getCart()` - Fetch cart
- `addToCart(productId)` - Add item to cart
- `removeFromCart(productId)` - Remove item from cart
- `updateCartItemQuantity(productId, quantity)` - Update quantity

#### Wishlist API
- `getWishlist()` - Fetch wishlist
- `addToWishlist(productId)` - Add to wishlist
- `removeFromWishlist(productId)` - Remove from wishlist
- `toggleWishlist(productId)` - Toggle wishlist state

---

## Custom Hooks

### Products Hook
**Location:** `src/hooks/useProducts.ts`

```typescript
const { data, isLoading, error } = useProducts({
  priceRange: [500, 3000],
  materials: ['silicone'],
  cups: ['D', 'E'],
  sortBy: 'price-asc',
});
```

**Features:**
- Automatic caching (5 min stale time)
- Filtered and sorted results
- Loading and error states

---

### Auth Hooks
**Location:** `src/hooks/useAuth.ts`

#### useUser
```typescript
const { data: user, isLoading } = useUser();
```
- Fetches current user
- 10-minute stale time
- No retry on failure

#### useLogin
```typescript
const { mutate: login, isPending } = useLogin();

login({ email, password }, {
  onSuccess: (data) => {
    // Automatically stores token and updates cache
  },
});
```

#### useRegister
```typescript
const { mutate: register, isPending } = useRegister();

register({ firstName, lastName, email, password });
```

#### useLogout
```typescript
const { mutate: logout } = useLogout();

logout(); // Clears token and all caches
```

---

### Cart Hooks
**Location:** `src/hooks/useCart.ts`

#### useCart
```typescript
const { data: cart } = useCart();
// cart = { items, total, itemCount }
```

#### useAddToCart
```typescript
const { mutate: addToCart } = useAddToCart();

addToCart(productId);
```

#### useRemoveFromCart
```typescript
const { mutate: removeFromCart } = useRemoveFromCart();

removeFromCart(productId);
```

#### useUpdateCartQuantity
```typescript
const { mutate: updateQuantity } = useUpdateCartQuantity();

updateQuantity({ productId, quantity: 3 });
```

**Features:**
- Optimistic updates
- Automatic cache invalidation
- 2-minute stale time

---

### Wishlist Hooks
**Location:** `src/hooks/useWishlist.ts`

#### useWishlist
```typescript
const { data: wishlist } = useWishlist();
// wishlist = { items, count }
```

#### useToggleWishlist
```typescript
const { mutate: toggleWishlist } = useToggleWishlist();

toggleWishlist(productId); // Adds if not present, removes if present
```

**Features:**
- Smart toggle functionality
- Optimistic updates
- 5-minute stale time

---

## Type Definitions

### API Types
**Location:** `src/types/api.ts`

```typescript
// Products
interface ProductFilters {
  priceRange?: [number, number];
  materials?: string[];
  heights?: string[];
  cups?: string[];
  collection?: string;
  search?: string;
}

interface ProductSortOptions {
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

// Auth
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'guest' | 'customer' | 'admin';
}

// Cart
interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Wishlist
interface WishlistItem {
  productId: string;
  addedAt: string;
  product: Product;
}

interface Wishlist {
  items: WishlistItem[];
  count: number;
}
```

---

## Implementation Example

### Products Page Integration

**Before (Local State):**
```typescript
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchProducts().then(setProducts);
}, [filters]);
```

**After (TanStack Query):**
```typescript
const { data, isLoading } = useProducts({
  priceRange,
  materials: selectedMaterials,
  sortBy,
});

const products = data?.products || [];
```

**Benefits:**
- ✅ Automatic caching
- ✅ Background refetching
- ✅ Loading states
- ✅ Error handling
- ✅ Request deduplication
- ✅ Optimistic updates

---

## DevTools

**React Query Devtools** are included in development mode:

```typescript
<ReactQueryDevtools initialIsOpen={false} />
```

**Features:**
- View all queries and mutations
- Inspect cache state
- Manually trigger refetch
- Clear caches
- Monitor network activity

**Access:** Look for the React Query icon in the bottom-left corner

---

## Cache Management

### Automatic Invalidation

All mutations automatically invalidate related queries:

```typescript
// Adding to cart invalidates cart query
addToCart(productId) → invalidates ['cart']

// Login invalidates user query
login(credentials) → updates ['user'] cache
```

### Manual Invalidation

```typescript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// Invalidate specific query
queryClient.invalidateQueries({ queryKey: ['products'] });

// Clear all caches
queryClient.clear();
```

---

## Performance Optimizations

1. **Stale-While-Revalidate**
   - Shows cached data immediately
   - Fetches fresh data in background

2. **Request Deduplication**
   - Multiple components requesting same data → single network request

3. **Automatic Garbage Collection**
   - Unused query data removed after 10 minutes

4. **Optimistic Updates**
   - UI updates immediately on mutations
   - Rolls back on error

5. **Smart Refetching**
   - Refetches on reconnect
   - Doesn't refetch on window focus (disabled for better UX)

---

## Migration from Local State

### Step-by-Step Guide

1. **Replace useState with useQuery:**
   ```typescript
   // Before
   const [data, setData] = useState([]);

   // After
   const { data } = useQuery({ ... });
   ```

2. **Replace useEffect fetching:**
   ```typescript
   // Before
   useEffect(() => {
     fetchData().then(setData);
   }, []);

   // After
   const { data } = useQuery({
     queryKey: ['data'],
     queryFn: fetchData,
   });
   ```

3. **Handle loading states:**
   ```typescript
   const { data, isLoading, error } = useQuery({ ... });

   if (isLoading) return <Loader />;
   if (error) return <Error />;
   ```

4. **Replace mutation logic:**
   ```typescript
   // Before
   const handleAdd = async () => {
     setLoading(true);
     await addItem();
     setLoading(false);
   };

   // After
   const { mutate, isPending } = useMutation({ ... });
   ```

---

## Best Practices

### 1. Query Keys
Use descriptive, hierarchical query keys:
```typescript
// Good
['products', { filters, sortBy }]
['cart']
['user']
['wishlist']

// Bad
['data']
['items']
```

### 2. Error Handling
Always handle errors in UI:
```typescript
const { data, error } = useQuery({ ... });

if (error) {
  return <ErrorMessage error={error} />;
}
```

### 3. Loading States
Show appropriate loading UI:
```typescript
if (isLoading) {
  return <Skeleton />;
}
```

### 4. Optimistic Updates
Use for better UX on mutations:
```typescript
useMutation({
  mutationFn: addToCart,
  onMutate: async (productId) => {
    // Optimistically update cache
    await queryClient.cancelQueries({ queryKey: ['cart'] });
    const previous = queryClient.getQueryData(['cart']);
    queryClient.setQueryData(['cart'], (old) => ({
      ...old,
      items: [...old.items, newItem],
    }));
    return { previous };
  },
  onError: (err, productId, context) => {
    // Rollback on error
    queryClient.setQueryData(['cart'], context.previous);
  },
});
```

---

## Future Enhancements

### Planned Features

1. **Pagination**
   - Infinite scroll for products
   - Cursor-based pagination

2. **Search Debouncing**
   - Debounced search queries
   - Cancel previous requests

3. **Prefetching**
   - Prefetch next page
   - Prefetch on hover

4. **Mutation Queues**
   - Queue offline mutations
   - Retry on reconnect

5. **Persistence**
   - Persist cache to localStorage
   - Hydrate on mount

---

## Troubleshooting

### Common Issues

**Issue:** Queries not refetching
```typescript
// Solution: Invalidate manually
queryClient.invalidateQueries({ queryKey: ['products'] });
```

**Issue:** Stale data showing
```typescript
// Solution: Reduce staleTime or force refetch
const { data, refetch } = useQuery({
  staleTime: 0, // Always fresh
});
```

**Issue:** Too many network requests
```typescript
// Solution: Increase staleTime
staleTime: 1000 * 60 * 10, // 10 minutes
```

---

## Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Query Devtools](https://tanstack.com/query/latest/docs/react/devtools)
- [Best Practices](https://tkdodo.eu/blog/practical-react-query)

---

**Status:** ✅ TanStack Query fully integrated and tested!
