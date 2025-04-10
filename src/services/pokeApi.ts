import type { Pokemon, PokemonDetails } from '@/interfaces/pokemon'
import axios from 'axios'

const getPokemons = async (): Promise<PokemonDetails[]> => {
  try {
    const response = await axios.get<{ results: Pokemon[] }>(
      'https://pokeapi.co/api/v2/pokemon?limit=16',
    )
    const pokemonList = response.data.results

    const detailedPokemons = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const details = await axios.get(pokemon.url)
        return {
          id: parseInt(pokemon.url.split('/')[6], 10),
          name: details.data.name,
          sprite: details.data.sprites.front_default,
          type: details.data.types.map((type: { type: { name: string } }) => type.type.name),
        }
      }),
    )

    return detailedPokemons
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return []
  }
}

const getPokemon = async (id: number): Promise<PokemonDetails | undefined> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return {
      id: id,
      name: response.data.name,
      sprite: response.data.sprites.front_default,
      type: response.data.types.map((type: { type: { name: string } }) => type.type.name),
    }
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return undefined
  }
}

export { getPokemons, getPokemon }
