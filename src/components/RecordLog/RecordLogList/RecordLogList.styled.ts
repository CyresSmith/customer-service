import styled from 'styled-components';
import theme from 'utils/theme';

export const ListWrapper = styled.div`
    position: relative;
    width: 100%;
`

export const List = styled.ul<{ $wh: number, $last: boolean }>`
    width: 100%;
    display: grid;
    grid-template-rows: repeat($wh, ${theme.timeStep}px);
    border-top: ${theme.borders.normal} ${theme.colors.secondary.light};
    border-bottom: ${theme.borders.normal} ${theme.colors.secondary.light};
    border-right: ${props => props.$last ? 'none' : `${theme.borders.normal} ${theme.colors.bg.light}`};
`

export const ListItem = styled.li<{ $skip: boolean, $isHour: boolean }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${theme.timeStep}px;
    background-color: ${props => props.$skip ? 'rgba(17, 17, 20, 0.5)' : 'none'};
    pointer-events: ${props => props.$skip ? 'none' : 'all'};
    transition: ${theme.transition.primary};
    cursor: ${props => props.$skip ? 'not-allowed' : 'pointer'};

    &:hover {
        background-color: ${theme.colors.bg.light};
    }

    &:not(:first-child) {
        border-top: ${theme.borders.normal} ${props => props.$isHour ? `${theme.colors.secondary.light}` : `${theme.colors.secondary.dark}`};
    }
`

export const Time = styled.p`
    font-size: ${theme.fontSizes.l};
    color: ${theme.colors.bg.dark};
    opacity: 0;
    transition: ${theme.transition.primary};

    ${ListItem}:hover & {
        opacity: 1;
    }
`

export const EventWrapper = styled.div<{$top: number, $height: number}>`
    position: absolute;
    z-index: 5;
    top: calc(${props => props.$top} * ${theme.timeStep}px + 1px);
    height: calc(${props => props.$height} * ${theme.timeStep}px);
    width: 100%;
    padding: ${theme.space[1]};
`

export const Event = styled.div`
    width: 100%;
    height: 100%;
    border-radius: ${theme.radii.s};
    background-color: ${theme.colors.primary.rgba};
`