import type { ReactNode } from 'react'

type ModalButtonProps = {
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function ModalButton({
  children,
  onClick,
  className = '',
  disabled = false,
}: ModalButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`w-[308px] h-[55px] rounded-[30px] flex items-center justify-center ${className} ${disabled ? 'bg-brand-300 cursor-not-allowed' : 'bg-brand-500 cursor-pointer'}`}
    >
      <span className="text-white text-lg font-medium font-s pb-1">{children}</span>
    </button>
  )
}
