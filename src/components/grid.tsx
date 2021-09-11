
import { Children, FC, useEffect, useCallback } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import useMouseTrap from 'react-hook-mousetrap'
import * as Styled from '../styles'
import { Block } from './block'
import { createGrid, StoreReducer } from '../redux'
import { GridMatrixCoörds, GridMatrixIndex } from '../typings'

interface GridState {
    selection?: GridMatrixCoörds
}

export const Grid: FC = () => {
    
    const { selection } = useSelector<StoreReducer, GridState>(state => state)
    const dispatch = useDispatch<Dispatch<AnyAction>>()
    const create = useCallback(() => dispatch(createGrid()), [dispatch])

    useEffect(() => { create() }, [create])

    function moveDown() {
        if (selection && selection[0] < 8) console.log('down')
    }

    function moveLeft() {
        if (selection && selection[1] > 0) console.log('left')
    }

    function moveRight() {
        if (selection && selection[1] < 8)  console.log('right')
    }

    function moveUp() {
        if (selection && selection[0] > 0) console.log('up')
    }

    useMouseTrap('down', moveDown)
    useMouseTrap('left', moveLeft)
    useMouseTrap('right', moveRight)
    useMouseTrap('up', moveUp)

    return (
        <Styled.GridContainer>
            {Children.toArray([...Array(9)].map((_: undefined, i: number) => (
                <Styled.GridRow>
                    {Children.toArray([...Array(9)].map((_: undefined, j: number) => (
                        <Block ri={i as GridMatrixIndex} ci={j as GridMatrixIndex} />
                    )))}
                </Styled.GridRow>
            )))}
        </Styled.GridContainer>
    )
}