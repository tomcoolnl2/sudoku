
import { AnyAction } from 'redux'
import { Sudoku } from '../Sudoku'
import { GridMatrixCoörds } from '../typings'
import { compareArrays } from '../utils'
import { AppState } from './models'
import * as types from './types'


const initialState: AppState = {
	initialGameMatrix: null,
	solutionMatrix: null,
	workingMatrix: null,
	mistakesMatrix: null,
	trackedInput: null,
	selection: [0, 0],
	settings: {
		highlightDuplicates: true
	}
}

export function reducer(state = initialState, action: AnyAction): AppState {
    
	switch(action.type) {
    
	case types.UNLEASH_THE_MATRIX: {
		
		const {
			solutionMatrix,
			initialGameMatrix,
			workingMatrix,
			mistakesMatrix,
			initialSelection,
			trackedInput
		} = new Sudoku()

		return {
			...state,
			solutionMatrix,
			initialGameMatrix,
			workingMatrix,
			mistakesMatrix,
			trackedInput,
			selection: initialSelection
		}
	}
	case types.FILL_CELL: {

		const { workingMatrix, solutionMatrix, trackedInput, mistakesMatrix } = state
		const { value, coords } = action
						
		if (workingMatrix && solutionMatrix) {
							
			const [row, col]: GridMatrixCoörds = coords
		
			if (solutionMatrix[row][col] !== value) {
				
				if (mistakesMatrix[row][col] !== value) {
					mistakesMatrix[row][col] = value
				}

				return {
					...state,
					mistakesMatrix: [...mistakesMatrix]
				}
			}
			
			mistakesMatrix[row][col] = Sudoku.HIDDEN_CELL_VALUE
			workingMatrix[row][col] = value
			trackedInput[value - 1] += 1
							
			if (compareArrays(workingMatrix, solutionMatrix)) {
				// dispatch WIN action
				console.log('WIN')
			}

			return {
				...state,
				mistakesMatrix: [...mistakesMatrix],
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
	case types.ERASE_ALL_MISTAKES: {
		return {
			...state,
			mistakesMatrix: Sudoku.generateMatrix()
		}
	}
	case types.UPDATE_SETTINGS: {
		const { settings } = action
		return {
			...state,
			settings: {
				...state.settings,
				...settings
			}
		}
	}
	default: {
		return state
	}
	}
}
