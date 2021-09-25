
import { render, screen } from '@testing-library/react'
import { withTheme } from '../styles/core'
import { ResetGameButton, ResetGameButtonProps } from './'


const props: ResetGameButtonProps = {
	reset: jest.fn()
}

test('Test if the reset button is present in the DOM', () => {
	const { container } = render(withTheme(<ResetGameButton {...props} />))
	const buttonElement = screen.getByText(/New Game/i)
	expect(buttonElement).toBeInTheDocument()
	expect(container.firstChild).toMatchSnapshot()
})