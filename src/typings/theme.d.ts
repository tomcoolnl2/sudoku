
import 'styled-components'

import { lightTheme } from '../styles/core'

type Theme = typeof lightTheme

declare module 'styled-components' {
    // eslint-disable-next-line
    export interface DefaultTheme extends Theme {}
}