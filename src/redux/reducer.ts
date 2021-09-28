
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
	trackedInput: null,
	selection: [0, 0]
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

		console.log({
			...state,
			solutionMatrix,
			initialGameMatrix,
			workingMatrix,
			selection: initialSelection,
			trackedInput
		})

		return {
			...state,
			solutionMatrix,
			initialGameMatrix,
			workingMatrix,
			selection: initialSelection,
			trackedInput
		}
	}
	case types.FILL_CELL: {

		const { workingMatrix, solutionMatrix, trackedInput } = state
		const { value, coords } = action
						
		if (workingMatrix && solutionMatrix) {
							
			const [ri, ci]: GridMatrixCoörds = coords
							
			if (solutionMatrix[ri][ci] !== value) {
				console.log('WRONG')
				return state
			}

			workingMatrix[ri][ci] = value
			trackedInput[value - 1] += 1
							
			if (compareArrays(workingMatrix, solutionMatrix)) {
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
