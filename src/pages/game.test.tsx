
import { render } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { Game } from '.'

describe('Game page', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<Game />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})