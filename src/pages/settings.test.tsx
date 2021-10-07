
import { render } from '@testing-library/react'
import { withTheme, withRedux, withRouter } from '../test'
import { Settings } from '.'

describe('Settings page', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(withRouter(<Settings />))))
		expect(container.firstChild).toMatchSnapshot()
	})
})