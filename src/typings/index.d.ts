
// All options a Region can contain
// Zero (0) is used to fall back to, so we can apply validation on it
export type N = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

// All possible input numbers to solve a Sudoku
export type SudokuInput = Exclude<N, 0>

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
export type GridMatrixSeries = [N, N, N, N, N, N, N, N, N]

// A square covering 3 GridMatrixSeries, also called a Region
export type GridMatrixRegion = [
    GridMatrixRegionSeries,
    GridMatrixRegionSeries,
    GridMatrixRegionSeries
]

// A single row within a GridMatrixRegion
export type GridMatrixRegionSeries = [N, N, N]