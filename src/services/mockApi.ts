import type Mock from '@/interfaces/mock'
import axios from 'axios'

const getMockPokemonsByUser = async (username: string): Promise<number[]> => {
  try {
    const response = await axios.get<Mock[]>(
      'https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon?app=ojpapp&userId=' + username,
    )
    //devuelve un array de numeros con los ids de pokemones que ya estan cargados
    return response.data.map((mock) => mock.pokemonId)
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return []
  }
}

const setPokemon = async (pokemons: Mock): Promise<void> => {
  try {
    await axios.post('https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/', pokemons)
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
  }
}

export { getMockPokemonsByUser, setPokemon }
