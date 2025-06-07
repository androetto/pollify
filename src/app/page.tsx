"use client";

import Head from "next/head";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import CreatePollButton from "@/components/CreatePollButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Head>
        <title>Pollify - Votación Online</title>
        <meta
          name="description"
          content="Crea tu propia votación online de forma fácil y rápida."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero */}
      <header className="bg-[var(--color-primary)] text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Pollify</h1>
        <h2 className="text-xl md:text-2xl h-8 font-medium">
          <Typewriter
            words={[
              "La forma más simple de tomar decisiones en grupo.",
              "Crea una pregunta, compartí el link y obtené respuestas.",
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
        <p className="mt-10 max-w-2xl mx-auto text-lg">
          Armá una pregunta con opciones, compartila, y descubrí qué piensa tu
          comunidad, tu equipo o tus amigos.
        </p>
        <div className="mt-10">
          <CreatePollButton />
        </div>
      </header>

      <main className="flex-grow bg-[var(--color-background)] px-6 py-16">
        {/* Casos de uso */}
        <section className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Para qué puedo usar Pollify?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Equipos de trabajo",
                desc: "Decisiones rápidas sin reuniones innecesarias.",
              },
              {
                title: "Creadores de contenido",
                desc: "Conectá con tu audiencia con encuestas interactivas.",
              },
              {
                title: "Docentes y educadores",
                desc: "Evaluá el aprendizaje de forma participativa.",
              },
              {
                title: "Emprendedores",
                desc: "Testeá ideas con tu audiencia antes de lanzar.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow p-6 text-center border"
              >
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                  {item.title}
                </h3>
                <p className=" text-[var(--color-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="max-w-5xl mx-auto text-center mb-24">
          <h2 className="text-3xl font-bold mb-12">¿Cómo funciona?</h2>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            {[
              {
                icon: "/encuesta.png",
                title: "Creá una pregunta",
                desc: "Con opciones múltiples. Ideal para encuestas o decisiones grupales.",
              },
              {
                icon: "/compartir-enlace.png",
                title: "Compartila por link o QR",
                desc: "Enviá tu encuesta a quien quieras, desde donde quieras.",
              },
              {
                icon: "/grafico-de-barras.png",
                title: "Revisá los resultados",
                desc: "En tiempo real, desde cualquier dispositivo.",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center max-w-xs">
                <div className="w-24 h-24 rounded-full bg-white shadow border-2 border-[var(--color-primary)] flex items-center justify-center">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--color-primary)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-secondary)] mt-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Por qué usar Pollify */}
        <section className="bg-white py-16 px-6 rounded-xl shadow-inner">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por qué usar Pollify
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
              {[
                {
                  icon: "/icons/sin-cuentas.png",
                  title: "Sin cuentas",
                  desc: "Creá encuestas sin necesidad de registro.",
                },
                {
                  icon: "/icons/compartir.png",
                  title: "Compartí en segundos",
                  desc: "Envía tu encuesta con un simple link o QR.",
                },
                {
                  icon: "/icons/resultados.png",
                  title: "Resultados claros",
                  desc: "Visualización en tiempo real, clara y accesible.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-secondary)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-2xl mx-auto">
              {[
                {
                  icon: "/icons/libre.png",
                  title: "100% gratis",
                  desc: "Sin cargos ocultos, sin límite de uso.",
                },
                {
                  icon: "/icons/dispositivo.png",
                  title: "Multi-dispositivo",
                  desc: "Funciona en cualquier sistema o pantalla.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-secondary)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center py-16">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">
            ¿Listo para crear tu encuesta?
          </h2>
          <CreatePollButton />
        </section>
      </main>

      <footer className="bg-[var(--color-secondary)] text-[var(--color-foreground-light)] text-center py-4">
        <p>&copy; 2025 Copyright Pollify. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
