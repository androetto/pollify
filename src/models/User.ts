// src/models/User.ts
import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  provider: 'google'
  phone?: string
  biometricVerified?: boolean
  createdAt: Date
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  provider: { type: String, enum: ['google'], required: true },
  phone: { type: String },
  biometricVerified: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
