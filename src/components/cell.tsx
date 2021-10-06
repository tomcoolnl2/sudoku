
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
	mistake: boolean,
	mistakeDuplicate: boolean
}

export const Cell: FC<CellProps> = memo(({ row, col }) => {

	const { value, ...props } = useSelector<StoreReducer, CellState>(({ 
		initialGameMatrix, 
		workingMatrix, 
		mistakesMatrix, 
		selection,
		selectedInputValue,
		settings 
	}) => {

		const value = workingMatrix && mistakesMatrix 
			? mistakesMatrix[row][col] !== 0 
				? mistakesMatrix[row][col] 
				: workingMatrix[row][col] 
			: 0
		
		const selected = selection[0] === row && selection[1] === col

		const clue = initialGameMatrix && initialGameMatrix[row][col] !== 0
		
		const highlighted = selection[0] === row || selection[1] === col

		const duplicate = settings.highlightDuplicates 
			&& workingMatrix
			&& workingMatrix[row][col] !== 0
			&& workingMatrix[selection[0]][selection[1]] === workingMatrix[row][col]
		
		const mistake = mistakesMatrix && mistakesMatrix[row][col] !== 0

		const mistakeDuplicate = !selected && highlighted && selectedInputValue === value

		return {
			value,
			clue,
			highlighted,
			selected,
			duplicate,
			mistake,
			mistakeDuplicate
		}
	})

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const clickHandler = () => {
		!props.selected && dispatch(selectCell([row, col]))
	}

	return (
		<Styled.CellContainer {...props} onClick={clickHandler}>
			{value === 0 ? '' : value}
		</Styled.CellContainer>
	)
})