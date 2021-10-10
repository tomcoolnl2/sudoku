
import { render, screen } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { ErrorFallback, ErrorFallbackProps } from './'


const props: ErrorFallbackProps = {
	error: new Error('TEST'),
	resetErrorBoundary: jest.fn()
}

describe('ErrorFallback', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<ErrorFallback {...props} />)))
		expect(container.firstChild).toMatchSnapshot()
	})
	
	it('should be present within the DOM', () => {
		render(withTheme(withRedux(<ErrorFallback {...props} />)))
		const preElement = screen.getByText(/TEST/i)
		expect(preElement).toBeInTheDocument()
	})
})