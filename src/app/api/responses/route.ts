import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ResponseModel from "@/models/Response";

export async function POST(request: Request) {
  await connectDB();

  const formData = await request.formData();

  const pollId = formData.get("pollId") as string;
  if (!pollId) return NextResponse.json({ error: "pollId is required" }, { status: 400 });

  const answers: { questionIndex: number; answer: string }[] = [];

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("question-")) {
      const questionIndex = parseInt(key.replace("question-", ""), 10);
      answers.push({ questionIndex, answer: value as string });
    }
  }

  if (answers.length === 0) {
    return NextResponse.json({ error: "No answers provided" }, { status: 400 });
  }

  try {
    const newResponse = await ResponseModel.create({
      pollId,
      answers,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, responseId: newResponse._id });
  } catch (error) {
        console.error("Error saving response:", error);

    return NextResponse.json({ error: "Error saving response" }, { status: 500 });
  }
}
