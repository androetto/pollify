"use client";

import CreatePollButton from "@/components/CreatePollButton";
import Head from "next/head";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col justify-between">
      <Head>
        <title>Pollify - Votación Online</title>
        <meta
          name="description"
          content="Crea tu propia votación online de forma fácil y rápida."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-[var(--color-primary)] text-[var(--color-foreground-light)] text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold mb-6">Pollify</h1>

        <h2 className="text-2xl md:text-3xl font-medium h-10">
          <Typewriter
            words={[
              "La forma más simple de tomar decisiones en grupo.",
              "Crea una pregunta, comparte el link, y obtené respuestas.",
              "Opiniones rápidas. Decisiones inteligentes.",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={0}
            delaySpeed={2000}
          />
        </h2>

        <p className="mt-16 text-lg md:text-xl max-w-2xl mx-auto">
          Armá una pregunta con opciones, compartila, y descubrí qué piensa tu
          comunidad, tu equipo o tus amigos en segundos.
        </p>
      </header>

      <main className="flex-grow container mx-auto p-6 ">
        {/* Sección 2: Casos de uso */}
        <section className="mt-10">
          <h2 className="text-3xl font-bold text-center text-[var(--color-foreground)] mb-12">
            ¿Para qué puedo usar Pollify?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-[var(--color-foreground-light)]">
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                Equipos de trabajo
              </h3>
              <p className="text-[var(--color-secondary)]">
                Tomá decisiones rápidas sin mails eternos ni reuniones
                innecesarias.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[var(--color-foreground-light)]">
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                Creadores de contenido
              </h3>
              <p className="text-[var(--color-secondary)]">
                Publicá encuestas interactivas y conectá con tu comunidad en
                redes.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[var(--color-foreground-light)]">
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                Docentes y educadores
              </h3>
              <p className="text-[var(--color-secondary)]">
                Comprobá el entendimiento de tus alumnos de forma simple y
                participativa.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[var(--color-foreground-light)]">
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                Emprendedores
              </h3>
              <p className="text-[var(--color-secondary)]">
                Testeá productos, precios o ideas con tu audiencia antes de
                lanzar.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Cómo funciona */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-12">
            ¿Cómo funciona?
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Paso 1 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white border-2 border-[var(--color-primary)] shadow-md">
                <Image
                  src="/encuesta.png"
                  alt="Crear una pregunta"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-primary)]">
                Crea una pregunta
              </h3>
              <p className="text-sm text-[var(--color-secondary)] max-w-xs mt-2">
                Con opciones múltiples. Puede ser una encuesta, trivia o una
                decisión grupal.
              </p>
            </div>

            {/* Flecha */}
            <div className="text-3xl text-[var(--color-primary)] hidden md:block">
              ➡️
            </div>
            <div className="text-[var(--color-primary)] text-2xl md:hidden my-4">
              ⬇️
            </div>

            {/* Paso 2 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white border-2 border-[var(--color-primary)] shadow-md">
                <Image
                  src="/compartir-enlace.png"
                  alt="Crear una pregunta"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-primary)]">
                Compartila por link o QR
              </h3>
              <p className="text-sm text-[var(--color-secondary)] max-w-xs mt-2">
                Enviá a quien quieras, donde quieras.
              </p>
            </div>

            {/* Flecha */}
            <div className="text-3xl text-[var(--color-primary)] hidden md:block">
              ➡️
            </div>
            <div className="text-[var(--color-primary)] text-2xl md:hidden my-4">
              ⬇️
            </div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white border-2 border-[var(--color-primary)] shadow-md">
                <Image
                  src="/grafico-de-barras.png"
                  alt="Crear una pregunta"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-primary)]">
                Revisá los resultados
              </h3>
              <p className="text-sm text-[var(--color-secondary)] max-w-xs mt-2">
                En tiempo real y desde cualquier dispositivo.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 4: Por que usar  */}
        <section className="bg-[var(--color-background)] py-16">
          <h2 className="text-3xl font-semibold text-center text-[var(--color-foreground)] mb-12">
            Por qué usar Pollify
          </h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <Image
                src="/icons/sin-cuentas.png"
                alt="Sin cuentas"
                className="mx-auto mb-4"
                width={48} 
                height={48} 
              />
              <h3 className="text-xl font-medium text-[var(--color-foreground)]">
                Sin cuentas, sin fricción
              </h3>
              <p className="text-sm text-[var(--color-foreground)]">
                Comienza a crear encuestas al instante sin necesidad de crear
                una cuenta.
              </p>
            </div>

            <div className="text-center">
              <Image
                src="/icons/compartir.png"
                alt="Compartir en segundos"
                className="mx-auto mb-4"
                width={48} 
                height={48} 
              />
              <h3 className="text-xl font-medium text-[var(--color-foreground)]">
                Compartí en segundos
              </h3>
              <p className="text-sm text-[var(--color-foreground)]">
                Envía tu encuesta con un simple link o QR a cualquier persona.
              </p>
            </div>

            <div className="text-center">
              <Image
                src="/icons/resultados.png"
                alt="Resultados fáciles de leer"
                className="mx-auto mb-4"
                width={48} 
                height={48} 
              />
              <h3 className="text-xl font-medium text-[var(--color-foreground)]">
                Resultados fáciles de leer
              </h3>
              <p className="text-sm text-[var(--color-foreground)]">
                Visualiza los resultados en tiempo real de forma clara y
                accesible.
              </p>
            </div>

            <div className="text-center">
              <Image
                src="/icons/libre.png"
                alt="100% gratis"
                className="mx-auto mb-4"
                width={48} 
                height={48} 
              />
              <h3 className="text-xl font-medium text-[var(--color-foreground)]">
                100% gratis
              </h3>
              <p className="text-sm text-[var(--color-foreground)]">
                No hay costos ocultos, todo lo que crees está disponible sin
                cargos.
              </p>
            </div>

            <div className="text-center">
              <Image
                src="/icons/dispositivo.png"
                alt="Funciona en cualquier dispositivo"
                className="mx-auto mb-4"
                width={48} 
                height={48} 
              />
              <h3 className="text-xl font-medium text-[var(--color-foreground)]">
                Funciona en cualquier dispositivo
              </h3>
              <p className="text-sm text-[var(--color-foreground)]">
                Accede a tus encuestas desde cualquier dispositivo, sin importar
                el sistema operativo.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 5: Ingresar */}
        <section className="bg-[var(--color-primary)] text-[var(--color-foreground-light)] py-16 rounded-4xl">
          <h2 className="text-4xl font-extrabold text-center mb-6">
            Probalo ahora!
          </h2>
          <p className="text-xl text-center mb-8 max-w-3xl mx-auto">
            Descubrí en segundos qué piensa tu equipo, tu comunidad o tus
            amigos. ¡Es rápido, fácil y completamente gratis!
          </p>

          <div className="text-center">
            <CreatePollButton />
          </div>
        </section>
      </main>

      <footer className="bg-[var(--color-secondary)] text-[var(--color-foreground-light)] text-center py-4">
        <p>&copy; 2025 Pollify</p>
      </footer>
    </div>
  );
}
