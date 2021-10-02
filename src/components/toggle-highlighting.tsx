
import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'
import { StoreReducer, updateSettings } from '../redux'


export interface ToggleHighlightingState {
    highlightDuplicates?: boolean
}

export const ToggleHighlighting: FC = () => {
	
	const { highlightDuplicates } = useSelector<StoreReducer, ToggleHighlightingState>(({ settings: { highlightDuplicates } }) => ({ 
		highlightDuplicates
	}))

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const [ value, setValue ] = useState<boolean>(highlightDuplicates)
	
	useEffect(() => {
		dispatch(updateSettings({ highlightDuplicates: value }))
	}, [dispatch, value])

	const updateValue = () => {
		setValue(!highlightDuplicates)
	}

	return (
		<label htmlFor='highlight-toggle' data-testid='theme-toggle'>
			Enable Highlighting: 
			<input type='checkbox' name='highlight-toggle' onChange={updateValue} checked={value} />
		</label>
	)
}