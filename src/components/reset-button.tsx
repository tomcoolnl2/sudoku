
import { FC, memo } from 'react'
import * as Styled from '../styles'
import { ReloadIcon } from '../icons'

interface NewGameButtonProps {
    reset: () => void
}

export const NewGameButton: FC<NewGameButtonProps> = memo(({ reset }) => {

    return (
        <Styled.Button onClick={reset}>
            <ReloadIcon /> New Game
        </Styled.Button>)
})