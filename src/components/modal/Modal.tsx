import { useEffect } from 'react'
import type { ReactNode } from 'react'

type ModalProps = {
  onClose: () => void
  children: ReactNode
  width?: string
  height?: string
}

export default function Modal({
  onClose,
  children,
  width = 'w-[390px]',
  height = 'h-[660px]',
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed top-[80px] left-0 right-0 bottom-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm " onClick={onClose} />

      <div
        className={`relative z-50 ${width} ${height} rounded-[25px] border border-brand-500/60 bg-white shadow-[1px_1px_10px_2px_var(--tw-shadow-color)] shadow-brand-500/50`}
      >
        {children}
      </div>
    </div>
  )
}
