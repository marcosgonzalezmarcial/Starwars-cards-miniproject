import { memo } from 'react'
import { Spinner } from 'components/Spinner'
import GridItemLinkCard from 'components/GridItemLinkCard'
import './GridItems.scss'

const GridItems = ({ itemData, isLoading }) => {
  return (
    <>
      {/* show Spinner if no data loaded yet */}
      {itemData.length === 0 && <Spinner />}
      <main className="grid-items">
        {itemData.map((item) => {
          // avoid rendering specific elements not working
          if ((item.name !== 'unknown') & (item.name !== 'Jakku')) {
            return (
              <GridItemLinkCard key={item.model ?? item.name} item={item} />
            )
          } else {
            return null
          }
        })}
        {/* show small Spinner when loading more items  */}
        {isLoading && itemData.length > 0 && <Spinner />}
      </main>
    </>
  )
}

export default memo(GridItems)
