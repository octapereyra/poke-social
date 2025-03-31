import type Mock from '@/interfaces/mock'
import axios from 'axios'

const getLikeByUser = async (pokemonId: string, userId: string): Promise<boolean> => {
  try {
    const response = await axios.get<Mock>(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/ojpapp?pokemonId=${pokemonId}&userId=${userId}`,
    )
    return response.data.liked
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return false
  }
}

const getLikes = async (pokemonId: string): Promise<number> => {
  try {
    const response = await axios.get<Mock[]>(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/ojpapp?pokemonId=${pokemonId}&liked=true`,
    )
    return response.data.length
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return 0
  }
}

const setLike = async (id: string, liked: boolean): Promise<void> => {
  try {
    await axios.put(`https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/${id}`, { liked })
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
  }
}

export { getLikes, getLikeByUser, setLike }
