
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider }  from 'styled-components'
import { GlobalStyles, theme } from './styles/core'
import * as Styled from './styles'
import { Grid } from './components'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Styled.Content>
      <Styled.Title>Sudoku</Styled.Title>
      <Styled.Card>
        <Grid />
      </Styled.Card>
    </Styled.Content>
  </ThemeProvider>,
  document.getElementById('root')
);

// https://cra.link/PWA
serviceWorkerRegistration.unregister()

// TODO send to an analytics endpoint. 
// https://bit.ly/CRA-vitals
reportWebVitals(console.warn)
