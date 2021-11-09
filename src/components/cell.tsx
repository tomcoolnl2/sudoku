
import { FC, memo } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { selectCell, StoreReducer } from '../redux'
import { GridMatrixCoörds, GridMatrixIndex, GridMatrixRegionSelection, N } from '../typings'
import * as Styled from '../styles'
import { Language } from '../enums'
import { i18n } from '../i18n'

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
	language: Language
}

export const Cell: FC<CellProps> = memo(({ row, col }) => {
	
	const { value, language, ...props } = useSelector<StoreReducer, CellState>(({ 
		initialGameMatrix,
		workingMatrix,
		mistakesMatrix,
		selection,
		selectedRegion,
		selectedInputValue,
		language,
		settings
	}) => {

		const [selectedRow, selectedCol]: GridMatrixCoörds = selection
		const [selectedRegionRows, selectedRegionCols]: GridMatrixRegionSelection = selectedRegion

		const value: N = workingMatrix && mistakesMatrix 
			? mistakesMatrix[row][col] !== 0 
				? mistakesMatrix[row][col] 
				: workingMatrix[row][col]
			: 0
		
		const selected: boolean = selectedRow === row && selectedCol === col

		const clue: boolean = initialGameMatrix && initialGameMatrix[row][col] !== 0
		
		const highlighted: boolean = selectedRow === row || selectedCol === col 
			|| (selectedRegionRows.includes(row) && selectedRegionCols.includes(col))

		const duplicate: boolean = settings.highlightDuplicates 
			&& workingMatrix
			&& workingMatrix[row][col] !== 0
			&& workingMatrix[selectedRow][selectedCol] === workingMatrix[row][col]
		
		const mistake: boolean = mistakesMatrix && mistakesMatrix[row][col] !== 0

		const mistakeDuplicate: boolean = !selected && highlighted && selectedInputValue === value

		return {
			value,
			clue,
			highlighted,
			selected,
			duplicate,
			mistake,
			mistakeDuplicate,
			language
		}
	})

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const clickHandler = () => {
		!props.selected && dispatch(selectCell([row, col]))
	}

	return (
		<Styled.CellContainer {...props} onClick={clickHandler}>
			{value === 0 ? '' : i18n[language].numbers[value - 1]}
		</Styled.CellContainer>
	)
})