import planetsMappedData from '../utils/mocked-data/planetsMappedData'

export const transformPlanetsArray = (newPlanets) => {
  const modifiedPlanetsArr = newPlanets.map((planetFromNewShips) => {
    const auxPlanetsArr = [...planetsMappedData]
    const imgUrl = auxPlanetsArr.filter(
      (item) => item.name === planetFromNewShips.name
    )

    return { ...planetFromNewShips, ...imgUrl[0] }
  })
  return modifiedPlanetsArr
}
