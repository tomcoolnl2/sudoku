
import { Action, AnyAction } from 'redux'
import * as TYPES from './types'
import { AppSettings } from './models'
import { GridMatrixCoörds, SudokuInputValue } from '../typings'
import { Language } from '../enums' 


export const createGrid = (): Action => ({ type: TYPES.UNLEASH_THE_MATRIX })

export const fillCell = (value: SudokuInputValue, coords: GridMatrixCoörds): AnyAction => ({ 
	value,
	coords,
	type: TYPES.FILL_CELL
})

export const selectCell = (coords: GridMatrixCoörds): AnyAction => ({ 
	coords,
	type: TYPES.SELECT_CELL
})

export const eraseMistake = (coords: GridMatrixCoörds): AnyAction => ({
	coords,
	type: TYPES.ERASE_MISTAKE
})

export const updateSettings = (settings: Partial<AppSettings>): AnyAction => ({
	settings,
	type: TYPES.UPDATE_SETTINGS
})

export const setLanguage = (language: Language): AnyAction => ({
	type: TYPES.SET_LANGUAGE,
	language
})