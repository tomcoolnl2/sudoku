import { FC, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import * as Styled from '../styles'
import { fillCell, StoreReducer, } from '../redux'
import { SudokuInput, GridMatrixCoörds, N } from '../typings'


interface NumbersProps {
    value: SudokuInput
}

interface NumbersState {
    selection?: GridMatrixCoörds
    selectedValue?: N
}

export const UIButton: FC<NumbersProps> = memo(({ value }) => {

    const { selection, selectedValue } = useSelector<StoreReducer, NumbersState>(({ selection, workingGrid }) => ({ 
        selection,
        selectedValue: workingGrid && selection ? workingGrid[selection[0]][selection[1]] : 0
    }))

    const dispatch = useDispatch<Dispatch<AnyAction>>()

    const fill = useCallback(() => {
        if (selection && selectedValue === 0) {
            dispatch(fillCell(value, selection))
        }
    }, [dispatch, selection, selectedValue, value])

  return <Styled.Button onClick={fill}>{value}</Styled.Button>
})
