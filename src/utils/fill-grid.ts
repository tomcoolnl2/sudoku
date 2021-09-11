
import { GridMatrix, SudokuInput, GridMatrixRegion, GridMatrixIndex } from '../typings'
import { shuffle } from './'


const numbers: SudokuInput[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * Create a full valid Sudoku Grid
 */
export function buildGrid(): GridMatrix {
    const grid: GridMatrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    // Optional: then 9 can be a variable input
    // console.log(Array.from({ length: 9 }).map((e, i) => Array.from({ length: 9 }).map(() => 0)))

    fillGrid(grid)

    return grid
}
/**
 * Backtracking recursion 
 * to check all the possible combination of numbers
 * @param grid 
 */
export function fillGrid(grid: GridMatrix) {
    
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
                        const square = identifySquare({ col, grid, row })
                        if (!isInSquare({ square, value })) {
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

export interface WorkingSquareInput {
    grid: GridMatrix
    col: GridMatrixIndex
    row: GridMatrixIndex
}

/**
 * Function that identifies and returns the current square of a given sudoku grid at a row and column index
 * @param input object with a 9x9 sudoku Grid, row index and column index 
 * @returns 
 */
export function identifySquare({ col, grid, row }: WorkingSquareInput): GridMatrixRegion {
    const square = []
    if(row < 3) {
        if (col < 3) {
            for (let x = 0; x < 3; x += 1) {
                square.push([grid[x][0], grid[x][1], grid[x][2]])
            }
        }
        else if (col < 6) {
            for (let x = 0; x < 3; x += 1) {
                square.push([grid[x][3], grid[x][4], grid[x][5]])
            }
        }
        else {
            for (let x = 0; x < 3; x += 1) {
                square.push([grid[x][6], grid[x][7], grid[x][8]])
            }
        }
    }
    else if (row < 6) {
        if (col < 3) {
            for (let x = 3; x < 6; x += 1) {
                square.push([grid[x][0], grid[x][1], grid[x][2]])
            }
        }
        else if (col < 6) {
            for (let x = 3; x < 6; x += 1) {
                square.push([grid[x][3], grid[x][4], grid[x][5]])
            }
        }
        else {
            for (let x = 3; x < 6; x += 1) {
                square.push([grid[x][6], grid[x][7], grid[x][8]])
            }
        }
    }
    else {
        if (col < 3) {
            for (let x = 6; x < 9; x += 1) {
                square.push([grid[x][0], grid[x][1], grid[x][2]])
            }
        }
        else if (col < 6) {
            for (let x = 6; x < 9; x += 1) {
                square.push([grid[x][3], grid[x][4], grid[x][5]])
            }
        }
        else {
            for (let x = 6; x < 9; x += 1) {
                square.push([grid[x][6], grid[x][7], grid[x][8]])
            }
        }
    }
    return square as GridMatrixRegion
}

export interface SquareInput {
    square: GridMatrixRegion
    value: SudokuInput
}

/**
 * Function that returns true if the value is already being used in the current grid square
 * @param input Object with 3x3 Square and value
 * @returns 
 */
export function isInSquare({ square, value }: SquareInput): boolean {
    return square.flat().includes(value)
}

/**
 * A function to check if the gridd is full
 * @param grid A 9x9 Array
 * @returns 
 */
export function checkGrid(grid: GridMatrix): boolean {
    for (let i = 0; i < 9; i += 1) {
        for (let j = 0; j < 9; j += 1) {
            // TODO Array.prototype.some() ?
            if (grid[i][j] === 0) return false
        }
    }
    return true
}