
import { FC } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { selectBlock, StoreReducer } from '../redux'
import { INDEX, N } from '../typings'
import * as Styled from '../styles'

interface BlockProps {
    ri: INDEX
    ci: INDEX
}

interface BlockState {
    isActive: boolean
    value: N
}

export const Block: FC<BlockProps> = ({ ri, ci }) => {

    const { value, isActive } = useSelector<StoreReducer, BlockState>(({ grid, selectedBlock }) => ({ 
        isActive: selectedBlock 
            ? selectedBlock[0] === ri && selectedBlock[1] === ci 
            : false,
        value: grid ? grid[ri][ci] : 0
    }))

    const dispatch = useDispatch<Dispatch<AnyAction>>()

    function clickHandler() {
        !isActive && dispatch(selectBlock([ri, ci]))
    }

    return (
        <Styled.BlockContainer isActive={isActive} onClick={clickHandler}>
            {value === 0 ? '' : value}
        </Styled.BlockContainer>
    )
}