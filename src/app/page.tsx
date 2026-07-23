"use client";

import Head from "next/head";
import { Typewriter } from "react-simple-typewriter";
import CreatePollButton from "@/components/CreatePollButton";
import {
  HiOutlineUserGroup,
  HiOutlineChatBubbleLeftRight,
  HiOutlineAcademicCap,
  HiOutlineRocketLaunch,
  HiOutlineClipboardDocumentList,
  HiOutlineShare,
  HiOutlineChartBar,
  HiOutlineUserMinus,
  HiOutlineBolt,
  HiOutlineChartPie,
  HiOutlineGift,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";

function IconBadge({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="w-14 h-14 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center mx-auto mb-4">
      <Icon className="w-6 h-6 text-[var(--color-primary)]" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Pollify - Votación Online</title>
        <meta
          name="description"
          content="Crea tu propia votación online de forma fácil y rápida."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero */}
      <header className="py-28 px-6 text-center animate-fade-in">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight text-[var(--color-foreground)]">
          Pollify
        </h1>
        <h2 className="text-xl md:text-2xl h-8 font-medium text-[var(--color-secondary)]">
          <Typewriter
            words={[
              "Preguntá. Compartí. Enterate en minutos.",
              "Sin registros. Sin instalar nada. Solo respuestas.",
              "La decisión de grupo, resuelta con un link.",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={0}
            delaySpeed={2000}
          />
        </h2>
        <p className="mt-10 max-w-2xl mx-auto text-lg text-[var(--color-secondary)]">
          Creá una encuesta en menos de un minuto y compartila por WhatsApp,
          redes o QR. Así de simple.
        </p>
        <div className="mt-10">
          <CreatePollButton />
        </div>
      </header>

      <main className="flex-grow bg-[var(--color-background)] px-6 py-16">
        {/* Casos de uso */}
        <section className="max-w-6xl mx-auto mb-24 animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-foreground)]">
            ¿Para qué puedo usar Pollify?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: HiOutlineUserGroup,
                title: "Equipos de trabajo",
                desc: "Decisiones rápidas sin reuniones innecesarias.",
              },
              {
                icon: HiOutlineChatBubbleLeftRight,
                title: "Creadores de contenido",
                desc: "Conectá con tu audiencia con encuestas interactivas.",
              },
              {
                icon: HiOutlineAcademicCap,
                title: "Docentes y educadores",
                desc: "Evaluá el aprendizaje de forma participativa.",
              },
              {
                icon: HiOutlineRocketLaunch,
                title: "Emprendedores",
                desc: "Testeá ideas con tu audiencia antes de lanzar.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="card-surface rounded-2xl shadow-sm p-6 text-center transition hover:-translate-y-1"
              >
                <IconBadge icon={item.icon} />
                <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--color-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="max-w-5xl mx-auto text-center mb-24 animate-fade-in">
          <h2 className="text-3xl font-bold mb-12 text-[var(--color-foreground)]">¿Cómo funciona?</h2>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            {[
              {
                icon: HiOutlineClipboardDocumentList,
                title: "Creá una pregunta",
                desc: "Con opciones múltiples. Ideal para encuestas o decisiones grupales.",
              },
              {
                icon: HiOutlineShare,
                title: "Compartila por link o QR",
                desc: "Enviá tu encuesta a quien quieras, desde donde quieras.",
              },
              {
                icon: HiOutlineChartBar,
                title: "Revisá los resultados",
                desc: "En tiempo real, desde cualquier dispositivo.",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center max-w-xs">
                <div className="w-24 h-24 rounded-full card-surface shadow-sm flex items-center justify-center">
                  <step.icon className="w-9 h-9 text-[var(--color-primary)]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--color-foreground)]">
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
        <section className="card-surface py-16 px-6 rounded-2xl shadow-sm animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-foreground)]">
            Por qué usar Pollify
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
              {[
                {
                  icon: HiOutlineUserMinus,
                  title: "Sin cuentas",
                  desc: "Creá encuestas sin necesidad de registro.",
                },
                {
                  icon: HiOutlineBolt,
                  title: "Compartí en segundos",
                  desc: "Envía tu encuesta con un simple link o QR.",
                },
                {
                  icon: HiOutlineChartPie,
                  title: "Resultados claros",
                  desc: "Visualización en tiempo real, clara y accesible.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <IconBadge icon={item.icon} />
                  <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
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
                  icon: HiOutlineGift,
                  title: "100% gratis",
                  desc: "Sin cargos ocultos, sin límite de uso.",
                },
                {
                  icon: HiOutlineDevicePhoneMobile,
                  title: "Multi-dispositivo",
                  desc: "Funciona en cualquier sistema o pantalla.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <IconBadge icon={item.icon} />
                  <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
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
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-foreground)]">
            Tu primera encuesta te toma menos de un minuto
          </h2>
          <CreatePollButton />
        </section>
      </main>

      <footer className="border-t border-[var(--color-border)] text-[var(--color-secondary)] text-center py-4 text-sm">
        <p>&copy; 2025 Copyright Pollify. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
