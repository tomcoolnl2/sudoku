
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider }  from 'styled-components'
import { GlobalStyles, theme } from './styles/core'
import * as Styled from './styles'
import { Grid } from './components'
import { configureStore } from './redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

console.log(configureStore())

const { store, persistor } = configureStore()

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<GlobalStyles />
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Styled.Content>
					<Styled.Title>Sudoku</Styled.Title>
					<Styled.Card>
						<Grid />
					</Styled.Card>
				</Styled.Content>
			</PersistGate>
		</Provider>
	</ThemeProvider>,
	document.getElementById('root')
)

// https://cra.link/PWA
serviceWorkerRegistration.register()

// TODO send to an analytics endpoint. 
// https://bit.ly/CRA-vitals
reportWebVitals()
