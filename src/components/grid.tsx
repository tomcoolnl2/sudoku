
import { Children, FC } from 'react'
import { GRID } from '../typings'
import * as Styled from '../styles'
import { Block } from './block'
import { createGrid } from './../utils'

export const Grid: FC = () => {
    const grid: GRID = createGrid()
    console.log(grid)
    return (
        <Styled.GridContainer>
            {Children.toArray([...Array(9)].map((_: undefined, i: number) => (
                <Styled.GridRow>
                    {Children.toArray([...Array(9)].map((_: undefined, j: number) => (
                        <Block columnIndex={i} rowIndex={j} />
                    )))}
                </Styled.GridRow>
            )))}
        </Styled.GridContainer>
    )
}