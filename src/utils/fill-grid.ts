
import { GridMatrix, SudokuInput, GridMatrixRegion, GridMatrixIndex } from '../typings'
import { shuffle } from './'


const subset: undefined[] = Array.from({ length: 9 })
/**
 * Create a full valid Sudoku Grid
 */
export function buildGrid(): GridMatrix {

    // set a row of 9 cells for each row with 9 columns
    const grid = subset.map(() => [...subset].map(() => 0)) as GridMatrix

    fillGrid(grid)

    return grid
}
/**
 * Backtracking recursion 
 * to check all the possible combination of numbers
 * @param grid 
 */
export function fillGrid(grid: GridMatrix) {

    const numbers = subset.map((_, i) => i + 1) as SudokuInput[]
    let row: GridMatrixIndex = 0
    let col: GridMatrixIndex = 0
  
    for (let i = 0; i < 81; i += 1) {

        row = (i / 9) << 0 as GridMatrixIndex
        col = i % 9 as GridMatrixIndex
  
        if (grid[row][col] === 0) {
            
            shuffle(numbers)

            for (let value of numbers) {
                if (!isInRow({ grid, row, value })) {
                    if (!isInCol({ col, grid, value })) {
                        const region = identifyRegion({ col, grid, row })
                        if (!isInRegion({ region, value })) {
                            grid[row][col] = value
                            if (checkGrid(grid)) {
                                return true
                            }
                            else if (fillGrid(grid)) {
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

export interface RowInput {
    grid: GridMatrix
    row: GridMatrixIndex
    value: SudokuInput
}

/**
 * Function that returns true if the value is already being used in the current grid row
 * @param input Object with 9x9 Sudoku Grid, Row and Column indexes
 * @returns 
 */
export function isInRow({ grid, row, value }: RowInput): boolean {
    return grid[row].includes(value)
}

export interface ColInput {
    grid: GridMatrix
    col: GridMatrixIndex
    value: SudokuInput
}

/**
 * Function that returns true if the value is already being used in the current grid column
 * @param input Object with 9x9 Sudoku Grid, Row and Column indexes
 * @returns 
 */
export function isInCol({ grid, col, value}: ColInput): boolean {
    for (let i = 0; i < 9; i += 1) {
        if (value === grid[i][col]) return true
    }
    return false
}

export interface RegionIdentifierInput { // SquareInput
    grid: GridMatrix
    col: GridMatrixIndex
    row: GridMatrixIndex
}

/**
 * Function that identifies and returns the current region of a given Sudoku Grid at a row and column index
 * @param input Object with a 9x9 Sudoku Grid, Row and Column index 
 * @returns 
 */
export function identifyRegion({ col, grid, row }: RegionIdentifierInput): GridMatrixRegion {
    const region = []
    if(row < 3) {
        if (col < 3) {
            for (let x = 0; x < 3; x += 1) {
                region.push([grid[x][0], grid[x][1], grid[x][2]])
            }
        }
        else if (col < 6) {
            for (let x = 0; x < 3; x += 1) {
                region.push([grid[x][3], grid[x][4], grid[x][5]])
            }
        }
        else {
            for (let x = 0; x < 3; x += 1) {
                region.push([grid[x][6], grid[x][7], grid[x][8]])
            }
        }
    }
    else if (row < 6) {
        if (col < 3) {
            for (let x = 3; x < 6; x += 1) {
                region.push([grid[x][0], grid[x][1], grid[x][2]])
            }
        }
        else if (col < 6) {
            for (let x = 3; x < 6; x += 1) {
                region.push([grid[x][3], grid[x][4], grid[x][5]])
            }
        }
        else {
            for (let x = 3; x < 6; x += 1) {
                region.push([grid[x][6], grid[x][7], grid[x][8]])
            }
        }
    }
    else {
        if (col < 3) {
            for (let x = 6; x < 9; x += 1) {
                region.push([grid[x][0], grid[x][1], grid[x][2]])
            }
        }
        else if (col < 6) {
            for (let x = 6; x < 9; x += 1) {
                region.push([grid[x][3], grid[x][4], grid[x][5]])
            }
        }
        else {
            for (let x = 6; x < 9; x += 1) {
                region.push([grid[x][6], grid[x][7], grid[x][8]])
            }
        }
    }
    return region as GridMatrixRegion
}

export interface RegionInput {
    region: GridMatrixRegion
    value: SudokuInput
}

/**
 * Function that returns true if the value is already being used in the current grid square
 * @param input Object with 3x3 Square and value
 * @returns 
 */
export function isInRegion({ region, value }: RegionInput): boolean {
    return region.flat().includes(value)
}

/**
 * A function to check if the grid is full
 * @param grid A 9x9 Array
 * @returns 
 */
export function checkGrid(grid: GridMatrix): boolean {

    for (let i = 0; i < 9; i += 1) {
        for (let j = 0; j < 9; j += 1) {
            if (grid[i][j] === 0) {
                return false
            }
        }
    }

    return true
}