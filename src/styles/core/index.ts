
import { createGlobalStyle, css } from 'styled-components'


export const theme = {
	colors: {
		background: 'radial-gradient(#282c34cc, #282c34)',
		black: '#282c34',
		blue: '#a0e9fd',
		lightBlue: '#caf3fe',
		white: 'white'
	},
	transition: '0.3s'
}

export const GlobalStyles = createGlobalStyle`
    ${props => css`
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