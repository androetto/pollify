import { connectDB } from "@/lib/mongodb";
import Poll from "@/models/Poll";
import { notFound } from "next/navigation";
import VoteForm from "./VoteForm";
import Card from "@/components/Card";
import PageShell from "@/components/PageShell";
import { FaChartBar } from "react-icons/fa";

export const dynamic = "force-dynamic";

interface VotePageProps {
  params: Promise<{ id: string }>;
}

export default async function VotePage({ params }: VotePageProps) {
  const { id } = await params;

  await connectDB();
  const poll = await Poll.findById(id);
  if (!poll) return notFound();

  return (
    <PageShell>
      <Card>
        <div className="flex flex-col items-center mb-2">
          <div className="w-14 h-14 rounded-full bg-[var(--color-primary-tint)] flex items-center justify-center mb-3">
            <FaChartBar className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] text-center">
            {poll.title}
          </h1>
          <p className="text-md text-[var(--color-secondary)] text-center mt-1 mb-2">
            {poll.subtitle}
          </p>
          {poll.questions.length > 1 && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[var(--color-primary-tint)] text-[var(--color-primary)] mb-4">
              {poll.questions.length} preguntas
            </span>
          )}
        </div>

        {/* Client Component */}
        <VoteForm poll={JSON.parse(JSON.stringify(poll))} />
      </Card>
    </PageShell>
  );
}
