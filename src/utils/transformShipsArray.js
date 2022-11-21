import starshipsMappedData from '../utils/mocked-data/starshipsMappedData'

export const transformShipsArray = (newShips) => {
  const modifiedShipsArr = newShips.map((shipFromNewShips) => {
    const imgUrl = starshipsMappedData.filter(
      (item) => item.name === shipFromNewShips.name
    )

    return { ...shipFromNewShips, ...imgUrl[0] }
  })
  return modifiedShipsArr
}
