
import { FC, useRef, memo } from 'react'
import * as Styled from '../styles'
import { UIButton } from './button'
import { SudokuInput } from '../typings'


export const Numbers: FC = memo(() => {

    const nrs = useRef<SudokuInput[]>([1, 2, 3, 4, 5, 6, 7, 8, 9])

    return (
        <Styled.NumbersContainer>
            {nrs.current.map(nr => (
                <UIButton key={nr} value={nr}>{nr}</UIButton>
            ))}
        </Styled.NumbersContainer>
    )
})