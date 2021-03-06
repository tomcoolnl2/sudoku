
import { render } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { EraseMistakeButton } from '.'


describe('InputValueButton', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<EraseMistakeButton />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})