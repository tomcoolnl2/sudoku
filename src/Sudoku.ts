
import global from './global'

import { GridMatrix, GridMatrixIndex, GridMatrixRegion, N, SudokuInput } from './typings'
import { 
    IdentifyRegionSettings,
    RegionSettings,
    RowSettings,
    ColumnSettings,
    SeriesIndex
} from './typings/Sudoku'
import { shuffle } from './utils'

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
        return Sudoku.createSeries(() => Sudoku.createSeries(Sudoku.HIDDEN_CELL_VALUE))
    }

    public static buildGrid(): GridMatrix {
        const grid: GridMatrix = Sudoku.createGridMatrix()
        Sudoku.fillGrid(grid)
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
    
    /**
     * Identify and return the current Region of a given Sudoku Grid at a row and column index
     * @param input Object with a 9x9 Sudoku Grid, Row and Column index 
     * @returns 
     */
    public static identifyRegionsForRow({ grid, row, col }: IdentifyRegionSettings): GridMatrixRegion {
        
        const region = []
    
        if (row < 3) {
            // const
            if (col < 3)      for (let x = 0; x < 3; x += 1) region.push([grid[x][0], grid[x][1], grid[x][2]])
            else if (col < 6) for (let x = 0; x < 3; x += 1) region.push([grid[x][3], grid[x][4], grid[x][5]])
            else              for (let x = 0; x < 3; x += 1) region.push([grid[x][6], grid[x][7], grid[x][8]])
        }
        else if (row < 6) {
            if (col < 3)      for (let x = 3; x < 6; x += 1) region.push([grid[x][0], grid[x][1], grid[x][2]])
            else if (col < 6) for (let x = 3; x < 6; x += 1) region.push([grid[x][3], grid[x][4], grid[x][5]])
            else              for (let x = 3; x < 6; x += 1) region.push([grid[x][6], grid[x][7], grid[x][8]])
        }
        else {
            if (col < 3)      for (let x = 6; x < 9; x += 1) region.push([grid[x][0], grid[x][1], grid[x][2]])
            else if (col < 6) for (let x = 6; x < 9; x += 1) region.push([grid[x][3], grid[x][4], grid[x][5]])
            else              for (let x = 6; x < 9; x += 1) region.push([grid[x][6], grid[x][7], grid[x][8]])
        }
        
        return region as GridMatrixRegion
    }
    
    /**
     * Returns true if the value is already being used in the current grid Region
     * @param input Object with 3x3 Region and value
     * @returns 
     */
    public static valueExistsInRegion({ region, value }: RegionSettings): boolean {
        return region.flat().includes(value)
    }
    
    /**
     * Returns true if the value is already being used in the current grid row
     * @param input Object with 9x9 Sudoku Grid, Row and Column indexes
     * @returns 
     */
    public static valueExistsInRow({ grid, row, value }: RowSettings): boolean {
        return grid[row].includes(value)
    }

    /**
     * Returns true if the value is already being used in the current grid column
     * @param input Object with 9x9 Sudoku Grid, Row and Column indexes
     * @returns 
     */
    public static valueExistsInColumn({ grid, col, value}: ColumnSettings): boolean {
        for (let i = 0; i < Sudoku.SIZE; i += 1) {
            if (value === grid[i][col]) return true
        }
        return false
    }
    /**
     * Validate if the grid is full and does not contain any zeroes (0)
     * @param grid A 9x9 Array
     * @returns 
     */
    public static isValid(grid: GridMatrix): boolean {
        return !grid.flat().includes(Sudoku.HIDDEN_CELL_VALUE)
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
     * @param grid The filled in grid
     * @param attempts Number of attepts to solve (higher means more difficult) - default 5
     * @returns GridMatrix
     */
    public static emptyCells(grid: GridMatrix, attempts: number = 5): GridMatrix {
        
        while (attempts > 0) {
            let row = Sudoku.getRandomIndex()
            let col = Sudoku.getRandomIndex()
    
            if (grid[row][col] === 0) {
                row = Sudoku.getRandomIndex()
                col = Sudoku.getRandomIndex()
            }
    
            const backup = grid[row][col]
            grid[row][col] = 0
    
            const gridCopy = [...grid].map(row => [...row]) as GridMatrix
            global.counter = 0
            Sudoku.solveGrid(gridCopy)
    
            if (global.counter !== 1) {
                grid[row][col] = backup
                attempts--
            }
        }
    
        return grid
    }

    /**
     * Backtracking recursion 
     * to check all the possible combination of numbers
     * @param grid 
     */
    public static fillGrid(grid: GridMatrix): true | void  {

        const numbers = Sudoku.createSeries<SudokuInput[], number>((_, i) => i + 1)
        let row: GridMatrixIndex = 0
        let col: GridMatrixIndex = 0
    
        for (let i = 0; i < Sudoku.CELLS; i += 1) {

            row = (i / Sudoku.SIZE) << 0 as GridMatrixIndex
            col = i % Sudoku.SIZE as GridMatrixIndex
    
            if (grid[row][col] === 0) {
                
                shuffle(numbers)

                for (let value of numbers) {
                    if (!Sudoku.valueExistsInRow({ grid, row, value })) {
                        if (!Sudoku.valueExistsInColumn({ grid, col, value })) {
                            const region = Sudoku.identifyRegionsForRow({ grid, row, col })
                            if (!Sudoku.valueExistsInRegion({ region, value })) {
                                grid[row][col] = value
                                if (Sudoku.isValid(grid)) {
                                    return true
                                }
                                else if (Sudoku.fillGrid(grid)) {
                                    return true
                                }
                            }
                        }
                    }
                }

                break
            }
        }
    
        grid[row][col] = 0
    }

    /**
     * Function to check all possible combinations of numbers until a solution is found
     * @param grid 9x9 array of values form 0-9
     */
    public static solveGrid(grid: GridMatrix): true | undefined {
        
        let row: GridMatrixIndex = 0
        let col: GridMatrixIndex = 0
        const numbers = Sudoku.createSeries<SudokuInput[], number>((_, i) => i + 1)
        
        for (let i = 0; i < Sudoku.CELLS; i += 1) {
        
            row = (i / Sudoku.SIZE) << 0 as GridMatrixIndex
            col = i % Sudoku.SIZE as GridMatrixIndex

            if (grid[row][col] === Sudoku.HIDDEN_CELL_VALUE) {
                for (let value of numbers) {
                    if (!Sudoku.valueExistsInRow({ grid, row, value })) {
                        if (!Sudoku.valueExistsInColumn({ grid, col, value })) {
                            const region = Sudoku.identifyRegionsForRow({ grid, row, col })
                            if (!Sudoku.valueExistsInRegion({ region, value })) {
                                grid[row][col] = value
                                if (Sudoku.isValid(grid)) {
                                    global.counter++
                                    break
                                }
                                else if (Sudoku.solveGrid(grid)) {
                                    return true
                                }
                            }
                        }
                    }
                }
                break
            }
        }
        grid[row][col] = 0
    }

}