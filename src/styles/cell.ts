
import  styled, { css } from 'styled-components'


interface CellContainerProps {
    selected?: boolean
    highlighted?: boolean
    clue?: boolean
    duplicate?: boolean
    mistake?: boolean
}

export const CellContainer = styled.div<CellContainerProps>`
    ${({ theme, clue, selected, highlighted, duplicate, mistake }) => css`
        align-items: center;
        background-color: ${theme.colors[selected || duplicate ? 'active' : (highlighted ? 'highlighted' : 'primary')]};
        border: 1px solid ${theme.colors.secondary};
        cursor: pointer;
        color: ${mistake ? 'red' : 'inherit'};
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
`