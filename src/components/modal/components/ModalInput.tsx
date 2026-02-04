type ModalInputProps = {
  isError?: boolean
  value: string
  placeholder?: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
}

export default function ModalInput({
  isError,
  value,
  placeholder,
  type = 'text',
  onChange,
  onBlur,
}: ModalInputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-[308px] h-[55px] rounded-[30px] bg-white border border-[#E0E0E9]/70 px-6 text-base outline-none shadow-[0px_3px_5px_0px_var(--tw-shadow-color)] shadow-[#E0E0E9]/25 ${isError ? 'border-error-dark' : 'border-gray-300'} 
      focus:border-brand-500`}
    />
  )
}
