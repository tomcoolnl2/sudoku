
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
	trackedMistakes: 0,
	selection: [0, 0],
	selectedInputValue: null,
	settings: {
		highlightDuplicates: true,
		allowedMistakes: 3
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

		const { workingMatrix, solutionMatrix, trackedInput, mistakesMatrix, settings } = state
		let { selectedInputValue, trackedMistakes } = state
		const { value, coords } = action
							
		if (workingMatrix && solutionMatrix) {
								
			const [ row, col ]: GridMatrixCoörds = coords
			
			if (solutionMatrix[row][col] !== value) {
					
				if (mistakesMatrix[row][col] !== value) {
					trackedMistakes += 1
					if (trackedMistakes === settings.allowedMistakes) {
						alert('Game Over Loser') // TODO
					}
					mistakesMatrix[row][col] = value
					selectedInputValue = value
				}

				return {
					...state,
					trackedMistakes,
					mistakesMatrix: [...mistakesMatrix],
					selectedInputValue
				}
			}
				
			mistakesMatrix[row][col] = Sudoku.HIDDEN_CELL_VALUE
			workingMatrix[row][col] = value
			selectedInputValue = value
			trackedInput[value - 1] += 1
								
			if (compareArrays(workingMatrix, solutionMatrix)) {
				// dispatch WIN action
				console.log('WIN')
			}

			return {
				...state,
				mistakesMatrix: [...mistakesMatrix],
				workingMatrix: [...workingMatrix],
				trackedInput: [...trackedInput],
				selectedInputValue
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

	case types.ERASE_MISTAKE: {
		const { mistakesMatrix } = state
		const [ row, col ]: GridMatrixCoörds = action.coords
		mistakesMatrix[row][col] = Sudoku.HIDDEN_CELL_VALUE
		return {
			...state,
			mistakesMatrix: [...mistakesMatrix]
		}
	}

	case types.UPDATE_SETTINGS: {
		return {
			...state, 
			settings: {
				...state.settings,
				...action.settings
			}
		}
	}
		
	default: {
		return state
	}
	}
}
