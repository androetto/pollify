'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { IUser } from '@/models/User'

export default function ProfilePage() {
  const { data: session } = useSession()
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    if (session) {
      fetch("/api/user")
        .then(res => res.json())
        .then(data => setUser(data.user))
    }
  }, [session])

  if (!user) return <div>Cargando...</div>

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Mis Datos</h1>
      <form className="space-y-4">
        <div>
          <label>Nombre</label>
          <input
            type="text"
            className="border w-full p-2"
            value={user.name}
            readOnly
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            className="border w-full p-2"
            value={user.email}
            readOnly
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input
            type="text"
            className="border w-full p-2"
            value={user.phone || ''}
            onChange={() => {}}
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
      </form>
    </div>
  )
}
