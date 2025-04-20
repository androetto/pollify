import clientPromise from '@/lib/mongodb'

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { title, subtitle } = await req.json()

    if (!title || !subtitle) {
      return new Response('Title and subtitle are required', { status: 400 })
    }

    const client = await clientPromise // ✅ Esperamos a que se conecte
    const db = client.db()             // Ahora sí usamos .db()
    const pollsCollection = db.collection('polls')

    const newPoll = {
      title,
      description: subtitle,
      createdAt: new Date(),
    }

    await pollsCollection.insertOne(newPoll)

    return new Response(JSON.stringify({ message: 'Poll created successfully' }), {
      status: 201,
    })
  } catch (error) {
    console.error('Error creating poll:', error)
    return new Response('Error creating poll', { status: 500 })
  }
}
