
import { render } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { MistakesLimit } from '.'

describe('MistakesLimit', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<MistakesLimit />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})