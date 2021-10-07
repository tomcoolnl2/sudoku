
import { render } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { InputValueButton, InputValueProps } from './'


const props: InputValueProps = {
	value: 1
}

describe('InputValueButton', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<InputValueButton {...props} />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})