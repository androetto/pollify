// src/components/ConfigButton.tsx
import { HiOutlineCog6Tooth } from "react-icons/hi2"

interface Props {
  onClick: () => void
}

export default function ConfigButton({ onClick }: Props) {
  return (
    <button
      aria-label="Configuración"
      onClick={onClick}
      className="fixed top-4 right-4 p-2 rounded-full card-surface hover-accent text-[var(--color-secondary)] transition-colors shadow-sm cursor-pointer"
    >
      <HiOutlineCog6Tooth size={24} />
    </button>
  )
}
