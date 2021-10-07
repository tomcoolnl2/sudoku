
import { render } from '@testing-library/react'
import { App } from './App'


describe('App', () => {
	
	it('renders with light mode as default', () => {
		const { container } = render(<App />)
		expect(container.firstChild).toMatchSnapshot()
	})
})