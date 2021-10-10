
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ToggleTheme, ToggleHighlighting } from '../components'


export const Settings: FC = () => {
	return (
		<>
			<Link to='/game'>
				<button type='button'>
					Back to the game
				</button>
			</Link>
			<ToggleTheme />
			<ToggleHighlighting />
		</>
	)
}

export { Settings as default }