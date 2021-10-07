
import { FC } from 'react'
import { Link } from 'react-router-dom'


export const Menu: FC = () => {
	return (
		<ul>
			<li>
				<Link to="/">Start</Link>
			</li>
			<li>
				<Link to="/settings">Settings</Link>
			</li>
		</ul>
	)
}