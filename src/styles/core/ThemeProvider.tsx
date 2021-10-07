
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from './'
import { StoreReducer } from '../../redux'


export interface DarkThemeProviderState {
    darkModeEnabled: boolean
}

export const DarkThemeProvider: FC = ({ children }) => {
	const { darkModeEnabled } = useSelector<StoreReducer, DarkThemeProviderState>(state => state.settings)
	const theme = darkModeEnabled ? darkTheme : lightTheme
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	)
}