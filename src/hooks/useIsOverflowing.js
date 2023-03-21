import { useEffect, useState } from 'react'

function getRect(element) {
  return element.getBoundingClientRect()
}

function detectElementOverflow(element, container) {
  return {
    get collidedTop() {
      return getRect(element).top < getRect(container).top
    },
    get collidedBottom() {
      return getRect(element).bottom > getRect(container).bottom
    },
    get collidedLeft() {
      return getRect(element).left < getRect(container).left
    },
    get collidedRight() {
      return getRect(element).right > getRect(container).right
    },
    get overflowTop() {
      return getRect(container).top - getRect(element).top
    },
    get overflowBottom() {
      return getRect(element).bottom - getRect(container).bottom
    },
    get overflowLeft() {
      return getRect(container).left - getRect(element).left
    },
    get overflowRight() {
      return getRect(element).right - getRect(container).right
    }
  }
}

export function useIsOverflowing({
  elementRef,
  containerRef,
  height: elementHeight,
  posY: elementPosY
}) {
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    if (elementRef.current && containerRef.current) {
      const containerHeight = containerRef.current?.getBoundingClientRect()
        .height
      const containerPosY = containerRef.current?.getBoundingClientRect().y
      // const elementHeight = elementRef.current?.getBoundingClientRect().height
      // // const overflow = detectElementOverflow(
      //   elementRef.current,
      //   containerRef.current
      // )
      // const posY = elementRef.current?.getBoundingClientRect().y

      // check overflow and consider some pixels for borders
      const overflow =
        containerHeight + containerPosY + 3 - elementPosY - elementHeight

      overflow < 0 ? setIsOverflowing(true) : setIsOverflowing(false)
    }
  }, [elementRef, containerRef, elementHeight, elementPosY])
  return { isOverflowing }
}
