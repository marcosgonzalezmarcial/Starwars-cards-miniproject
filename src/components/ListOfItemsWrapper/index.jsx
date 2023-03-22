import { memo, useCallback, useEffect, useRef, useState } from 'react'
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
  const buttonRef = useRef(null)
  const {
    fromRef,
    dynamicSize: { height, posY }
  } = useHeightObserver({ isLoading: false })

  // console.log({ posY })

  const { isOverflowing } = useIsOverflowing({
    containerRef,
    elementRef: fromRef,
    height,
    posY
  })

  const changeStyles = () => {
    //expand the heightof the container
    containerRef.current.classList.add('expand')
    // not display the button when the heigh of container changes
    fromRef.current.nextSibling.classList.add('hide')
    fromRef.current.parentElement.parentElement
      .querySelector('.view-more-btn')
      .classList.add('hide')
    // console.log(
    //   fromRef.current.parentElement.parentElement.querySelector(
    //     '.view-more-btn'
    //   )
    // )
  }

  useEffect(() => {
    isOverflowing &&
      containerRef.current.style.setProperty('--min-height', '120px')
  }, [isOverflowing, containerRef])

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
      {isOverflowing && (
        <button
          ref={buttonRef}
          className="view-more-btn"
          onClick={() => {
            changeStyles()
          }}
        >
          View more
        </button>
      )}
    </>
  )
}

export default memo(ListOfItemsWrapper)
