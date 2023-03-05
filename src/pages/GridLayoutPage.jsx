import { useEffect } from 'react'
import { useSearch } from 'hooks/useSearch.js'
import { useIsNearScreen } from 'hooks/useIsNearScreen.js'
import SearchResults from 'components/SearchResults'
import GridItems from 'components/GridItems'
import { useData } from 'hooks/useData'
import { BackToTopBtn } from 'components/BackToTopBtn'

const GridLayoutPage = ({ mainPath }) => {
  const { searchResultsItems } = useSearch()
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false })
  const { data, dispatch } = useData()

  // fetch data when scrolling down
  // scrolldown pagination
  useEffect(() => {
    // stops pagination when data is loading
    if (data.isLoading) return
    // stops pagination if there is no more elementes because data.next is null
    // if (data.next === null) return
    if (data[mainPath].next === null) return

    if (isNearScreen) {
      dispatch({ type: 'NEXT_PAGE', payload: { mainPath } })
    }
  }, [isNearScreen, dispatch, mainPath, data.isLoading, data.next])

  if (searchResultsItems.length > 0) {
    if (
      searchResultsItems.length === 1 &&
      typeof searchResultsItems[0] === 'string'
    ) {
      return (
        <div
          style={{
            marginTop: '5vh',
            textAlign: 'center',
            color: 'var(--primary-white)'
          }}
        >
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
      <BackToTopBtn />
    </>
  )
}

export default GridLayoutPage
