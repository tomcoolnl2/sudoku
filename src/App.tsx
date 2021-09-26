
import { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider }  from 'styled-components'
import { configureStore } from './redux'	
import { GlobalStyles, lightTheme, darkTheme } from './styles/core'
import * as Styled from './styles'
import { Grid, ToggleTheme } from './components'
import { useDarkMode, VisualMode } from './utils/useDarkMode'

// Weird validation error causes the app to crash, but it works fine
// eslint-disable-next-line
// @ts-ignore
const { store, persistor } = configureStore()

export const App: FC = () => {

	const [theme, setTheme, mountedComponent] = useDarkMode()

	const visualMode = theme === VisualMode.LIGHT ? lightTheme : darkTheme

	if (!mountedComponent) {
		return null
	}

	return (
		<ThemeProvider theme={visualMode}>
			<GlobalStyles />
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Styled.Content>
						<Styled.Title>Sudoku</Styled.Title>
						<Styled.Card>
							<Grid />
							<ToggleTheme toggleTheme={setTheme} selected={theme === VisualMode.DARK} />
						</Styled.Card>
					</Styled.Content>
				</PersistGate>
			</Provider>
		</ThemeProvider>
	)
}