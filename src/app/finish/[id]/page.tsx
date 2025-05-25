import CopyVoteUrl from "@/components/CopyVoteUrl";

export default function FinishPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200 text-center">
      <h1 className="text-3xl font-bold mb-4 text-[#322A7D]">Poll creada con éxito!</h1>
      <p className="mb-6 text-gray-700">Comparte este link con quien quieras:</p>
      <CopyVoteUrl id={id} />
    </div>
  );
}
