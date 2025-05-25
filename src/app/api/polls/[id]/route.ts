import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Poll from "@/models/Poll";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const poll = await Poll.findById(params.id).lean();

    if (!poll) {
      return NextResponse.json({ error: "Encuesta no encontrada" }, { status: 404 });
    }

    return NextResponse.json(poll);
  } catch (error) {
    console.error("Error fetching poll:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
