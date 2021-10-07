
import { render } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { Cell, CellProps } from '.'


const props: CellProps = {
	row: 1,
	col: 4
}

describe('InputValueButton', () => {
	
	it('should match it\'s snapshot', () => {
		const { container } = render(withTheme(withRedux(<Cell {...props} />)))
		expect(container.firstChild).toMatchSnapshot()
	})
})