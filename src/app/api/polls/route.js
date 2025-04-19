export const runtime = 'edge';

import connect from '../../../lib/mongodb'  // Importa la conexión de MongoDB
import Poll from '../../../models/Poll'

export async function POST(req) {
  try {
    const { title, subtitle } = await req.json()

    // Verificar que los datos necesarios estén presentes
    if (!title || !subtitle) {
      return new Response('Title and subtitle are required', { status: 400 })
    }

    await connect()  // Conectar a la base de datos

    // Crear un nuevo objeto Poll
    const newPoll = new Poll({
      title,
      description: subtitle,  // Usamos 'description' para el subtítulo
      createdAt: new Date(),
    })

    // Guardar en la base de datos
    await newPoll.save()

    return new Response(JSON.stringify({ message: 'Poll created successfully' }), {
      status: 201,
    })
  } catch (error) {
    console.error('Error creating poll:', error) 
    return new Response('Error creating poll', { status: 500 })
  }
}
