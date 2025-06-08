'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import FullScreenLoading from '@/components/FullScreenLoading'
import PrimaryButton from '@/components/PrimaryButton'

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
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => router.push('/profile')}
          className="px-6 py-3 bg-[#322A7D] text-white rounded-lg hover:bg-[#2a2368] transition"
        >
          Volver al perfil
        </button>
      </div>
    </div>
  )
  if (!data) return null

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
        <h1 className="text-3xl font-bold text-[#322A7D] text-center mb-2">{data.poll.title}</h1>
        <p className="text-gray-600 text-center mb-4">{data.poll.subtitle}</p>
        <div className="text-center text-sm text-gray-500">
          Total de respuestas: {data.totalResponses}
        </div>
      </div>

      <div className="space-y-8">
        {data.results.map((result) => (
          <div key={result.questionId} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-[#322A7D] mb-4">{result.questionText}</h2>
            <div className="space-y-4">
              {result.options.map((option) => (
                <div key={option.text} className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{option.text}</span>
                    <span>{option.count} votos ({option.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#322A7D] h-2.5 rounded-full"
                      style={{ width: `${option.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <PrimaryButton
          onClick={() => router.push('/profile')}
          fullWidth
        >
          Volver
        </PrimaryButton>
      </div>
    </div>
  )
} 