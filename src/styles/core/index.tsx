

import { FC } from 'react'
import { ThemeProvider }  from 'styled-components'
import { createGlobalStyle, css } from 'styled-components'

const theme = {
	colors: {
		background: 'radial-gradient(#282c34cc, #282c34)',
		black: '#282c34',
		active: '#EDDA74',
		highlighted: '#ECE5B6',
		white: 'white'
	},
	transition: '0.3s'
}

export const lightTheme = {
	...theme
}

export const darkTheme = {
	...theme,
	colors: {
		...theme.colors,
		black: '#EBEDEF',
		active: '#5D6D7E',
		highlighted: '#85929E',
		white: '#2E4053'
	},
}

export const GlobalStyles = createGlobalStyle`
    ${props => css`
		:root {
			color-scheme: light dark;
		}

        html {
            height: 100%;
        }

        body {
            display: flex;
            flex-direction: column;
            height: 100%;
            margin: 0;

            #root {
                background-image: ${props.theme.colors.background};
                color: ${props.theme.colors.black};
                display: flex;
                font-family: sans-serif;
                height: 100%;
                justify-content: center;
                padding: 15px;
            }
        }
    `
}`

export const withTheme: FC = (Component: unknown) => {
	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyles />
			{Component}
		</ThemeProvider>
	)
}