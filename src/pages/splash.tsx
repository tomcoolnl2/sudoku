
import { FC } from 'react'
import { Link } from 'react-router-dom'
import * as Styled from '../styles'
import { MistakesLimit } from '../components'

export const Splash: FC = () => {
	return (
		<>
			<MistakesLimit />
			<Link to='/game'>
				<Styled.Button>
					Todo!
				</Styled.Button>
			</Link>
		</>
	)
}