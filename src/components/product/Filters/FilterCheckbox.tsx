interface FilterCheckboxProps {
  label: string
  checked: boolean
  onChange: () => void
  count?: number
}

export function FilterCheckbox({
  label,
  checked,
  onChange,
  count,
}: FilterCheckboxProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
            checked
              ? 'bg-gradient-to-br from-pink-500 to-purple-500'
              : 'bg-white/5 border border-white/20 group-hover:border-pink-500/50'
          }`}
          onClick={onChange}
        >
          {checked && (
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <span className="text-sm text-gray-400 group-hover:text-gray-300">
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500">({count})</span>
      )}
    </label>
  )
}
