import { motion } from 'framer-motion';

export interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#ef4444', '#f59e0b', '#8b3dff', '#10b981'];

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{
              background: i < strength ? colors[strength - 1] : 'rgba(255,255,255,0.1)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color: colors[strength - 1] || '#6b7280' }}>
        {strength > 0 ? labels[strength - 1] : 'Too weak'}
      </p>
    </div>
  );
};
