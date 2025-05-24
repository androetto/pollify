// app/api/user/route.ts
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/getCurrentUser"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ user: null }, { status: 401 })

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 })
  }
}
