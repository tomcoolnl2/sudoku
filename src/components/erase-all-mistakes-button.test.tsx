
import { render } from '@testing-library/react'
import { withTheme } from '../styles/core'
import { withRedux } from '../redux/configureStore'
import { EraseMistakesButton } from './'


describe('InputValueButton', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<EraseMistakesButton />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})