
import { FC, memo } from 'react'
import * as Styled from '../styles'
import { ReloadIcon } from '../icons'

interface ResetGameButtonProps {
    reset: () => void
}

export const ResetGameButton: FC<ResetGameButtonProps> = memo(({ reset }) => {

	return (
		<Styled.Button onClick={reset}>
			<ReloadIcon /> New Game
		</Styled.Button>)
})