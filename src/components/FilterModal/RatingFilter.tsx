type RatingFilterProps = {
  value: number[]
  onChange: (next: number[]) => void
}

export default function RatingFilter({ value, onChange }: RatingFilterProps) {
  const ratings = [
    { label: '2점 이상', value: 2 },
    { label: '3점 이상', value: 3 },
    { label: '4점 이상', value: 4 },
  ]

  const toggleRating = (ratingValue: number) => {
    const next = value.includes(ratingValue)
      ? value.filter((v) => v !== ratingValue)
      : [...value, ratingValue]

    onChange(next)
  }

  return (
    <div className="flex flex-col gap-6">
      {ratings.map(({ label, value: ratingValue }) => {
        const isChecked = value.includes(ratingValue)

        return (
          <label
            key={ratingValue}
            className="flex items-center gap-3 cursor-pointer font-sans font-normal text-lg text-[#071E31]"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleRating(ratingValue)}
              className="w-4 h-4 accent-brand-500 rounded border border-brand-500"
            />
            {label}
          </label>
        )
      })}
    </div>
  )
}
