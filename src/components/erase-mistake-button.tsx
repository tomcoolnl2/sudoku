
import { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import * as Styled from '../styles'
import { EraseIcon } from '../icons'
import { eraseMistake, StoreReducer } from '../redux'
import { Sudoku } from '../Sudoku'
import { GridMatrixCoörds } from '../typings'


export interface EraseMistakeState {
	selection?: GridMatrixCoörds
	enabled?: boolean
}

export const EraseMistakeButton: FC = () => {

	const dispatch = useDispatch<Dispatch<AnyAction>>()
    
	const { enabled, selection } = useSelector<StoreReducer, EraseMistakeState>(({ mistakesMatrix, selection }) => ({ 
		mistakesMatrix,
		selection,
		enabled: selection
			&& mistakesMatrix
			&& mistakesMatrix[selection[0]][selection[1]] !== Sudoku.HIDDEN_CELL_VALUE
	}))

	const erase = useCallback(() => {
		dispatch(eraseMistake(selection))
	}, [dispatch, selection])

	return (
		<Styled.Button onClick={erase} disabled={!enabled}>
			<EraseIcon style={{ top: -3 }} />
		</Styled.Button>
	)
}