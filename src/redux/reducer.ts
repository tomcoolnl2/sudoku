
import { AnyAction } from 'redux'
import { Sudoku } from '../Sudoku'
import { compareArrays } from '../utils'
import { AppState } from './models'
import * as types from './types'


export function reducer(state: AppState = {}, action: AnyAction): AppState {
    
    switch(action.type) {
    
        case types.UNLEASH_THE_MATRIX: {
            
            const { solutionMatrix, initialGameMatrix, workingMatrix } = new Sudoku()

            console.log('solution', solutionMatrix)
            console.log('initialGame', initialGameMatrix)
            console.log('workingMatrix', workingMatrix)

            return {
                ...state,
                solutionMatrix,
                initialGameMatrix,
                workingMatrix
            }
        }
        case types.FILL_CELL: {

            const { workingMatrix, solutionMatrix } = state
            const { value } = action
            
            if (workingMatrix && solutionMatrix) {
                
                const [ri, ci] = action.coords
                
                if (solutionMatrix[ri][ci] !== value) {
                    console.log('WRONG')
                    return state
                }

                workingMatrix[ri][ci] = value
                
                if (compareArrays(workingMatrix, solutionMatrix)) {
                    console.log('WIN')    
                }

                return {
                    ...state,
                    workingMatrix: [...workingMatrix]
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
