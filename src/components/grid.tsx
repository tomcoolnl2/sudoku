
import { Children, FC, useEffect, useCallback, memo } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import useMouseTrap from 'react-hook-mousetrap'
import * as Styled from '../styles'
import { Block, Numbers, NewGameButton } from './'
import { createGrid, StoreReducer, selectCell, fillCell } from '../redux'
import { GridMatrix, GridMatrixCoörds, GridMatrixIndex, N, SudokuInput } from '../typings'

interface GridState {
    selection?: GridMatrixCoörds
    selectedValue: N
    workingGrid?: GridMatrix
}

export const Grid: FC = memo(() => {
    
    const { selection, selectedValue } = useSelector<StoreReducer, GridState>(({ selection, workingGrid }) => ({ 
        selection, 
        workingGrid,
        selectedValue: workingGrid && selection ? workingGrid[selection[0]][selection[1]] : 0
    }))
    
    const dispatch = useDispatch<Dispatch<AnyAction>>()
    
    const create = useCallback(() => {
        dispatch(createGrid())
    }, [dispatch])
    
    const fill = useCallback((n: SudokuInput) => {
        if (selection && selectedValue === 0) {
            dispatch(fillCell(n, selection))
        }
    }, [dispatch, selection, selectedValue])

    function moveDown() {
        if (selection && selection[0] < 8) {
            dispatch(selectCell([
                (selection[0] + 1) as GridMatrixIndex, selection[1]
            ]))
        }
    }

    function moveLeft() {
        if (selection && selection[1] > 0) {
            dispatch(selectCell([
                selection[0], (selection[1] - 1) as GridMatrixIndex
            ]))
        }
    }

    function moveRight() {
        if (selection && selection[1] < 8)  {
            dispatch(selectCell([
                selection[0], (selection[1] + 1) as GridMatrixIndex
            ]))
        }
    }

    function moveUp() {
        if (selection && selection[0] > 0) {
            dispatch(selectCell([
                (selection[0] - 1) as GridMatrixIndex, selection[1]
            ]))
        }
    }

    useMouseTrap('1', () => fill(1))
    useMouseTrap('2', () => fill(2))
    useMouseTrap('3', () => fill(3))
    useMouseTrap('4', () => fill(4))
    useMouseTrap('5', () => fill(5))
    useMouseTrap('6', () => fill(6))
    useMouseTrap('7', () => fill(7))
    useMouseTrap('8', () => fill(8))
    useMouseTrap('9', () => fill(9))

    useMouseTrap('down', moveDown)
    useMouseTrap('down', moveDown)
    useMouseTrap('left', moveLeft)
    useMouseTrap('right', moveRight)
    useMouseTrap('up', moveUp)

    useEffect(() => { 
        create() 
    }, [create])

    return (
        <>
            <Styled.GridContainer>
                <NewGameButton reset={create} />
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