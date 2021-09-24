
import { FC, memo } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { selectCell, StoreReducer } from '../redux'
import { GridMatrixIndex, N } from '../typings'
import * as Styled from '../styles'

interface BlockProps {
    ri: GridMatrixIndex
    ci: GridMatrixIndex
}

interface BlockState {
    active: boolean
    isPuzzle: boolean
    value: N
}

export const Block: FC<BlockProps> = memo(({ ri, ci }) => {

    const { value, active, isPuzzle } = useSelector<StoreReducer, BlockState>(({ initialGameMatrix, workingMatrix, selection }) => ({
        active: selection 
            ? selection[0] === ri && selection[1] === ci 
            : false,
        value: workingMatrix ? workingMatrix[ri][ci] : 0,
        isPuzzle: initialGameMatrix && initialGameMatrix[ri][ci] !== 0 ? true: false
    }))

    const dispatch = useDispatch<Dispatch<AnyAction>>()

    const clickHandler = () => {
        !active && dispatch(selectCell([ri, ci]))
    }

    return (
        <Styled.BlockContainer active={active} puzzle={isPuzzle} onClick={clickHandler}>
            {value === 0 ? '' : value}
        </Styled.BlockContainer>
    )
})