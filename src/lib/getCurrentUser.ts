// lib/getCurrentUser.ts
import { getServerSession } from "next-auth"
import User from "@/models/User"
import { connectDB } from "@/lib/mongodb"
import { authOptions } from "./authOptions"

export async function getCurrentUser() {
  await connectDB()

  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null

  const user = await User.findOne({ email: session.user.email }).lean()
  return user
}
