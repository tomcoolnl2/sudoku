
import { render } from '@testing-library/react'
import { withTheme } from '../styles/core'
import { withRedux } from '../redux/configureStore'
import { Block, BlockProps } from './'


const props: BlockProps = {
	ri: 1,
	ci: 4
}

describe('InputValueButton', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<Block {...props} />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})