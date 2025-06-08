import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Poll from "@/models/Poll";
import Response, { IResponse } from "@/models/Response";
import { getCurrentUser } from "@/lib/getCurrentUser";

type Answer = IResponse['answers'][0];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pollId } = await params;
    if (!pollId) {
      return NextResponse.json({ error: "ID de encuesta no proporcionado" }, { status: 400 });
    }

    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) {
      return NextResponse.json({ error: "Encuesta no encontrada" }, { status: 404 });
    }

    // Verificar que el usuario es el dueño de la encuesta
    if (poll.owner.toString() !== user._id.toString()) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener todas las respuestas para esta encuesta
    const responses = await Response.find({ pollId: poll._id });

    // Procesar los resultados
    const results = poll.questions.map(question => {
      const questionResponses = responses.flatMap(response => 
        response.answers.find((answer: Answer) => answer.questionId === question._id?.toString())?.options || []
      );

      const optionCounts = question.options.reduce((acc, option) => {
        acc[option.text] = questionResponses.filter(response => response === option.text).length;
        return acc;
      }, {} as Record<string, number>);

      return {
        questionId: question._id,
        questionText: question.text,
        options: question.options.map(option => ({
          text: option.text,
          count: optionCounts[option.text] || 0,
          percentage: questionResponses.length > 0 
            ? Math.round((optionCounts[option.text] || 0) / questionResponses.length * 100)
            : 0
        })),
        totalResponses: questionResponses.length
      };
    });

    return NextResponse.json({
      poll: {
        title: poll.title,
        subtitle: poll.subtitle,
        createdAt: poll.createdAt
      },
      results,
      totalResponses: responses.length
    });
  } catch (err) {
    console.error("Error en GET /api/polls/[id]/results:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";

    return NextResponse.json(
      { error: "Error interno del servidor", details: errorMessage },
      { status: 500 }
    );
  }
} 