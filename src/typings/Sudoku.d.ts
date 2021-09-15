
import { GridMatrix, GridMatrixIndex, SudokuInput } from './'


export type SeriesIndex<R> = (e: unknown, i: number) => R | R[]

export interface IdentifyRegionSettings {
    grid: GridMatrix
    col: GridMatrixIndex
    row: GridMatrixIndex
}

export interface RegionSettings {
    region: GridMatrixRegion
    value: SudokuInput
}

export interface RowSettings {
    grid: GridMatrix
    row: GridMatrixIndex
    value: SudokuInput
}

export interface ColumnSettings {
    grid: GridMatrix
    col: GridMatrixIndex
    value: SudokuInput
}