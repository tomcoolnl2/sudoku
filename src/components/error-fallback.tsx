
import { FC } from 'react'
import * as Styled from '../styles'


export interface ErrorFallbackProps {
	error: Error,
	resetErrorBoundary: () => void
}

export const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
	return (
		<div role='alert'>
			<h1>Oops!</h1>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<Styled.Button onClick={resetErrorBoundary}>Try again</Styled.Button>
		</div>
	)
}