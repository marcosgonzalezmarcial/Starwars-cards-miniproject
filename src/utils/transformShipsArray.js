import starshipsMappedData from '../utils/mocked-data/starshipsMappedData'

export const transformShipsArray = (newShips) => {
  const modifiedShipsArr = newShips.map((shipFromNewShips) => {
    const [filteredFilm] = starshipsMappedData.filter(
      (item) => item.name === shipFromNewShips.name
    )
    return { ...shipFromNewShips, ...filteredFilm }
  })
  return modifiedShipsArr
}
