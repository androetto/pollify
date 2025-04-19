// src/models/Poll.js
import mongoose from 'mongoose'

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },   // Título de la votación
  description: { type: String, required: true },  // Descripción de la votación
  createdAt: { type: Date, default: Date.now },  // Fecha de creación
})

const Poll = mongoose.models.Poll || mongoose.model('Poll', pollSchema)

export default Poll
