
import { Action, AnyAction } from 'redux'
import { GridMatrixCellCoörds } from '../typings'
import * as types from './types'


export const createGrid = (): Action => ({ type: types.UNLEASH_THE_MATRIX })

export const selectCell = (coords: GridMatrixCellCoörds): AnyAction => ({ 
    coords,
    type: types.SELECT_CELL
})
