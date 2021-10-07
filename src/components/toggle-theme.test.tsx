
import { render, screen } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { ToggleTheme } from './'


describe('ToggleTheme', () => {
	
	it('renders with light mode as default', () => {
		const { container } = render(withTheme(withRedux(<ToggleTheme />)))
		expect(container.firstChild).toMatchSnapshot()
	})

	it('should be present within the DOM', () => {
		render(withTheme(withRedux(<ToggleTheme />)))
		const buttonElement = screen.getByText(/Dark mode/i)
		expect(buttonElement).toBeInTheDocument()
	})
})