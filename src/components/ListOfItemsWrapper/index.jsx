import { memo } from 'react'
import { useHeightObserver } from 'hooks/useHeightObserver'
import ListOfItems from 'components/ListOfItems'

import { useIsOverflowing } from 'hooks/useIsOverflowing'

import './ListOfItemsWrapper.scss'

function ListOfItemsWrapper({
  itemType,
  elementData,
  itemSubType,
  containerRef
}) {
  const {
    fromRef,
    dynamicSize: { height, posY }
  } = useHeightObserver({ isLoading: false })

  const { isOverflowing } = useIsOverflowing({
    containerRef,
    elementRef: fromRef,
    height,
    posY
  })

  const buttonStyles = { position: 'absolute', top: `${220}px` }

  return (
    <>
      <div ref={fromRef} className="list-of-items-wrapper">
        {itemType === 'films' && (
          <>
            <h3>Appearances</h3>
            <ListOfItems itemType={itemType} listOfUrls={elementData.films} />
          </>
        )}
        {itemType === 'starships' && (
          <>
            <h3>Starships</h3>
            <ListOfItems
              itemType={itemType}
              listOfUrls={elementData.starships}
            />
          </>
        )}
        {itemType === 'characters' && itemSubType === 'pilots' && (
          <>
            <h3>Pilots</h3>
            <ListOfItems itemType={itemType} listOfUrls={elementData.pilots} />
          </>
        )}
        {itemType === 'characters' && itemSubType === 'residents' && (
          <>
            <h3>Residents</h3>
            <ListOfItems
              itemType={itemType}
              listOfUrls={elementData.residents}
            />
          </>
        )}
      </div>
      {isOverflowing && height > 0 && (
        <button
          // style={buttonStyles}
          onClick={() => {}}
          className="view-more-btn"
        >
          View more
        </button>
      )}
    </>
  )
}

export default memo(ListOfItemsWrapper)
