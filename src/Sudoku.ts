
import global from './global'

import { GridMatrix, GridMatrixIndex, GridMatrixRegionSeries, N, SudokuInput } from './typings'
import { shuffle } from './utils'
import { RegionSettings, RowSettings, ColumnSettings, SeriesIndex } from './typings/Sudoku'

export class Sudoku {
    
    /** The number a cell has when it's value is hidden: 0 */
    public static readonly HIDDEN_CELL_VALUE: N = 0    
    /** The maximum value a Cell can hold: 9 */
    public static readonly SIZE: N = 9
    /** The total of a 9x9 Grid: 81 */
    public static readonly CELLS: number = Sudoku.SIZE * Sudoku.SIZE

    /**  */
    public readonly grid: GridMatrix

    constructor() {
        //always start with a 9x9 grid, filled with 0 as cell values
        this.grid = Sudoku.generateMatrix()
    }

    /**
     * Create a empty 9x9 Grid, filled with zeros (0)
     * @returns a 9x9 GridMatrix
     */
    public static generateMatrix(): GridMatrix {
        return Sudoku.createSeries(() => Sudoku.createSeries(Sudoku.HIDDEN_CELL_VALUE))
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

    /**
     * Returns true if the value is already being used in the current grid Region
     * @param input Object with 3x3 Region and value
     * @returns 
     */
    private valueExistsInRegion({ grid, row, col, value }: RegionSettings) : boolean{
        
        // Define top left corner of the region for empty cell
        const x = row - (row % 3) as GridMatrixIndex
        const y = col - (col % 3) as GridMatrixIndex
        const series: GridMatrixRegionSeries = [0, 1, 2]
        
        // Check the 3x3 region
        for (const ri of series) {
          for (const ci of series) {
            if (grid[x + ri][y + ci] === value) { 
                return true // If number is found, it is not safe to place
            }
          }
        }
        return false
      }
    
    /**
     * Returns true if the value is already being used in the current grid row
     * @param input Object with 9x9 Sudoku Grid, Row and Column indexes
     * @returns 
     */
    private valueExistsInRow({ grid, row, value }: RowSettings): boolean {
        return grid[row].includes(value)
    }

    /**
     * Returns true if the value is already being used in the current grid column
     * @param input Object with 9x9 Sudoku Grid, Row and Column indexes
     * @returns 
     */
    private valueExistsInColumn({ grid, col, value }: ColumnSettings): boolean {
        return grid.some(row => row[col] === value)
    }
    
    /**
     * Validate if the grid is full and does not contain any zeroes (0)
     * @param grid The grid to validate
     * @returns boolean
     */
    private isValid(grid: GridMatrix): boolean {
        return grid.flat().includes(Sudoku.HIDDEN_CELL_VALUE)
    }

    /**
     * Random get a number between 0 and 8
     * @returns A random number between 0 and 8
     */
    public static getRandomIndex(): number {
        return (Math.random() * Sudoku.SIZE) << 0
    }

    /**
     * Removes numbers from a full grid to set an actual Sudoku Challenge
     * @param attempts Number of attepts to solve (higher means more difficult) - default 5
     * @returns GridMatrix
     */
    public initialGame(attempts: number = 5) {
        
        while (attempts > 0) {
            let row = Sudoku.getRandomIndex()
            let col = Sudoku.getRandomIndex()
    
            if (this.grid[row][col] === 0) {
                row = Sudoku.getRandomIndex()
                col = Sudoku.getRandomIndex()
            }
    
            const backup = this.grid[row][col]
            this.grid[row][col] = 0

            global.counter = 0
            // const clone = [...this.grid].map(row => [...row]) as GridMatrix
            
            // this.solveGrid(clone)
    
            if (global.counter !== 1) {
                this.grid[row][col] = backup
                attempts--
            }
            console.log(global.counter)
        }
        return this
    }

    private nextEmptyCell(grid: GridMatrix): [number, number] | false {

        const position: [number, number] = [-1, -1]
        
        // eslint-disable-next-line
        for (let i = 0, row: number[]; row = grid[i]; i += 1) {

            // find first zero-element
            let firstZero = row.find(col => col === Sudoku.HIDDEN_CELL_VALUE)
            
            // if no zero present, skip to next row
            if (firstZero === undefined) {
                break
            }
            
            position[0] = i
            position[1] = row.indexOf(firstZero)
        }
        
        if (~position[1]) {
            return position
        }

        // If emptyCell was never assigned, there are no more zeros
        return false
    }

    /**
     * Backtracking recursion 
     * to check all the possible combination of numbers
     * @param grid 
     * @returns 
     */
    public createSolution(grid = this.grid): Sudoku {

        // const grid = [...this.grid].map(row => [...row]) as GridMatrix

        // Create [1, 2, 3, 4, 5, 6, 7, 8, 9] to check against
        const series = Sudoku.createSeries<SudokuInput[], number>((_, i) => i + 1)
        
        // we start at [0][0] of the grid
        let row: GridMatrixIndex = 0
        let col: GridMatrixIndex = 0

        // label this loop so we can reference to it from inside inner loops 
        allCells: for (let i = 0; i < Sudoku.CELLS; i += 1) {
            // we gracefully increace row every 9th iteration
            row = (i / Sudoku.SIZE) << 0 as GridMatrixIndex
            // this will count from 0-8 (9%9 = 0), and then start over again
            col = i % Sudoku.SIZE as GridMatrixIndex

            if (grid[row][col] === Sudoku.HIDDEN_CELL_VALUE) {
                // The range of values 1 to 9 is shuffled at the start of each iteration, 
                // ensuring the that probability of each new game being similar is low.
                shuffle(series)
                // validate every possible (but shuffled) number
                // eslint-disable-next-line
                for (const value of series) {
                    
                    // if value does not already exists in region, row or col
                    const notInRegion = !this.valueExistsInRegion({ grid, row, col, value })
                    const notInRow = !this.valueExistsInRow({ grid, row, value })
                    const notInColumn = !this.valueExistsInColumn({ grid, col, value })

                    if (notInRegion && notInRow && notInColumn) {
                        // we have a match 
                        grid[row][col] = value
                        // and we can bust out to the outer loop
                        continue allCells
                    }
                }
            }
        }
        
        return this
    }

}