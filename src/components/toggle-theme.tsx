
import { FC, memo, SyntheticEvent } from 'react'


export interface ToggleThemeProps {
    selected?: boolean
    toggleTheme: (event: SyntheticEvent) => void
}

export const ToggleTheme: FC<ToggleThemeProps> = memo(({ toggleTheme, selected = false }) => (
	<label htmlFor='theme-toggle'>
		Dark mode: <input type='checkbox' name='theme-toggle' onChange={toggleTheme} checked={selected} />
	</label>
))