import type Mock from '@/interfaces/mock'
import axios from 'axios'

const getMockPokemonsByUser = async (username: string): Promise<Mock[]> => {
  try {
    const response = await axios.get<Mock[]>(
      'https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon?app=ojpapp&username=' + username,
    )
    return response.data
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return []
  }
}

const loadPokemons = async (username: string): Promise<void> => {
  try {
    let pokemon = {}
    for (let i = 1; i <= 10; i++) {
      pokemon = {
        app: 'ojpapp',
        pokemonId: i,
        username: username,
        liked: false,
        comments: [],
      }
      await axios.post('https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/', pokemon)
    }
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
  }
}

export { getMockPokemonsByUser, loadPokemons }
