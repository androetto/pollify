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
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow-lg"
    >
      <FaCog size={24} />
    </button>
  )
}
