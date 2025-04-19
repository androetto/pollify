import { MongoClient } from 'mongodb'

export const runtime = 'nodejs';

const client = new MongoClient(process.env.MONGODB_URI);

export async function POST(req) {
  try {
    const { title, subtitle } = await req.json()

    // Verificar que los datos necesarios estén presentes
    if (!title || !subtitle) {
      return new Response('Title and subtitle are required', { status: 400 })
    }

    await client.connect();  // Conectar a MongoDB

    const db = client.db();  // Conectar a la base de datos por defecto (puedes especificar una si es necesario)
    const pollsCollection = db.collection('polls');  // Aquí es donde defines la colección de 'polls'

    // Insertar el nuevo poll
    const newPoll = {
      title,
      description: subtitle,  // Usamos 'description' para el subtítulo
      createdAt: new Date(),
    };

    await pollsCollection.insertOne(newPoll);

    return new Response(JSON.stringify({ message: 'Poll created successfully' }), {
      status: 201,
    })
  } catch (error) {
    console.error('Error creating poll:', error);
    return new Response('Error creating poll', { status: 500 })
  }
}
