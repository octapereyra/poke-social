import type Commentary from './commentary'

interface Mock {
  id: string
  app: 'ojpapp'
  pokemonId: number
  username: string
  liked: boolean
  comments: Commentary[]
}

export type { Mock }
