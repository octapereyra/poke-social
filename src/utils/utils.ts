const getDateTime = (date: Date) => {
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

export { getDateTime }
