import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import PrimaryButton from "@/components/PrimaryButton";

export default function ThanksPage() {
  return (
    <PageShell maxWidth="xl">
      <Card className="text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center mx-auto mb-4 animate-scale-in">
          <FaCheckCircle className="w-8 h-8 text-[var(--color-success)]" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">¡Gracias por votar!</h1>
        <p className="text-[var(--color-secondary)] mb-8">
          Tu respuesta fue registrada correctamente.
        </p>

        <Link href="/create" className="block">
          <PrimaryButton fullWidth>Creá tu propia encuesta</PrimaryButton>
        </Link>
        <Link
          href="/"
          className="inline-block mt-4 text-sm text-[var(--color-secondary)] underline hover:text-[var(--color-primary)]"
        >
          Volver al inicio
        </Link>
      </Card>
    </PageShell>
  );
}
