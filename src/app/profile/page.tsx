'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { IUser } from '@/models/User'

type Poll = {
  id: string
  title: string
  subtitle: string
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const [user, setUser] = useState<IUser>()
  const [phone, setPhone] = useState('')

  // Mocked polls data
  const [polls, setPolls] = useState<Poll[]>([
    { id: '1', title: 'Encuesta de satisfacción', subtitle: 'Queremos saber tu opinión' },
    { id: '2', title: 'Preferencias de producto', subtitle: 'Elige tus opciones favoritas' },
    { id: '3', title: 'Feedback de evento', subtitle: 'Cuéntanos cómo estuvo' },
  ])

  useEffect(() => {
    if (session) {
      fetch('/api/user')
        .then(res => res.json())
        .then(data => {
          setUser(data.user)
          setPhone(data.user.phone || '')
        })
    }
  }, [session])

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  if (!user) return <div>Cargando...</div>

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-10">
      {/* Sección Mis Polls */}
      <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-[#322A7D] text-center mb-2">Mis Polls</h1>
        <ul className="space-y-4">
          {polls.map((poll) => (
            <li
              key={poll.id}
              className="border border-gray-300 rounded-lg p-4 hover:shadow-md cursor-pointer transition"
              // Aquí podrías agregar onClick para abrir la poll
            >
              <h3 className="font-semibold text-lg">{poll.title}</h3>
              <p className="text-gray-600">{poll.subtitle}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Sección Mis Datos */}
      <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-[#322A7D] text-center mb-2">Mis Datos</h1>
        <p className="text-md text-gray-600 text-center mb-6">
          Actualizá tu información personal
        </p>

        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#322A7D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#322A7D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Ingrese su teléfono"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#322A7D] focus:outline-none"
            />
          </div>

          <div className="flex justify-center space-x-4">
      

            <button
              type="button"
              onClick={handleLogout}
              className="px-6 py-3 text-white font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
