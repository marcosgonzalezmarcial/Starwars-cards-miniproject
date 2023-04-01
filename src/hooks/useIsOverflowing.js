import { useEffect, useState } from 'react'

export function useIsOverflowing({
  elementRef,
  containerRef,
  height: elementHeight,
  posY: elementPosY
}) {
  const [isOverflowing, setIsOverflowing] = useState(false)
  const containerBottom = containerRef.current?.getBoundingClientRect().bottom

  useEffect(() => {
    if (elementRef.current && containerRef.current) {
      const containerHeight = containerRef.current?.getBoundingClientRect()
        .height
      const containerPosY = containerRef.current?.getBoundingClientRect().y

      // check overflow and consider some pixels for borders
      const overflow =
        containerHeight + containerPosY + 3 - elementPosY - elementHeight

      overflow < 0 ? setIsOverflowing(true) : setIsOverflowing(false)
    }
  }, [elementRef, containerRef, elementHeight, elementPosY, containerBottom])
  return { isOverflowing, setIsOverflowing }
}
