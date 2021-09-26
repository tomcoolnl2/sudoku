
import { FC, memo } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { selectCell, StoreReducer } from '../redux'
import { GridMatrixIndex, N } from '../typings'
import * as Styled from '../styles'

export interface BlockProps {
    ri: GridMatrixIndex
    ci: GridMatrixIndex
}

interface BlockState {
    value: N
    clue: boolean
	highlighted: boolean
    selected: boolean
}

export const Block: FC<BlockProps> = memo(({ ri, ci }) => {

	const { value, clue, selected, highlighted } = useSelector<StoreReducer, BlockState>(({ initialGameMatrix, workingMatrix, selection = [0, 0] }) => ({
		value: workingMatrix ? workingMatrix[ri][ci] : 0,
		clue: initialGameMatrix && initialGameMatrix[ri][ci] !== 0,
		highlighted: selection[0] === ri || selection[1] === ci,
		selected: selection 
			? selection[0] === ri && selection[1] === ci 
			: false,
	}))

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const clickHandler = () => {
		!selected && dispatch(selectCell([ri, ci]))
	}

	return (
		<Styled.BlockContainer clue={clue} selected={selected} highlighted={highlighted} onClick={clickHandler}>
			{value === 0 ? '' : value}
		</Styled.BlockContainer>
	)
})