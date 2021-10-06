
import  styled, { css } from 'styled-components'


interface CellContainerProps {
    selected?: boolean
    highlighted?: boolean
    clue?: boolean
    duplicate?: boolean
    mistake?: boolean
    mistakeDuplicate?: boolean
}

export const CellContainer = styled.div<CellContainerProps>`
    ${({ theme, clue, selected, highlighted, duplicate, mistake, mistakeDuplicate }) => {

		let bgColor: keyof typeof theme.colors
		if (selected || duplicate) bgColor = 'active'
		else if (highlighted) bgColor = 'highlighted'
		else if (mistake || mistakeDuplicate) bgColor = 'errorSecundary'
		else bgColor = 'primary'

		return css`
            align-items: center;
            background-color: ${theme.colors[bgColor]};
            border: 1px solid ${theme.colors.secondary};
            cursor: pointer;
            color: ${mistake || mistakeDuplicate ? theme.colors.errorPrimary : 'inherit'};
            display: flex;
            flex-grow: 1;
            flex-shrink: 0;
            flex-basis: 0;
            font-size: 20px;
            font-weight: ${clue ? 'bold' : 'normal'};
            height: auto;
            justify-content: center;
            transition: ${theme.transition};
            user-select: none;

            &::before {
                padding-top: 100%;
                content: '';
                float: left;
            }

            &:hover {
                background-color: ${theme.colors[selected ? 'active' : 'highlighted']}
            }
        `}
}
`