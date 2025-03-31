import type Mock from '@/interfaces/mock'
import axios from 'axios'

const getMockPokemons = async (username: string): Promise<Mock[]> => {
  try {
    const response = await axios.get<Mock[]>(
      'https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/',
    )
    return response.data.filter((pokemon) => pokemon.userId === username)
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return []
  }
}

const setPokemons = async (pokemons: Mock[]): Promise<void> => {
  try {
    await axios.post('https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/', pokemons)
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
  }
}

export { getMockPokemons, setPokemons }
