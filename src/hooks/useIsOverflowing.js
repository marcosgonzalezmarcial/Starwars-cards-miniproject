import { useState } from 'react'

function checkOverflow(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  )
}

export function useIsOverflowing({ elementRef }) {
  const [isOverflowing, setIsOverflowing] = useState()
  checkOverflow(elementRef) ? setIsOverflowing(true) : setIsOverflowing(false)
  return { isOverflowing }
}
