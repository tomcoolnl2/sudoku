
import { createGlobalStyle, css } from 'styled-components'

const theme = {
	colors: {
		background: 'radial-gradient(#282c34cc, #282c34)',
		primary: 'white',
		secondary: '#282c34',
		active: '#EDDA74',
		highlighted: '#FCF3CF',
		errorPrimary: '#CB4335',
		errorSecundary: '#E6B0AA'
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
		primary: '#2E4053',
		secondary: '#EBEDEF',
		active: '#515A5A',
		highlighted: '#616A6B',
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
                color: ${props.theme.colors.secondary};
                display: flex;
                font-family: sans-serif;
                height: 100%;
                justify-content: center;
                padding: 15px;
            }
        }
    `
}`