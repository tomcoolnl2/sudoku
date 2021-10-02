
import { GridMatrix, GridMatrixCoörds, GridMatrixSeries } from '../typings'

export interface AppState {
    initialGameMatrix: GridMatrix // initial grid only showing clue numbers
    solutionMatrix: GridMatrix // for validating user input
    workingMatrix: GridMatrix // the user will use this grid
    mistakesMatrix: GridMatrix // mistakes will be tracked
    trackedInput: GridMatrixSeries
    selection: GridMatrixCoörds,
    settings: AppSettings
}

export interface AppSettings {
    highlightDuplicates: boolean
}