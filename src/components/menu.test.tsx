
import { render } from '@testing-library/react'
import { withTheme, withRouter } from '../test'
import { Menu } from '.'

describe('Menu', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRouter(<Menu />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})