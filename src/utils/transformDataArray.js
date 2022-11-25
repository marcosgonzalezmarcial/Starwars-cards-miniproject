import {
  filmsMockedData,
  planetsMockedData,
  peopleMockedData,
  starshipsMockedData,
} from './mocked-data';


export const transformDataArray = ({
  fetchedData = [],
  typeOfData = ''
}) => {
  // films have title instead of name
  if (typeOfData === 'films') {
    const transformedArray = fetchedData.map((itemFetched) => {
      const [filteredItemFromMockedData] = filmsMockedData.filter(
        (item) => item.title === itemFetched.title
      )
      return { ...itemFetched, ...filteredItemFromMockedData }
    })
    return transformedArray
  }
  
  if (typeOfData === 'people') {
    const transformedArray = fetchedData.map((itemFetched) => {
      const [filteredItemFromMockedData] = peopleMockedData.filter(
        (item) => item.name === itemFetched.name
      )
      return { ...itemFetched, ...filteredItemFromMockedData }
    })
    return transformedArray
  }
  if (typeOfData === 'starships') {
    const transformedArray = fetchedData.map((itemFetched) => {
      const [filteredItemFromMockedData] = starshipsMockedData.filter(
        (item) => item.name === itemFetched.name
      )
      return { ...itemFetched, ...filteredItemFromMockedData }
    })
    return transformedArray
  }
  if (typeOfData === 'planets') {
    const transformedArray = fetchedData.map((itemFetched) => {
      const [filteredItemFromMockedData] = planetsMockedData.filter(
        (item) => item.name === itemFetched.name
      )
      return { ...itemFetched, ...filteredItemFromMockedData }
    })
    return transformedArray
  }
  return null
}