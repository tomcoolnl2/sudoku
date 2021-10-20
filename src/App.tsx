
import { FC, lazy, Suspense, useContext } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { configureStore } from './redux'	
import { DarkThemeProvider } from './styles/core/ThemeProvider'
import * as Styled from './styles'
import { Menu, ErrorFallback } from './components'
import { PeopleContext, ActionType, People } from './context/people'

const Splash = lazy(() => import('./pages/splash'))
const Game = lazy(() => import('./pages/game'))
const Settings = lazy(() => import('./pages/settings'))

// Weird validation error causes the app to crash, but it works fine
// eslint-disable-next-line
// @ts-ignore
const { store, persistor } = configureStore()

export const App: FC = () => {

	const { state, dispatch } = useContext(PeopleContext)
	
	console.log(state, dispatch)
	
	function devour(name: string): void {
		dispatch({ type: ActionType.CHOMP, payload: name })
	}

	function spitOut(name: string): void {
		dispatch({ type: ActionType.REVIVE, payload: name })
	}

	return (	
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<DarkThemeProvider>
					<Router>
						<Styled.Content>
							<Menu />
							<Styled.Title>Sudoku</Styled.Title>
							<Styled.Card>
								<People>
									HELLO {}
									{state.map((person, idx) => (
										<div key={idx} style={{ display: 'flex', width: '50%', justifyContent: 'space-around' }}>
											<div>{person.name}</div>
											{person.alive ?
												<div> ✨✨ ALIVE! ✨✨ <button onClick={() => devour(person.name)}> 🐊 DEVOUR 🐊 </button> </div> :
												<div> ☠ ☠ DEAD ☠ ☠ <button onClick={() => spitOut(person.name)}> 🥵 SPIT OUT 🥵 </button> </div>}
										</div>
									))}
								</People>
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