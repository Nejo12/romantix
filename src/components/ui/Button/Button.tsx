import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'social';
  loading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'w-full py-4 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'text-white',
    secondary: 'bg-transparent border border-primary-500/40 text-primary-400 hover:bg-primary-500/10',
    social: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
  };

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={isPrimary ? {
        background: 'linear-gradient(135deg, #e04d75 0%, #cb2d5d 100%)',
        boxShadow: '0 0 25px rgba(224, 77, 117, 0.3)'
      } : {}}
      whileHover={{
        scale: disabled || loading ? 1 : 1.02,
        boxShadow: isPrimary && !disabled && !loading ? '0 0 35px rgba(224, 77, 117, 0.5)' : undefined
      }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <motion.div
          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : children}
    </motion.button>
  );
};
