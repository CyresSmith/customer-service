import styled from 'styled-components';
import theme from 'utils/theme';

const cellSize = '100px';
const mobileCellSize = '50px';

export const Container = styled.div<{ $isEditable: boolean }>`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr;
    gap: 16px;
    flex: 1;
    overflow: hidden;
`;

export const WorkScheduleBox = styled.section`
    display: grid;
    grid-template-rows: ${cellSize} 1fr;
    background-color: ${theme.colors.bg.main};
    border-radius: ${theme.radii.m};
    height: 100%;
    overflow: hidden;
    position: relative;

    @media ${theme.breakpoints.desktop.media} {
        grid-template-rows: ${cellSize} 1fr;
    }
`;

export const Today = styled.div<{ $left: number; $employeesCount: number; $daysCount: number }>`
    height: 100%;
    width: ${({ $daysCount }) => `calc(((100% - 12px) - (${mobileCellSize} * 2)) / ${$daysCount})`};
    border: 4px solid ${theme.colors.accent.main};
    border-radius: ${theme.radii.m};
    position: absolute;
    top: 0;
    /* left: ${({ $left, $daysCount }) => `calc(${$left} * (100% / ${$daysCount}))`}; */
    left: ${({ $left, $daysCount }) => {
        return `calc(${mobileCellSize} + 6px + (((100% - (${mobileCellSize} * 2) - 12px) / ${$daysCount}) * ${$left}))`;
    }};
    z-index: 3;
    pointer-events: none;

    @media ${theme.breakpoints.tablet.media} {
        width: ${({ $daysCount }) =>
            `calc((100% - (${mobileCellSize} * 2) - 12px) / ${$daysCount})`};

        left: ${({ $left, $daysCount }) =>
            `calc(${mobileCellSize} + 6px + (((100% - (${mobileCellSize} * 2) - 12px) / ${$daysCount}) * ${$left}))`};
    }

    @media ${theme.breakpoints.desktop.media} {
        width: ${({ $daysCount }) => `calc((100% - (${cellSize} * 2) - 32px) / ${$daysCount})`};

        left: ${({ $left, $daysCount }) =>
            `calc(${cellSize} + 16px + (((100% - (${cellSize} * 2) - 32px) / ${$daysCount}) * ${$left}))`};
    }
`;

export const HeaderBox = styled.div`
    display: grid;
    grid-template-columns: ${mobileCellSize} 1fr ${mobileCellSize};
    grid-template-rows: ${cellSize};
    padding: 0 ${theme.space[2]};

    @media ${theme.breakpoints.desktop.media} {
        grid-template-columns: ${cellSize} 1fr ${cellSize};
        padding: 0 ${theme.space[4]};
    }
`;

export const HeaderButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};
`;

export const SchedulesBox = styled.div`
    height: 100%;
    width: 100%;
    overflow-x: scroll;
    display: grid;
    grid-template-columns: ${mobileCellSize} 1fr ${mobileCellSize};
    grid-template-rows: 1fr;
    padding: 0 ${theme.space[2]} ${theme.space[2]} ${theme.space[2]};

    @media ${theme.breakpoints.desktop.media} {
        grid-template-columns: ${cellSize} 1fr ${cellSize};
        padding: 0 ${theme.space[4]} ${theme.space[4]} ${theme.space[4]};
    }
`;

export const SchedulesListBox = styled.ul<{ $daysCount: number }>`
    position: relative;
`;

export const HeaderRowBox = styled.ul<{ $daysCount: number }>`
    display: grid;
    grid-template-columns: ${({ $daysCount }) => `repeat(${$daysCount}, 1fr)`};
    grid-template-rows: ${cellSize};
    border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};

    @media ${theme.breakpoints.desktop.media} {
        grid-template-rows: ${cellSize};
    }
`;

export const RowBox = styled.li<{ $daysCount: number; $employeesCount: number }>`
    position: relative;
    display: grid;
    grid-template-columns: ${({ $daysCount }) => `repeat(${$daysCount}, 1fr)`};
    grid-template-rows: ${cellSize};
    border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};

    @media ${theme.breakpoints.desktop.media} {
        grid-template-rows: ${cellSize};
    }
`;

export const EmployeesList = styled.ul<{ $employeesCount: number }>`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const Employee = styled.li`
    width: ${mobileCellSize};
    height: calc(${cellSize} + 1px);
    gap: ${theme.space[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};

    @media ${theme.breakpoints.desktop.media} {
        width: ${cellSize};
        height: calc(${cellSize} + 1px);
        gap: ${theme.space[2]};
    }
`;

export const Name = styled.p`
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
`;

type DayProps = {
    $isNotWorkingDay?: boolean;
    $isToday?: boolean;
};

export const HeaderDay = styled.li<DayProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: ${theme.fontSizes.m};
    padding: ${theme.space[2]} 0;
    font-weight: ${theme.fontWeights.light};
    cursor: ${({ $isNotWorkingDay }) => ($isNotWorkingDay ? 'default' : 'pointer')};
    opacity: ${({ $isNotWorkingDay }) => ($isNotWorkingDay ? 0.5 : 1)};
    transition: ${theme.transition.primary};

    &:hover {
        color: ${({ $isNotWorkingDay, $isToday }) =>
            $isToday
                ? theme.colors.accent.main
                : $isNotWorkingDay
                ? theme.colors.white
                : theme.colors.primary.light};
    }

    @media ${theme.breakpoints.desktop.media} {
        padding: ${theme.space[4]} 0;
    }
`;

export const DayDateBox = styled.div<DayProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ $isToday }) => ($isToday ? theme.colors.accent.main : 'inherit')};
    transition: ${theme.transition.primary};
    overflow: hidden;
`;

export const DayDate = styled.span`
    font-size: ${theme.fontSizes.xxl};
`;

export const DayName = styled.span`
    font-size: ${theme.fontSizes.l};
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const WorkHours = styled.div<DayProps>`
    color: ${({ $isToday }) => ($isToday ? theme.colors.accent.main : theme.colors.secondary.main)};
    display: flex;
    flex-direction: column;

    @media ${theme.breakpoints.desktop.media} {
        flex-direction: row;
    }
`;

export const Day = styled.div<DayProps>`
    cursor: pointer;
    padding: ${theme.space[2]};
    cursor: ${({ $isNotWorkingDay }) => ($isNotWorkingDay ? 'default' : 'pointer')};
    opacity: ${({ $isNotWorkingDay }) => ($isNotWorkingDay ? '0.5' : '1')};
    transition: ${theme.transition.primary};
`;

export const DayBox = styled.div<{ $selected?: boolean } & DayProps>`
    /* width: 100%; */
    height: 100%;
    border-radius: ${theme.radii.m};
    color: ${({ $selected }) => ($selected ? theme.colors.bg.dark : theme.colors.white)};
    background-color: ${({ $selected }) =>
        $selected ? theme.colors.secondary.light : 'transparent'};
    transition: ${theme.transition.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.space[0]};
    font-size: ${theme.fontSizes.l};

    &:hover {
        color: ${({ $isNotWorkingDay }) => ($isNotWorkingDay ? 'inherit' : theme.colors.bg.main)};
        background-color: ${({ $isNotWorkingDay, $selected }) =>
            $isNotWorkingDay
                ? 'transparent'
                : $selected
                ? theme.colors.secondary.light
                : theme.colors.secondary.main};
    }
`;

export const DayBreak = styled.div<{ $selected?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.space[1]};
    font-size: ${theme.fontSizes.s};
    color: inherit;

    @media ${theme.breakpoints.desktop.media} {
        flex-direction: row;
    }
`;
