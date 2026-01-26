type DocsFilterProps = {
  value: string[]
  onChange: (next: string[]) => void
}

export default function DocsFilter({ value, onChange }: DocsFilterProps) {
  const docs = ['한국어', '영어', '일본어', '중국어']

  const toggleDoc = (doc: string) => {
    const next = value.includes(doc) ? value.filter((d) => d !== doc) : [...value, doc]

    onChange(next)
  }

  return (
    <div className="flex flex-col gap-6">
      {docs.map((doc) => {
        const isChecked = value.includes(doc)

        return (
          <label
            key={doc}
            className="flex items-center gap-3 cursor-pointer font-sans font-normal text-lg text-[#071E31]"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleDoc(doc)}
              className="w-4 h-4 accent-brand-500 rounded border border-brand-500"
            />
            {doc}
          </label>
        )
      })}
    </div>
  )
}
