
import { compareObjects } from '.'

describe('compareObjects', () => {

	it('returns false if two objects are not the same', () => {
		
		const obj1 = { row: 3, col: 0, value: 7 }
		const obj2 = { row: 0, col: 0, value: 7 }

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeFalsy()
	})

	it('returns true if two objects are the same', () => {
		
		const obj1 = { row: 3, col: 0, value: 7 }
		const obj2 = { row: 3, col: 0, value: 7 }

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeTruthy()
	})

	it('returns false if the first argument is null', () => {
		
		const obj1: null = null
		const obj2 = { row: 3, col: 0, value: 7 }

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeFalsy()
	})

	it('returns false if the second argument is not an object literal', () => {
		
		const obj1 = { row: 3, col: 0, value: 7 }
		const obj2 = 'test'

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeFalsy()
	})

	it('returns false if the objects are different', () => {
		
		const obj1 = { row: 3, col: 0, value: 7 }
		const obj2 = { value: 7 }

		const comparedObjects = compareObjects(obj1, obj2)
		expect(comparedObjects).toBeFalsy()
	})
})