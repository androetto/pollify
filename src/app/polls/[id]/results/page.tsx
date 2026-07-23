'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import FullScreenLoading from '@/components/FullScreenLoading'
import PrimaryButton from '@/components/PrimaryButton'
import Card from '@/components/Card'
import PageShell from '@/components/PageShell'

type Result = {
  questionId: string
  questionText: string
  options: {
    text: string
    count: number
    percentage: number
  }[]
  totalResponses: number
}

type PollResults = {
  poll: {
    title: string
    subtitle: string
    createdAt: string
  }
  results: Result[]
  totalResponses: number
}

export default function PollResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<PollResults | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const pollId = params.id as string
        if (!pollId) {
          throw new Error('ID de encuesta no proporcionado')
        }

        const response = await fetch(`/api/polls/${pollId}/results`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Error al cargar los resultados')
        }
        const data = await response.json()
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
        // Si el error es de autorización, redirigir al perfil
        if (err instanceof Error && err.message.includes('No autorizado')) {
          router.push('/profile')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [params.id, router])

  if (loading) return <FullScreenLoading isOpen={true} message="Cargando resultados..." />
  if (error) return (
    <PageShell maxWidth="4xl">
      <Card className="text-center">
        <h2 className="text-2xl font-bold text-[var(--color-danger)] mb-4">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <PrimaryButton onClick={() => router.push('/profile')}>
          Volver al perfil
        </PrimaryButton>
      </Card>
    </PageShell>
  )
  if (!data) return null

  return (
    <PageShell maxWidth="4xl">
      <Card className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">{data.poll.title}</h1>
        <p className="text-gray-600 mb-4">{data.poll.subtitle}</p>
        <div className="text-sm text-[var(--color-secondary)]">
          Total de respuestas: {data.totalResponses}
        </div>
      </Card>

      <div className="space-y-8">
        {data.results.map((result) => {
          const maxCount = Math.max(...result.options.map((o) => o.count))
          return (
            <Card key={result.questionId}>
              <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">{result.questionText}</h2>
              <div className="space-y-4">
                {result.options.map((option) => {
                  const isWinner = option.count === maxCount && maxCount > 0
                  return (
                    <div key={option.text} className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className={isWinner ? 'font-semibold text-[var(--color-primary)]' : ''}>
                          {option.text}
                        </span>
                        <span>{option.count} votos ({option.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full animate-bar-grow ${isWinner ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-primary-light)]'}`}
                          style={{ width: `${option.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <PrimaryButton
          onClick={() => router.push('/profile')}
          fullWidth
        >
          Volver
        </PrimaryButton>
      </div>
    </PageShell>
  )
}