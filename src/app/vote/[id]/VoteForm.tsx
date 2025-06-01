"use client";

import { IPoll } from "@/models/Poll";
import { useState } from "react";

export default function VoteForm({ poll }: { poll: IPoll }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/responses", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      window.location.href = "/thanks";
    } else {
      alert("Error al enviar.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="pollId" value={String(poll._id)} />

      {poll.questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6"
        >
          <label className="block font-semibold text-gray-700 mb-3">
            {q.text}
          </label>

          {q.options.map((opt, oIndex) => (
            <label
              key={oIndex}
              className="flex items-center mb-2 p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name={`question-${q._id}`}
                value={opt.text}
                required
                className="mr-3 w-5 h-5 text-[#322A7D] focus:ring-[#322A7D]"
              />
              <span className="text-gray-800">{opt.text}</span>
            </label>
          ))}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 px-6 py-2 bg-[#322A7D] text-white rounded hover:bg-[#42389D] w-full"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
