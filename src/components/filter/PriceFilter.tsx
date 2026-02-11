import type { PricingType } from '@/types/api'

type PriceFilterProps = {
  value: PricingType | null
  onChange: (next: PricingType | null) => void
}

const OPTIONS: { label: string; value: PricingType }[] = [
  { label: '무료', value: 'FREE' },
  { label: '유료', value: 'PAID' },
  { label: '혼합', value: 'MIXED' },
]

export default function PriceFilter({ value, onChange }: PriceFilterProps) {
  const toggle = (v: PricingType) => {
    onChange(value === v ? null : v)
  }

  return (
    <div className="flex flex-col gap-6">
      {OPTIONS.map(({ label, value: optVal }) => (
        <label
          key={optVal}
          className="flex items-center gap-3 cursor-pointer font-sans font-normal text-lg text-info-darker"
        >
          <input
            type="checkbox"
            checked={value === optVal}
            onChange={() => toggle(optVal)}
            className="w-4 h-4 accent-brand-500 rounded border border-brand-500"
          />
          {label}
        </label>
      ))}
    </div>
  )
}
