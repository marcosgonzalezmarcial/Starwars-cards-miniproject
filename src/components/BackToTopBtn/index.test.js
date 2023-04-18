import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BackToTopBtn } from '.'

// Tests that the BackToTopBtn component renders with the correct class and image.

it('test_back_to_top_btn_renders_correctly', () => {
	const { getByTitle } = render(<BackToTopBtn />)
	const backToTopBtn = getByTitle('Back to top button')
	expect(backToTopBtn).toHaveClass('back-to-top-btn')
	expect(backToTopBtn).toContainHTML(
		'<img class="back-to-top-btn__img" src="upChevronBtn" alt="search icon">'
	)
})
