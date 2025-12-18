import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { PasswordStrength } from '@/components/ui/PasswordStrength';
import { FloatingOrb } from '@/components/common/FloatingOrb';

// ═══════════════════════════════════════════════════════════════════════════
// ROMANTIX — Main Application
// Luxury E-Commerce Platform
// ═══════════════════════════════════════════════════════════════════════════

// Icon Components
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

// Login Form Component
interface AuthFormProps {
  onSwitch: () => void;
  onSuccess: () => void;
}

const LoginForm = ({ onSwitch, onSuccess }: AuthFormProps) => {
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
        <h1 className="text-3xl font-bold text-white mb-2 text-display italic">
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
};

// Register Form Component
const RegisterForm = ({ onSwitch, onSuccess }: AuthFormProps) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    onSuccess();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 text-display italic">
          Create Account
        </h1>
        <p className="text-gray-400 text-sm">Join ROMANTIX today</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="John"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          required
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          required
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <div className="space-y-2">
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <PasswordStrength password={form.password} />
      </div>

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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

      <Button type="submit" loading={loading} disabled={!acceptTerms || !ageVerified}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-primary-400 hover:text-primary-300 font-medium">
          Sign in
        </button>
      </p>
    </motion.form>
  );
};

// Success Message Component
const SuccessMessage = ({ onContinue }: { onContinue: () => void }) => (
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
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </motion.div>
    <h2 className="text-2xl font-bold text-white mb-2 text-display">Welcome to ROMANTIX!</h2>
    <p className="text-gray-400 mb-6">Your account has been created successfully.</p>
    <Button onClick={onContinue}>Continue to Dashboard</Button>
  </motion.div>
);

// Main App Component
export default function App() {
  const [view, setView] = useState<'login' | 'register' | 'success'>('login');

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0812 0%, #150d1e 50%, #0d0812 100%)' }}
    >
      {/* Floating Orb Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingOrb color="rgba(224, 77, 117, 0.1)" size={500} x="10%" y="20%" duration={9} />
        <FloatingOrb color="rgba(139, 61, 255, 0.1)" size={450} x="70%" y="60%" duration={11} />
        <FloatingOrb color="rgba(255, 51, 71, 0.06)" size={400} x="80%" y="10%" duration={13} />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-10">
        <motion.h1
          className="text-xl font-bold tracking-wider text-display"
          style={{
            background: 'linear-gradient(135deg, #e04d75, #8b3dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ROMANTIX
        </motion.h1>
      </div>

      {/* View Switcher (Demo Navigation) */}
      <div className="absolute top-6 right-6 flex gap-2 z-10">
        {['login', 'register'].map((v) => (
          <button
            key={v}
            onClick={() => setView(v as 'login' | 'register')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              view === v ? 'bg-primary-500/20 text-primary-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {view === 'success' ? (
          <SuccessMessage key="success" onContinue={() => setView('login')} />
        ) : (
          <div
            key="auth"
            className="w-full max-w-md p-8 rounded-2xl glass-dark"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            <AnimatePresence mode="wait">
              {view === 'login' ? (
                <LoginForm
                  key="login"
                  onSwitch={() => setView('register')}
                  onSuccess={() => setView('success')}
                />
              ) : (
                <RegisterForm
                  key="register"
                  onSwitch={() => setView('login')}
                  onSuccess={() => setView('success')}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
