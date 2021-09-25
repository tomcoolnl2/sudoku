
import { render } from '@testing-library/react'
import { withRedux } from '../redux/configureStore'
import { withTheme } from '../styles/core'
import { Grid } from './'


describe('Numbers', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<Grid />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})