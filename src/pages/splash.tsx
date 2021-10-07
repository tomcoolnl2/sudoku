
import { FC } from 'react'
import { Link } from 'react-router-dom'

export const Splash: FC = () => {
	return (
		<Link to='/game'>
			<button type='button'>
				Click Me!
			</button>
		</Link>
	)
}