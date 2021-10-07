
import { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider }  from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { VisualMode } from './typings/enum'
import { configureStore } from './redux'	
import { GlobalStyles, lightTheme, darkTheme } from './styles/core'
import * as Styled from './styles'
import { useDarkMode } from './utils/useDarkMode'
import { Menu } from './components'
import { Game, Settings, Splash } from './pages'

// Weird validation error causes the app to crash, but it works fine
// eslint-disable-next-line
// @ts-ignore
const { store, persistor } = configureStore()

export const App: FC = () => {

	const [ theme ] = useDarkMode()
	const visualMode = theme === VisualMode.LIGHT ? lightTheme : darkTheme

	return (
		<ThemeProvider theme={visualMode}>
			<GlobalStyles />
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router>
						<Styled.Content>
							<Menu />
							<Styled.Title>Sudoku</Styled.Title>
							<Styled.Card>
								<Switch>
									<Route exact path="/">
										<Splash />
									</Route>
									<Route path="/settings">
										<Settings />
									</Route>
									<Route path="/game">
										<Game />
									</Route>
								</Switch>
							</Styled.Card>
						</Styled.Content>
					</Router>
				</PersistGate>
			</Provider>
		</ThemeProvider>
	)
}