
import { render } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { Grid } from './'


describe('Grid', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<Grid />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})