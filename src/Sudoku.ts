import { GridMatrix, GridMatrixIndex, GridMatrixRegionSeries, N, SudokuInputValue } from './typings'
import { shuffle } from './utils'
import { RegionSettings, RowSettings, ColumnSettings, SeriesIndex } from './typings/Sudoku'

export class Sudoku {
	
	/** The number a cell has when it's value is hidden: 0 */
	public static readonly HIDDEN_CELL_VALUE: N = 0    
	/** The maximum value a Cell can hold: 9 */
	public static readonly SIZE: N = 9
	/** The total of a 9x9 Grid: 81 */
	public static readonly CELLS: number = Sudoku.SIZE * Sudoku.SIZE

	/** The solution */
	private solutionGrid: GridMatrix = null
	/** The start of the game */
	private initialGrid: GridMatrix = null
	/** The board a user will use */
	private workingGrid: GridMatrix = null
	/** Counter to validate backtracking */
	private backTrackAttempt: number = 0

	constructor() {
		//always start with a 9x9 grid, filled with 0 as cell values
		this.solutionGrid = Sudoku.generateMatrix()
		this.createSolution()
		// poke some holes in the solution; so we have an actual game
		this.setInitialGame()
		// colone the initial game so we have something a user can play with
		this.workingGrid = Sudoku.cloneGrid(this.initialGrid)
	}

	/**
	 * Public accessor for the solution
	 */
	public get solutionMatrix(): GridMatrix {
		return this.solutionGrid
	}

	/**
	 * Public accessor for the initial game matrix
	 */
	public get initialGameMatrix(): GridMatrix {
		return this.initialGrid
	}

	/**
	 * Public accessor for the UI grid
	 */
	public get workingMatrix(): GridMatrix {
		return this.workingGrid
	}

	/**
	 * Create a empty 9x9 Grid, filled with zeros (0)
	 * @returns a 9x9 GridMatrix
	 */
	public static generateMatrix(): GridMatrix {
		return Sudoku.createSeries(() => Sudoku.createSeries(Sudoku.HIDDEN_CELL_VALUE))
	}

	/**
	 * Random get a number between 0 and 8
	 * @returns A random number between 0 and 8
	 */
	public static getRandomIndex(): number {
		return (Math.random() * Sudoku.SIZE) << 0
	}

	/**
	 * Clones a 2D matrix without any references
	 * @param grid GridMatrix
	 * @returns GridMatrix
	 */
	public static cloneGrid(grid: GridMatrix): GridMatrix {
		return [...grid].map(row => [...row]) as GridMatrix
	}

	/**
	 * Create a Series of N length, filled with an Array of Numbers.
	 * @param argument Either a Number or a Method, both are ways to provide values for a Series.
	 */ 
	public static createSeries<T>(index: number): T
	public static createSeries<T, R = unknown>(mapFn: SeriesIndex<R>): T
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
	private valueExistsInRegion({ grid, row, col, value }: RegionSettings): boolean {
		
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
	 * Combine valueExistsInRegion, valueExistsInRow and valueExistsInColumn to return a boolean
	 * @param param RegionSettings
	 * @returns boolean Weather it is safe to place this value into the current cell
	 */
	private valueIsSafeToPlace({ grid, row, col, value }: RegionSettings): boolean {
		return !this.valueExistsInRegion({ grid, row, col, value })
			&& !this.valueExistsInRow({ grid, row, value })
			&& !this.valueExistsInColumn({ grid, col, value })
	}
	
	/**
	 * Validate if the given grid does not contain any zeroes (0)
	 * @param grid The grid to validate
	 * @returns boolean
	 */
	public gameIsSet(grid: GridMatrix): boolean {
		return !grid.flat().includes(Sudoku.HIDDEN_CELL_VALUE)
	}

	/**
	 * Backtracking recursion to check all the possible combination of numbers
	 * @param grid 
	 * @returns true if the solution is valid, else it will return undefined
	 */
	private createSolution(grid: GridMatrix = this.solutionGrid): boolean | void {

		const series = Sudoku.createSeries<SudokuInputValue[], number>((_, i) => i + 1) // Create [1, 2, 3, 4, 5, 6, 7, 8, 9] to check against
		let row: GridMatrixIndex = 0 // we start at [0][0] of the grid
		let col: GridMatrixIndex = 0

		for (let i = 0; i < Sudoku.CELLS; i += 1) { // label this loop so we can reference to it from inside inner loops 
			
			row = (i / Sudoku.SIZE) << 0 as GridMatrixIndex // we gracefully increase row every 9th iteration
			col = i % Sudoku.SIZE as GridMatrixIndex // this will count from 0-8 (9%9 = 0), and then start over again

			if (grid[row][col] === Sudoku.HIDDEN_CELL_VALUE) {
				// The range of values 1 to 9 is shuffled at the start of each iteration, 
				// ensuring the that probability of each new game being similar is low.
				// Validate every possible (but shuffled) number
				for (const value of shuffle(series) as SudokuInputValue[]) {
					// if value does not already exists in region, row or col
					if (this.valueIsSafeToPlace({ grid, row, col, value })) {
						grid[row][col] = value
						if (this.gameIsSet(grid)) {
							return true
						} else if (this.createSolution(grid)) {
							return true
						}
					}
				}
				break
			}
		}
		grid[row][col] = 0
	}

	/**
	 * Validte if a give grid hold s the solution
	 * @param grid GridMatrix
	 * @returns boolean 
	 */
	private testSolution(grid: GridMatrix): boolean {

		let row: GridMatrixIndex = 0 // we start at [0][0] of the grid
		let col: GridMatrixIndex = 0
		const series = Sudoku.createSeries<SudokuInputValue[], number>((_, i) => i + 1)
		
		for (let i = 0; i < Sudoku.CELLS; i += 1) {
		
			row = (i / Sudoku.SIZE) << 0 as GridMatrixIndex
			col = i % Sudoku.SIZE as GridMatrixIndex
	
			if (grid[row][col] === Sudoku.HIDDEN_CELL_VALUE) {
				for (const value of series) {
					if (this.valueIsSafeToPlace({ grid, row, col, value })) {
						grid[row][col] = value
						if (this.gameIsSet(grid)) {
							this.backTrackAttempt++
							break
						}
						else if (this.testSolution(grid)) {
							return true
						}
					}
				}
				break
			}
		}
		grid[row][col] = 0
	}

	/**
	 * Removes numbers from a full grid to set an actual Sudoku Challenge
	 * @param difficulty Number of attepts to solve (higher means more difficult) - default 5
	 * @returns GridMatrix
	 */
	private setInitialGame(difficulty = 5) {
		
		const initialGrid: GridMatrix = Sudoku.cloneGrid(this.solutionGrid)
		
		while (difficulty > 0) {
			let row = Sudoku.getRandomIndex()
			let col = Sudoku.getRandomIndex()
	
			if (initialGrid[row][col] === 0) {
				row = Sudoku.getRandomIndex()
				col = Sudoku.getRandomIndex()
			}
	
			const backup = initialGrid[row][col] // store value to optionally restore it
			initialGrid[row][col] = 0 // remove number from the grid

			this.backTrackAttempt = 0
			this.testSolution(initialGrid) // attempt to solve it
			
			if (this.backTrackAttempt !== 1) {
				initialGrid[row][col] = backup // put it back and try again
				difficulty-- // step back and try again (backtrack)
			}
		}

		this.initialGrid = initialGrid
		return this.initialGrid
	}
}