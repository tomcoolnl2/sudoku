
import 'styled-components'

import { theme } from '../styles/core'

type Theme = typeof theme

declare module 'styled-components' {
    export type DefaultTheme = Theme
}