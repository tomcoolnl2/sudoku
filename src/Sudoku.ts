
type SeriesIndex = (e: unknown, i: number) => unknown

export class Sudoku {

    /** The minimal value a Cell can hold. 0 is used to show empty cells and to validate between user input and the hidden solution Grid. */
    public static readonly MIN_VALUE: number = 0
    /** The maximum value a Cell can hold. */
    public static readonly MAX_VALUE: number = 9
    /** The total of a 9x9 Grid. */
    public static readonly MAX_CELLS: number = 81

    /**
     * Create a Series of N length, filled with an Array of Numbers.
     * @param argument Either a Number or a Method, both are ways to provide values for a Series.
     */ 
    public static createSeries<T>(value: number): T
    public static createSeries<T>(fill: SeriesIndex): T
    public static createSeries<T>(argument: number | SeriesIndex): T {
        
        let index: number = 0
        let mapFn: SeriesIndex = () => index

        if (typeof argument === 'number') {
            index = argument
        } else {
            mapFn = argument as SeriesIndex
        }
        
        return Array.from({ length: Sudoku.MAX_VALUE }).map(mapFn) as unknown as T
    }
}
