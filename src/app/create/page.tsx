"use client";

import ConfigButton from "@/components/ConfigButton";
import SettingsPanel from "@/components/SettingsPanel";
import FullScreenLoading from "@/components/FullScreenLoading";
import PrimaryButton from "@/components/PrimaryButton";
import { IConfiguration, IQuestion } from "@/models/Poll";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <FullScreenLoading isOpen={loading} message="Creando tu votación..." />
      
      <h1 className="text-3xl font-bold text-[#322A7D] text-center mb-2">
        Pollify
      </h1>
      <p className="text-md text-gray-600 text-center mb-6">
        Defina el título, subtítulo y las preguntas con sus opciones
      </p>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#322A7D] focus:outline-none"
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
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#322A7D] focus:outline-none"
            placeholder="Ej: Por favor respondé las siguientes preguntas"
          />
        </div>

        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-gray-50 p-5 rounded-lg border border-gray-200"
            >
              <label className="block font-semibold text-gray-700 mb-2">
                Pregunta {qIndex + 1}
              </label>
              <input
                type="text"
                value={q.text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#322A7D] focus:outline-none"
                placeholder="Ingrese la pregunta"
              />

              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="relative">
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    className="w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#322A7D] pr-10"
                    placeholder={`Opción ${oIndex + 1}`}
                  />
                  {q.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(qIndex, oIndex)}
                      className="absolute right-3 top-[11px] text-gray-400 hover:text-red-500 cursor-pointer p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddOption(qIndex)}
                className="mt-2 text-sm text-[#322A7D] font-medium hover:underline cursor-pointer"
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
      {/* Icono de la ruedita */}
      <ConfigButton onClick={() => setPanelOpen(true)} />

      {/* Panel de configuración */}
      <SettingsPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        configuration={config}
        onSave={setConfig}
      />
    </div>
  );
}
