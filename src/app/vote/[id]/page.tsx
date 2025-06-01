import { connectDB } from "@/lib/mongodb";
import Poll, { IOption, IQuestion } from "@/models/Poll";
import { notFound } from "next/navigation";

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

      <form method="post" action="/api/responses">
        <input
          type="hidden"
          name="pollId"
          value={(poll._id as { toString: () => string }).toString()}
        />

        {poll.questions.map((q: IQuestion, qIndex: number) => (
          <div
            key={qIndex}
            className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6"
          >
            <label className="block font-semibold text-gray-700 mb-3">
              {q.text}
            </label>

            {q.options.map((opt: IOption, oIndex: number) => (
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
          className="mt-4 px-6 py-2 bg-[#322A7D] text-white rounded hover:bg-[#42389D] w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
