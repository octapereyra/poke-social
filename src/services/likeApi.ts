import type Mock from '@/interfaces/mock'
import axios from 'axios'
import { getMockPokemonsByUser } from './mockApi'

const getLikeByUser = async (pokemonId: number, userId: string): Promise<boolean> => {
  try {
    const response = await axios.get<Mock[]>(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon?app=ojpapp&pokemonId=${pokemonId}&userId=${userId}`,
    )
    return response.data.length > 0 ? response.data[0].liked : false
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return false
  }
}

const getLikesByPokeId = async (pokemonId: number): Promise<number> => {
  try {
    const response = await axios.get<Mock[]>(
      `https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon?app=ojpapp&pokemonId=${pokemonId}&liked=true`,
    )
    return response.data.length > 0 ? response.data.length : 0
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return 0
  }
}

const setPokemonLike = async (id: number, isMocked: boolean, liked: boolean): Promise<void> => {
  try {
    if (isMocked) {
      await axios.put(`https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/${id}`, { liked })
    } else {
      await axios.post('https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon', {
        pokemonId: id,
        liked,
        userId: localStorage.getItem('username'),
      })
    }
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
  }
}

export { getLikesByPokeId, getLikeByUser, setPokemonLike }
