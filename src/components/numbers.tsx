
import { FC, useRef, memo } from 'react'
import * as Styled from '../styles'
import { InputValueButton } from './input-value-button'
import { SudokuInputValue } from '../typings'
import { Sudoku } from '../Sudoku'


export const Numbers: FC = memo(() => {

    const nrs = useRef<SudokuInputValue[]>(Sudoku.createSeries((_, i) => i + 1))

    return (
        <Styled.NumbersContainer>
            {nrs.current.map(nr => (
                <InputValueButton key={nr} value={nr}>{nr}</InputValueButton>
            ))}
        </Styled.NumbersContainer>
    )
})