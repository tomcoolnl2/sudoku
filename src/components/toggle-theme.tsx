
import { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'
import { StoreReducer, updateSettings } from '../redux'
import { DarkThemeProviderState } from '../styles/core/ThemeProvider'


export type ToggleThemeState = DarkThemeProviderState

export const ToggleTheme: FC = () => {
	
	const { darkModeEnabled } = useSelector<StoreReducer, ToggleThemeState>(state => state.settings)
	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const onChangeHandler = useCallback(() => {
		dispatch(updateSettings({ darkModeEnabled: !darkModeEnabled }))
	}, [dispatch, darkModeEnabled])
	
	return (
		<label htmlFor='theme-toggle'>
			Dark mode: <input type='checkbox' name='theme-toggle' onChange={onChangeHandler} checked={darkModeEnabled} />
		</label>
	)
}