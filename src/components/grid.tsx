
import { Children, FC, useEffect, useCallback } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import useMouseTrap from 'react-hook-mousetrap'
import * as Styled from '../styles'
import { Block } from './block'
import { createGrid, StoreReducer, selectCell } from '../redux'
import { GridMatrixCoörds, GridMatrixIndex } from '../typings'

interface GridState {
    selection?: GridMatrixCoörds
}

export const Grid: FC = () => {
    
    const { selection } = useSelector<StoreReducer, GridState>(state => state)
    const dispatch = useDispatch<Dispatch<AnyAction>>()
    const create = useCallback(() => dispatch(createGrid()), [dispatch])

    useEffect(() => { 
        create() 
    }, [create])

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

    useMouseTrap('down', moveDown)
    useMouseTrap('left', moveLeft)
    useMouseTrap('right', moveRight)
    useMouseTrap('up', moveUp)

    return (
        <Styled.GridContainer>
            {Children.toArray([...Array(9)].map((_: undefined, ri: number) => (
                <Styled.GridRow>
                    {Children.toArray([...Array(9)].map((_: undefined, ci: number) => (
                        <Block ri={ri as GridMatrixIndex} ci={ci as GridMatrixIndex} />
                    )))}
                </Styled.GridRow>
            )))}
        </Styled.GridContainer>
    )
}