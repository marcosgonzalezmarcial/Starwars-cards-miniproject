import { useEffect } from 'react'
import { useIsNearScreen } from 'hooks/useIsNearScreen.js'
import GridItems from 'components/GridItems'
import { useData } from 'hooks/useData'
import { BackToTopBtn } from 'components/BackToTopBtn'

const GridLayoutPage = ({ currentPath }) => {
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false })
  const { data, dispatch } = useData()

  const next = data[currentPath].next
  const isLoading = data.isLoading
  // scrolldown pagination
  useEffect(() => {
    // stops pagination when data is loading
    if (isLoading) return
    // stops pagination if there is no more elementes because data.next is null
    if (next === null) return

    if (isNearScreen) {
      dispatch({ type: 'NEXT_PAGE', payload: { currentPath } })
    }
  }, [isNearScreen, dispatch, currentPath, isLoading, next])

  return (
    <>
      <GridItems itemData={data[currentPath].data} isLoading={isLoading} />
      {/* is near screen viewfinder */}
      <div ref={fromRef}></div>
      <BackToTopBtn />
    </>
  )
}

export default GridLayoutPage
