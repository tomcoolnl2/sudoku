
import React, { FC } from 'react'
// import * as Styled from './styles'
import * as Styled from '../styles'

interface BlockProps {
    columnIndex: number
    rowIndex: number
}

export const Block: FC<BlockProps> = ({ columnIndex, rowIndex }) => {

    return (
        <Styled.BlockContainer data-cy={`block-${columnIndex}-${rowIndex}`} />
    )
}