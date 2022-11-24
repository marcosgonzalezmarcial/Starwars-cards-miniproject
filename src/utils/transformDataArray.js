export const transformDataArray = ({
  fetchedData = [],
  mockedData = [],
  typeOfData = ''
}) => {
  // films have title instead of name
  if (typeOfData === 'films') {
    const transformedArray = fetchedData.map((itemFetched) => {
      const [filteredItemfromMockedData] = mockedData.filter(
        (item) => item.title === itemFetched.title
      )
      return { ...itemFetched, ...filteredItemfromMockedData }
    })
    return transformedArray
  }
  const transformedArray = fetchedData.map((itemFetched) => {
    const [filteredItemfromMockedData] = mockedData.filter(
      (item) => item.name === itemFetched.name
    )
    return { ...itemFetched, ...filteredItemfromMockedData }
  })
  return transformedArray
}
