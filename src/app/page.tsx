import CreatePollButton from '@/components/CreatePollButton'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Head>
        <title>Votación Online</title>
        <meta name="description" content="Crea tu propia votación online de forma fácil y rápida." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-600 text-white text-center py-8">
        <h1 className="text-4xl font-bold">Bienvenido a la plataforma de Votación Online</h1>
        <p className="mt-4 text-lg">Crea y participa en votaciones en línea de manera rápida y sencilla.</p>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <section className="text-center my-8">
          <h2 className="text-3xl font-semibold text-gray-800">¿Cómo funciona?</h2>
          <ul className="list-inside list-disc text-lg text-gray-700 mt-4">
            <li>1. Crea tu propia votación</li>
            <li>2. Comparte el enlace con tus amigos</li>
            <li>3. ¡Comienza a recibir votos!</li>
          </ul>
        </section>

        <section className="text-center mt-8">
          <h2 className="text-3xl font-semibold text-gray-800">Crea tu Votación</h2>
          <CreatePollButton />

        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 Pollify</p>
      </footer>
    </div>
  )
}
