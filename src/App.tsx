
import { FC } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { configureStore } from './redux'	
import { DarkThemeProvider } from './styles/core/ThemeProvider'
import * as Styled from './styles'
import { Menu } from './components'
import { Game, Settings, Splash } from './pages'

// Weird validation error causes the app to crash, but it works fine
// eslint-disable-next-line
// @ts-ignore
const { store, persistor } = configureStore()

export const App: FC = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<DarkThemeProvider>
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
				</DarkThemeProvider>
			</PersistGate>
		</ReduxProvider>
	)
}