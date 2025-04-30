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
      className="bg-[var(--color-foreground)] text-[var(--color-foreground-light)] py-3 px-6 rounded-full text-xl font-semibold hover:bg-[var(--color-foreground)] transition-all duration-300"
    >
      Comenzar ahora
    </button>
  )
}
