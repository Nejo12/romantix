import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom'
import { LandingPage } from '@/pages/Home'
import { ProductsPage } from '@/pages/Products'
import { AuthLayout } from '@/components/layout/AuthLayout'
import LoginPage from '@/pages/Auth/Login'
import RegisterPage from '@/pages/Auth/Register'
import SuccessPage from '@/pages/Auth/Success'

// Wrapper components to handle navigation
function LoginRoute() {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <LoginPage
        onSwitch={() => navigate('/register')}
        onSuccess={() => navigate('/success')}
      />
    </AuthLayout>
  )
}

function RegisterRoute() {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <RegisterPage
        onSwitch={() => navigate('/login')}
        onSuccess={() => navigate('/success')}
      />
    </AuthLayout>
  )
}

function SuccessRoute() {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <SuccessPage onContinue={() => navigate('/products')} />
    </AuthLayout>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/login',
    element: <LoginRoute />,
  },
  {
    path: '/register',
    element: <RegisterRoute />,
  },
  {
    path: '/success',
    element: <SuccessRoute />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
