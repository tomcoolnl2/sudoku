
import { render, waitFor } from '@testing-library/react'
import { App } from './App'


describe('App', () => {
	
	it('renders a loader as default', () => {
		const { container } = render(<App />)
		expect(container.firstChild).toMatchSnapshot()
	})
	
	it('renders the app after waiting for lazy pages', async () => {
		const { container } = render(<App />)
		await waitFor(() => expect(expect(container.firstChild).toMatchSnapshot()))
	})
})