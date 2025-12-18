import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative py-16 md:py-24 text-center">
      <motion.p
        className="text-pink-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Premium Fantasy Collection
      </motion.p>

      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl mb-5"
        style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          background: 'linear-gradient(135deg, #ff2d8a 0%, #fff 40%, #8b3dff 70%, #ff2d8a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 30px rgba(255, 45, 138, 0.25))',
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        Fulfill Your Desires
      </motion.h2>

      <motion.p
        className="text-gray-400 max-w-lg mx-auto mb-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Handcrafted with premium materials. Designed for ultimate realism.
        Delivered with <span className="text-pink-400">complete discretion</span>.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="px-7 py-3 rounded-full text-white text-sm font-semibold uppercase tracking-wider"
          style={{ background: 'linear-gradient(135deg, #ff2d8a, #e6006f)', boxShadow: '0 0 25px rgba(255, 45, 138, 0.4)' }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 45, 138, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ['0 0 20px rgba(255, 45, 138, 0.3)', '0 0 35px rgba(255, 45, 138, 0.5)', '0 0 20px rgba(255, 45, 138, 0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Explore Collection
        </motion.button>

        <motion.button
          className="px-7 py-3 rounded-full text-pink-400 text-sm font-semibold uppercase tracking-wider"
          style={{ background: 'transparent', border: '1px solid rgba(255, 45, 138, 0.4)' }}
          whileHover={{ background: 'rgba(255, 45, 138, 0.1)', borderColor: 'rgba(255, 45, 138, 0.7)' }}
        >
          Configure Dream
        </motion.button>
      </motion.div>
    </section>
  );
}
