
import { render } from '@testing-library/react'
import { withTheme, withRouter, withRedux } from '../test'
import { Splash } from '.'

describe('Splash page', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRouter(withRedux(<Splash />))))
		expect(container.firstChild).toMatchSnapshot()
	})
})