const getColor = (type: string): string => {
  switch (type) {
    case 'grass':
      return 'green'
    case 'fire':
      return 'red'
    case 'water':
      return 'blue'
    case 'bug':
      return 'light-green'
    case 'normal':
      return 'grey'
    case 'poison':
      return 'purple'
    case 'electric':
      return 'yellow'
    case 'ground':
      return 'brown'
    case 'fairy':
      return 'pink'
    default:
      return ''
  }
}

export { getColor }
