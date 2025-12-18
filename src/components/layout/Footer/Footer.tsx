import { Logo } from '@/components/common/Logo'

export function Footer() {
  return (
    <footer
      className="py-10 text-center relative z-10"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="flex justify-center mb-3">
        <Logo size={60} animated={true} />
      </div>
      <p className="text-gray-500 text-xs">
        Premium Quality • 100% Discreet • Secure Payment • romanti.X
      </p>
    </footer>
  )
}
