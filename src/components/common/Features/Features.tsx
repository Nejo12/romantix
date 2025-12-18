import { motion } from 'framer-motion'

const features = [
  { icon: '🔒', title: '100% Discreet', desc: 'Anonymous delivery' },
  { icon: '✨', title: 'Premium Quality', desc: 'Medical-grade materials' },
  { icon: '🚚', title: 'Free Shipping', desc: 'Orders over €500' },
  { icon: '💫', title: 'Customizable', desc: 'Build your dream' },
]

export function Features() {
  return (
    <section className="py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="text-center p-5 rounded-xl"
            style={{
              background: 'rgba(30, 20, 40, 0.4)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              background: 'rgba(30, 20, 40, 0.7)',
              borderColor: 'rgba(255, 45, 138, 0.15)',
            }}
          >
            <div className="text-2xl mb-2">{f.icon}</div>
            <h4 className="text-white text-sm font-semibold mb-1">{f.title}</h4>
            <p className="text-gray-500 text-xs">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
