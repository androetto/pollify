// src/models/Poll.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IPoll extends Document {
  title: string
  description: string
  createdAt: Date
}

const pollSchema: Schema<IPoll> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Poll: Model<IPoll> = mongoose.models.Poll || mongoose.model<IPoll>('Poll', pollSchema)

export default Poll
