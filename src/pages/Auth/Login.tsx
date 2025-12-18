import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';

// Icons
const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

interface LoginPageProps {
  onSwitch: () => void;
  onSuccess: () => void;
}

export default function LoginPage({ onSwitch, onSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    onSuccess();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-white mb-2 italic" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}>
          Welcome Back
        </h1>
        <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<EmailIcon />}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<LockIcon />}
        required
      />

      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" checked={remember} onChange={setRemember} />
        <button type="button" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
          Forgot password?
        </button>
      </div>

      <Button type="submit" loading={loading}>Sign In</Button>

      <p className="text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-primary-400 hover:text-primary-300 font-medium">
          Create one
        </button>
      </p>
    </motion.form>
  );
}
