import planetsMappedData from '../utils/mocked-data/planetsMappedData'

export const transformPlanetsArray = (newPlanets) => {
  const modifiedPlanetsArr = newPlanets.map((planetFromNewShips) => {
    const imgUrl = planetsMappedData.filter(
      (item) => item.name === planetFromNewShips.name
    )

    return { ...planetFromNewShips, ...imgUrl[0] }
  })
  return modifiedPlanetsArr
}
