import type Commentary from './commentary'

interface Mock {
  id: string
  app: 'ojpapp'
  pokemonId: number
  likes: string[]
  comments: Commentary[]
}

export type { Mock }
