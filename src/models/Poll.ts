// src/models/Poll.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IQuestion {
  _id: string
  text: string
  options: {
    _id: string
    text: string
  }[]
}

export interface IPoll extends Document {
  title: string
  description: string
  visibility: 'public' | 'private'
  authentication: 'google' | 'google_sms' | 'google_email' | 'google_biometric'
  monetization: {
    type: 'free' | 'pay_per_vote'
    amountPerVote?: number
  }
  limit: {
    type: 'votes' | 'time' | 'both'
    maxVotes?: number
    expiresAt?: Date
  }
  questions: IQuestion[]
  owner: mongoose.Types.ObjectId // referencia a User
  createdAt: Date
}

const optionSchema = new Schema(
  {
    _id: { type: String },
    text: { type: String, required: true },
  },
  { _id: false }
)

const questionSchema = new Schema(
  {
    _id: { type: String },
    text: { type: String, required: true },
    options: [optionSchema],
  },
  { _id: false }
)

const pollSchema: Schema<IPoll> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  visibility: { type: String, enum: ['public', 'private'], required: true },
  authentication: {
    type: String,
    enum: ['google', 'google_sms', 'google_email', 'google_biometric'],
    required: true,
  },
  monetization: {
    type: {
      type: String,
      enum: ['free', 'pay_per_vote'],
      required: true,
    },
    amountPerVote: { type: Number },
  },
  limit: {
    type: {
      type: String,
      enum: ['votes', 'time', 'both'],
      required: true,
    },
    maxVotes: Number,
    expiresAt: Date,
  },
  questions: [questionSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
})

const Poll: Model<IPoll> = mongoose.models.Poll || mongoose.model<IPoll>('Poll', pollSchema)

export default Poll
