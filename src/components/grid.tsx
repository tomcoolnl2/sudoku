
import { Children, FC, useEffect, useCallback } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import useMouseTrap from 'react-hook-mousetrap'
import * as Styled from '../styles'
import { Block } from './block'
import { AppState, createGrid } from '../redux'
import { BLOCK_COORDS, INDEX } from '../typings'

interface GridState {
    selectedBlock?: BLOCK_COORDS
}

export const Grid: FC = () => {
    
    const { selectedBlock } = useSelector<AppState, GridState>(state => state)
    const dispatch = useDispatch<Dispatch<AnyAction>>()
    const create = useCallback(() => dispatch(createGrid()), [dispatch])

    useEffect(() => { create() }, [create])

    function moveDown() {
        if (selectedBlock && selectedBlock[0] < 8) console.log('down')
    }

    function moveLeft() {
        if (selectedBlock && selectedBlock[1] > 0) console.log('left')
    }

    function moveRight() {
        if (selectedBlock && selectedBlock[1] < 8)  console.log('right')
    }

    function moveUp() {
        if (selectedBlock && selectedBlock[0] > 0) console.log('up')
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
                        <Block ri={i as INDEX} ci={j as INDEX} />
                    )))}
                </Styled.GridRow>
            )))}
        </Styled.GridContainer>
    )
}