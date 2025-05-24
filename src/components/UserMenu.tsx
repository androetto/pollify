"use client"

import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function UserMenu() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  if (!session?.user) return null

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setOpen(!open)} className="cursor-pointer border border-gray-300 rounded-full w-10 h-10 overflow-hidden">
        <Image
          src={session.user.image || "/default-avatar.png"}
          alt="User"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <button
            onClick={() => {
              router.push("/my-polls")
              setOpen(false)
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Mis votaciones
          </button>
          <button
            onClick={() => {
              router.push("/profile")
              setOpen(false)
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Mis datos
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
