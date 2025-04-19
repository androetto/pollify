'use client'
export const runtime = 'edge';

import { useState } from 'react'

export default function CreatePoll() {
  // Estado para los campos del formulario
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !subtitle) {
      setError('Por favor, complete todos los campos')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, subtitle }),
      })

      if (!response.ok) {
        throw new Error('Error al crear la votación')
      }

      alert('Votación creada con éxito')
      setTitle('')
      setSubtitle('')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message) 
      } else {
        setError('An unknown error occurred') 
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Crear Votación</h2>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Título de la votación
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el título de la votación"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="subtitle" className="block text-lg font-medium text-gray-700">
            Subtítulo
          </label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el subtítulo de la votación"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-6 py-3 text-white font-semibold rounded-lg ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'
            } transition-colors`}
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Votación'}
          </button>
        </div>
      </form>
    </div>
  )
}
