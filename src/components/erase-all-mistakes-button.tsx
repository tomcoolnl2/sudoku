
import { FC, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import * as Styled from '../styles'
import { EraseIcon } from '../icons'
import { GridMatrix, N } from '../typings'
import { eraseAllMistakes, StoreReducer } from '../redux'


export interface EraseMistakesState {
    mistakesMatrix?: GridMatrix
}

export const EraseMistakesButton: FC = () => {
    
	const { mistakesMatrix } = useSelector<StoreReducer, EraseMistakesState>(({ mistakesMatrix }) => ({ 
		mistakesMatrix
	}))

	const dispatch = useDispatch<Dispatch<AnyAction>>()

	const eraseAll = useCallback(() => {
		dispatch(eraseAllMistakes())
	}, [dispatch])

	const disabled: boolean = useMemo(() => {
		if (mistakesMatrix) {
			return !mistakesMatrix.flat().some((value: N): boolean => value !== 0)
		}
		return true
	}, [mistakesMatrix])

	return (
		<Styled.Button onClick={eraseAll} disabled={disabled}>
			<EraseIcon style={{ top: -3 }} /> Erase mistakes
		</Styled.Button>
	)
}