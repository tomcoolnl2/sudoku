
import { render } from '@testing-library/react'
import { withTheme } from '../styles/core'
import { withRedux } from '../redux/configureStore'
import { Cell, CellProps } from '.'


const props: CellProps = {
	ri: 1,
	ci: 4
}

describe('InputValueButton', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<Cell {...props} />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})