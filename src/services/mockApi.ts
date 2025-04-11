import type { Mock } from '@/interfaces/mock'
import axios from 'axios'

const getMockPokemons = async (): Promise<Mock[]> => {
  try {
    const response = await axios.get<Mock[]>(
      'https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon?app=ojpapp',
    )
    return response.data
  } catch (error) {
    throw new Error('Error fetching Pokémon: ' + error)
  }
}

const loadPokemons = async (): Promise<void> => {
  let existingPokemons: Mock[] = []
  try {
    existingPokemons = await getMockPokemons()
  } catch (error) {
    throw new Error('Error fetching existing Pokémon: ' + error)
  }

  if (existingPokemons.length > 0) return
  else {
    try {
      let pokemon = {}
      for (let i = 1; i <= 16; i++) {
        pokemon = {
          app: 'ojpapp',
          pokemonId: i,
          likes: [],
          comments: [],
        }
        await axios.post('https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/', pokemon)
      }
    } catch (error) {
      throw new Error('Error al cargar Pokémons: ' + error)
    }
  }
}

export { getMockPokemons, loadPokemons }
