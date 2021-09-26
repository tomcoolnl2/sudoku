
import  styled, { css } from 'styled-components'


interface BlockContainerProps {
    selected?: boolean
    highlighted?: boolean
    clue?: boolean
}

export const BlockContainer = styled.div<BlockContainerProps>`
    ${({ theme, clue, selected, highlighted }) => css`
        align-items: center;
        background-color: ${theme.colors[selected ? 'active' : (highlighted ? 'highlighted' : 'white')]};
        border: 1px solid ${theme.colors.black};
        cursor: pointer;
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
            background-color: ${theme.colors.highlighted}
        }
    `}
`