
import { Action, AnyAction } from 'redux'
import { GridMatrixCoörds, SudokuInputValue } from '../typings'
import * as types from './types'


export const createGrid = (): Action => ({ type: types.UNLEASH_THE_MATRIX })

export const fillCell = (value: SudokuInputValue, coords: GridMatrixCoörds): AnyAction => ({ 
	value,
	coords,
	type: types.FILL_CELL
})

export const selectCell = (coords: GridMatrixCoörds): AnyAction => ({ 
	coords,
	type: types.SELECT_CELL
})
