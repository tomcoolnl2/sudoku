
import { render } from '@testing-library/react'
import { withRedux } from '../../test'
import { DarkThemeProvider } from './ThemeProvider'


describe('ThemeProvider', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withRedux(<DarkThemeProvider />))
		expect(container.firstChild).toMatchSnapshot()
	})
})