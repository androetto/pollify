import { NextResponse } from "next/server";

import Poll from "@/models/Poll";
import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { CreatePollDTO } from "@/interfaces/CreatePollDTO";

export async function POST(request: Request) {
  try {
    await connectDB();

    const data = (await request.json()) as CreatePollDTO;

     const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Validaciones básicas
    const { title, subtitle, questions, config } = data;
    if (
      !title ||
      !subtitle ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    for (const q of questions) {
      if (
        !q.text ||
        !q.options ||
        q.options.length === 0 ||
        q.options.some((o) => !o.text)
      ) {
        return NextResponse.json(
          { error: "Todas las preguntas y opciones deben estar completas" },
          { status: 400 }
        );
      }
    }

     const poll = new Poll({
      title,
      subtitle,
      questions,
      config,
      owner: user._id,
    });
    await poll.save();

    return NextResponse.json(
      { message: "Votación creada con éxito", poll },
      { status: 201 }
    );
  } catch (err) {
  console.error("Error en POST /api/polls:", err);

  const errorMessage =
    err instanceof Error ? err.message : "Error desconocido";

  return NextResponse.json(
    { error: "Error interno del servidor", details: errorMessage },
    { status: 500 }
  );
}
}
