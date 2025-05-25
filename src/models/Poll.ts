// src/models/Poll.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IOption {
  _id?: string
  text: string
}

export interface IQuestion {
  _id?: string
  text: string
  options: IOption[]
  multipleSelection: boolean
}

export interface IConfiguration {
  visibility: 'public' | 'private'
  duration: {
    type: 'votes' | 'date' | 'both'
    maxVotes?: number
    startDate?: Date
    endDate?: Date
  }
  security: 'none' | 'low' | 'medium' | 'high'
  timeLimitSeconds?: number
  monetization: {
    type: 'free' | 'pay_per_vote'
    amountPerVote?: number
    budget?: number // opcional si no se limita por cantidad
  }
  resultVisibility: 'public' | 'private'
  plan: 'free' | 'paid'
}

export interface IPoll extends Document {
  title: string
  subtitle?: string
  image?: string
  questions: IQuestion[]
  config: IConfiguration
  owner: mongoose.Types.ObjectId
  createdAt: Date
}

const optionSchema = new Schema<IOption>(
  {
    _id: { type: String },
    text: { type: String, required: true },
  },
  { _id: false }
)

const questionSchema = new Schema<IQuestion>(
  {
    _id: { type: String },
    text: { type: String, required: true },
    options: [optionSchema],
    multipleSelection: { type: Boolean, default: false },
  },
  { _id: false }
)

const pollSchema = new Schema<IPoll>({
  title: { type: String, required: true },
  subtitle: String,
  image: String,
  questions: [questionSchema],
  config: {
    visibility: {
      type: String,
      enum: ['public', 'private'],
      required: true,
    },
    duration: {
      type: {
        type: String,
        enum: ['votes', 'date', 'both'],
        required: true,
      },
      maxVotes: Number,
      startDate: Date,
      endDate: Date,
    },
    security: {
      type: String,
      enum: ['none', 'low', 'medium', 'high'],
      required: true,
    },
    timeLimitSeconds: Number,
    monetization: {
      type: {
        type: String,
        enum: ['free', 'pay_per_vote'],
        required: true,
      },
      amountPerVote: Number,
      budget: Number,
    },
    resultVisibility: {
      type: String,
      enum: ['public', 'private'],
      required: true,
    },
    plan: {
      type: String,
      enum: ['free', 'paid'],
      required: true,
    },
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
})

const Poll: Model<IPoll> = mongoose.models.Poll || mongoose.model<IPoll>('Poll', pollSchema)
export default Poll
