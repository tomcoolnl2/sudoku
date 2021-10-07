
import { render } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { Numbers } from './'


describe('Numbers', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<Numbers />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})