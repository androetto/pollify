import CopyVoteUrl from "@/components/CopyVoteUrl";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import { HiOutlineCheckCircle } from "react-icons/hi2";

interface FinishPageProps {
  params: Promise<{ id: string }>;
}

export default async function FinishPage({ params }: FinishPageProps) {
  const { id } = await params;

  return (
    <PageShell maxWidth="xl">
      <Card className="text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center mx-auto mb-4 animate-scale-in">
          <HiOutlineCheckCircle className="w-8 h-8 text-[var(--color-success)]" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-[var(--color-foreground)]">
          ¡Tu encuesta ya está lista!
        </h1>
        <p className="mb-6 text-[var(--color-secondary)]">
          Compartila por link o QR con quien quieras:
        </p>
        <CopyVoteUrl id={id} />
      </Card>
    </PageShell>
  );
}
