
import { AnyAction } from 'redux'
import { buildGrid } from '../utils'
import { AppState } from './models'
import * as types from './types'

const initialState: AppState = {}

export function reducer(state = initialState, action: AnyAction) {
    switch(action.type) {
        case types.CREATE_GRID:
            return {
                ...state,
                grid: buildGrid()
            }
        case types.SELECT_BLOCK:
            return {
                ...state,
                selectedBlock: action.coords
            }
        default:
             return state
    }
}
