import type { Mock } from '@/interfaces/mock'
import axios from 'axios'

const getLikeByUser = async (pokemonId: number, username: string): Promise<boolean> => {
  try {
    const response = await axios.get<Mock[]>(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon?app=ojpapp&pokemonId=${pokemonId}`,
    )
    return response.data[0].likes.includes(username)
  } catch (error) {
    throw new Error('Error al obtener los likes del pokemon')
  }
}

const getLikesByPokeId = async (pokemonId: number): Promise<number> => {
  try {
    const response = await axios.get<Mock[]>(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon?app=ojpapp&pokemonId=${pokemonId}`,
    )
    return response.data[0].likes.length
  } catch (error) {
    throw new Error('Error al obtener los likes del pokemon')
  }
}

const setPokemonLike = async (id: string, liked: boolean, username: string): Promise<void> => {
  try {
    const response = await axios.get<Mock>(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/${id}`,
    )
    const likes = response.data.likes

    if (liked) {
      likes.push(username)
    } else {
      const index = likes.indexOf(username)
      if (index > -1) {
        likes.splice(index, 1)
      }
    }
    await axios.put(`https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/${id}`, { likes })
  } catch (error) {
    throw new Error('Error al guardar el like del pokemon')
  }
}

export { getLikesByPokeId, getLikeByUser, setPokemonLike }
