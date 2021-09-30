
import  styled, { css } from 'styled-components'


export const Button = styled.button`
    ${({ theme }) => css`
        align-items: center;
        background-color: ${theme.colors.secondary};
        border: 2px solid ${theme.colors.secondary};
        border-radius: 4px;
        color: ${theme.colors.primary};
        cursor: pointer;
        display: flex;
        flex: 1;
        font-size: 16px;
        height: 40px;
        justify-content: center;
        margin: 4px 2px;
        min-height: 40px;
        padding: 0;
        transition: ${theme.transition};
        opacity: .9;

        &:disabled {
            opacity: .7;
            cursor: default;
        }

        &:focus {
            border-color: ${theme.colors.active};
            outline: none;
        }

        &:hover {
            opacity: .7;
        }

        > svg { 
            margin-right: 10px;
            fill: ${theme.colors.primary};
            position: relative;
            width: 24px;
            height: 24px;
        }
    `}
`