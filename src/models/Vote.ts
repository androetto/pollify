// src/models/Vote.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IVote extends Document {
  pollId: mongoose.Types.ObjectId
  voterId: mongoose.Types.ObjectId
  responses: {
    questionId: string
    optionId: string
  }[]
  createdAt: Date
}

const voteSchema: Schema<IVote> = new Schema({
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  voterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  responses: [
    {
      questionId: { type: String, required: true },
      optionId: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
})

const Vote: Model<IVote> = mongoose.models.Vote || mongoose.model<IVote>('Vote', voteSchema)

export default Vote
