import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Poll from "@/models/Poll";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const polls = await Poll.find({ owner: user._id })
      .sort({ createdAt: -1 })
      .select('title subtitle createdAt')
      .lean();

    return NextResponse.json({ polls });
  } catch (err) {
    console.error("Error en GET /api/polls/user:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";

    return NextResponse.json(
      { error: "Error interno del servidor", details: errorMessage },
      { status: 500 }
    );
  }
} 