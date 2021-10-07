
import { FC, SyntheticEvent, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'
import { Difficulty } from '../enums'
import { StoreReducer, updateSettings } from '../redux'


export interface MistakesLimitState {
    mistakesLimit: number
}

export const MistakesLimits = {
	[Difficulty.EASY]: 5,
	[Difficulty.MEDIUM]: 3,
	[Difficulty.HARD]: 2
}

const capitalize = (word: string): string => word.charAt(0) + word.slice(1).toLowerCase()

export const MistakesLimit: FC = () => {

	const labelValues = useMemo(() => Object.values(MistakesLimits), [])
	const labelKeys = useMemo(() => Object.keys(MistakesLimits).map(key => capitalize(key)), [])

	const { mistakesLimit } = useSelector<StoreReducer, MistakesLimitState>(state => state.settings)
	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const onChangeHandler = useCallback(({ target }: SyntheticEvent) => {
		dispatch(updateSettings({ mistakesLimit: Number((target as HTMLSelectElement).value) }))
	}, [dispatch, mistakesLimit])

	return (
		<>
			<label htmlFor='mistakes-limit'>Allowed Mistakes:</label>
			<select name='mistakes-limit' id='mistakes-limit' onChange={onChangeHandler} defaultValue={mistakesLimit}>
				{labelValues.map((value, i) => (
					<option key={`mistakes-limit-${value}`} value={value}>
						{labelKeys[i]}{': '}{value}
					</option>
				))}
			</select>
		</>
	)
}