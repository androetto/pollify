"use client";

import ConfigButton from "@/components/ConfigButton";
import SettingsPanel from "@/components/SettingsPanel";
import { IConfiguration, IQuestion } from "@/models/Poll";
import { useState } from "react";

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
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [config, setConfig] = useState<IConfiguration>(defaultConfig);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

 const handleAddQuestion = () => {
  setQuestions([
    ...questions,
    { text: "", options: [{ text: "" }], multipleSelection: false },
  ]);
};

  const handleAddOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push({ text: "" });
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

      alert("Votación creada con éxito");
      setTitle("");
      setSubtitle("");
      setQuestions([]);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
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
                <input
                  key={oIndex}
                  type="text"
                  value={opt.text}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="w-full mb-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#322A7D]"
                  placeholder={`Opción ${oIndex + 1}`}
                />
              ))}

              <button
                type="button"
                onClick={() => handleAddOption(qIndex)}
                className="mt-2 text-sm text-[#322A7D] font-medium hover:underline"
              >
                + Agregar opción
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="px-5 py-2 bg-[#322A7D] text-white font-semibold rounded-lg hover:bg-[#42389D] transition"
          >
            + Agregar pregunta
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 text-white font-semibold rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-[#322A7D] hover:bg-[#42389D]"
            }`}
          >
            {loading ? "Guardando..." : "Guardar Votación"}
          </button>
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
