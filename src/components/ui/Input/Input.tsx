import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
}

export const Input = ({
  label,
  type = 'text',
  placeholder,
  icon,
  error,
  className = '',
  ...props
}: InputProps) => {
  const id = useId()
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm text-gray-300 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 transition-all duration-300 outline-none ${
            error
              ? 'bg-red-500/10 border border-red-500/50 focus:border-red-500'
              : 'bg-white/5 border border-white/10 focus:border-primary-500/50 focus:bg-white/10'
          }`}
          style={{ backdropFilter: 'blur(8px)' }}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}
