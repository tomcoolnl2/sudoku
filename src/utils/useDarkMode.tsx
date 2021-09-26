
import { useEffect, useState } from 'react'
import { VisualMode } from '../typings/enum'


const key = 'theme:sudoku'

export const useDarkMode = (): readonly [VisualMode, () => void, boolean] => {

	const [theme, setTheme] = useState<VisualMode>(VisualMode.LIGHT)
	const [mountedComponent, setMountedComponent] = useState<boolean>(false)

	const setVisualMode = (mode: VisualMode) => {
		window.localStorage.setItem(key, mode)
		setTheme(mode)
	}

	const themeToggler = () => {
		setVisualMode(theme === VisualMode.LIGHT ? VisualMode.DARK : VisualMode.LIGHT)
	}

	useEffect(() => {
		const localTheme = window.localStorage.getItem(key) as VisualMode
		localTheme && setTheme(localTheme)
		setMountedComponent(true)
	}, [])
    
	return [theme, themeToggler, mountedComponent] as const
}
