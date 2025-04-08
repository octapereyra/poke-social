import type { Mock } from '@/interfaces/mock'
import axios from 'axios'

const getMockPokemonsByUser = async (username: string): Promise<Mock[]> => {
  try {
    const response = await axios.get<Mock[]>(
      'https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon?app=ojpapp&username=' + username,
    )
    return response.data
  } catch (error) {
    throw new Error('Error fetching Pokémon: ' + error)
  }
}

const loadPokemons = async (username: string): Promise<void> => {
  const existingPokemons = await getMockPokemonsByUser(username)
  if (existingPokemons.length > 0) return
  else {
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
      throw new Error('Error al cargar Pokémons: ' + error)
    }
  }
}

export { getMockPokemonsByUser, loadPokemons }
