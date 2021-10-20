
import { FC } from 'react'
import { useStopwatch } from 'react-timer-hook'


export const Timer: FC = () => {

	const { seconds, minutes, hours, days } = useStopwatch({ autoStart: true })

	return (
		<time>
            Timer: 
			{days > 0 && <span>{days}:</span>}
			{hours > 0 && <span>{hours}:</span>}
			<span>{minutes}:</span>
			<span>{seconds}</span>
		</time>
	)
}