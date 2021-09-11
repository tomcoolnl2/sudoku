
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider }  from 'styled-components'
import { GlobalStyles, theme } from './styles/core'
import * as Styled from './styles'
import { Grid } from './components'
import { configureStore } from './redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

const store = configureStore()

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Provider store={store}>
      <Styled.Content>
        <Styled.Title>Sudoku</Styled.Title>
        <Styled.Card>
          <Grid />
        </Styled.Card>
      </Styled.Content>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// https://cra.link/PWA
serviceWorkerRegistration.unregister()

// TODO send to an analytics endpoint. 
// https://bit.ly/CRA-vitals
reportWebVitals(console.warn)
