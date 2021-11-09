import { 
	RegionSettings,
	RowSettings,
	ColumnSettings,
	SeriesIndex,
	GridMatrix,
	GridMatrixCoörds,
	GridMatrixIndex,
	GridMatrixRegionSeries,
	GridMatrixSeries,
	N,
	SudokuInputValue,
	GridMatrixRegionSelection
} from './typings'
import { shuffle } from './utils'


export class Sudoku {
	
	/** The number a cell has when it's value is hidden: 0 */
	public static readonly HIDDEN_CELL_VALUE: N = 0    
	/** The maximum value a Cell can hold: 9 */
	public static readonly SIZE: N = 9
	/** The total of a 9x9 Grid: 81 */
	public static readonly CELLS: number = Sudoku.SIZE ** 2

	/** The solution */
	private solutionGrid: GridMatrix = null
	/** The start of the game */
	private initialGrid: GridMatrix = null
	/** The board a user will use */
	private workingGrid: GridMatrix = null
	/** The board to track mistakes */
	private mistakesGrid: GridMatrix = null
	/** Counter to validate backtracking */
	private trackedUserInput: GridMatrixSeries<SudokuInputValue> = null
	/** Counter to validate backtracking */
	private backTrackAttempt: number = 0

	constructor() {
		//always start with a 9x9 grid, filled with 0 as cell values
		this.solutionGrid = Sudoku.generateMatrix()
		this.createSolution()
		// poke some holes in the solution; so we have an actual game
		this.setInitialGame()
		// clone the initial game so we have something a user can play with
		this.workingGrid = Sudoku.cloneGrid(this.initialGrid)
		// separate grid to track mistakes
		this.mistakesGrid = Sudoku.generateMatrix()
		// keep track of inputted values, including clues
		this.trackedUserInput = Sudoku.createSeries(Sudoku.HIDDEN_CELL_VALUE)
		// assemble clues to keep track of inputted values
		this.trackedClues()
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
	 * Public accessor for the mistakes grid
	 */
	public get mistakesMatrix(): GridMatrix {
		return this.mistakesGrid
	}

	/**
	 * Public accessor to retrieve Clues and User Input values
	 */
	public get trackedInput(): GridMatrixSeries<SudokuInputValue> {
		return this.trackedUserInput
	}

	/**
	 * Public accessor to find the first cell to select when initialising a new game
	 */
	public get initialSelection(): GridMatrixCoörds {
		for (let i = 0; i < Sudoku.CELLS; i += 1) {
			const row = (i / Sudoku.SIZE) << 0 as GridMatrixIndex
			const col = i % Sudoku.SIZE as GridMatrixIndex
			if (this.initialGrid[row][col] === Sudoku.HIDDEN_CELL_VALUE) {
				return [row, col]
			}
		}
		return [0, 0]
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
	 * Get the region the current selected cell is in
	 * @param [row, col] the x, y coordinates of the current selection
	 * @returns An arry of rows for the current region the selection is in, same for cols.
	 */
	public static getSelectedRegion([row, col]: GridMatrixCoörds): GridMatrixRegionSelection {
		
		// Define top left corner of the region for empty cell
		const x: number = row - (row % 3)
		const y: number = col - (col % 3)
		const series: GridMatrixRegionSeries = [0, 1, 2]
		
		const rows: number[] = []
		const cols: number[] = []

		// Get the region rows by it's indexes
		for (const ri of series) {
			rows.push((x + ri))
		}
		
		// Get the region colums by it's indexes
		for (const ci of series) {
			cols.push((y + ci))
		}

		return [ rows, cols ] as GridMatrixRegionSelection
	}

	/**
	 * Returns true if the value is already being used in the current grid Region
	 * @param input Object with 3x3 Region and value
	 * @returns 
	 */
	private valueExistsInRegion({ grid, row, col, value }: RegionSettings): boolean {
		
		// Define top left corner of the region for empty cell
		const x: number = row - (row % 3)
		const y: number = col - (col % 3)
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
	 * @returns true if the solution is valid
	 */
	private createSolution(grid: GridMatrix = this.solutionGrid): boolean {

		const series = Sudoku.createSeries<SudokuInputValue[], number>((_, i) => i + 1) // Create [1, 2, 3, 4, 5, 6, 7, 8, 9] to check against
		let row: GridMatrixIndex = 0 // we start at [0][0] of the grid
		let col: GridMatrixIndex = 0

		for (let i = 0; i < Sudoku.CELLS; i += 1) { // label this loop so we can reference to it from inside inner loops 
			
			row = (i / Sudoku.SIZE) << 0 as GridMatrixIndex // we gracefully increase row every 9th iteration
			col = i % Sudoku.SIZE as GridMatrixIndex // this will count from 0-8 (9 % 9 = 0), and then start over again

			if (grid[row][col] === Sudoku.HIDDEN_CELL_VALUE) {
				// The range of values 1 to 9 is shuffled at the start of each iteration, 
				// ensuring the that probability of each new game being similar is low.
				// Validate every possible (but shuffled) number
				for (const value of shuffle(series) as SudokuInputValue[]) {
					// if value does not already exists in region, row or col
					if (this.valueIsSafeToPlace({ grid, row, col, value })) {
						grid[row][col] = value
						if (this.gameIsSet(grid) || this.createSolution(grid)) {
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
	 * Validte if a given grid holds the solution
	 * @param grid GridMatrix
	 * @returns boolean 
	 */
	private testSolution(grid: GridMatrix): boolean {

		let row: GridMatrixIndex = 0 // we start at [0][0] of the grid
		let col: GridMatrixIndex = 0
		const series = Sudoku.createSeries<SudokuInputValue[], number>((_, i) => i + 1)
		
		for (let i = 0; i < Sudoku.CELLS; i += 1) {
		
			row = (i / Sudoku.SIZE) << 0 as GridMatrixIndex
			col = (i % Sudoku.SIZE) as GridMatrixIndex
	
			if (grid[row][col] === Sudoku.HIDDEN_CELL_VALUE) {
				for (const value of series) {
					if (this.valueIsSafeToPlace({ grid, row, col, value })) {
						grid[row][col] = value
						if (this.gameIsSet(grid)) {
							this.backTrackAttempt += 1
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
	 * @param difficulty Number of attepts to solve (higher means more difficult)
	 * @returns GridMatrix
	 */
	private setInitialGame(difficulty = 3) {
		
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
				difficulty -= 1 // step back and try again (backtrack)
			}
		}

		this.initialGrid = initialGrid
		return this.initialGrid
	}

	/**
	 * Count the number of individual clues
	 */
	private trackedClues(): void {
		const grid = Sudoku.cloneGrid(this.workingGrid)
		grid.flat().forEach((value: N) => {
			if (value !== Sudoku.HIDDEN_CELL_VALUE) {
				this.trackedUserInput[value - 1] += 1
			}
		})
	}
}