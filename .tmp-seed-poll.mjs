import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

await mongoose.connect(process.env.MONGODB_URI);

const optionSchema = new mongoose.Schema({ text: { type: String, required: true } });
const questionSchema = new mongoose.Schema(
  { text: String, options: [optionSchema], multipleSelection: { type: Boolean, default: false } },
  { _id: true }
);
const pollSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  questions: [questionSchema],
  config: mongoose.Schema.Types.Mixed,
  owner: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
});
const Poll = mongoose.models.Poll || mongoose.model("Poll", pollSchema);

const poll = await Poll.create({
  title: "TEST-UI-REVIEW ¿Cuál es tu lenguaje favorito?",
  subtitle: "Encuesta temporal solo para verificar el rediseño visual",
  questions: [
    {
      text: "¿Qué lenguaje preferís?",
      multipleSelection: false,
      options: [{ text: "TypeScript" }, { text: "Python" }, { text: "Go" }],
    },
  ],
  config: {
    visibility: "public",
    duration: { type: "votes" },
    security: "none",
    monetization: { type: "free" },
    resultVisibility: "public",
    plan: "free",
  },
  owner: new mongoose.Types.ObjectId(),
});

console.log("POLL_ID=" + poll._id.toString());
await mongoose.disconnect();
