import { motion } from 'framer-motion'

export interface PasswordStrengthProps {
  password: string
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const getStrength = () => {
    if (password.length < 4) return 0
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }

  const strength = getStrength()
  const labels = ['Weak', 'Fair', 'Good', 'Strong']
  const colors = ['#ef4444', '#f59e0b', '#8b3dff', '#10b981']

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{
              background:
                i < strength
                  ? colors[strength - 1] || colors[0]
                  : 'rgba(255,255,255,0.1)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: strength > 0 ? 1 : 0 }}
          />
        ))}
      </div>
      <p
        className="text-xs"
        style={{ color: strength > 0 ? colors[strength - 1] : '#ef4444' }}
      >
        {strength === 0 || !password ? 'Too weak' : labels[strength - 1]}
      </p>
    </div>
  )
}
