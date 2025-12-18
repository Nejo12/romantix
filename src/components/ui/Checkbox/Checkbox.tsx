import { motion } from 'framer-motion';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
          checked
            ? 'bg-gradient-to-br from-primary-500 to-purple-500'
            : 'bg-white/5 border border-white/20'
        }`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <motion.svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        )}
      </div>
      <span className="text-sm text-gray-400 group-hover:text-gray-300">
        {label}
      </span>
    </label>
  );
};
