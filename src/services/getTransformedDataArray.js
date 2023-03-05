import { transformDataArray } from 'utils/transformDataArray'
import { fetchDataByPage } from './fetchDataByPage'

export const getTransformedDataArray = async ({ page, signal, mainPath }) => {
  // change query string because of apis's contract
  if (mainPath === 'characters') {
    mainPath = 'people'
  }

  try {
    const { results: fetchedData, next } = await fetchDataByPage({
      page,
      signal
    })
    const transformedDataArray = transformDataArray({
      fetchedData,
      typeOfData: mainPath
    })
    return { transformedDataArray, next }
  } catch (error) {
    console.log(error)
    return null
  }
}
