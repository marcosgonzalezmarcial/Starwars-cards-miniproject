import React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'

import { BackToTopBtn } from './index'

describe('BackToTopBtn component', () => {
	let backToTopBtn
	beforeEach(() => {
		const { getByRole } = render(<BackToTopBtn />)
		backToTopBtn = getByRole('button')
	})
	afterEach(cleanup)

	// Tests that the BackToTopBtn component is rendered with the correct class and image.
	it('test_renders_back_to_top_btn_with_correct_class_and_image', () => {
		expect(backToTopBtn).toHaveClass('back-to-top-btn')
		expect(backToTopBtn.firstChild).toContainHTML(
			'<img class="back-to-top-btn__img" src="up-chevron-btn.svg" alt="search icon">'
		)
	})

	// Tests that the BackToTopBtn component is visible when the user scrolls past 300px.
	it('test_back_to_top_btn_is_visible_when_scrolled_past_300px', () => {
		expect(backToTopBtn).not.toHaveClass('show')
		window.scrollY = 400
		fireEvent.scroll(window)
		expect(backToTopBtn).toHaveClass('show')
		expect(backToTopBtn).toBeInTheDocument()
	})

	// Tests that clicking the BackToTopBtn scrolls the window to the top smoothly and the button is hidden.
	it('test_back_to_top_btn_scrolls_to_top', () => {
		window.scrollTo = jest.fn()
		fireEvent.click(backToTopBtn)
		expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
		expect(backToTopBtn).not.toHaveClass('show')
	})

	// it('has the correct title and role attributes', () => {
	// 	const { getByRole } = render(<BackToTopBtn />)
	// 	const backToTopBtn = getByRole('button')
	// 	expect(backToTopBtn).toHaveAttribute('title', 'Back to top button')
	// 	expect(backToTopBtn).toHaveAttribute('role', 'button')
	// })

	// it('is hidden when the page first loads', () => {
	// 	const { queryByRole } = render(<BackToTopBtn />)
	// 	const backToTopBtn = queryByRole('button')
	// 	console.log(prettyDOM(backToTopBtn.parentNode))
	// 	expect(backToTopBtn).not.toHaveClass('show')
	// })

	// it('scrolls the page to the top when clicked', () => {
	// 	window.scrollTo = jest.fn()
	// 	const { getByRole } = render(<BackToTopBtn />)
	// 	const backToTopBtn = getByRole('button')
	// 	fireEvent.click(backToTopBtn)
	// 	expect(window.scrollTo).toHaveBeenCalledWith({
	// 		top: 0,
	// 		behavior: 'smooth',
	// 	})
	// })
})
