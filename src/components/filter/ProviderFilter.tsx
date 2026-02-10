import type { ProviderCompany } from '@/types/api'

type ProviderFilterProps = {
  value: ProviderCompany[]
  onChange: (next: ProviderCompany[]) => void
}

const OPTIONS: { label: string; value: ProviderCompany }[] = [
  { label: 'Google', value: 'GOOGLE' },
  { label: 'Microsoft', value: 'MICROSOFT' },
  { label: 'Amazon', value: 'AMAZON' },
  { label: 'Meta', value: 'META' },
  { label: 'Apple', value: 'APPLE' },
  { label: 'Kakao', value: 'KAKAO' },
  { label: 'Naver', value: 'NAVER' },
  { label: 'OpenAI', value: 'OPEN_AI' },
  { label: 'GitHub', value: 'GITHUB' },
  { label: 'Stripe', value: 'STRIPE' },
  { label: 'Slack', value: 'SLACK' },
  { label: 'Notion', value: 'NOTION' },
  { label: 'Spotify', value: 'SPOTIFY' },
  { label: 'Twitter', value: 'TWITTER' },
  { label: 'Discord', value: 'DISCORD' },
  { label: 'Twilio', value: 'TWILIO' },
  { label: 'PayPal', value: 'PAYPAL' },
  { label: 'Salesforce', value: 'SALESFORCE' },
  { label: 'IBM', value: 'IBM' },
  { label: 'Zoom', value: 'ZOOM' },
]

export default function ProviderFilter({ value, onChange }: ProviderFilterProps) {
  const toggle = (v: ProviderCompany) => {
    const next = value.includes(v) ? value.filter((p) => p !== v) : [...value, v]
    onChange(next)
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
            checked={value.includes(optVal)}
            onChange={() => toggle(optVal)}
            className="w-4 h-4 accent-brand-500 rounded border border-brand-500"
          />
          {label}
        </label>
      ))}
    </div>
  )
}
