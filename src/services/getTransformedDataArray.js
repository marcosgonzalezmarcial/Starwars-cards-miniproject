import { transformDataArray } from 'utils/transformDataArray'
import { fetchDataByPage } from './fetchDataByPage'

export const getTransformedDataArray = async ({
  page,
  signal,
  currentPath
}) => {
  // change query string because of apis's contract
  if (currentPath === 'characters') {
    currentPath = 'people'
  }

  try {
    const { results: fetchedData, next } = await fetchDataByPage({
      page,
      signal
    })
    const transformedDataArray = transformDataArray({
      fetchedData,
      typeOfData: currentPath
    })
    return { transformedDataArray, next }
  } catch (error) {
    console.log(error)
    return null
  }
}
