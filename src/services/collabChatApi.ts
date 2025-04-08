import type { Broadcast } from '@/interfaces/broadcast'
import axios from 'axios'

const getBroadcasts = async (): Promise<Broadcast[]> => {
  try {
    const { data } = await axios.get<Broadcast[]>(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/collab-chat?username=test12`,
    )
    return data
  } catch (error) {
    throw new Error('Error al obtener difusiones: ' + error)
  }
}

const setBroadcast = async (broadcast: Broadcast): Promise<void> => {
  try {
    await axios.post(`https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/collab-chat`, broadcast)
  } catch (error) {
    throw new Error('Error al cargar difusión: ' + error)
  }
}

const editBroadcast = async (id: string, broadcast: Broadcast): Promise<void> => {
  try {
    await axios.put(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/collab-chat/${id}`,
      broadcast,
    )
  } catch (error) {
    throw new Error('Error al editar difusión: ' + error)
  }
}

export { setBroadcast, getBroadcasts, editBroadcast }
