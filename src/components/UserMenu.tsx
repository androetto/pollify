"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function UserMenu() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session?.user) return null

  return (
    <div 
      className="inline-block cursor-pointer glass-card rounded-full w-10 h-10 overflow-hidden shadow-lg shadow-purple-500/10 hover:opacity-80 transition-opacity"
      onClick={() => router.push("/profile")}
    >
      <Image
        src={session.user.image || "/default-avatar.png"}
        alt="User"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
    </div>
  )
}
