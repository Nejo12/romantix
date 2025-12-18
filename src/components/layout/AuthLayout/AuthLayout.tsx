import { FloatingOrb } from '@/components/common/FloatingOrb'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{
        background:
          'linear-gradient(180deg, #0d0812 0%, #150d1e 50%, #0d0812 100%)',
      }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingOrb
          color="rgba(255, 45, 138, 0.12)"
          size={500}
          x="5%"
          y="15%"
          duration={9}
        />
        <FloatingOrb
          color="rgba(139, 61, 255, 0.12)"
          size={450}
          x="65%"
          y="55%"
          duration={11}
        />
        <FloatingOrb
          color="rgba(255, 51, 71, 0.08)"
          size={400}
          x="75%"
          y="5%"
          duration={13}
        />
      </div>

      {/* Header */}
      <Header cartCount={0} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 relative z-10">
        <div
          className="w-full max-w-md p-8 rounded-2xl"
          style={{
            background:
              'linear-gradient(145deg, rgba(30, 20, 40, 0.6), rgba(15, 10, 25, 0.8))',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          }}
        >
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
