
import { FC, memo, SyntheticEvent } from 'react'
import * as Styled from '../styles'
import { ReloadIcon } from '../icons'

export interface ResetGameButtonProps {
    reset: (event: SyntheticEvent) => void
}

export const ResetGameButton: FC<ResetGameButtonProps> = memo(({ reset }) => (
	<Styled.Button onClick={reset} data-testid='reset-button'>
		<ReloadIcon /> New Game
	</Styled.Button>
))