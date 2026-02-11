import type { ProviderCompany } from '@/types/api'

type ProviderFilterProps = {
  value: ProviderCompany | null
  onChange: (next: ProviderCompany | null) => void
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
    onChange(value === v ? null : v)
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {OPTIONS.map(({ label, value: optVal }) => {
        const isSelected = value === optVal
        return (
          <button
            key={optVal}
            type="button"
            onClick={() => toggle(optVal)}
            className={`
              px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all
              ${
                isSelected
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-brand-300 hover:bg-brand-50/50'
              }
            `}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
