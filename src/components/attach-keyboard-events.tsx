
import { Dispatch, FC, memo } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { selectCell } from '../redux'
import { GridMatrixCoörds, GridMatrixIndex, SudokuInputValue } from '../typings'
import useMouseTrap from 'react-hook-mousetrap'


export interface AttachKeyBoardEventsProps {
    selection: GridMatrixCoörds | undefined
    numbersInputHandler: (n: SudokuInputValue) => void
}

export const AttachKeyBoardEvents: FC<AttachKeyBoardEventsProps> = memo(({ selection, numbersInputHandler }) => {

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	function moveDown() {
		if (selection && selection[0] < 8) {
			dispatch(selectCell([ (selection[0] + 1) as GridMatrixIndex, selection[1] ]))
		}
	}

	function moveLeft() {
		if (selection && selection[1] > 0) {
			dispatch(selectCell([ selection[0], (selection[1] - 1) as GridMatrixIndex ]))
		}
	}

	function moveRight() {
		if (selection && selection[1] < 8)  {
			dispatch(selectCell([ selection[0], (selection[1] + 1) as GridMatrixIndex ]))
		}
	}

	function moveUp() {
		if (selection && selection[0] > 0) {
			dispatch(selectCell([ (selection[0] - 1) as GridMatrixIndex, selection[1] ]))
		}
	}

	useMouseTrap('1', () => numbersInputHandler(1))
	useMouseTrap('2', () => numbersInputHandler(2))
	useMouseTrap('3', () => numbersInputHandler(3))
	useMouseTrap('4', () => numbersInputHandler(4))
	useMouseTrap('5', () => numbersInputHandler(5))
	useMouseTrap('6', () => numbersInputHandler(6))
	useMouseTrap('7', () => numbersInputHandler(7))
	useMouseTrap('8', () => numbersInputHandler(8))
	useMouseTrap('9', () => numbersInputHandler(9))

	useMouseTrap('down', moveDown)
	useMouseTrap('down', moveDown)
	useMouseTrap('left', moveLeft)
	useMouseTrap('right', moveRight)
	useMouseTrap('up', moveUp)

	return null
})