
import { render, screen } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { ToggleHighlighting } from '.'


describe('ToggleHighlighting', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withRedux(withTheme(<ToggleHighlighting />)))
		expect(container.firstChild).toMatchSnapshot()
	})

	it('should be present within the DOM', () => {
		render(withRedux(withTheme(<ToggleHighlighting />)))
		const buttonElement = screen.getByText(/Enable Highlighting/i)
		expect(buttonElement).toBeInTheDocument()
	})
})