interface Pokemon {
  name: string
  url: string
  sprites: {
    front_default: string
  }
}

interface PokemonDetails {
  id: number
  name: string
  sprite: string
}

export type { Pokemon, PokemonDetails }
