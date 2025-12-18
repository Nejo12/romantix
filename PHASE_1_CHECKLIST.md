# Phase 1: Foundation & Authentication - Checklist

**Timeline:** Weeks 1-2
**Status:** 🔄 In Progress

---

## ✅ Completed Tasks

### Project Setup
- [x] Initialize Vite + React 19 + TypeScript project
- [x] Configure Tailwind CSS 4
- [x] Set up ESLint and TypeScript configs
- [x] Configure path aliases (@/)
- [x] Set up testing (Vitest, Testing Library, Playwright)
- [x] Deploy to Vercel

### UI Components
- [x] Button component with loading state
- [x] Input component with icon support
- [x] Checkbox component
- [x] PasswordStrength component
- [x] FloatingOrb component

### Pages & Layout
- [x] Landing page (Home)
- [x] Login page
- [x] Register page
- [x] Success page
- [x] Header component with cart counter
- [x] Footer component
- [x] Hero section component
- [x] Features section component

### Product Components
- [x] Product type definitions
- [x] ProductCard component with animations
- [x] Product grid layout

### Project Structure
- [x] Organize components by feature
- [x] Set up pages directory structure
- [x] Create types directory
- [x] Prepare for services and store directories

---

## 🔄 In Progress

### Routing & Navigation
- [ ] Install React Router 7
- [ ] Create route configuration
- [ ] Set up main router in App.tsx
- [ ] Create route constants/paths file

### Authentication State
- [ ] Create authStore (Zustand)
- [ ] Create userStore (Zustand)
- [ ] Implement login/logout actions
- [ ] Add token management (localStorage)
- [ ] Add token refresh logic

### Protected Routes
- [ ] Create ProtectedRoute component
- [ ] Create PublicRoute component (redirect if logged in)
- [ ] Create RoleRoute component
- [ ] Implement route guards

---

## 📋 To Do

### Role-Based Access Control (RBAC)
- [ ] Define User type with role field
- [ ] Create role constants (GUEST, CUSTOMER, ADMIN)
- [ ] Implement role checking utility
- [ ] Add role-based component rendering
- [ ] Test different role scenarios

### Authentication Flow
- [ ] Connect Login page to authStore
- [ ] Connect Register page to authStore
- [ ] Add form submission handlers
- [ ] Add error handling and display
- [ ] Add success notifications
- [ ] Redirect after successful auth

### Mock API Service
- [ ] Create base API configuration (axios or fetch)
- [ ] Create authService with mock endpoints:
  - [ ] POST /auth/login
  - [ ] POST /auth/register
  - [ ] POST /auth/logout
  - [ ] GET /auth/me
  - [ ] POST /auth/refresh
- [ ] Add API error handling
- [ ] Add loading states

### Password Reset Flow
- [ ] Create ForgotPassword page
- [ ] Create ResetPassword page
- [ ] Add forgot password link to Login
- [ ] Implement password reset logic
- [ ] Add email verification (mock)

### Type Definitions
- [ ] Create auth.ts types (LoginRequest, RegisterRequest, AuthResponse)
- [ ] Create user.ts types (User, UserRole, UserProfile)
- [ ] Export types from index.ts

### Testing
- [ ] Write tests for authStore
- [ ] Write tests for auth pages
- [ ] Write tests for protected routes
- [ ] Write E2E test for login flow
- [ ] Write E2E test for register flow

### Polish & UX
- [ ] Add loading spinners during auth
- [ ] Add toast notifications for success/error
- [ ] Add form validation error messages
- [ ] Add "Remember me" functionality
- [ ] Add session persistence
- [ ] Add logout confirmation
- [ ] Add auto-logout on token expiry

---

## 📝 Implementation Guide

### Step 1: Install Dependencies
```bash
npm install react-router-dom zustand
```

### Step 2: Create Folder Structure
```bash
mkdir -p src/app/routes
mkdir -p src/app/store
mkdir -p src/services
mkdir -p src/types
```

### Step 3: Create Auth Store
Create `src/app/store/authStore.ts`:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Implementation
      },
      register: async (data) => {
        // Implementation
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      checkAuth: async () => {
        // Implementation
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

### Step 4: Create Router Configuration
Create `src/app/routes/index.tsx`:
```typescript
import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '@/pages/Home';
import { LoginPage, RegisterPage } from '@/pages/Auth';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/account',
    element: <ProtectedRoute><AccountDashboard /></ProtectedRoute>,
  },
  {
    path: '/admin',
    element: <RoleRoute allowedRoles={['admin']}><AdminDashboard /></RoleRoute>,
  },
]);
```

### Step 5: Create Protected Route Component
Create `src/app/routes/ProtectedRoute.tsx`:
```typescript
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

### Step 6: Update App.tsx
```typescript
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/routes';

export default function App() {
  return <RouterProvider router={router} />;
}
```

### Step 7: Connect Login Page
Update `src/pages/Auth/Login.tsx` to use authStore:
```typescript
import { useAuthStore } from '@/app/store/authStore';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/account');
    } catch (error) {
      // Handle error
    }
  };

  // Rest of component
}
```

---

## ✅ Phase 1 Completion Criteria

Phase 1 is complete when:
- ✅ Users can register with email/password
- ✅ Users can log in with email/password
- ✅ Users can log out
- ✅ Protected routes redirect to login if not authenticated
- ✅ Admin routes only accessible to admin users
- ✅ Tokens are stored and persisted
- ✅ User session persists on page refresh
- ✅ Password reset flow works
- ✅ All auth flows have error handling
- ✅ Basic tests pass

---

## 🚀 Next Phase

Once Phase 1 is complete, move to **Phase 2: Product Catalog**
- Products listing page
- Product detail page
- Collections/Categories
- Search and filters

See [ROADMAP.md](./ROADMAP.md) for full details.

---

**Last Updated:** December 18, 2025
**Progress:** 40% Complete
