import { useEffect, useRef } from 'react'
import './BackToTopBtn.scss'
import upChevronBtn from 'assets/icons/up-chevron-btn.svg'

export function BackToTopBtn() {
	const backToTopBtnRef = useRef(null)

	useEffect(() => {
		const backToTop = () => {
			if (window.scrollY > 300) {
				backToTopBtnRef.current.classList.add('show')
			} else {
				backToTopBtnRef.current.classList.remove('show')
			}
		}
		if (backToTopBtnRef.current) {
			window.addEventListener('scroll', backToTop)
		}
		return () => window.removeEventListener('scroll', backToTop)
	}, [])

	return (
		<button
			onClick={() =>
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				})
			}
			ref={backToTopBtnRef}
			className="back-to-top-btn"
			title="Back to top button"
		>
			<img
				className="back-to-top-btn__img"
				src={upChevronBtn}
				alt="search icon"
			/>
		</button>
	)
}
