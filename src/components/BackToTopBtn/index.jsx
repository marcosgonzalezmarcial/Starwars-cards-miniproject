import { useEffect, useRef } from 'react'
import './BackToTopBtn.scss'
const BackToTopBtn = () => {
  const BackToTopBtnRef = useRef(null)

  useEffect(() => {
    const backToTop = () => {
      if (BackToTopBtnRef.current) {
        if (window.scrollY > 300) {
          BackToTopBtnRef.current.classList.add('show')
        } else {
          BackToTopBtnRef.current.classList.remove('show')
        }
      }
    }
    if (BackToTopBtnRef.current) {
      window.addEventListener('scroll', backToTop)
    }
    return () => window.removeEventListener('scroll', backToTop)
  }, [])

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      ref={BackToTopBtnRef}
      className="back-to-top-btn"
    ></button>
  )
}

export { BackToTopBtn }
