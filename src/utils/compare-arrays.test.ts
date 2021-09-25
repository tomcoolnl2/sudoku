
import { GridMatrixRegion } from '../typings'
import { compareArrays } from './'

describe('compareArrays', () => {

	it('returns false if two arrays are not the same', () => {
		
		const grid1: GridMatrixRegion = [
			[3, 0, 7],
			[0, 5, 0],
			[0, 0, 0]
		]

		const grid2: GridMatrixRegion = [
			[2, 2, 2],
			[6, 5, 6],
			[9, 3, 0]
		]

		const comparedArrays = compareArrays(grid1, grid2)
		expect(comparedArrays).toBeFalsy()
	})

	it('returns true if two arrays are the same', () => {
		
		const grid1: GridMatrixRegion = [
			[3, 0, 7],
			[0, 5, 0],
			[0, 0, 0]
		]

		const grid2: GridMatrixRegion = [
			[3, 0, 7],
			[0, 5, 0],
			[0, 0, 0]
		]

		const comparedArrays = compareArrays(grid1, grid2)
		expect(comparedArrays).toBeTruthy()
	})

	it('returns false if the first argument is not an array', () => {
		
		const grid1: GridMatrixRegion = null

		const grid2: GridMatrixRegion = [
			[3, 0, 7],
			[0, 5, 0],
			[0, 0, 0]
		]

		const comparedArrays = compareArrays(grid1, grid2)
		expect(comparedArrays).toBeFalsy()
	})

	it('returns false if the second argument is not an array', () => {
		
		const grid1: GridMatrixRegion = [
			[3, 0, 7],
			[0, 5, 0],
			[0, 0, 0]
		]

		const grid2: GridMatrixRegion = null

		const comparedArrays = compareArrays(grid1, grid2)
		expect(comparedArrays).toBeFalsy()
	})

	it('returns false if the arrays are of different lengths', () => {
		
		const grid1: number[] = [3, 0, 7, 0, 5, 0]
		const grid2: number[] = [7, 0, 5]

		const comparedArrays = compareArrays(grid1, grid2)
		expect(comparedArrays).toBeFalsy()
	})
})