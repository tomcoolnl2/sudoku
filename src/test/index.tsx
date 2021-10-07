

import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, lightTheme } from '../styles/core'
import { configureStore } from '../redux/configureStore'


/**
 * Wrapper for unit/snapshot testing
 * @param Component React children
 * @returns void
 */
export const withRouter: FC = (Component: unknown) => (
	<Router>{Component}</Router>
)

/**
 * Wrapper for unit/snapshot testing
 * @param Component React children
 * @returns void
 */
export const withRedux: FC = (Component: unknown) => {
	// Weird validation error causes the app to crash, but it works fine
	// eslint-disable-next-line
	// @ts-ignore
	const { store } = configureStore()
	return (
		<Provider store={store}>
			{Component}
		</Provider>
	)
}

/**
 * Wrapper for unit/snapshot testing
 * @param Component React children
 * @returns void
 */
export const withTheme: FC = (Component: unknown) => (
	<ThemeProvider theme={lightTheme}>
		<GlobalStyles />
		{Component}
	</ThemeProvider>
)