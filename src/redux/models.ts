
import { Language } from '../enums'
import { I18n } from '../i18n/model'
import {
	GridMatrix,
	GridMatrixCoörds,
	GridMatrixRegionSelection,
	GridMatrixSeries,
	SudokuInputValue
} from '../typings'


export interface AppState {
    language: Language,
    translations: I18n[Language]
    initialGameMatrix: GridMatrix // initial grid only showing clue numbers
    solutionMatrix: GridMatrix // for validating user input
    workingMatrix: GridMatrix // the user will use this grid
    mistakesMatrix: GridMatrix // mistakes will be tracked
    trackedInput: GridMatrixSeries
    trackedMistakes: number
    selection: GridMatrixCoörds
    selectedRegion: GridMatrixRegionSelection
    selectedInputValue: SudokuInputValue
    settings: AppSettings
}

export interface AppSettings {
    highlightDuplicates: boolean
    mistakesLimit: number
    darkModeEnabled: boolean
}
