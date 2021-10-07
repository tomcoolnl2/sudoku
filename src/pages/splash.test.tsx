
import { render } from '@testing-library/react'
import { withTheme, withRouter } from '../test'
import { Splash } from '.'

describe('Splash page', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRouter(<Splash />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})