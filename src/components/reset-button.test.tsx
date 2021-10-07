
import { render, screen } from '@testing-library/react'
import { withTheme } from '../test'
import { ResetGameButton, ResetGameButtonProps } from './'


const props: ResetGameButtonProps = {
	reset: jest.fn()
}

describe('ResetGameButton', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(<ResetGameButton {...props} />))
		expect(container.firstChild).toMatchSnapshot()
	})

	it('should be present within the DOM', () => {
		render(withTheme(<ResetGameButton {...props} />))
		const buttonElement = screen.getByText(/New Game/i)
		expect(buttonElement).toBeInTheDocument()
	})
})