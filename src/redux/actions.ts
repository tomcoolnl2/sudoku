
import { Action, AnyAction } from 'redux'
import { GridMatrixCoörds } from '../typings'
import * as types from './types'


export const createGrid = (): Action => ({ type: types.UNLEASH_THE_MATRIX })

export const selectBlock = (coords: GridMatrixCoörds): AnyAction => ({ 
    coords,
    type: types.SELECT_REGION
})
