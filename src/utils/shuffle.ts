
/**
 * An array shuffling function
 * using the Fisher-Yates shuffeling algorithm
 * @param range The range to shuffle
 * @returns The shuffeled range
 */
 export function shuffle(range: number[]): number[] {
		
	let currentIndex: number = range.length
	let randomIndex: number
	
	// While there remain elements to shuffle...
	while (currentIndex !== 0) {

		// Pick a remaining element...
		randomIndex = (Math.random() * currentIndex) << 0
		currentIndex--

		// And swap it with the current element.
		[range[currentIndex], range[randomIndex]] = [range[randomIndex], range[currentIndex]]
	}

	return range
}
