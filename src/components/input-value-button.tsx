import { FC, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import * as Styled from '../styles'
import { fillCell, StoreReducer, } from '../redux'
import { SudokuInputValue, GridMatrixCoörds, N } from '../typings'


interface InputValueProps {
    value: SudokuInputValue
}

interface InputValueState {
    selection?: GridMatrixCoörds
    selectedValue?: N
}

export const InputValueButton: FC<InputValueProps> = memo(({ value }) => {
	const { selection, selectedValue } = useSelector<StoreReducer, InputValueState>(({ selection, workingMatrix }) => ({ 
		selection,
		selectedValue: workingMatrix && selection ? workingMatrix[selection[0]][selection[1]] : 0
	}))

	const dispatch = useDispatch<Dispatch<AnyAction>>()
	
	const fill = useCallback(() => {
		if (selection && selectedValue === 0) {
			dispatch(fillCell(value, selection))
		}
	}, [dispatch, selection, selectedValue, value])

	return <Styled.Button onClick={fill}>{value}</Styled.Button>
})
