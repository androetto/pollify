// src/components/ConfigButton.tsx
import { FaCog } from "react-icons/fa"

interface Props {
  onClick: () => void
}

export default function ConfigButton({ onClick }: Props) {
  return (
    <button
      aria-label="Configuración"
      onClick={onClick}
      className="fixed top-4 right-4 p-2 rounded-full glass-card hover-gradient text-[var(--color-primary)] transition-colors shadow-xl shadow-purple-500/10 cursor-pointer"
    >
      <FaCog size={24} />
    </button>
  )
}
