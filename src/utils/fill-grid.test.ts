
import { Sudoku } from '../Sudoku'
import { GridMatrix, GridMatrixRegion } from '../typings'
import { 
    isInRow, 
    isInCol,
    identifyRegion,
    isInRegion,
    checkGrid,
    fillGrid,
    RowInput, 
    ColInput, 
    RegionIdentifierInput,
    RegionInput
} from './fill-grid'

describe('isInCol', () => {
    
    it('returns true when value is in grid column', () => {
        
        let input: ColInput
        
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

        input = { grid, col: 0, value: 9 }
        expect(isInCol(input)).toBeTruthy()

        input = { grid, col: 5, value: 9 }
        expect(isInCol(input)).toBeTruthy()

        input = { grid, col: 8, value: 9 }
        expect(isInCol(input)).toBeTruthy()
        
    })

    it('returns false when value is not in grid column', () => {
        
        let input: ColInput
        
        const grid: GridMatrix = [
            [8, 4, 2, 6, 5, 1, 3, 9, 7],
            [5, 3, 7, 2, 8, 0, 6, 4, 1],
            [6, 9, 1, 7, 3, 4, 5, 2, 8],
            [1, 6, 3, 8, 4, 5, 9, 7, 2],
            [7, 5, 8, 1, 9, 2, 4, 6, 3],
            [0, 2, 4, 3, 7, 6, 1, 8, 5],
            [4, 7, 6, 5, 1, 8, 2, 3, 0],
            [2, 8, 5, 9, 6, 3, 7, 9, 4],
            [3, 1, 9, 3, 2, 7, 8, 5, 6]
        ]

        input = { grid, col: 0, value: 9 }
        expect(isInCol(input)).toBeFalsy()

        input = { grid, col: 5, value: 9 }
        expect(isInCol(input)).toBeFalsy()

        input = { grid, col: 8, value: 9 }
        expect(isInCol(input)).toBeFalsy()
    })
})

describe('isInRow', () => {
    
    it('returns true when value is in grid row', () => {
        
        let input: RowInput
        
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

        input = { grid, row: 0, value: 9 }
        expect(isInRow(input)).toBeTruthy()

        input = { grid, row: 5, value: 9 }
        expect(isInRow(input)).toBeTruthy()

        input = { grid, row: 8, value: 9 }
        expect(isInRow(input)).toBeTruthy()
        
    })

    it('returns false when value is not in grid row', () => {
        
        let input: RowInput
        
        const grid: GridMatrix = [
            [8, 4, 2, 6, 5, 1, 3, 0, 7],
            [5, 3, 7, 2, 8, 0, 6, 4, 1],
            [6, 9, 1, 7, 3, 4, 5, 2, 8],
            [1, 6, 3, 8, 4, 5, 9, 7, 2],
            [7, 5, 8, 1, 9, 2, 4, 6, 3],
            [0, 2, 4, 3, 7, 6, 1, 8, 5],
            [4, 7, 6, 5, 1, 8, 2, 3, 9],
            [2, 8, 5, 9, 6, 3, 7, 9, 4],
            [3, 1, 0, 3, 2, 7, 8, 5, 6]
        ]

        input = { grid, row: 0, value: 9 }
        expect(isInRow(input)).toBeFalsy()

        input = { grid, row: 5, value: 9 }
        expect(isInRow(input)).toBeFalsy()

        input = { grid, row: 8, value: 9 }
        expect(isInRow(input)).toBeFalsy()
    })
})

describe('identifySquare', () => {
    
    it('identifies the correct square with a given grid, row index and column index', () => {
        
        let input: RegionIdentifierInput
        
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

        input = { col: 2, grid, row: 2 }
        expect(identifyRegion(input)).toStrictEqual([
            [8, 4, 2],
            [5, 3, 7],
            [6, 9, 1]
        ])

        input = { col: 5, grid, row: 5 }
        expect(identifyRegion(input)).toStrictEqual([
            [8, 4, 5],
            [1, 9, 2],
            [3, 7, 6]
        ])

        input = { col: 8, grid, row: 8 }
        expect(identifyRegion(input)).toStrictEqual([
            [2, 3, 9],
            [7, 9, 4],
            [8, 5, 6]
        ])
    })
})

describe('isInSquare', () => {

    it('returns true when value is in grid square', () => {

        let input: RegionInput

        const region: GridMatrixRegion = [
            [1, 3, 4],
            [8, 2, 7],
            [6, 9, 5]
        ]
        
        input = { region, value: 1 }
        expect(isInRegion(input)).toBeTruthy()


        input = { region, value: 9 }
        expect(isInRegion(input)).toBeTruthy()
    })

    it('returns false when value is not in grid square', () => {
        
        let input: RegionInput

        const region: GridMatrixRegion = [
            [0, 3, 4],
            [8, 2, 7],
            [6, 0, 5]
        ]
        
        input = { region, value: 1 }
        expect(isInRegion(input)).toBeFalsy()


        input = { region, value: 9 }
        expect(isInRegion(input)).toBeFalsy()
    })
})


describe('checkGrid', () => {
    
    it('returns false when grid is not complete', () => {
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
        
        expect(checkGrid(grid1)).toBeFalsy()

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
        
        expect(checkGrid(grid2)).toBeFalsy()
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
        
        expect(checkGrid(grid)).toBeTruthy()
    })
})

describe('fillGrid', () => {
    
    it('fills an empty grid to contain a full Sudoku', () => {

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

        fillGrid(grid)

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

describe('Build a grid from the Sudoku class', () => {
    
    it('creates a 9x9 grid with value rage', () => {

        const grid = Sudoku.buildGrid()

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