
import { FC, lazy, Suspense } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { configureStore } from './redux'	
import { DarkThemeProvider } from './styles/core/ThemeProvider'
import * as Styled from './styles'
import { Menu, ErrorFallback } from './components'

const Splash = lazy(() => import('./pages/splash'))
const Game = lazy(() => import('./pages/game'))
const Settings = lazy(() => import('./pages/settings'))

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
								<ErrorBoundary FallbackComponent={ErrorFallback} onReset={location.reload}>
									<Suspense fallback={<div>Loading...</div>}>
										<Switch>
											<Route exact path="/">
												<Splash />
											</Route>
											<Route path="/game">
												<Game />
											</Route>
											<Route path="/settings">
												<Settings />
											</Route>
										</Switch>
									</Suspense>
								</ErrorBoundary>
							</Styled.Card>
						</Styled.Content>
					</Router>
				</DarkThemeProvider>
			</PersistGate>
		</ReduxProvider>
	)
}