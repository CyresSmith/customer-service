import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    width: 100%;
    overflow: hidden;
`

export const SchedulesContainer = styled.div`
    position: relative;
    width: 100%;
    height: fit-content;
    min-height: fit-content;
    max-height: calc(100% - 77px);
    background-color: ${theme.colors.bg.main};
    border-radius: ${theme.radii.m};
    overflow: auto;
    
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
`

export const ListsWrapper = styled.div<{ $columns: number }>`
    width: 100%;
    padding: ${theme.space[5]} 60px;
    display: grid;
    grid-template-columns: repeat(${props => props.$columns}, 1fr);
    grid-template-rows: auto;
`

export const NoSchedule = styled.p`
    font-size: ${theme.fontSizes.heading.xs};
    justify-self: center;
`