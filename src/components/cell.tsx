
import { FC, memo } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { selectCell, StoreReducer } from '../redux'
import { GridMatrixIndex, N } from '../typings'
import * as Styled from '../styles'

export interface CellProps {
    row: GridMatrixIndex
    col: GridMatrixIndex
}

interface CellState {
    value: N
    clue: boolean
	highlighted: boolean
    selected: boolean
	duplicate: boolean
	mistake: boolean
}

export const Cell: FC<CellProps> = memo(({ row, col }) => {

	const { 
		value, 
		clue, 
		selected, 
		highlighted, 
		duplicate, 
		mistake 
	} = useSelector<StoreReducer, CellState>(({ 
		initialGameMatrix, 
		workingMatrix, 
		mistakesMatrix, 
		selection, 
		settings 
	}) => ({
		value: workingMatrix && mistakesMatrix 
			? mistakesMatrix[row][col] !== 0 
				? mistakesMatrix[row][col] 
				: workingMatrix[row][col] 
			: 0,
		clue: initialGameMatrix && initialGameMatrix[row][col] !== 0,
		highlighted: selection[0] === row || selection[1] === col,
		selected: selection[0] === row && selection[1] === col,
		duplicate: settings.highlightDuplicates 
			&& workingMatrix
			&& workingMatrix[row][col] !== 0
			&& workingMatrix[selection[0]][selection[1]] === workingMatrix[row][col],
		mistake: mistakesMatrix && mistakesMatrix[row][col] !== 0
	}))

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const clickHandler = () => {
		!selected && dispatch(selectCell([row, col]))
	}

	return (
		<Styled.CellContainer clue={clue} selected={selected} highlighted={highlighted} duplicate={duplicate} mistake={mistake} onClick={clickHandler}>
			{value === 0 ? '' : value}
		</Styled.CellContainer>
	)
})