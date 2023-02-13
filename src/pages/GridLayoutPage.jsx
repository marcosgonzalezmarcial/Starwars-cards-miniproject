import { useEffect } from 'react'
import { useSearch } from 'hooks/useSearch.js'
import { useIsNearScreen } from 'hooks/useIsNearScreen.js'
import SearchResults from 'components/SearchResults'
import GridItems from 'components/GridItems'
import { useData } from 'hooks/useData'
import { useLocation } from 'react-router-dom'
import { getTransformedDataArray } from 'services/getTransformedDataArray'

const GridLayoutPage = ({ mainPath }) => {
  const { searchResultsItems } = useSearch()
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false })
  const { data, setData } = useData()

  let location = useLocation()
  // fetch data when scrolling down
  useEffect(() => {
    // stops pagination when data is loading
    if (data.isLoading) return
    // stops pagination if next fetch is not possible
    if (!data.next) return

    if (isNearScreen) {
      setData((prev) => ({
        ...prev,
        [mainPath]: {
          ...prev[mainPath],
          page: prev[mainPath].page + 1
        }
      }))
    }
  }, [isNearScreen])

  // refetch data after searching
  useEffect(() => {
    getTransformedDataArray({
      page: 1
    }).then(({ transformedDataArray: newData, next }) => {
      newData &&
        setData((prev) => {
          return {
            ...prev,
            next,
            [mainPath]: {
              ...prev[mainPath],
              data: [
                ...new Set(
                  [...prev[mainPath].data, ...newData].map((o) =>
                    JSON.stringify(o)
                  )
                )
              ].map((s) => JSON.parse(s))
            }
          }
        })
    })
  }, [location.search, setData])

  if (searchResultsItems.length > 0) {
    if (
      searchResultsItems.length === 1 &&
      typeof searchResultsItems[0] === 'string'
    ) {
      return (
        <div style={{ marginTop: '5vh', textAlign: 'center', color: 'white' }}>
          <h1>No results found</h1>
        </div>
      )
    }
    return <SearchResults searchResultsItems={searchResultsItems} />
  }

  return (
    <>
      <GridItems data={data} mainPath={mainPath} />
      {/* is near screen viewfinder */}
      <div ref={fromRef}></div>
    </>
  )
}

export default GridLayoutPage
