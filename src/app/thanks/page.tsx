import Link from "next/link";

export default function ThanksPage() {
  return (
    <div className="max-w-xl mx-auto mt-20 text-center px-4">
      <h1 className="text-3xl font-bold text-[#322A7D] mb-4">¡Gracias por votar!</h1>
      <p className="text-gray-600 mb-6">Tu respuesta fue registrada correctamente.</p>
      <Link href="/" className="text-[#322A7D] underline hover:text-[#2a246f]">
        Volver al inicio
      </Link>
    </div>
  );
}
