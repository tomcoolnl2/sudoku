
import { FC } from 'react'
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
    value: N
}

export const Block: FC<BlockProps> = ({ ri, ci }) => {

    const { value, active } = useSelector<StoreReducer, BlockState>(({ grid, selection }) => ({ 
        active: selection 
            ? selection[0] === ri && selection[1] === ci 
            : false,
        value: grid ? grid[ri][ci] : 0
    }))

    const dispatch = useDispatch<Dispatch<AnyAction>>()

    function clickHandler() {
        !active && dispatch(selectCell([ri, ci]))
    }

    return (
        <Styled.BlockContainer active={active} onClick={clickHandler}>
            {value === 0 ? '' : value}
        </Styled.BlockContainer>
    )
}