interface PriceRangeSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (val: [number, number]) => void
}

export function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: PriceRangeSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">€{value[0].toLocaleString()}</span>
        <span className="text-gray-400">€{value[1].toLocaleString()}</span>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full">
        <div
          className="absolute h-full rounded-full"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((value[1] - min) / (max - min)) * 100}%`,
            background: 'linear-gradient(90deg, #ff2d8a, #8b3dff)',
          }}
        />
      </div>
      <div className="flex gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={e =>
            onChange([
              Math.min(Number(e.target.value), value[1] - 100),
              value[1],
            ])
          }
          className="w-full accent-pink-500"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={e =>
            onChange([
              value[0],
              Math.max(Number(e.target.value), value[0] + 100),
            ])
          }
          className="w-full accent-pink-500"
        />
      </div>
    </div>
  )
}
