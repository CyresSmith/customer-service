import styled from 'styled-components';
import theme from 'utils/theme';

type CalendarDay = {
    $today: boolean;
    $selected: boolean;
    $anotherMonth: boolean;
    $cellSize: number;
    $disabled: boolean;
};

export const CalendarBox = styled.div<{ $padding: string }>`
    width: 100%;
    background-color: ${theme.colors.bg.main};
    border-radius: ${theme.radii.m};
    padding: ${props => props.$padding};
`;

export const CalendarGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: ${theme.space[2]};
    margin-top: ${theme.space[3]};
`;

export const WeekDay = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.space[0]};
    text-transform: capitalize;
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.regular};
`;

export const SwitcherWrapper = styled.div`
    width: fit-content;
    margin: 0 auto;
`;

export const Day = styled.div<CalendarDay>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $today, $selected }) =>
        $selected
            ? theme.colors.secondary.light
            : $today
              ? theme.colors.accent.main
              : theme.colors.bg.light};
    color: ${({ $today, $selected }) =>
        $selected ? theme.colors.bg.main : $today ? theme.colors.bg.dark : theme.colors.white};
    border-radius: ${theme.radii.xs};
    padding: ${theme.space[2]};
    width: ${props => props.$cellSize}px;
    height: ${props => props.$cellSize}px;
    opacity: ${({ $anotherMonth }) => ($anotherMonth ? 0.8 : 1)};
    transition: ${theme.transition.primary};
    cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
    opacity: ${({ $disabled, $anotherMonth }) => ($disabled ? 0.5 : $anotherMonth ? 0.7 : 1)};
    pointer-events: ${props => (props.$disabled ? 'none' : 'all')};
`;

export const DayDate = styled.p<Pick<CalendarDay, '$today' | '$cellSize'>>`
    font-size: ${props => props.$cellSize / 2}px;
    font-weight: ${({ $today }) =>
        $today ? `${theme.fontWeights.bold}` : `${theme.fontWeights.regular}`};
    text-align: center;
`;
