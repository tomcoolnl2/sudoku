
type SeriesIndex = (e: unknown, i: number) => unknown

export class Sudoku {

    public static readonly MIN_VALUE: number = 0
    public static readonly MAX_VALUE: number = 9
    public static readonly MAX_CELLS: number = 81

    public static createSeries<T>(indicator: number): T
    public static createSeries<T>(fill: SeriesIndex): T
    public static createSeries<T>(argument?: number | SeriesIndex): T {
        
        let index: number = 0
        let mapFn: SeriesIndex = () => index

        if (typeof argument === 'number') {
            index = argument
        } else {
            mapFn = argument as SeriesIndex
        }
        
        return Array.from({ length: Sudoku.MAX_VALUE }).map(mapFn) as unknown as T
    }
}