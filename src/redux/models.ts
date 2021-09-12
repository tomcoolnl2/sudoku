
import { GridMatrix, GridMatrixCoörds } from '../typings'


export interface AppState {
    challengeGrid?: GridMatrix, // initial grid only showing clue numbers
    solvedGrid?: GridMatrix, // for validating user input
    workingGrid?: GridMatrix, // the user will use this grid
    selection?: GridMatrixCoörds
}