
import { FC, memo, useMemo } from 'react'
import * as Styled from '../styles'
import { InputValueButton } from './input-value-button'
import { SudokuInputValue } from '../typings'
import { Sudoku } from '../Sudoku'
import { useSelector } from 'react-redux'
import { StoreReducer } from '../redux'
import { Language } from '../enums'
import { i18n } from '../i18n'


export interface NumbersState {
    language: Language
}

export const Numbers: FC = memo(() => {

	const { language } = useSelector<StoreReducer, NumbersState>(state => state)
	const nrs = useMemo<SudokuInputValue[]>(() => Sudoku.createSeries((_, i) => i + 1), [language])

	return (
		<Styled.NumbersContainer>
			{nrs.map(nr => <InputValueButton key={nr} value={nr} char={i18n[language].numbers[nr - 1]} />)}
		</Styled.NumbersContainer>
	)
})