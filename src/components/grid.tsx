
import { Children, FC, useEffect, useCallback, memo } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import * as Styled from '../styles'
import { AttachKeyBoardEvents, Cell, EraseMistakeButton, Numbers, ResetGameButton } from './'
import { createGrid, StoreReducer, fillCell } from '../redux'
import { GridMatrix, GridMatrixCoörds, GridMatrixIndex, N, SudokuInputValue } from '../typings'
import { Sudoku } from '../Sudoku'

interface GridState {
    solutionMatrix?: GridMatrix
    selection?: GridMatrixCoörds
    selectedValue: N
}

export const Grid: FC = memo(() => {
    
	const { solutionMatrix, selection, selectedValue } = useSelector<StoreReducer, GridState>(({ solutionMatrix, workingMatrix, selection }) => ({ 
		solutionMatrix,
		selection,
		selectedValue: workingMatrix && selection 
			? workingMatrix[selection[0]][selection[1]] 
			: 0
	}))
    
	const dispatch = useDispatch<Dispatch<AnyAction>>()
    
	const create = useCallback(() => {
		dispatch(createGrid()) // init a new game
	}, [dispatch])
    
	const fill = useCallback((n: SudokuInputValue) => {
		if (selection && selectedValue === 0) {
			dispatch(fillCell(n, selection))
		}
	}, [dispatch, selection, selectedValue])

	useEffect(() => { 
		if (!solutionMatrix) create() 
	}, [create, solutionMatrix])

	return (
		<>
			<AttachKeyBoardEvents selection={selection} numbersInputHandler={fill} />
			<Styled.GridContainer>
				<Styled.GridRow>
					<ResetGameButton reset={create} />
					<EraseMistakeButton />
				</Styled.GridRow>
			</Styled.GridContainer>
			<Styled.GridContainer>
				{Children.toArray([...Array(Sudoku.SIZE)].map((_: unknown, row: number) => (
					<Styled.GridRow>
						{Children.toArray([...Array(Sudoku.SIZE)].map((_: unknown, col: number) => (
							<Cell row={row as GridMatrixIndex} col={col as GridMatrixIndex} />
						)))}
					</Styled.GridRow>
				)))}
			</Styled.GridContainer>
			<Styled.GridContainer>
				<Numbers />
			</Styled.GridContainer>
		</>
	)
})