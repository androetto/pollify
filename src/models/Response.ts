import mongoose, { Schema, Document } from 'mongoose';

export interface IResponse extends Document {
  pollId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  answers: {
    questionId: string;
    options: string[];
  }[];
}

const responseSchema = new Schema<IResponse>(
  {
    pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    answers: [
      {
        questionId: { type: String, required: true },
        options: [{ type: String, required: true }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Response = mongoose.models.Response || mongoose.model<IResponse>('Response', responseSchema);

export default Response;
