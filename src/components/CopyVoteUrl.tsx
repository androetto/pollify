"use client";

import { useState, useEffect } from "react";

interface CopyVoteUrlProps {
  id: string;
}

export default function CopyVoteUrl({ id }: CopyVoteUrlProps) {
  const [copied, setCopied] = useState(false);
  const [voteUrl, setVoteUrl] = useState("");

  useEffect(() => {
    // window sólo existe en cliente, acá lo usamos seguro
    setVoteUrl(`${window.location.origin}/vote/${id}`);
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(voteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!voteUrl) return <div>Cargando...</div>;

  return (
    <div className="flex justify-center items-center space-x-2">
      <input
        type="text"
        readOnly
        value={voteUrl}
        className="w-full max-w-md p-3 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-[#322A7D] text-white rounded hover:bg-[#42389D]"
      >
        {copied ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );
}
