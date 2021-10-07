
import { FC } from 'react'
import { VisualMode } from '../typings/enum'
import { useDarkMode } from '../utils/useDarkMode'


export const ToggleTheme: FC = () => {
	
	const [theme, setTheme, mountedComponent] = useDarkMode()

	if (!mountedComponent) {
		return null
	}
	
	return (
		<label htmlFor='theme-toggle' data-testid='theme-toggle'>
			Dark mode: <input type='checkbox' name='theme-toggle' onChange={setTheme} checked={theme === VisualMode.DARK} />
		</label>
	)
}