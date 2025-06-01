import { connectDB } from "@/lib/mongodb";
import Poll from "@/models/Poll";
import { notFound } from "next/navigation";
import VoteForm from "./VoteForm";

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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-[#322A7D] text-center mb-2">
        {poll.title}
      </h1>
      <p className="text-md text-gray-600 text-center mb-6">{poll.subtitle}</p>

      {/* Client Component */}
      <VoteForm poll={JSON.parse(JSON.stringify(poll))} />
    </div>
  );
}
