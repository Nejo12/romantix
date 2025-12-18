import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface SuccessPageProps {
  onContinue: () => void
}

export default function SuccessPage({ onContinue }: SuccessPageProps) {
  return (
    <motion.div
      className="text-center p-8 rounded-2xl max-w-md glass-dark"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
      >
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>
      <h2
        className="text-2xl font-light text-white mb-2 italic"
        style={{
          fontFamily:
            "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
        }}
      >
        Welcome to romanti.X!
      </h2>
      <p className="text-gray-400 mb-6">
        Your account has been created successfully.
      </p>
      <Button onClick={onContinue}>Continue to Dashboard</Button>
    </motion.div>
  )
}
