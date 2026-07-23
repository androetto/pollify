'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { IUser } from '@/models/User'
import { IPoll } from '@/models/Poll'
import FullScreenLoading from '@/components/FullScreenLoading'
import Card from '@/components/Card'
import PageShell from '@/components/PageShell'
import EmptyState from '@/components/EmptyState'
import PrimaryButton from '@/components/PrimaryButton'
import { HiOutlineClipboardDocumentList, HiOutlineCalendar } from 'react-icons/hi2'

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<IUser>()
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [polls, setPolls] = useState<IPoll[]>([])

  useEffect(() => {
    if (session) {
      Promise.all([
        fetch('/api/user').then(res => res.json()),
        fetch('/api/polls/user').then(res => res.json())
      ])
        .then(([userData, pollsData]) => {
          setUser(userData.user)
          setPhone(userData.user.phone || '')
          setPolls(pollsData.polls)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [session])

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  if (!user) return <FullScreenLoading isOpen={loading} message="Cargando perfil..." />

  return (
    <PageShell className="space-y-10">
      {/* Sección Mis Polls */}
      <Card padding="md">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] text-center mb-4">Mis Polls</h1>
        {polls.length === 0 ? (
          <EmptyState
            icon={HiOutlineClipboardDocumentList}
            title="No creaste ninguna encuesta aún"
            description="Armá tu primera encuesta y compartila para empezar a recibir votos."
            action={
              <PrimaryButton onClick={() => router.push('/create')}>
                Crear mi primera encuesta
              </PrimaryButton>
            }
          />
        ) : (
          <ul className="grid sm:grid-cols-2 gap-4">
            {polls.map((poll) => (
              <li
                key={poll._id?.toString()}
                className="border border-[var(--color-border)] rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer bg-white"
                onClick={() => window.location.href = `/polls/${poll._id}/results`}
              >
                <h3 className="font-semibold text-lg text-[var(--color-foreground)]">{poll.title}</h3>
                <p className="text-gray-600">{poll.subtitle}</p>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                  <HiOutlineCalendar className="w-3.5 h-3.5" />
                  Creada el {new Date(poll.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Sección Mis Datos */}
      <Card>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] text-center mb-2">Mis Datos</h1>
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
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Ingrese su teléfono"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={handleLogout}
              className="px-6 py-3 text-white font-semibold rounded-lg bg-[var(--color-danger)] hover:opacity-90 transition cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </form>
      </Card>
    </PageShell>
  )
}
