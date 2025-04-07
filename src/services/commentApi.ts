import type Commentary from '@/interfaces/commentary'
import axios from 'axios'

const setPokemonComment = async (id: string, comments: Commentary[]): Promise<void> => {
  try {
    await axios.put(`https://67d81f029d5e3a10152d7c98.mockapi.io/api/v1/pokemon/${id}`, {
      comments,
    })
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
  }
}

export { setPokemonComment }
