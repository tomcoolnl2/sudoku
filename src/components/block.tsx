
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
    active: boolean
    clue: boolean
    value: N
}

export const Block: FC<BlockProps> = memo(({ ri, ci }) => {

	const { value, active, clue } = useSelector<StoreReducer, BlockState>(({ initialGameMatrix, workingMatrix, selection }) => ({
		active: selection 
			? selection[0] === ri && selection[1] === ci 
			: false,
		value: workingMatrix ? workingMatrix[ri][ci] : 0,
		clue: initialGameMatrix && initialGameMatrix[ri][ci] !== 0
	}))

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const clickHandler = () => {
		!active && dispatch(selectCell([ri, ci]))
	}

	return (
		<Styled.BlockContainer active={active} clue={clue} onClick={clickHandler}>
			{value === 0 ? '' : value}
		</Styled.BlockContainer>
	)
})