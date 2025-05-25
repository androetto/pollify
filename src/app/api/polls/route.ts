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
      config,
      owner: user._id,
      questions: questions.map((q) => ({
        text: q.text,
        multipleSelection: q.multipleSelection ?? false,
        options: q.options.map((o) => ({ text: o.text })),
      })),
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

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const title = searchParams.get("title");

  if (!id && !title) {
    return NextResponse.json(
      { error: "Se requiere id o title" },
      { status: 400 }
    );
  }

  let poll;
  try {
    if (id) {
      poll = await Poll.findById(id);
    } else if (title) {
      poll = await Poll.findOne({ title });
    }

    if (!poll) {
      return NextResponse.json(
        { error: "Encuesta no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(poll);
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
