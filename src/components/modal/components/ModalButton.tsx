import type { ReactNode } from 'react'

type ModalButtonProps = {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export default function ModalButton({ children, onClick, className = '' }: ModalButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[308px] h-[55px] rounded-[30px] bg-brand-500 flex items-center justify-center cursor-pointer ${className}`}
    >
      <span className="text-white text-lg font-medium font-s pb-1">{children}</span>
    </button>
  )
}
