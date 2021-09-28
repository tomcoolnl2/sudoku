
import { GridMatrix, GridMatrixCoörds, GridMatrixSeries } from '../typings'


export interface AppState {
    initialGameMatrix?: GridMatrix, // initial grid only showing clue numbers
    solutionMatrix?: GridMatrix, // for validating user input
    workingMatrix?: GridMatrix, // the user will use this grid
    selection?: GridMatrixCoörds,
    trackedInput?: GridMatrixSeries
}