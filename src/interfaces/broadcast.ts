interface Broadcast {
  id?: string
  title: string
  description: string
  pokemonId: number
  username: string
  createdAt: Date
  likes: number
  dislikes: number
  comments: BroadcastComment[]
}

interface BroadcastComment {
  id: string
  text: string
  username: string
  createdAt: Date
  likes: number
  dislikes: number
}

export type { Broadcast, BroadcastComment }
