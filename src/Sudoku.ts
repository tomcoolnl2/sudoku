
import { GridMatrix, N } from './typings'
import { fillGrid } from './utils'


type SeriesIndex<R> = (e: unknown, i: number) => R | R[]

export class Sudoku {

    /** The number a cell has when it's value is hidden. */
    public static readonly HIDDEN_CELL_VALUE: N = 0    
    /** The maximum value a Cell can hold. */
    public static readonly SIZE: N = 9
    /** The total of a 9x9 Grid. */
    public static readonly CELLS: number = Sudoku.SIZE * Sudoku.SIZE

    /**
     * Create a empty 9x9 Grid
     * @returns a 9x9 GridMatrix
     */
    public static createGridMatrix(): GridMatrix {
        return Sudoku.createSeries(() => {
            return Sudoku.createSeries(Sudoku.HIDDEN_CELL_VALUE)
        })
    }

    public static buildGrid(): GridMatrix {

        const grid: GridMatrix = Sudoku.createGridMatrix()
        fillGrid(grid)
    
        return grid
    }
    /**
     * Create a Series of N length, filled with an Array of Numbers.
     * @param argument Either a Number or a Method, both are ways to provide values for a Series.
     */ 
    public static createSeries<T>(value: number): T
    public static createSeries<T, R = unknown>(fill: SeriesIndex<R>): T
    public static createSeries<T, R = unknown>(argument: number | SeriesIndex<R>): T {
        
        let index: number = Sudoku.HIDDEN_CELL_VALUE
        let mapFn: SeriesIndex<unknown> = () => index

        if (typeof argument === 'number') {
            index = argument
        } else {
            mapFn = argument
        }
        
        return Array.from({ length: Sudoku.SIZE }).map(mapFn) as unknown as T
    }
}
