
import { GridMatrix, GridMatrixIndex, SudokuInputValue } from './'


export type SeriesIndex<R> = (e: unknown, i: number) => R | R[]

export interface RegionSettings {
    grid: GridMatrix
    row: GridMatrixIndex
    col: GridMatrixIndex
    value: SudokuInputValue
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