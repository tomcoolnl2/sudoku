
import { FC, memo } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { selectCell, StoreReducer } from '../redux'
import { GridMatrixCoörds, GridMatrixIndex, GridMatrixRegionSelection, N } from '../typings'
import * as Styled from '../styles'
import { Sudoku } from '../Sudoku'

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

const nrsCH: string[] = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
const nrsEN: string[] = Sudoku.createSeries((_, i) => String(i + 1))
const langs = {
	en: nrsEN,
	ch: nrsCH
}
const lang = langs.ch

export const Cell: FC<CellProps> = memo(({ row, col }) => {
	
	const { value, ...props } = useSelector<StoreReducer, CellState>(({ 
		initialGameMatrix, 
		workingMatrix, 
		mistakesMatrix, 
		selection,
		selectedRegion,
		selectedInputValue,
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
			mistakeDuplicate
		}
	})

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const clickHandler = () => {
		!props.selected && dispatch(selectCell([row, col]))
	}

	return (
		<Styled.CellContainer {...props} onClick={clickHandler}>
			{value === 0 ? '' : lang[value - 1]}
		</Styled.CellContainer>
	)
})