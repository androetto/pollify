import { connectDB } from '@/lib/mongodb'
import Poll from '@/models/Poll'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { title, subtitle } = await req.json()

    if (!title || !subtitle) {
      return new Response('Title and subtitle are required', { status: 400 })
    }

    await connectDB()

    const newPoll = await Poll.create({
      title,
      description: subtitle,
    })

    return new Response(JSON.stringify({ message: 'Poll created successfully', id: newPoll._id }), {
      status: 201,
    })
  } catch (error) {
    console.error('Error creating poll:', error)
    return new Response('Error creating poll', { status: 500 })
  }
}
