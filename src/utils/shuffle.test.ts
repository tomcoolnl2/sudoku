
import { shuffle } from './'

describe('shuffle', () => {
	
	it('returns an array with the same length after being shuffled', () => {
		const range = [1, 2, 3]
		const shuffledRange = shuffle(range)
		expect(shuffledRange).toHaveLength(3)
	})

	it('returns an array with the same elements after being shuffled', () => {
		const range = [1, 2, 3]
		const shuffledRange = shuffle(range)
		expect(shuffledRange).toContain(1)
		expect(shuffledRange).toContain(2)
		expect(shuffledRange).toContain(3)
	})
})