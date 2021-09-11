 0
export type BLOCK_COORDS = [INDEX, INDEX] // cooler name: Matrix

export type INDEX = Exclude<N, 9> // ranged_index? type ColumnIndex && type RowIndex = NUMBER, RowOrColumnIdex?

export type GRID = [ROW, ROW, ROW, ROW, ROW, ROW, ROW, ROW, ROW]

export type NUMBERS = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type N = 0 | NUMBERS

export type ROW = [N, N, N, N, N, N, N, N, N]

export type SQUARE = [SQUARE_ROW, SQUARE_ROW, SQUARE_ROW]

export type SQUARE_ROW = [N, N, N]