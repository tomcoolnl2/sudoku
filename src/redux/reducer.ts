
import { AnyAction } from 'redux'
import { buildGrid } from '../utils'
import { AppState } from './models'
import * as types from './types'


export function reducer(state: AppState = {}, action: AnyAction) {
    switch(action.type) {
        case types.UNLEASH_THE_MATRIX:
            return {
                ...state,
                grid: buildGrid()
            }
        case types.SELECT_CELL:
            return {
                ...state,
                selection: action.coords
            }
        default:
             return state
    }
}
