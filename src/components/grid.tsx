
import { Children, FC, useEffect, useCallback, memo } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import * as Styled from '../styles'
import { AttachKeyBoardEvents, Block, Numbers, ResetGameButton } from './'
import { createGrid, StoreReducer, fillCell } from '../redux'
import { GridMatrix, GridMatrixCoörds, GridMatrixIndex, N, SudokuInputValue } from '../typings'

interface GridState {
    selection?: GridMatrixCoörds
    selectedValue: N
    solutionMatrix?: GridMatrix
}

export const Grid: FC = memo(() => {
    
    const { selection, selectedValue, solutionMatrix } = useSelector<StoreReducer, GridState>(({ selection, solutionMatrix, workingMatrix }) => ({ 
        selection,
        selectedValue: workingMatrix && selection ? workingMatrix[selection[0]][selection[1]] : 0,
        solutionMatrix
    }))
    
    const dispatch = useDispatch<Dispatch<AnyAction>>()
    
    const create = useCallback(() => {
        dispatch(createGrid())
    }, [dispatch])
    
    const fill = useCallback((n: SudokuInputValue) => {
        if (selection && selectedValue === 0) {
            dispatch(fillCell(n, selection))
        }
    }, [dispatch, selection, selectedValue])

    useEffect(() => { 
        if (!solutionMatrix) create() 
    }, [create, solutionMatrix])

    return (
        <>
            <AttachKeyBoardEvents selection={selection} numbersInputHandler={fill} />
            <Styled.GridContainer>
                <ResetGameButton reset={create} />
            </Styled.GridContainer>
            <Styled.GridContainer>
                {Children.toArray([...Array(9)].map((_: undefined, ri: number) => (
                    <Styled.GridRow>
                        {Children.toArray([...Array(9)].map((_: undefined, ci: number) => (
                            <Block ri={ri as GridMatrixIndex} ci={ci as GridMatrixIndex} />
                        )))}
                    </Styled.GridRow>
                )))}
            </Styled.GridContainer>
            <Styled.GridContainer>
            <Numbers />
            </Styled.GridContainer>
        </>
    )
})