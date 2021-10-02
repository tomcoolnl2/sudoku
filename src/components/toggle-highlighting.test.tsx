
import { render, screen } from '@testing-library/react'
import { withRedux } from '../redux/configureStore'
import { withTheme } from '../styles/core'
import { ToggleHighlighting } from '.'


describe('ToggleHighlighting', () => {
	
	it('renders with light mode as default', () => {
		const { container } = render(withRedux(withTheme(<ToggleHighlighting />)))
		expect(container.firstChild).toMatchSnapshot()
	})

	it('should be present within the DOM', () => {
		render(withRedux(withTheme(<ToggleHighlighting />)))
		const buttonElement = screen.getByText(/Enable Highlighting/i)
		expect(buttonElement).toBeInTheDocument()
	})
})