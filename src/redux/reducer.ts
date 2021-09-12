
import { AnyAction } from 'redux'
import { GridMatrix } from '../typings'
import { buildGrid, copyGrid, removeNumbers } from '../utils'
import { AppState } from './models'
import * as types from './types'


export function reducer(state: AppState = {}, action: AnyAction) {
    switch(action.type) {
        case types.UNLEASH_THE_MATRIX:
            const solvedGrid = [...buildGrid()] as GridMatrix
            console.log('solvedGrid' , solvedGrid)
            const copiedGrid: GridMatrix = copyGrid(solvedGrid)
            console.log('copiedGrid', copiedGrid)
            console.log(solvedGrid === copiedGrid)
            const challengeGrid: GridMatrix = removeNumbers(copiedGrid)
            console.log('challengeGrid', challengeGrid)
            
            return {
                ...state,
                grid: challengeGrid
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
