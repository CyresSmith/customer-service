import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul`
    width: 100%;
    padding: 0 ${theme.space[2]};
`

export const ListItem = styled.li<{ $chosen: boolean }>`
    width: 100%;
    padding: ${theme.space[2]} ${theme.space[3]};
    display: grid;
    grid-template-columns: 60% 40%;
    border-radius: ${theme.radii.m};
    transition: ${theme.transition.primary};
    background-color: ${props => props.$chosen ? theme.colors.bg.light : 'transparent'};
    cursor: pointer;

    &:hover,
    :focus-visible {
        background-color: ${theme.colors.bg.light};
    }

    &:not(:last-child) {
        margin-bottom: ${theme.space[2]};
    }
`

export const ServiceName = styled.p`
    width: 240px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const RightWrapper = styled.div`
    display: grid;
    text-align: right;
    grid-template-columns: 1fr 1fr;
`

export const ServiceTime = styled.p`
    
`

export const ServicePrice = styled.p`
    font-weight: ${theme.fontWeights.bold};
`