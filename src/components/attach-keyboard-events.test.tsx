
import { render } from '@testing-library/react'
import { withTheme, withRedux } from '../test'
import { AttachKeyBoardEvents, AttachKeyBoardEventsProps } from './'


const props: AttachKeyBoardEventsProps = {
	selection: [2, 7],
	numbersInputHandler: jest.fn()
}

describe('AttachKeyBoardEvents', () => {

	it('should NOT be present within the DOM', () => {
		const { container } = render(withTheme(withRedux(<AttachKeyBoardEvents {...props} />)))
		expect(container.firstChild).toBe(null)
	})
})