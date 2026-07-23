"use client";

import ConfigButton from "@/components/ConfigButton";
import SettingsPanel from "@/components/SettingsPanel";
import FullScreenLoading from "@/components/FullScreenLoading";
import PrimaryButton from "@/components/PrimaryButton";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import { IConfiguration, IQuestion } from "@/models/Poll";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiOutlineClipboardDocumentList, HiOutlineTrash, HiOutlineQuestionMarkCircle } from "react-icons/hi2";

const defaultConfig: IConfiguration = {
  visibility: "public",
  duration: {
    type: "votes",
  },
  security: "none",
  timeLimitSeconds: undefined,
  monetization: {
    type: "free",
  },
  resultVisibility: "public",
  plan: "free",
};

export default function CreatePoll() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [config, setConfig] = useState<IConfiguration>(defaultConfig);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const titleInput = document.querySelector('input[placeholder="Ej: Encuesta de satisfacción"]');
    if (titleInput instanceof HTMLInputElement) {
      titleInput.focus();
    }
  }, []);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: [{ text: "" }], multipleSelection: false },
    ]);
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[placeholder="Ingrese la pregunta"]');
      const lastInput = inputs[inputs.length - 1];
      if (lastInput instanceof HTMLInputElement) {
        lastInput.focus();
      }
    }, 0);
  };

  const handleAddOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push({ text: "" });
    setQuestions(updated);
  };

  const handleRemoveOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  const handleQuestionChange = (qIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].text = value;
    setQuestions(updated);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].text = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subtitle || questions.length === 0) {
      setError("Complete todos los campos antes de guardar");
      return;
    }

    for (const q of questions) {
      if (!q.text || q.options.length === 0 || q.options.some((o) => !o.text)) {
        setError("Todas las preguntas y opciones deben estar completas");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, questions, config }),
      });

      if (!response.ok) throw new Error("Error al crear la votación");

      const data = await response.json();

      // Pequeño delay para asegurar que el loading se vea
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirigir a la página finish con el id del poll
      router.push(`/finish/${data.poll._id}`);

    } catch (err) {
      console.error(err);
      setError("Ocurrió un error desconocido");
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <Card>
        <FullScreenLoading isOpen={loading} message="Creando tu votación..." />

        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center mb-3">
            <HiOutlineClipboardDocumentList className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-foreground)] text-center">
            Nueva encuesta
          </h1>
          <p className="text-md text-[var(--color-secondary)] text-center mt-1">
            Defina el título, subtítulo y las preguntas con sus opciones
          </p>
        </div>

        {error && (
          <p className="text-[var(--color-danger)] mb-4 text-center animate-fade-in">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
              placeholder="Ej: Encuesta de satisfacción"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
              placeholder="Ej: Por favor respondé las siguientes preguntas"
            />
          </div>

          {questions.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-[var(--color-border)] p-8 text-center text-[var(--color-secondary)] mb-6">
              Todavía no agregaste preguntas. ¡Sumá la primera!
            </div>
          )}

          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="bg-gray-50 p-5 rounded-lg border border-gray-200 animate-fade-in"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-[var(--color-primary-tint)] text-[var(--color-primary)]">
                    <HiOutlineQuestionMarkCircle className="w-4 h-4" />
                    Pregunta {qIndex + 1}
                  </span>
                </div>
                <input
                  type="text"
                  value={q.text}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
                  placeholder="Ingrese la pregunta"
                />

                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="relative animate-fade-in">
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      className="w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] pr-10"
                      placeholder={`Opción ${oIndex + 1}`}
                    />
                    {q.options.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(qIndex, oIndex)}
                        className="absolute right-3 top-[13px] text-gray-400 hover:text-[var(--color-danger)] cursor-pointer p-1"
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddOption(qIndex)}
                  className="mt-2 text-sm text-[var(--color-primary)] font-medium hover:underline cursor-pointer"
                >
                  + Agregar opción
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <PrimaryButton onClick={handleAddQuestion}>
              + Agregar pregunta
            </PrimaryButton>
          </div>

          <div className="flex justify-center mt-8">
            <PrimaryButton
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading ? "Guardando..." : "Guardar Votación"}
            </PrimaryButton>
          </div>
        </form>
      </Card>

      {/* Icono de la ruedita */}
      <ConfigButton onClick={() => setPanelOpen(true)} />

      {/* Panel de configuración */}
      <SettingsPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        configuration={config}
        onSave={setConfig}
      />
    </PageShell>
  );
}
