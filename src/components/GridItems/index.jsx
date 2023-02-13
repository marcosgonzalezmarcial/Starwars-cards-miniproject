import { memo } from 'react'
import { Spinner } from 'components/Spinner'
import GridItemLinkCard from 'components/GridItemLinkCard'
import './GridItems.scss'

const GridItems = ({ mainPath, data }) => {
  return (
    <>
      {/* show Spinner if no data loaded yet */}
      {data[mainPath]?.data?.length === 0 && <Spinner />}
      <main className="grid-items">
        {data[mainPath]?.data?.map((item) => {
          if ((item.name !== 'unknown') & (item.name !== 'Jakku')) {
            return (
              <GridItemLinkCard key={item.model ?? item.name} item={item} />
            )
          } else {
            return null
          }
        })}
        {/* show small Spinner when loading more items  */}
        {data.isLoading && data[mainPath]?.data.length > 0 && <Spinner />}
      </main>
    </>
  )
}

export default memo(GridItems)
