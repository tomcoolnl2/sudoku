
import { SudokuMistake } from '../typings'
import { compareObjects } from '.'

describe('compareObjects', () => {

	it('returns false if two arrays are not the same', () => {
		
		const obj1: SudokuMistake = { row: 3, col: 0, value: 7 }
		const obj2: SudokuMistake = { row: 0, col: 0, value: 7 }

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeFalsy()
	})

	it('returns true if two arrays are the same', () => {
		
		const obj1: SudokuMistake = { row: 3, col: 0, value: 7 }
		const obj2: SudokuMistake = { row: 3, col: 0, value: 7 }

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeTruthy()
	})

	it('returns false if the first argument is null', () => {
		
		const obj1: SudokuMistake = null
		const obj2: SudokuMistake = { row: 3, col: 0, value: 7 }

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeFalsy()
	})

	it('returns false if the second argument is not an array', () => {
		
		const obj1: SudokuMistake = { row: 3, col: 0, value: 7 }
		const obj2: string = 'test'

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeFalsy()
	})

	it('returns false if the objects are different', () => {
		
		const obj1: SudokuMistake = { row: 3, col: 0, value: 7 }
		const obj2: unknown = { value: 7 }

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeFalsy()
	})
})