
import styled, { css } from 'styled-components'

export const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 10px 0;
`

export const GridRow = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-flow: row;

        &:nth-child(1) {
            div {
                border-top: solid 4px ${theme.colors.secondary};
            }
        }

        &:nth-child(3),
        &:nth-child(6) {
            div {
                border-bottom: solid 3px ${theme.colors.secondary};
            }
        }

        &:nth-child(9) {
            div {
                border-bottom: solid 4px ${theme.colors.secondary};
            }
        }

        div {
            &:nth-child(1) {
                border-left: solid 4px ${theme.colors.secondary};
            }

            &:nth-child(3),
            &:nth-child(6),
            &:nth-child(9) {
                border-right: solid 4px ${theme.colors.secondary};
            }

            &:nth-child(4),
            &:nth-child(7) {
                border-left: none;
            }
        }
    `}
`