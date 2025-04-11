import type Commentary from '@/interfaces/commentary'
import type { Mock } from '@/interfaces/mock'
import axios from 'axios'

const getPokemonComment = async (id: string): Promise<Commentary[]> => {
  try {
    const { data } = await axios.get<Mock[]>(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/${id}`,
    )
    return data[0].comments
  } catch (error) {
    throw new Error('Error al obtener los comentarios del pokemon')
  }
}

const setPokemonComment = async (id: string, comments: Commentary[]): Promise<void> => {
  try {
    await axios.put(`https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/${id}`, {
      comments,
    })
  } catch (error) {
    throw new Error('Error al guardar el comentario del pokemon')
  }
}

export { setPokemonComment, getPokemonComment }
