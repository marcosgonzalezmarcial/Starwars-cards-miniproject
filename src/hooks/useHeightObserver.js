import { useEffect, useState, useRef } from 'react'

export const useHeightObserver = ({ isLoading } = { isLoading: false }) => {
  const fromRef = useRef()
  const [dynamicSize, setDynamicSize] = useState({})

  useEffect(() => {
    if (!fromRef || isLoading) return // wait for the elementRef to be available and loading finishes
    const resizeObserver = new ResizeObserver((entries) => {
      setDynamicSize({
        height: entries[0].contentRect.height,
        posY: entries[0].target.getBoundingClientRect().y
      })
    })

    resizeObserver.observe(fromRef.current)

    return () => resizeObserver.disconnect() // clean up
  }, [isLoading, fromRef])

  return {
    dynamicSize,
    fromRef
  }
}
