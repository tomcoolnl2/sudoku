
import { AnyAction } from 'redux'
import { Sudoku } from '../Sudoku'
import { GridMatrixCoörds, SudokuMistake } from '../typings'
import { compareArrays, compareObjects } from '../utils'
import { AppState } from './models'
import * as types from './types'


const initialState: AppState = {
	initialGameMatrix: null,
	solutionMatrix: null,
	workingMatrix: null,
	trackedInput: null,
	selection: [0, 0],
	mistakes: []
}

export function reducer(state = initialState, action: AnyAction): AppState {
    
	switch(action.type) {
    
	case types.UNLEASH_THE_MATRIX: {
		
		const {
			solutionMatrix,
			initialGameMatrix,
			workingMatrix,
			initialSelection,
			trackedInput
		} = new Sudoku()

		return {
			...state,
			solutionMatrix,
			initialGameMatrix,
			workingMatrix,
			trackedInput,
			selection: initialSelection
		}
	}
	case types.FILL_CELL: {

		const { workingMatrix, solutionMatrix, trackedInput, mistakes } = state
		const { value, coords } = action
						
		if (workingMatrix && solutionMatrix) {
							
			const [row, col]: GridMatrixCoörds = coords
			
			// TODO split into seperate actions?
			// Or use High Order Reducers
			if (solutionMatrix[row][col] !== value) {
				console.log('WRONG')
				// create mistake object
				const mistake: SudokuMistake = { row, col, value }
				const sameMistakeMade: boolean = mistakes.some((m: SudokuMistake): boolean => compareObjects(m, mistake))
				
				console.log(mistake, mistakes, sameMistakeMade)
				
				if (!sameMistakeMade) {
					mistakes.push(mistake)
					workingMatrix[row][col] = value
				}

				return {
					...state,
					workingMatrix: [...workingMatrix]
				}
			}

			workingMatrix[row][col] = value
			trackedInput[value - 1] += 1
							
			if (compareArrays(workingMatrix, solutionMatrix)) {
				// dispatch WIN action
				console.log('WIN')
			}

			return {
				...state,
				workingMatrix: [...workingMatrix],
				trackedInput: [...trackedInput]
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
