
import { render, screen } from '@testing-library/react'
import { withTheme } from '../styles/core'
import { ToggleTheme, ToggleThemeProps } from './'


const props: ToggleThemeProps = {
	selected: false,
	toggleTheme: jest.fn()
}

describe('ToggleTheme', () => {
	
	it('renders with light mode as default', () => {
		const { container } = render(withTheme(<ToggleTheme {...props} />))
		expect(container.firstChild).toMatchSnapshot()
	})

	it('should be present within the DOM', () => {
		render(withTheme(<ToggleTheme {...props} />))
		const buttonElement = screen.getByText(/Dark mode/i)
		expect(buttonElement).toBeInTheDocument()
	})
})