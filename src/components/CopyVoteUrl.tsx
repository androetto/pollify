"use client";

import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { FaCheck, FaRegCopy, FaShareAlt } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";

interface CopyVoteUrlProps {
  id: string;
}

export default function CopyVoteUrl({ id }: CopyVoteUrlProps) {
  const [copied, setCopied] = useState(false);
  const [voteUrl, setVoteUrl] = useState("");
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setVoteUrl(`${window.location.origin}/vote/${id}`);
    setCanShare(typeof navigator.share === "function");
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(voteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: "Votá en mi encuesta", url: voteUrl });
    } catch {
      // el usuario canceló el share sheet, no hacemos nada
    }
  };

  if (!voteUrl) return <div className="text-center text-[var(--color-secondary)]">Cargando...</div>;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-4 bg-white rounded-xl border border-[var(--color-border)]">
        <QRCode value={voteUrl} size={160} fgColor="#111827" bgColor="#ffffff" />
      </div>

      <div className="flex w-full max-w-md items-center gap-2">
        <input
          type="text"
          readOnly
          value={voteUrl}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-[var(--color-secondary)]"
        />
        <button
          onClick={handleCopy}
          aria-label="Copiar link"
          className="p-3 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition cursor-pointer shrink-0"
        >
          {copied ? <FaCheck /> : <FaRegCopy />}
        </button>
      </div>

      {canShare && (
        <PrimaryButton onClick={handleShare} className="flex items-center gap-2">
          <FaShareAlt /> Compartir
        </PrimaryButton>
      )}
    </div>
  );
}
