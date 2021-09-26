

import  styled, { css, keyframes } from 'styled-components'

const rotate = keyframes`
    100% { transform: rotate(360deg); } 
`

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

        &:focus {
            border-color: ${theme.colors.active};
            outline: none;
        }

        &:hover {
            opacity: .8;
        }

        > svg { 
            margin-right: 10px;
            fill: ${theme.colors.primary}
        }

        &:hover {
            > svg {
                animation: ${rotate} 2s linear infinite;
            }
        }
    `}
`