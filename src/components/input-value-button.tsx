import { FC, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import * as Styled from '../styles'
import { fillCell, StoreReducer, } from '../redux'
import { SudokuInputValue, GridMatrixCoörds, N, GridMatrixSeries } from '../typings'
import { Sudoku } from '../Sudoku'


export interface InputValueProps {
	char: string
    value: SudokuInputValue
}

export interface InputValueState {
    selection?: GridMatrixCoörds
    selectedValue?: N,
	trackedInput?: GridMatrixSeries
}

export const InputValueButton: FC<InputValueProps> = memo(({ value, char }) => {

	const { selection, selectedValue, trackedInput } = useSelector<StoreReducer, InputValueState>(({ selection, workingMatrix, trackedInput }) => ({ 
		selection,
		selectedValue: workingMatrix && selection ? workingMatrix[selection[0]][selection[1]] : 0,
		trackedInput
	}))

	const dispatch = useDispatch<Dispatch<AnyAction>>()
	
	const fill = useCallback(() => {
		if (selection && selectedValue === 0) {
			dispatch(fillCell(value, selection))
		}
	}, [dispatch, selection, selectedValue, value])

	const disabled = trackedInput?.[value - 1] === Sudoku.SIZE

	return <Styled.Button onClick={fill} disabled={disabled}>{char}</Styled.Button>
})
