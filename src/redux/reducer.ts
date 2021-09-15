
import { AnyAction } from 'redux'
import { Sudoku } from '../Sudoku'
import { GridMatrix } from '../typings'
import { compareArrays } from '../utils'
import { AppState } from './models'
import * as types from './types'


export function reducer(state: AppState = {}, action: AnyAction): AppState {
    
    switch(action.type) {
    
        case types.UNLEASH_THE_MATRIX: {
            
            const solvedGrid: GridMatrix = Sudoku.buildGrid()
            // use spread to copy the solvedGrid, to prevent a object reference
            let gridClone = [...solvedGrid].map(row => [...row]) as GridMatrix
            const challengeGrid: GridMatrix = Sudoku.emptyCells(gridClone)
            // use spread to copy the cloned Grid, to prevent a object reference
            gridClone = [...gridClone].map(row => [...row]) as GridMatrix
            const workingGrid: GridMatrix = gridClone

            return {
                ...state,
                challengeGrid,
                solvedGrid,
                workingGrid
            }
        }
        case types.FILL_CELL: {

            const { workingGrid, solvedGrid } = state
            const { value } = action
            
            if (workingGrid && solvedGrid) {
                
                const [ri, ci] = action.coords
                
                if (solvedGrid[ri][ci] !== value) {
                    console.log('WRONG')
                    return state
                }

                workingGrid[ri][ci] = value
                
                if (compareArrays(workingGrid, solvedGrid)) {
                    console.log('WIN')    
                }

                return {
                    ...state,
                    workingGrid: [...workingGrid]
                }
            }

            return {
                ...state,
            }
        }
        case types.SELECT_CELL: {
            return {
                ...state,
                selection: action.coords
            }
        }
        default: {
            return state
        }
    }
}
