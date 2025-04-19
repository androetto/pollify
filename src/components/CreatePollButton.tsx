'use client'

import { useRouter } from "next/navigation"

export default function CreatePollButton() {

  const router = useRouter()  // Obtienes el router

  const handleClick = () => {
    router.push('/create')
  }

  return (
    <button 
    onClick={handleClick}
      className="mt-4 px-6 py-3 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-500 transition"
    >
      Crear Votación
    </button>
  )
}
