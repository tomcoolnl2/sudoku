
import { FC, useRef, memo } from 'react'
import * as Styled from '../styles'
import { InputValueButton } from './input-value-button'
import { SudokuInputValue } from '../typings'
import { Sudoku } from '../Sudoku'

const nrsCH: string[] = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
const nrsEN: string[] = Sudoku.createSeries((_, i) => String(i + 1))
const langs = {
	en: nrsEN,
	ch: nrsCH
}
const lang = langs.ch
export const Numbers: FC = memo(() => {

	const nrs = useRef<SudokuInputValue[]>(Sudoku.createSeries((_, i) => i + 1))
	
	return (
		<Styled.NumbersContainer>
			{nrs.current.map(nr => (
				<InputValueButton key={nr} value={nr} char={lang[nr - 1]} />
			))}
		</Styled.NumbersContainer>
	)
})