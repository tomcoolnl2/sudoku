
import { AnyAction } from 'redux'
import { Sudoku } from '../Sudoku'
import { GridMatrix } from '../typings'
import { compareArrays } from '../utils'
import { AppState } from './models'
import * as types from './types'


export function reducer(state: AppState = {}, action: AnyAction): AppState {
    
    switch(action.type) {
    
        case types.UNLEASH_THE_MATRIX: {
            
            // solutionGrid
            const solution = new Sudoku().createSolution()
            console.log('solution', solution, solution?.grid)

            // // initialGrid
            // const initial = new Sudoku().initialGame()
            // // const challengeGrid: GridMatrix = new Sudoku().initialGameGrid()
            // console.log('initial', initial, initial.grid)
            
            // // use spread to copy the cloned Grid, to prevent a object reference
            // gridClone = [...gridClone].map(row => [...row]) as GridMatrix
            // const workingGrid: GridMatrix = gridClone

            // return {
            //     ...state,
            //     challengeGrid,
            //     solvedGrid,
            //     workingGrid
            // }
            return { ...state }
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
