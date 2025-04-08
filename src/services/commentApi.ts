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
    console.error('Error fetching Pokémon:', error)
    return []
  }
}

const setPokemonComment = async (id: string, comments: Commentary[]): Promise<void> => {
  try {
    await axios.put(`https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/${id}`, {
      comments,
    })
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
  }
}

export { setPokemonComment, getPokemonComment }
