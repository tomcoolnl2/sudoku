
import { FC, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'
import { StoreReducer, updateSettings } from '../redux'


export interface ToggleHighlightingState {
    highlightDuplicates?: boolean
}

export const ToggleHighlighting: FC = () => {
	
	const { highlightDuplicates } = useSelector<StoreReducer, ToggleHighlightingState>(state => state.settings)
	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const onChangeHandler = useCallback(() => {
		dispatch(updateSettings({ highlightDuplicates: !highlightDuplicates }))
	}, [dispatch, highlightDuplicates])
	
	return (
		<label htmlFor='highlight-toggle'>
			Enable Highlighting: 
			<input type='checkbox' name='highlight-toggle' onChange={onChangeHandler} checked={highlightDuplicates} />
		</label>
	)
}