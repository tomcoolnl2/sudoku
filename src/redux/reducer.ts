
import { AnyAction } from 'redux'
import { Sudoku } from '../Sudoku'
import { GridMatrixCoörds } from '../typings'
import { compareArrays } from '../utils'
import { AppState } from './models'
import * as types from './types'
import { mistakesLimits } from '../components/mistakes-limit'


const difficulty = 'EASY' // TODO should be in initialState

const initialState: AppState = {
	initialGameMatrix: null,
	solutionMatrix: null,
	workingMatrix: null,
	mistakesMatrix: null,
	trackedInput: null,
	trackedMistakes: 0,
	selection: [0, 0],
	selectedRegion: [[0, 1, 2], [0, 1, 2]],
	selectedInputValue: null,
	settings: {
		highlightDuplicates: true,
		mistakesLimit: mistakesLimits[difficulty],
		darkModeEnabled: false
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

		const selectedRegion = Sudoku.getSelectedRegion(initialSelection)

		return {
			...initialState,
			solutionMatrix,
			initialGameMatrix,
			workingMatrix,
			mistakesMatrix,
			trackedInput,
			selection: initialSelection,
			selectedRegion
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
					if (trackedMistakes === settings.mistakesLimit) {
						if (window.confirm('Too many mistakes! Reload to start another game!')) {
							window.location.href = '/'
							return {
								...initialState
							}
						}
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
				// dispatch WIN action // we need async action dispatchers for that
				if (window.confirm('You won! Reload to start another game!')) {
					window.location.href = '/'
					return {
						...initialState
					}
				}
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
		const { coords } = action
		const selectedRegion = Sudoku.getSelectedRegion(coords)
		return {
			...state,
			selection: coords,
			selectedRegion
		}
	}

	case types.ERASE_MISTAKE: {
		const { mistakesMatrix } = state
		let { selectedInputValue } = state
		const [ row, col ]: GridMatrixCoörds = action.coords
		mistakesMatrix[row][col] = Sudoku.HIDDEN_CELL_VALUE
		selectedInputValue = initialState.selectedInputValue
		return {
			...state,
			mistakesMatrix: [...mistakesMatrix],
			selectedInputValue
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
