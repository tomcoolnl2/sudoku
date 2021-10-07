
import { GridMatrix, GridMatrixCoörds, GridMatrixSeries, SudokuInputValue } from '../typings'


export interface AppState {
    initialGameMatrix: GridMatrix // initial grid only showing clue numbers
    solutionMatrix: GridMatrix // for validating user input
    workingMatrix: GridMatrix // the user will use this grid
    mistakesMatrix: GridMatrix // mistakes will be tracked
    trackedInput: GridMatrixSeries
    trackedMistakes: number
    selection: GridMatrixCoörds
    selectedInputValue: SudokuInputValue
    settings: AppSettings
}

export interface AppSettings {
    highlightDuplicates: boolean
    allowedMistakes: number
    darkModeEnabled: boolean
}