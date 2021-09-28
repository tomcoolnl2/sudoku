
import { FC, memo } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { selectCell, StoreReducer } from '../redux'
import { GridMatrixIndex, N } from '../typings'
import * as Styled from '../styles'

export interface CellProps {
    ri: GridMatrixIndex
    ci: GridMatrixIndex
}

interface CellState {
    value: N
    clue: boolean
	highlighted: boolean
    selected: boolean,
	duplicate: boolean
}

export const Block: FC<CellProps> = memo(({ ri, ci }) => {

	const { value, clue, selected, highlighted, duplicate } = useSelector<StoreReducer, CellState>(({ initialGameMatrix, workingMatrix, selection }) => ({
		value: workingMatrix ? workingMatrix[ri][ci] : 0,
		clue: initialGameMatrix && initialGameMatrix[ri][ci] !== 0,
		highlighted: selection[0] === ri || selection[1] === ci,
		selected: selection[0] === ri && selection[1] === ci,
		duplicate: workingMatrix
			&& workingMatrix[ri][ci] !== 0
			&& workingMatrix[selection[0]][selection[1]] === workingMatrix[ri][ci]
	}))

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const clickHandler = () => {
		!selected && dispatch(selectCell([ri, ci]))
	}

	return (
		<Styled.CellContainer clue={clue} selected={selected} highlighted={highlighted} duplicate={duplicate} onClick={clickHandler}>
			{value === 0 ? '' : value}
		</Styled.CellContainer>
	)
})