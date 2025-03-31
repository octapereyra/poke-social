export default interface Mock {
  app: 'ojpapp'
  pokemonId: number
  userId: string
  liked: boolean
  comments?: [
    {
      id: string
      text: string
      userId: string
      createdAt: string
    },
  ]
}
