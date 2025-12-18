import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { PasswordStrength } from '@/components/ui/PasswordStrength'

interface RegisterPageProps {
  onSwitch: () => void
  onSuccess: () => void
}

export default function RegisterPage({
  onSwitch,
  onSuccess,
}: RegisterPageProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [ageVerified, setAgeVerified] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    onSuccess()
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="text-center mb-6">
        <h1
          className="text-3xl font-light text-white mb-2 italic"
          style={{
            fontFamily:
              "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          }}
        >
          Create Account
        </h1>
        <p className="text-gray-400 text-sm">Join romanti.X today</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="John"
          value={form.firstName}
          onChange={e => setForm({ ...form, firstName: e.target.value })}
          required
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          value={form.lastName}
          onChange={e => setForm({ ...form, lastName: e.target.value })}
          required
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />

      <div className="space-y-2">
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <PasswordStrength password={form.password} />
      </div>

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={form.confirmPassword}
        onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        error={
          form.confirmPassword && form.password !== form.confirmPassword
            ? "Passwords don't match"
            : ''
        }
        required
      />

      <div className="space-y-3 pt-2">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={acceptTerms}
          onChange={setAcceptTerms}
        />
        <Checkbox
          label="I confirm I am 18 years or older"
          checked={ageVerified}
          onChange={setAgeVerified}
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        disabled={!acceptTerms || !ageVerified}
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="text-primary-400 hover:text-primary-300 font-medium"
        >
          Sign in
        </button>
      </p>
    </motion.form>
  )
}
