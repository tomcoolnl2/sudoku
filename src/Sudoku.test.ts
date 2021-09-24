
import { Sudoku } from './Sudoku'
import { GridMatrix } from './typings'


describe('generateMatrix: Build a grid with empty values', () => {

    it('creates a 9x9 grid with value = 0', () => {

        const grid: GridMatrix = Sudoku.generateMatrix()

        expect(grid).toHaveLength(9)
        
        for (let row in grid) {
            expect(grid[row]).toHaveLength(9)
            for (let col in grid[row]) {
                expect(grid[row][col]).toBe(0)
            }
        }
    })
})

describe('getRandomIndex: generate a random int, bound to 0-8', () => {

    it('generates a random int between 0 and 8', () => {

        const randomNumber: number = Sudoku.getRandomIndex()

        expect(randomNumber).toBeGreaterThanOrEqual(0)
        expect(randomNumber).toBeLessThanOrEqual(8)
    })
})

describe('cloneGrid: clone a given grid, losing all references to it', () => {

    it('generates a clone from a grid', () => {

        const grid: GridMatrix = [
            [3, 0, 7, 8, 6, 4, 0, 0, 5],
            [0, 5, 0, 0, 0, 0, 0, 8, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 4, 8, 5, 0, 6, 0, 0, 0],
            [0, 0, 9, 0, 3, 2, 7, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 5, 1],
            [7, 0, 5, 0, 8, 1, 3, 0, 0],
            [0, 3, 1, 4, 9, 0, 0, 6, 0],
            [0, 0, 4, 3, 0, 0, 8, 0, 0]
        ]

        const clone: GridMatrix = Sudoku.cloneGrid(grid)

        expect(clone).toStrictEqual([
            [3, 0, 7, 8, 6, 4, 0, 0, 5],
            [0, 5, 0, 0, 0, 0, 0, 8, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 4, 8, 5, 0, 6, 0, 0, 0],
            [0, 0, 9, 0, 3, 2, 7, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 5, 1],
            [7, 0, 5, 0, 8, 1, 3, 0, 0],
            [0, 3, 1, 4, 9, 0, 0, 6, 0],
            [0, 0, 4, 3, 0, 0, 8, 0, 0]
        ])
    })
})


describe('Sudoku.gameIsSet', () => {
    
    let sudoku: Sudoku = null

    beforeEach(() => {
        sudoku = new Sudoku()
    })

    it('returns false when grid is not complete; it contains 0\'s', () => {
        const grid1: GridMatrix = [
            [0, 4, 2, 6, 5, 1, 3, 9, 7],
            [5, 3, 7, 2, 8, 9, 6, 4, 1],
            [6, 9, 1, 7, 3, 4, 5, 2, 8],
            [1, 6, 3, 8, 4, 5, 9, 7, 2],
            [7, 5, 8, 1, 9, 2, 4, 6, 3],
            [9, 2, 4, 3, 7, 6, 1, 8, 5],
            [4, 7, 6, 5, 1, 8, 2, 3, 9],
            [2, 8, 5, 9, 6, 3, 7, 9, 4],
            [3, 1, 9, 3, 2, 7, 8, 5, 6]
        ]
        
        expect(sudoku.gameIsSet(grid1)).toBeFalsy()

        const grid2: GridMatrix = [
            [8, 4, 2, 6, 5, 1, 3, 9, 7],
            [5, 3, 7, 2, 8, 9, 6, 4, 1],
            [6, 9, 1, 7, 3, 4, 5, 2, 8],
            [1, 6, 3, 8, 4, 5, 9, 7, 2],
            [7, 5, 8, 1, 0, 2, 4, 6, 3],
            [9, 2, 4, 3, 7, 6, 1, 8, 5],
            [4, 7, 6, 5, 1, 8, 2, 3, 9],
            [2, 8, 5, 9, 6, 3, 7, 9, 4],
            [3, 1, 9, 3, 2, 7, 8, 5, 6]
        ]
        
        expect(sudoku.gameIsSet(grid2)).toBeFalsy()
    })

    it('returns true when grid is complete', () => {
        const grid: GridMatrix = [
            [8, 4, 2, 6, 5, 1, 3, 9, 7],
            [5, 3, 7, 2, 8, 9, 6, 4, 1],
            [6, 9, 1, 7, 3, 4, 5, 2, 8],
            [1, 6, 3, 8, 4, 5, 9, 7, 2],
            [7, 5, 8, 1, 9, 2, 4, 6, 3],
            [9, 2, 4, 3, 7, 6, 1, 8, 5],
            [4, 7, 6, 5, 1, 8, 2, 3, 9],
            [2, 8, 5, 9, 6, 3, 7, 9, 4],
            [3, 1, 9, 3, 2, 7, 8, 5, 6]
        ]
        
        expect(sudoku.gameIsSet(grid)).toBeTruthy()
    })
})

describe('Build a grid from the Sudoku class', () => {
    
    let sudoku: Sudoku = null

    beforeEach(() => {
        sudoku = new Sudoku()
    })

    it('creates a 9x9 grid with value rage', () => {

        const grid: GridMatrix = sudoku.solutionMatrix

        expect(grid).toHaveLength(9)
        
        for (let row in grid) {
            expect(grid[row]).toHaveLength(9)
            for (let col in grid[row]) {
                expect(grid[row][col]).toBeGreaterThanOrEqual(1)
                expect(grid[row][col]).toBeLessThanOrEqual(9)
            }
        }
    })
})