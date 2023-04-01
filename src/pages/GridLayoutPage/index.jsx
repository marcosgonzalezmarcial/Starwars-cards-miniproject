import { useEffect } from 'react'
import { useIsNearScreen } from 'hooks/useIsNearScreen.js'
import { useData } from 'hooks/useData'
import { BackToTopBtn } from 'components/BackToTopBtn'
import ItemCard from 'components/ItemCard'
import { Spinner } from 'components/Spinner'
import './GridLayoutPage.scss'

export default function GridLayoutPage({ currentPath }) {
  const { isNearScreen, fromRef } = useIsNearScreen({ once: false })
  const { data, dispatch } = useData()

  const next = data[currentPath].next
  const isLoading = data.isLoading
  const currentData = data[currentPath].data
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
      {/* show Spinner if no data loaded yet */}
      {currentData.length === 0 && <Spinner />}
      <main className="grid-items">
        {currentData.map((item) => {
          // avoid rendering specific elements not working
          if ((item.name !== 'unknown') & (item.name !== 'Jakku')) {
            return <ItemCard key={item.model ?? item.name} item={item} />
          } else {
            return false
          }
        })}
        {/* show small Spinner when loading more items  */}
        {isLoading && currentData.length > 0 && <Spinner />}
      </main>
      {/* is near screen viewfinder */}
      <div ref={fromRef}></div>
      <BackToTopBtn />
    </>
  )
}
