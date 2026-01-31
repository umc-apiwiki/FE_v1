type AuthFilterProps = {
  value: string[]
  onChange: (next: string[]) => void
}

export default function AuthFilter({ value, onChange }: AuthFilterProps) {
  const auths = [
    'OAuth 2.0',
    'Refresh Token',
    'Access Token',
    'API Key인증',
    'JWT',
    '쿠키기반 인증',
    '기본 인증',
  ]

  const toggleAuth = (auth: string) => {
    const next = value.includes(auth) ? value.filter((a) => a !== auth) : [...value, auth]

    onChange(next)
  }

  return (
    <div className="flex flex-col gap-6">
      {auths.map((auth) => {
        const isChecked = value.includes(auth)

        return (
          <label
            key={auth}
            className="flex items-center gap-3 cursor-pointer font-sans font-normal text-lg text-info-darker"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleAuth(auth)}
              className="w-4 h-4 accent-brand-500 rounded border border-brand-500"
            />
            {auth}
          </label>
        )
      })}
    </div>
  )
}
