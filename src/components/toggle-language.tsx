
import { FC, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'
import { Language } from '../enums'
import { StoreReducer, setLanguage } from '../redux'
import { LanguageIcon } from '../icons'

export interface ToggleLanguageState {
    language: Language
}

export const ToggleLanguage: FC = memo(() => {
	
	const { language } = useSelector<StoreReducer, ToggleLanguageState>(state => state)
	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const onClickHandler = useCallback(() => {
		dispatch(setLanguage(language === Language.EN ? Language.CH : Language.EN))
	}, [dispatch, language])
	
	return (
		<label htmlFor='theme-toggle' onClick={onClickHandler}>
			<LanguageIcon />
		</label>
	)
})