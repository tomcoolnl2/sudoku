
import { AnyAction } from 'redux'
import { buildGrid } from '../utils'
import { AppState } from './models'
import * as types from './types'

const initialState: AppState = {}

export function reducer(state = initialState, action: AnyAction) {
    switch(action.type) {
        case types.UNLEASH_THE_MATRIX:
            return {
                ...state,
                grid: buildGrid()
            }
        case types.SELECT_REGION:
            return {
                ...state,
                selection: action.coords
            }
        default:
             return state
    }
}
