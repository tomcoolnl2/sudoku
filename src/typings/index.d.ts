
// All options a Region can contain
// Zero (0) is used to fall back to, so we can apply validation on it
export type N = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

// All possible input numbers to solve a Sudoku
export type SudokuInputValue = Exclude<N, 0>

// A zero based index, mainly for use in loops
export type GridMatrixIndex = Exclude<N, 9>

// Zero based indexes where a Region exists within the GridMatix
// [0] GridMatrixSeries, [1] GridMatrixCell
export type GridMatrixCoörds = [GridMatrixIndex, GridMatrixIndex]

// The entire Sudoku Grid
export type GridMatrix = [
    GridMatrixSeries,
    GridMatrixSeries,
    GridMatrixSeries,
    GridMatrixSeries,
    GridMatrixSeries,
    GridMatrixSeries,
    GridMatrixSeries,
    GridMatrixSeries,
    GridMatrixSeries
]

// Sudoku Grid Row, containig N (0 - 9)
export type GridMatrixSeries<T = N> = [T, T, T, T, T, T, T, T, T]

// A square covering 3 GridMatrixSeries, also called a Region
export type GridMatrixRegion = [
    GridMatrixRegionSeries,
    GridMatrixRegionSeries,
    GridMatrixRegionSeries
]

// A single row within a GridMatrixRegion
export type GridMatrixRegionSeries = [N, N, N]

export type GridMatrixRegionSelection = [GridMatrixRegionSeries, GridMatrixRegionSeries]

export type SeriesIndex<R> = (e: unknown, i: number) => R | R[]

export interface RegionSettings {
    grid: GridMatrix
    row: GridMatrixIndex
    col: GridMatrixIndex
    value?: SudokuInputValue
}

export interface RowSettings {
    grid: GridMatrix
    row: GridMatrixIndex
    value: SudokuInputValue
}

export interface ColumnSettings {
    grid: GridMatrix
    col: GridMatrixIndex
    value: SudokuInputValue
}