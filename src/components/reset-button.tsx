
import { FC, useCallback, memo } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import * as Styled from '../styles'
import { createGrid } from '../redux'
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