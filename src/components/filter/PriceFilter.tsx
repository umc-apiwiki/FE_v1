type PriceFilterProps = {
  value: string[]
  onChange: (next: string[]) => void
}

export default function PriceFilter({ value, onChange }: PriceFilterProps) {
  const prices = ['무료', '유료', '혼합']

  const togglePrice = (price: string) => {
    const next = value.includes(price) ? value.filter((p) => p !== price) : [...value, price]

    onChange(next)
  }

  return (
    <div className="flex flex-col gap-6">
      {prices.map((price) => {
        const isChecked = value.includes(price)

        return (
          <label
            key={price}
            className="flex items-center gap-3 cursor-pointer font-sans font-normal text-lg text-[#071E31]"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => togglePrice(price)}
              className="w-4 h-4 accent-brand-500 rounded border border-brand-500"
            />
            {price}
          </label>
        )
      })}
    </div>
  )
}
